import { formatMoney, isCurrency, type Currency } from './region';
import { projectTypes } from '../app/pricing-scope';

export function readEnquiryContext(
  search: string,
  fallbackCurrency: Currency = 'USD',
) {
  const params = new URLSearchParams(search);
  const clean = (key: string, max = 160) =>
    (params.get(key) || '')
      .split('')
      .map((character) => (character.charCodeAt(0) < 32 ? ' ' : character))
      .join('')
      .trim()
      .slice(0, max);
  const rawProject = clean('project', 100);
  const project =
    projectTypes.find(
      (item) => item.id === rawProject || item.name === rawProject,
    )?.name || rawProject;
  const currency = isCurrency(params.get('currency'))
    ? (params.get('currency') as Currency)
    : fallbackCurrency;
  const rawEstimate = params.get('estimate');
  const amount =
    rawEstimate === null || rawEstimate.trim() === ''
      ? NaN
      : Number(rawEstimate);
  const estimateLabel =
    Number.isFinite(amount) && amount >= 0 && amount <= 10_000_000
      ? formatMoney(amount, currency)
      : '';
  const detail = clean('detail', 600);
  const packageName = clean('package', 30);
  const context = [
    project && `Project: ${project}`,
    packageName && `Package: ${packageName}`,
    `Quote currency: ${currency}`,
    clean('industry') && `Industry: ${clean('industry')}`,
    detail && `Goal: ${detail}`,
    clean('features', 1500) && `Capabilities: ${clean('features', 1500)}`,
    clean('units', 3) && `Additional scope units: ${clean('units', 3)}`,
    clean('domain', 40) && `Domain: ${clean('domain', 40)}`,
    estimateLabel &&
      `Indicative amount from enquiry link: ${estimateLabel}; final quote to be confirmed.`,
  ]
    .filter(Boolean)
    .join('\n');
  return {
    project,
    currency,
    detail,
    packageName,
    estimateLabel,
    context,
    hasContext: Boolean(project || detail),
  };
}
