import { projectTypes, extras } from './pricing-scope';
import {
  approvedAmount,
  regionalPrices,
  type Pricebook,
} from './pricing/approved-rates';
import { includedExtras, type Tier } from './pricing/packages';
import { formatMoney, type Currency } from '../lib/region';
export { projectTypes, extras } from './pricing-scope';
export type { ProjectTypeId } from './pricing-scope';
export const money = (value: number, currency: Currency = 'USD') =>
  formatMoney(value, currency);
export const MAX_EXTRA_UNITS = 24;
export function getProjectType(id: string) {
  return projectTypes.find((item) => item.id === id) ?? projectTypes[0];
}
export function getAvailableExtras(type: string) {
  const id = getProjectType(type).id;
  return extras.filter((item) =>
    (item.availableFor as readonly string[]).includes(id),
  );
}
export function normalizeUnits(value: number) {
  return Number.isFinite(value)
    ? Math.min(MAX_EXTRA_UNITS, Math.max(0, Math.floor(value)))
    : 0;
}
export function estimateDelivery(
  type: string,
  selected: string[],
  extraUnits: number,
) {
  const project = getProjectType(type);
  const effort = getAvailableExtras(type)
    .filter((item) => selected.includes(item.id))
    .reduce((sum, item) => sum + item.effort, 0);
  const weeks =
    Math.ceil(effort / 3) + Math.ceil(normalizeUnits(extraUnits) / 6);
  return `${project.delivery[0] + weeks}–${project.delivery[1] + weeks} weeks`;
}
export function calculateEstimate(
  type: string,
  selected: string[],
  ownDomain: boolean,
  extraUnits: number,
  currency: Currency = 'USD',
  tier: Tier = 'starter',
  pricebook: Pricebook = regionalPrices,
) {
  const project = getProjectType(type);
  const market = pricebook[currency];
  const included = includedExtras(project.id, tier);
  const additions = getAvailableExtras(type)
    .filter((item) => selected.includes(item.id))
    .map((item) => ({
      ...item,
      included: included.includes(item.id),
      price: included.includes(item.id)
        ? 0
        : approvedAmount(market.extras[item.id]),
    }));
  const units = normalizeUnits(extraUnits);
  const basePrice =
    tier === 'custom'
      ? null
      : approvedAmount(market.packages[`${project.id}:${tier}`]);
  const unitRate = approvedAmount(market.extraUnits[project.id]);
  const unitCost =
    units === 0 ? 0 : unitRate === null ? null : unitRate * units;
  const domainSaving =
    ownDomain && project.domainEligible
      ? approvedAmount(market.domainCredit)
      : 0;
  const complete =
    basePrice !== null &&
    unitCost !== null &&
    domainSaving !== null &&
    additions.every((item) => item.price !== null);
  const total = complete
    ? Math.max(
        0,
        basePrice! +
          unitCost! +
          additions.reduce((sum, item) => sum + (item.price ?? 0), 0) -
          domainSaving!,
      )
    : null;
  return {
    project,
    additions,
    basePrice,
    unitCost,
    extraUnits: units,
    domainSaving,
    total,
    deposit: null,
    delivery: estimateDelivery(type, selected, units),
  };
}
