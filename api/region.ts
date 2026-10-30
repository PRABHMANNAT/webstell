// Vercel packages /api independently of the static application. Keep this
// entrypoint self-contained so an extensionless runtime import cannot fail.
// Contract parity with lib/region.ts is covered by region-enquiries.test.mjs.
export function GET(request: Request) {
  const rawCountry = request.headers
    .get('x-vercel-ip-country')
    ?.trim()
    .toUpperCase();
  const country =
    rawCountry && /^[A-Z]{2}$/.test(rawCountry) ? rawCountry : null;
  const entry = (request.headers.get('cookie') || '')
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith('webstell_currency='));
  let preference: string | undefined;
  try {
    preference =
      entry && decodeURIComponent(entry.slice('webstell_currency='.length));
  } catch {
    preference = undefined;
  }
  const hasPreference =
    preference === 'INR' || preference === 'AUD' || preference === 'USD';
  return Response.json(
    {
      country,
      currency: hasPreference
        ? preference
        : country === 'IN'
          ? 'INR'
          : country === 'AU'
            ? 'AUD'
            : 'USD',
      source: hasPreference ? 'preference' : country ? 'country' : 'default',
    },
    {
      headers: {
        'Cache-Control': 'private, no-store, max-age=0',
        'Vercel-CDN-Cache-Control': 'no-store',
        Vary: 'Cookie, X-Vercel-IP-Country',
      },
    },
  );
}
