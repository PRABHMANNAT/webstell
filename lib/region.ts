export const currencies = ['INR', 'AUD', 'USD'] as const;
export type Currency = (typeof currencies)[number];
export const currencyCookie = 'webstell_currency';
export const regionCookie = 'webstell_region';

export function isCurrency(value: unknown): value is Currency {
  return typeof value === 'string' && currencies.includes(value as Currency);
}

export function readCookie(cookie: string, name: string): string | undefined {
  const entry = cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));
  if (!entry) return undefined;
  try {
    return decodeURIComponent(entry.slice(name.length + 1));
  } catch {
    return undefined;
  }
}

export function currencyForCountry(
  country: string | null | undefined,
): Currency {
  return country?.toUpperCase() === 'IN'
    ? 'INR'
    : country?.toUpperCase() === 'AU'
      ? 'AUD'
      : 'USD';
}

export function resolveRegion(headers: Headers) {
  // Vercel supplies this header at its edge. Never use language, timezone or an external IP lookup.
  const rawCountry = headers.get('x-vercel-ip-country')?.trim().toUpperCase();
  const country =
    rawCountry && /^[A-Z]{2}$/.test(rawCountry) ? rawCountry : null;
  const preference = readCookie(headers.get('cookie') || '', currencyCookie);
  return {
    country,
    currency: isCurrency(preference) ? preference : currencyForCountry(country),
    source: isCurrency(preference)
      ? 'preference'
      : country
        ? 'country'
        : 'default',
  };
}

export function regionalHome(url: URL, headers: Headers): string | null {
  if (url.pathname !== '/') return null;
  const preference = readCookie(headers.get('cookie') || '', regionCookie);
  if (preference === 'global') return null;
  if (preference === 'au' || resolveRegion(headers).country === 'AU')
    return `/au${url.search}`;
  return null;
}

export function regionResponse(request: Request) {
  return Response.json(resolveRegion(request.headers), {
    headers: {
      'Cache-Control': 'private, no-store, max-age=0',
      'Vercel-CDN-Cache-Control': 'no-store',
      Vary: 'Cookie, X-Vercel-IP-Country',
    },
  });
}

export function formatMoney(value: number, currency: Currency) {
  const number = new Intl.NumberFormat(
    currency === 'INR' ? 'en-IN' : currency === 'AUD' ? 'en-AU' : 'en-US',
    { maximumFractionDigits: 0 },
  ).format(value);
  return `${currency === 'INR' ? '₹' : currency === 'AUD' ? 'A$' : '$'}${number}`;
}

export const taxNotes: Record<Currency, string> = {
  INR: 'Quoted in INR. Any applicable GST is itemised in your proposal and invoice; tax treatment depends on the agreed supply.',
  AUD: 'Quoted in AUD. Any applicable GST or other taxes are itemised before you agree to the work. Currency does not imply an Australian office.',
  USD: 'Quoted in USD. Applicable taxes, withholding obligations and payment-provider charges are clarified in your proposal.',
};
