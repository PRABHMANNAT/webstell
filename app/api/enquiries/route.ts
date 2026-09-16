import { escapeHtml, getEmailClient } from '../../../lib/resend';

type RequestKind = 'project_enquiry' | 'call_request';

type EnquiryInput = {
  submissionId?: unknown;
  kind?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  whatsapp?: unknown;
  businessName?: unknown;
  projectType?: unknown;
  projectGoal?: unknown;
  budgetRange?: unknown;
  targetDate?: unknown;
  referenceLinks?: unknown;
  attachment?: unknown;
  context?: unknown;
  website?: unknown;
};

const MAX_BODY_BYTES = 3_800_000;
const MAX_ATTACHMENT_BASE64_CHARS = 3_300_000;
const MAX_ATTACHMENT_BYTES = 2_400_000;
const ALLOWED_ATTACHMENT_FILE = /\.(pdf|doc|docx|txt|rtf|png|jpe?g|webp)$/i;

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

function parseAttachment(input: unknown) {
  if (input === undefined || input === null) return { attachment: null, error: '' };
  if (!input || typeof input !== 'object') return { attachment: null, error: 'Please choose a valid attachment.' };
  const candidate = input as { filename?: unknown; content?: unknown };
  const filename = value(candidate.filename, 180).replace(/[^a-zA-Z0-9._ -]/g, '_');
  const content = typeof candidate.content === 'string' ? candidate.content.trim() : '';
  const encodedBytes = Math.floor((content.length * 3) / 4) - (content.endsWith('==') ? 2 : content.endsWith('=') ? 1 : 0);

  if (!filename || !content || !/^[A-Za-z0-9+/]+={0,2}$/.test(content)) {
    return { attachment: null, error: 'Please choose a valid attachment.' };
  }
  if (!ALLOWED_ATTACHMENT_FILE.test(filename)) {
    return { attachment: null, error: 'Upload a PDF, document, text file or image.' };
  }
  if (content.length > MAX_ATTACHMENT_BASE64_CHARS || encodedBytes > MAX_ATTACHMENT_BYTES) {
    return { attachment: null, error: 'Attachments must be smaller than 2.4 MB.' };
  }
  return { attachment: { filename, content }, error: '' };
}

function validate(raw: EnquiryInput) {
  const kind: RequestKind =
    raw.kind === 'call_request' ? 'call_request' : 'project_enquiry';
  const parsedAttachment = parseAttachment(raw.attachment);
  const data = {
    submissionId: value(raw.submissionId, 100),
    kind,
    name: value(raw.name, 100),
    email: value(raw.email, 200).toLowerCase(),
    phone: value(raw.phone, 30) || value(raw.whatsapp, 30),
    businessName: value(raw.businessName, 150),
    projectType: value(raw.projectType, 120),
    projectGoal: value(raw.projectGoal, 4_000),
    budgetRange: value(raw.budgetRange, 100),
    targetDate: value(raw.targetDate, 20),
    referenceLinks: value(raw.referenceLinks, 2_000),
    attachment: parsedAttachment.attachment,
    context: value(raw.context, 6_000),
  };
  const errors: Record<string, string> = {};

  if (!data.submissionId) errors.form = 'Please reload the page and try again.';
  if (data.name.length < 2) errors.name = 'Please enter your name.';
  if (data.kind === 'call_request' && !data.phone) {
    errors.phone = 'Add a phone number so we can confirm your call.';
  }
  if (data.kind !== 'call_request' && !data.email && !data.phone) {
    errors.contact = 'Add an email address or WhatsApp number so we can reply.';
  }
  if (data.email && !validEmail(data.email))
    errors.email = 'Enter a valid email address.';
  if (data.phone && !validWhatsApp(data.phone))
    errors[data.kind === 'call_request' ? 'phone' : 'whatsapp'] =
      data.kind === 'call_request'
        ? 'Enter a valid phone number, including the country code.'
        : 'Enter a valid WhatsApp number, including the country code.';
  if (!data.projectType)
    errors.projectType = 'Choose what you would like us to build.';
  if (data.kind !== 'call_request' && data.projectGoal.length < 12)
    errors.projectGoal = 'Tell us a little more about the result you need.';
  if (data.targetDate && !/^\d{4}-\d{2}-\d{2}$/.test(data.targetDate))
    errors.targetDate = 'Choose a valid target date.';
  if (
    data.targetDate &&
    data.targetDate < new Date().toISOString().slice(0, 10)
  )
    errors.targetDate = 'Choose today or a future date.';
  if (parsedAttachment.error) errors.attachment = parsedAttachment.error;

  return { data, errors };
}

function labelledFields(data: ReturnType<typeof validate>['data']) {
  return [
    [
      'Request',
      data.kind === 'call_request' ? '30-minute call request' : 'Project enquiry',
    ],
    ['Name', data.name],
    ['Email', data.email || 'Not provided'],
    ['Phone / WhatsApp', data.phone || 'Not provided'],
    ['Business', data.businessName || 'Not provided'],
    ['What they need', data.projectType],
    ['What success should look like', data.projectGoal],
    ['Budget', data.budgetRange || 'Not provided'],
    ['Target date', data.targetDate || 'Not provided'],
    ['Reference links', data.referenceLinks || 'Not provided'],
    ['Attached file', data.attachment?.filename || 'Not provided'],
    ['Context', data.context || 'Not provided'],
  ] as const;
}

function emailHtml(data: ReturnType<typeof validate>['data']) {
  const rows = labelledFields(data)
    .map(
      ([label, content]) =>
        `<tr><th style="padding:10px 12px;text-align:left;vertical-align:top;border-bottom:1px solid #e5e7eb">${escapeHtml(label)}</th><td style="padding:10px 12px;white-space:pre-wrap;border-bottom:1px solid #e5e7eb">${escapeHtml(content)}</td></tr>`,
    )
    .join('');

  return `<div style="font-family:Arial,sans-serif;color:#17201e"><h1 style="font-size:24px">New WEBSTELL enquiry</h1><p>A visitor submitted the project form on webstell-studio.com.</p><table style="border-collapse:collapse;width:100%;max-width:720px">${rows}</table></div>`;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json(
      { ok: false, message: 'This brief is too large to send.' },
      { status: 413 },
    );
  }

  let raw: EnquiryInput;
  try {
    raw = (await request.json()) as EnquiryInput;
  } catch {
    return Response.json(
      { ok: false, message: 'We could not read this brief. Please try again.' },
      { status: 400 },
    );
  }

  if (value(raw.website, 200)) {
    return Response.json({ ok: true, customerCopySent: false });
  }

  const { data, errors } = validate(raw);
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  try {
    const { resend, from, teamEmail } = await getEmailClient();
    const { error } = await resend.emails.send(
      {
        from,
        to:
          data.kind === 'call_request'
            ? 'contact@webstell-studio.com'
            : teamEmail,
        replyTo: data.email || undefined,
        subject:
          data.kind === 'call_request'
            ? `Call request from ${data.name}`
            : `New WEBSTELL brief from ${data.name}`,
        html: emailHtml(data),
        attachments: data.attachment
          ? [{ filename: data.attachment.filename, content: data.attachment.content }]
          : undefined,
        text: labelledFields(data)
          .map(([label, content]) => `${label}: ${content}`)
          .join('\n\n'),
      },
      { idempotencyKey: `webstell-enquiry-${data.submissionId}` },
    );

    if (error) {
      console.error(
        'Resend enquiry delivery failed:',
        error.name,
        error.message,
      );
      return Response.json(
        {
          ok: false,
          message:
            'We could not send this right now. Please try again or message us on WhatsApp.',
        },
        { status: 502 },
      );
    }

    return Response.json({ ok: true, customerCopySent: false });
  } catch (error) {
    console.error(
      'Enquiry email configuration failed:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    return Response.json(
      {
        ok: false,
        message:
          'Email delivery is temporarily unavailable. Please message WEBSTELL on WhatsApp.',
      },
      { status: 503 },
    );
  }
}
