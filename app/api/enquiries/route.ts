type RequestKind = 'project_enquiry' | 'call_request';

type EnquiryInput = {
  submissionId?: unknown;
  kind?: unknown;
  name?: unknown;
  email?: unknown;
  whatsapp?: unknown;
  businessName?: unknown;
  projectType?: unknown;
  projectGoal?: unknown;
  budgetRange?: unknown;
  targetDate?: unknown;
  referenceLinks?: unknown;
  context?: unknown;
  website?: unknown;
};

type StoredEnquiry = {
  id: string;
  notification_status: 'pending' | 'sending' | 'sent' | 'failed';
  team_notified: string;
  customer_confirmed: string;
  email: string | null;
};

type Bindings = {
  DB?: D1Database;
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TEAM_EMAIL?: string;
};

async function getBindings(): Promise<Bindings> {
  if (process.env.VERCEL === '1') {
    return {
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
      CONTACT_TEAM_EMAIL: process.env.CONTACT_TEAM_EMAIL,
    };
  }

  const cloudflareWorkersModule = 'cloudflare:' + 'workers';
  const { env } = await import(/* @vite-ignore */ cloudflareWorkersModule);
  return env as Bindings;
}

const TEAM_EMAIL = 'contact@webstell-studio.com';
const MAX_BODY_BYTES = 24_000;

function value(input: unknown, maxLength: number) {
  return typeof input === 'string' ? input.trim().slice(0, maxLength) : '';
}

function validEmail(input: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}

function validWhatsApp(input: string) {
  const digits = input.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

function validate(raw: EnquiryInput) {
  const kind: RequestKind = raw.kind === 'call_request' ? 'call_request' : 'project_enquiry';
  const data = {
    submissionId: value(raw.submissionId, 100),
    kind,
    name: value(raw.name, 100),
    email: value(raw.email, 200).toLowerCase(),
    whatsapp: value(raw.whatsapp, 30),
    businessName: value(raw.businessName, 150),
    projectType: value(raw.projectType, 120),
    projectGoal: value(raw.projectGoal, 4_000),
    budgetRange: value(raw.budgetRange, 100),
    targetDate: value(raw.targetDate, 20),
    referenceLinks: value(raw.referenceLinks, 2_000),
    context: value(raw.context, 6_000),
  };
  const errors: Record<string, string> = {};

  if (!data.submissionId) errors.form = 'This request is missing its secure submission ID. Please reload and try again.';
  if (data.name.length < 2) errors.name = 'Please enter your name.';
  if (!data.email && !data.whatsapp) errors.contact = 'Add an email address or WhatsApp number so we can reply.';
  if (data.email && !validEmail(data.email)) errors.email = 'Enter a valid email address.';
  if (data.whatsapp && !validWhatsApp(data.whatsapp)) errors.whatsapp = 'Enter a valid WhatsApp number, including the country code.';
  if (!data.projectType) errors.projectType = 'Choose what you would like us to build.';
  if (data.projectGoal.length < 12) errors.projectGoal = 'Tell us a little more about the result you need.';
  if (data.targetDate && !/^\d{4}-\d{2}-\d{2}$/.test(data.targetDate)) errors.targetDate = 'Choose a valid target date.';
  if (data.targetDate && data.targetDate < new Date().toISOString().slice(0, 10)) errors.targetDate = 'Choose today or a future date.';

  return { data, errors };
}

async function digest(input: string) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function labelledLines(data: ReturnType<typeof validate>['data']) {
  return [
    `Request: ${data.kind === 'call_request' ? '30-minute call request' : 'Project enquiry'}`,
    `Name: ${data.name}`,
    `Email: ${data.email || 'Not provided'}`,
    `WhatsApp: ${data.whatsapp || 'Not provided'}`,
    `Business: ${data.businessName || 'Not provided'}`,
    `What they need: ${data.projectType}`,
    `What success should look like: ${data.projectGoal}`,
    `Budget: ${data.budgetRange || 'Not provided'}`,
    `Target date: ${data.targetDate || 'Not provided'}`,
    `Reference links: ${data.referenceLinks || 'Not provided'}`,
    data.context ? `\nContext carried from WEBSTELL:\n${data.context}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

async function sendEmail(
  apiKey: string,
  payload: { from: string; to: string[]; subject: string; text: string; reply_to?: string },
) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': crypto.randomUUID(),
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Email provider returned ${response.status}.`);
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ ok: false, message: 'This brief is too large to send.' }, { status: 413 });
  }

  let raw: EnquiryInput;
  try {
    raw = (await request.json()) as EnquiryInput;
  } catch {
    return Response.json({ ok: false, message: 'We could not read this brief. Please try again.' }, { status: 400 });
  }

  if (value(raw.website, 200)) return Response.json({ ok: true, customerCopySent: false });

  const { data, errors } = validate(raw);
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const bindings = await getBindings();
  if (!bindings.DB) {
    return Response.json({ ok: false, message: 'Enquiries are temporarily unavailable. Please use WhatsApp for now.' }, { status: 503 });
  }
  if (!bindings.RESEND_API_KEY) {
    return Response.json({ ok: false, message: 'Secure email delivery is being connected. Please message WEBSTELL on WhatsApp for an immediate reply.' }, { status: 503 });
  }

  const now = new Date().toISOString();
  const dedupeWindow = Math.floor(Date.now() / 900_000);
  const dedupeHash = await digest(
    [data.kind, data.name.toLowerCase(), data.email, data.whatsapp.replace(/\D/g, ''), data.projectType.toLowerCase(), data.projectGoal.toLowerCase(), dedupeWindow].join('|'),
  );
  const id = crypto.randomUUID();

  await bindings.DB.prepare(
    `INSERT OR IGNORE INTO contact_enquiries (
      id, submission_id, dedupe_hash, kind, name, email, whatsapp, business_name,
      project_type, project_goal, budget_range, target_date, reference_links,
      context, notification_status, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`,
  )
    .bind(
      id,
      data.submissionId,
      dedupeHash,
      data.kind,
      data.name,
      data.email || null,
      data.whatsapp || null,
      data.businessName || null,
      data.projectType,
      data.projectGoal,
      data.budgetRange || null,
      data.targetDate || null,
      data.referenceLinks || null,
      data.context || null,
      now,
      now,
    )
    .run();

  const stored = await bindings.DB.prepare(
    'SELECT id, notification_status, team_notified, customer_confirmed, email FROM contact_enquiries WHERE submission_id = ? OR dedupe_hash = ? LIMIT 1',
  )
    .bind(data.submissionId, dedupeHash)
    .first<StoredEnquiry>();

  if (!stored) {
    return Response.json({ ok: false, message: 'We could not save your brief. Your details are still here, so please try again.' }, { status: 500 });
  }

  const needsCustomerEmail = Boolean(stored.email);
  if (
    stored.notification_status === 'sent' &&
    stored.team_notified === '1' &&
    (!needsCustomerEmail || stored.customer_confirmed === '1')
  ) {
    return Response.json({ ok: true, duplicate: true, customerCopySent: needsCustomerEmail });
  }

  const lock = await bindings.DB.prepare(
    "UPDATE contact_enquiries SET notification_status = 'sending', updated_at = ? WHERE id = ? AND notification_status IN ('pending', 'failed')",
  )
    .bind(now, stored.id)
    .run();
  if (!lock.meta.changes) {
    return Response.json({ ok: false, message: 'This brief is already being sent. Please wait a moment.' }, { status: 409 });
  }

  const from = bindings.CONTACT_FROM_EMAIL || `WEBSTELL <${TEAM_EMAIL}>`;
  const teamEmail = bindings.CONTACT_TEAM_EMAIL || TEAM_EMAIL;
  const summary = labelledLines(data);

  try {
    if (stored.team_notified !== '1') {
      await sendEmail(bindings.RESEND_API_KEY, {
        from,
        to: [teamEmail],
        reply_to: data.email || undefined,
        subject: data.kind === 'call_request' ? `Call request from ${data.name}` : `New WEBSTELL brief from ${data.name}`,
        text: summary,
      });
      await bindings.DB.prepare("UPDATE contact_enquiries SET team_notified = '1', updated_at = ? WHERE id = ?")
        .bind(new Date().toISOString(), stored.id)
        .run();
    }

    if (data.email && stored.customer_confirmed !== '1') {
      await sendEmail(bindings.RESEND_API_KEY, {
        from,
        to: [data.email],
        subject: data.kind === 'call_request' ? 'WEBSTELL received your call request' : 'WEBSTELL received your project brief',
        text: `${data.name},\n\nThanks—your ${data.kind === 'call_request' ? 'call request' : 'brief'} is with us. A member of the WEBSTELL team will reply within one business day.\n\n${data.kind === 'call_request' ? 'Your preferred time is not confirmed yet. We will confirm it when we reply.\n\n' : ''}Here is the copy we received:\n\n${summary}\n\nWEBSTELL\n${TEAM_EMAIL}\n+91 76964 03580`,
      });
      await bindings.DB.prepare("UPDATE contact_enquiries SET customer_confirmed = '1', updated_at = ? WHERE id = ?")
        .bind(new Date().toISOString(), stored.id)
        .run();
    }

    await bindings.DB.prepare("UPDATE contact_enquiries SET notification_status = 'sent', last_error = NULL, updated_at = ? WHERE id = ?")
      .bind(new Date().toISOString(), stored.id)
      .run();
  } catch {
    await bindings.DB.prepare("UPDATE contact_enquiries SET notification_status = 'failed', last_error = 'Email delivery failed', updated_at = ? WHERE id = ?")
      .bind(new Date().toISOString(), stored.id)
      .run();
    return Response.json({ ok: false, message: 'Your brief was saved, but we could not finish email delivery. Please try again or message us on WhatsApp.' }, { status: 502 });
  }

  return Response.json({ ok: true, customerCopySent: Boolean(data.email) });
}
