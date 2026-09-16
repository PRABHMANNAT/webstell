import { POST as handleSubscription } from '../app/api/subscribe/route';

/**
 * Vercel serves the frontend as a static export, so this root API route keeps
 * the Resend-backed newsletter endpoint available in the production deployment.
 */
export async function POST(request: Request) {
  return handleSubscription(request);
}
