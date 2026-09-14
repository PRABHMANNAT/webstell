import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateEstimate,
  MAX_EXTRA_UNITS,
} from '../app/pricing-data.ts';

test('domain saving only applies to project types that include a domain allowance', () => {
  const website = calculateEstimate('website', [], true, 0);
  const mobile = calculateEstimate('mobile', [], true, 0);

  assert.equal(website.domainSaving, 3500);
  assert.equal(website.total, 16500);
  assert.equal(mobile.domainSaving, 0);
  assert.equal(mobile.total, 60000);
});

test('calculator ignores extras that do not fit the selected project type', () => {
  const estimate = calculateEstimate('mobile', ['cms', 'blog', 'payments'], false, 0);

  assert.deepEqual(estimate.additions.map((item) => item.id), ['payments']);
  assert.equal(estimate.total, 64000);
});

test('page and screen scope uses each project type’s own unit pricing and limit', () => {
  const website = calculateEstimate('website', [], false, MAX_EXTRA_UNITS + 9);
  const software = calculateEstimate('software', [], false, 2);

  assert.equal(website.extraUnits, MAX_EXTRA_UNITS);
  assert.equal(website.unitCost, MAX_EXTRA_UNITS * 1500);
  assert.equal(software.unitCost, 6000);
  assert.equal(software.delivery, '5–7 weeks');
});
