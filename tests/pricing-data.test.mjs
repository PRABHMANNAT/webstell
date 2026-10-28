import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateEstimate,
  MAX_EXTRA_UNITS,
  normalizeUnits,
} from '../app/pricing-data.ts';
import {
  regionalPrices,
  approvedAmount,
} from '../app/pricing/approved-rates.ts';
import { projectTypes } from '../app/pricing-scope.ts';
import { packageCategories, includedExtras } from '../app/pricing/packages.ts';
const rate = (amount) => ({ amount, approved: true });
const book = () => structuredClone(regionalPrices);
test('every public package is quote-only until independently approved', () => {
  for (const currency of ['INR', 'AUD', 'USD'])
    for (const project of projectTypes)
      for (const tier of ['starter', 'growth', 'custom'])
        assert.equal(
          calculateEstimate(project.id, [], false, 0, currency, tier).total,
          null,
        );
});
test('one market approval cannot expose prices in another market', () => {
  const b = book();
  b.AUD.packages['website:starter'] = rate(2400);
  assert.equal(
    calculateEstimate('website', [], false, 0, 'AUD', 'starter', b).total,
    2400,
  );
  for (const c of ['INR', 'USD'])
    assert.equal(
      calculateEstimate('website', [], false, 0, c, 'starter', b).total,
      null,
    );
  b.INR.packages['website:starter'] = rate(49000);
  b.USD.packages['website:starter'] = rate(1800);
  assert.equal(
    calculateEstimate('website', [], false, 0, 'INR', 'starter', b).total,
    49000,
  );
  assert.equal(
    calculateEstimate('website', [], false, 0, 'USD', 'starter', b).total,
    1800,
  );
});
test('draft, invalid and missing amounts cannot be published', () => {
  for (const value of [
    null,
    undefined,
    { amount: 0, approved: false },
    { amount: 100, approved: false },
    rate(NaN),
    rate(Infinity),
    rate(-1),
  ])
    assert.equal(approvedAmount(value), null);
  assert.equal(approvedAmount(rate(0)), 0);
});
test('unapproved extras, units or domain credits require a full quote', () => {
  const b = book();
  b.USD.packages['website:starter'] = rate(1000);
  assert.equal(
    calculateEstimate('website', ['cms'], false, 0, 'USD', 'starter', b).total,
    null,
  );
  assert.equal(
    calculateEstimate('website', [], false, 1, 'USD', 'starter', b).total,
    null,
  );
  assert.equal(
    calculateEstimate('website', [], true, 0, 'USD', 'starter', b).total,
    null,
  );
  b.USD.extras.cms = rate(300);
  b.USD.extraUnits.website = rate(100);
  b.USD.domainCredit = rate(20);
  assert.equal(
    calculateEstimate('website', ['cms'], true, 2, 'USD', 'starter', b).total,
    1480,
  );
});
test('custom stays quote-only, incompatible extras are ignored, units are bounded', () => {
  const b = book();
  b.USD.packages['website:custom'] = rate(1000);
  assert.equal(
    calculateEstimate('website', [], false, 0, 'USD', 'custom', b).total,
    null,
  );
  assert.deepEqual(
    calculateEstimate(
      'mobile',
      ['cms', 'menu', 'notifications'],
      false,
      0,
    ).additions.map((x) => x.id),
    ['notifications'],
  );
  assert.equal(normalizeUnits(Infinity), 0);
  assert.equal(normalizeUnits(-1), 0);
  assert.equal(normalizeUnits(2.8), 2);
  assert.equal(normalizeUnits(200), MAX_EXTRA_UNITS);
});
test('included capabilities are valid and do not get charged twice', () => {
  for (const category of packageCategories)
    for (const tier of ['starter', 'growth']) {
      const b = book();
      b.USD.packages[category.id + ':' + tier] = rate(1000);
      const result = calculateEstimate(
        category.id,
        includedExtras(category.id, tier),
        false,
        0,
        'USD',
        tier,
        b,
      );
      assert.equal(result.total, 1000, category.id + ':' + tier);
      assert.deepEqual(
        result.additions.map((x) => x.id).sort(),
        includedExtras(category.id, tier).sort(),
      );
      assert(result.additions.every((x) => x.included && x.price === 0));
    }
});
