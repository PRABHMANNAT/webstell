import type { Currency } from '../../lib/region';

export type ApprovedRate = { amount: number; approved: boolean };
export type RegionalRates = {
  packages: Record<string, ApprovedRate | null>;
  extras: Record<string, ApprovedRate | null>;
  extraUnits: Record<string, ApprovedRate | null>;
  domainCredit: ApprovedRate | null;
};
export type Pricebook = Record<Currency, RegionalRates>;

// Approval is explicit for EACH market and line item. No FX calculation or draft
// amounts are shipped to the browser. See docs/regional-pricing.md before editing.
export const regionalPrices: Pricebook = {
  INR: {
    packages: {
      'website:starter': null,
      'website:growth': null,
      'store:starter': null,
      'store:growth': null,
      'software:starter': null,
      'software:growth': null,
      'ai:starter': null,
      'ai:growth': null,
      'automation:starter': null,
      'automation:growth': null,
      'portfolio:starter': null,
      'portfolio:growth': null,
      'seo:starter': null,
      'seo:growth': null,
      'mobile:starter': null,
      'mobile:growth': null,
    },
    extras: {},
    extraUnits: {},
    domainCredit: null,
  },
  AUD: {
    packages: {
      'website:starter': null,
      'website:growth': null,
      'store:starter': null,
      'store:growth': null,
      'software:starter': null,
      'software:growth': null,
      'ai:starter': null,
      'ai:growth': null,
      'automation:starter': null,
      'automation:growth': null,
      'portfolio:starter': null,
      'portfolio:growth': null,
      'seo:starter': null,
      'seo:growth': null,
      'mobile:starter': null,
      'mobile:growth': null,
    },
    extras: {},
    extraUnits: {},
    domainCredit: null,
  },
  USD: {
    packages: {
      'website:starter': null,
      'website:growth': null,
      'store:starter': null,
      'store:growth': null,
      'software:starter': null,
      'software:growth': null,
      'ai:starter': null,
      'ai:growth': null,
      'automation:starter': null,
      'automation:growth': null,
      'portfolio:starter': null,
      'portfolio:growth': null,
      'seo:starter': null,
      'seo:growth': null,
      'mobile:starter': null,
      'mobile:growth': null,
    },
    extras: {},
    extraUnits: {},
    domainCredit: null,
  },
};

export function approvedAmount(
  rate: ApprovedRate | null | undefined,
): number | null {
  return rate?.approved === true &&
    Number.isFinite(rate.amount) &&
    rate.amount >= 0
    ? rate.amount
    : null;
}
