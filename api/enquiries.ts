import { POST as handleEnquiry } from '../app/api/enquiries/route';

/**
 * Vercel serves the frontend as a static export, so this root API route keeps
 * the Resend-backed enquiry endpoint available in the production deployment.
 */
export async function POST(request: Request) {
  return handleEnquiry(request);
}
