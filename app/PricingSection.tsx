'use client';
import SiteLink from './SiteLink';
import { ArrowUpRight, Check } from 'lucide-react';
import { useRegion } from './RegionProvider';
import { formatMoney } from '../lib/region';
import { approvedAmount, regionalPrices } from './pricing/approved-rates';
import {
  getPackageCategory,
  includedExtras,
  type Tier,
} from './pricing/packages';

export default function PricingSection({
  category = 'website',
  onChoose,
}: {
  category?: string;
  onChoose: (type: string, extras: string[], tier: Tier) => void;
}) {
  const current = getPackageCategory(category);
  const { currency, ready } = useRegion();
  return (
    <section className="package-section" aria-labelledby="packages-title">
      <div className="package-heading">
        <h2 id="packages-title">{current.headline}</h2>
        <p>
          Choose a starting scope. We agree the detail and price with you before
          work begins.
        </p>
      </div>
      <div className="agency-packages">
        {(['starter', 'growth', 'custom'] as const).map((tier, index) => {
          const rate =
            !ready || tier === 'custom'
              ? null
              : approvedAmount(
                  regionalPrices[currency].packages[`${category}:${tier}`],
                );
          const features =
            index === 2
              ? [
                  'Discovery and requirements workshop',
                  'Bespoke scope, architecture and integrations',
                  'Agreed delivery, ownership and support plan',
                ]
              : current.features[index];
          return (
            <article
              className={`agency-package ${tier === 'growth' ? 'is-growth' : ''}`}
              key={tier}
            >
              <div className="package-top">
                <span>0{index + 1}</span>
                <small>
                  {tier === 'growth'
                    ? 'ROOM TO GROW'
                    : tier === 'custom'
                      ? 'SHAPED AROUND YOU'
                      : 'A FOCUSED START'}
                </small>
              </div>
              <h3>{tier[0].toUpperCase() + tier.slice(1)}</h3>
              <p className="package-scope">
                {index === 2
                  ? 'A tailored solution for complex requirements'
                  : current.scope[index]}
              </p>
              <div className="package-price">
                {rate === null
                  ? 'Let’s scope it'
                  : `From ${formatMoney(rate, currency)}`}
                <small>
                  {current.recurring
                    ? 'Recurring monthly engagement'
                    : 'One-time project fee'}{' '}
                  · {currency}
                </small>
              </div>
              <ul>
                {features.map((feature) => (
                  <li key={feature}>
                    <Check size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="package-cost-note">
                {current.recurring
                  ? 'Initial setup and any additional content are scoped separately.'
                  : 'Hosting, licences, AI usage and optional ongoing care are quoted separately.'}
              </p>
              <SiteLink
                className="agency-button"
                href="#calculator"
                onClick={() =>
                  onChoose(category, includedExtras(category, tier), tier)
                }
              >
                Build my {tier} brief <ArrowUpRight size={18} />
              </SiteLink>
            </article>
          );
        })}
      </div>
    </section>
  );
}
