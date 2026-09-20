import { POST as handleSubscription } from '../app/api/subscribe/route';

/**
 * Vercel serves the frontend as a static export, so this root API route keeps
 * the Resend-backed newsletter endpoint available in the production deployment.
 */
export async function POST(request: Request) {
  console.log('[api/subscribe] request received');
  try {
    return await handleSubscription(request);
  } catch (error) {
    console.error('[api/subscribe] unexpected failure', error);
    return Response.json(
      { ok: false, message: 'Subscription is temporarily unavailable.' },
      { status: 503 },
    );
  }
}
