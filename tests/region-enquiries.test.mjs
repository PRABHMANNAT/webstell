import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import {
  resolveRegion,
  legacyHomeRedirect,
  regionResponse,
  readCookie,
  formatMoney,
} from '../lib/region.ts';
import { readEnquiryContext } from '../lib/enquiry-context.ts';
import { GET as deployedRegion } from '../api/region.ts';

test('deployed currency function matches the application for country and cookie choices', async () => {
  for (const [country, cookie] of [
    ['IN', ''],
    ['AU', ''],
    ['US', ''],
    ['', ''],
    ['invalid', ''],
    ['IN', 'webstell_currency=AUD'],
    ['AU', 'webstell_currency=USD'],
    ['US', 'webstell_currency=INR'],
    ['IN', 'webstell_currency=BAD'],
    ['AU', 'webstell_currency=%zz'],
    [' in ', 'other=1; webstell_currency=%55%53%44'],
  ]) {
    const request = new Request('https://example.com/api/region', {
      headers: { 'x-vercel-ip-country': country, cookie },
    });
    const actual = deployedRegion(request);
    const expected = regionResponse(request);
    assert.equal(actual.status, 200);
    assert.deepEqual(await actual.json(), await expected.json());
    assert.equal(
      actual.headers.get('cache-control'),
      expected.headers.get('cache-control'),
    );
    assert.equal(actual.headers.get('vercel-cdn-cache-control'), 'no-store');
    assert.match(actual.headers.get('vary'), /Cookie/);
  }
});
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
test('every country uses the normal homepage and only the retired Australian URL redirects', () => {
  assert.equal(legacyHomeRedirect(new URL('https://example.com/')), null);
  assert.equal(
    legacyHomeRedirect(new URL('https://example.com/?campaign=local')),
    null,
  );
  assert.equal(
    legacyHomeRedirect(new URL('https://example.com/pricing')),
    null,
  );
  assert.equal(
    legacyHomeRedirect(new URL('https://example.com/au?campaign=local')),
    '/?campaign=local',
  );
  assert.equal(legacyHomeRedirect(new URL('https://example.com/au/')), '/');
  const config = JSON.parse(
    readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'),
  );
  assert.deepEqual(config.redirects, [
    { source: '/au', destination: '/', permanent: true },
  ]);
  for (const file of ['page.tsx', 'AustralianHome.tsx', 'AustraliaMap.tsx']) {
    assert.equal(
      existsSync(new URL('../app/au/' + file, import.meta.url)),
      false,
    );
  }
  assert(
    !readFileSync(
      new URL('../public/sitemap.xml', import.meta.url),
      'utf8',
    ).includes('webstell-studio.com/au'),
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
