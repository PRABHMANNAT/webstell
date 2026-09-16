import { escapeHtml, getEmailClient } from '../../../lib/resend';

type SubscribeInput = {
  email?: unknown;
  website?: unknown;
};

function value(input: unknown, maxLength: number) {
  return typeof input === 'string' ? input.trim().slice(0, maxLength) : '';
}

function validEmail(input: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}

async function emailHash(email: string) {
  const bytes = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(email),
  );
  return Array.from(new Uint8Array(bytes), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
}

export async function POST(request: Request) {
  let raw: SubscribeInput;
  try {
    raw = (await request.json()) as SubscribeInput;
  } catch {
    return Response.json(
      { ok: false, message: 'We could not read that email address.' },
      { status: 400 },
    );
  }

  if (value(raw.website, 200)) return Response.json({ ok: true });

  const email = value(raw.email, 200).toLowerCase();
  if (!validEmail(email)) {
    return Response.json(
      { ok: false, message: 'Enter a valid email address.' },
      { status: 422 },
    );
  }

  try {
    const { resend, from, teamEmail } = await getEmailClient();
    const { error } = await resend.emails.send(
      {
        from,
        to: teamEmail,
        replyTo: email,
        subject: 'New WEBSTELL newsletter subscriber',
        html: `<div style="font-family:Arial,sans-serif;color:#17201e"><h1 style="font-size:24px">New subscriber</h1><p><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a> subscribed through the WEBSTELL website footer.</p></div>`,
        text: `${email} subscribed through the WEBSTELL website footer.`,
      },
      { idempotencyKey: `webstell-subscription-${await emailHash(email)}` },
    );

    if (error) {
      console.error('Resend subscription delivery failed:', error.name);
      return Response.json(
        { ok: false, message: 'Subscription could not be sent. Please try again.' },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error(
      'Subscription email configuration failed:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    return Response.json(
      { ok: false, message: 'Subscription is temporarily unavailable.' },
      { status: 503 },
    );
  }
}
