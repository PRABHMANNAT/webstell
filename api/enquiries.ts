import { POST as handleEnquiry } from '../app/api/enquiries/route';

/**
 * Vercel serves the frontend as a static export, so this root API route keeps
 * the Resend-backed enquiry endpoint available in the production deployment.
 */
export async function POST(request: Request) {
  console.log('[api/enquiries] request received');
  try {
    return await handleEnquiry(request);
  } catch (error) {
    console.error('[api/enquiries] unexpected failure', error);
    return Response.json(
      { ok: false, message: 'Email delivery is temporarily unavailable. Please message WEBSTELL on WhatsApp.' },
      { status: 503 },
    );
  }
}
