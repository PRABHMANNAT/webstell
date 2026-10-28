import test from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveRegion,
  regionalHome,
  regionResponse,
  readCookie,
  formatMoney,
} from '../lib/region.ts';
import { readEnquiryContext } from '../lib/enquiry-context.ts';
test('server country resolution handles India, Australia, all other countries and missing headers', () => {
  for (const [country, currency] of [
    ['IN', 'INR'],
    ['AU', 'AUD'],
    ['GB', 'USD'],
    ['US', 'USD'],
    ['', 'USD'],
    ['bogus', 'USD'],
  ])
    assert.equal(
      resolveRegion(new Headers({ 'x-vercel-ip-country': country })).currency,
      currency,
    );
});
test('manual currency preference wins, malformed cookies fail safely', () => {
  assert.equal(
    resolveRegion(
      new Headers({
        'x-vercel-ip-country': 'AU',
        cookie: 'webstell_currency=INR',
      }),
    ).currency,
    'INR',
  );
  assert.equal(
    resolveRegion(
      new Headers({
        'x-vercel-ip-country': 'IN',
        cookie: 'webstell_currency=BAD',
      }),
    ).currency,
    'INR',
  );
  assert.equal(
    readCookie('webstell_currency=%zz', 'webstell_currency'),
    undefined,
  );
});
test('only the root entry routes Australians, with query and explicit homepage preference preserved', () => {
  const au = new Headers({ 'x-vercel-ip-country': 'AU' });
  assert.equal(
    regionalHome(new URL('https://example.com/?campaign=local'), au),
    '/au?campaign=local',
  );
  assert.equal(regionalHome(new URL('https://example.com/pricing'), au), null);
  assert.equal(regionalHome(new URL('https://example.com/au'), au), null);
  au.set('cookie', 'webstell_region=global');
  assert.equal(regionalHome(new URL('https://example.com/'), au), null);
  assert.equal(
    regionalHome(
      new URL('https://example.com/'),
      new Headers({ cookie: 'webstell_region=au' }),
    ),
    '/au',
  );
  assert.equal(
    regionalHome(new URL('https://example.com/'), new Headers()),
    null,
  );
});
test('region endpoint never caches personalised decisions', async () => {
  const response = regionResponse(
    new Request('https://example.com/api/region', {
      headers: { 'x-vercel-ip-country': 'AU' },
    }),
  );
  assert.equal((await response.json()).currency, 'AUD');
  assert.match(response.headers.get('cache-control'), /private, no-store/);
  assert.equal(response.headers.get('vercel-cdn-cache-control'), 'no-store');
  assert.match(response.headers.get('vary'), /Cookie/);
});
test('currency display is unambiguous', () => {
  assert.equal(formatMoney(150000, 'INR'), '₹1,50,000');
  assert.equal(formatMoney(2400, 'AUD'), 'A$2,400');
  assert.equal(formatMoney(1800, 'USD'), '$1,800');
});
test('quote-only enquiries carry service, package, industry, goal and currency without a fake zero estimate', () => {
  const result = readEnquiryContext(
    '?project=ai&package=growth&industry=clinics&currency=AUD&detail=Help+answer+questions&features=Human+handoff&units=2',
  );
  assert.equal(result.currency, 'AUD');
  assert(result.hasContext);
  assert.equal(result.estimateLabel, '');
  assert.match(result.context, /Package: growth/);
  assert.match(result.context, /Industry: clinics/);
  assert.match(result.context, /Human handoff/);
  assert.match(result.context, /\n/);
});
test('enquiry URL values are bounded, invalid estimates never create a quote', () => {
  for (const estimate of ['', 'NaN', 'Infinity', '-5', '10000001'])
    assert.equal(readEnquiryContext('?estimate=' + estimate).estimateLabel, '');
  assert.equal(readEnquiryContext('?currency=BAD', 'INR').currency, 'INR');
  assert.equal(
    readEnquiryContext('?project=' + 'a'.repeat(300)).project.length,
    100,
  );
  assert.equal(readEnquiryContext('').hasContext, false);
});
