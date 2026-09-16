import { Resend } from 'resend';

type EmailEnvironment = {
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TEAM_EMAIL?: string;
};

async function cloudflareEnvironment(): Promise<EmailEnvironment> {
  try {
    const cloudflareWorkersModule = 'cloudflare:' + 'workers';
    const { env } = await import(/* @vite-ignore */ cloudflareWorkersModule);
    return env as EmailEnvironment;
  } catch {
    return {};
  }
}

export async function getEmailClient() {
  const runtime = await cloudflareEnvironment();
  const apiKey = runtime.RESEND_API_KEY || process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured.');
  }

  return {
    resend: new Resend(apiKey),
    from:
      runtime.CONTACT_FROM_EMAIL ||
      process.env.CONTACT_FROM_EMAIL ||
      'WEBSTELL <onboarding@resend.dev>',
    teamEmail:
      runtime.CONTACT_TEAM_EMAIL ||
      process.env.CONTACT_TEAM_EMAIL ||
      'contact@webstell-studio.com',
  };
}

export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      })[character] || character,
  );
}
