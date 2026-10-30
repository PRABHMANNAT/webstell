'use client';

import { ArrowRight, Check } from 'lucide-react';
import { useRegion } from '../RegionProvider';
import { formatMoney } from '../../lib/region';
import { approvedAmount, regionalPrices } from './approved-rates';
import { estimateDelivery } from '../pricing-data';
import { getPackageCategory, includedExtras, type Tier } from './packages';

const tiers = ['starter', 'growth', 'custom'] as const;
const tierNames = { starter: 'Starter', growth: 'Growth', custom: 'Custom' };
const tierNotes = {
  starter: 'A focused first step',
  growth: 'More room to grow',
  custom: 'Shaped around your idea',
};

export default function PackageComparison({
  category,
  selectedTier,
  onChoose,
}: {
  category: string;
  selectedTier: Tier;
  onChoose: (tier: Tier) => void;
}) {
  const current = getPackageCategory(category);
  const { currency, ready } = useRegion();
  const plans = tiers.map((tier, index) => {
    const amount =
      tier === 'custom'
        ? null
        : approvedAmount(
            regionalPrices[currency].packages[`${category}:${tier}`],
          );
    const delivery =
      tier === 'custom'
        ? 'Agreed after discovery'
        : estimateDelivery(category, includedExtras(category, tier), 0);
    const range =
      tier === 'custom' ? null : delivery.match(/\d+/g)?.map(Number) || null;
    return {
      tier,
      name: tierNames[tier],
      note: tierNotes[tier],
      scope:
        index === 2
          ? 'Complex needs, a new product or a tailored roadmap.'
          : current.scope[index],
      features:
        index === 2
          ? [
              'Discovery and requirements workshop',
              'Bespoke scope and integrations',
              'Agreed delivery and support plan',
            ]
          : current.features[index],
      price: !ready
        ? 'Preparing…'
        : amount === null
          ? 'Written quote'
          : `From ${formatMoney(amount, currency)}`,
      delivery,
      range,
    };
  });
  const timelineMax = Math.max(...plans.map((plan) => plan.range?.[1] || 0));
  const deliveryBar = (range: number[] | null) =>
    range && (
      <div className="delivery-range" aria-hidden="true">
        <span style={{ width: `${(range[1] / timelineMax) * 100}%` }}>
          <i style={{ width: `${(range[0] / range[1]) * 100}%` }} />
        </span>
      </div>
    );
  const select = (tier: Tier) => {
    if (tier !== selectedTier) onChoose(tier);
    document.getElementById('calculator')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
      block: 'start',
    });
  };
  const chooseButton = (tier: Tier) => (
    <button
      type="button"
      className={`plan-choose${tier === selectedTier ? ' is-current' : ''}`}
      aria-pressed={tier === selectedTier}
      aria-label={
        tier === selectedTier
          ? `${tierNames[tier]} selected, customize your brief`
          : `Choose ${tierNames[tier]}`
      }
      onClick={() => select(tier)}
    >
      {tier === selectedTier ? (
        <>
          <Check size={16} aria-hidden="true" /> Selected
        </>
      ) : (
        <>
          Choose {tierNames[tier]} <ArrowRight size={16} aria-hidden="true" />
        </>
      )}
    </button>
  );

  return (
    <div className="plan-comparison">
      <div className="comparison-desktop">
        <table>
          <caption className="sr-only">
            Compare {current.label} packages. Timelines are indicative and the
            final price is agreed in writing.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="comparison-intro-cell">
                <span>FIND YOUR FIT</span>
                <p>
                  Start with the scope
                  <br />
                  that suits you.
                </p>
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.tier}
                  scope="col"
                  className={plan.tier === selectedTier ? 'chosen-column' : ''}
                >
                  <span className="plan-note">{plan.note}</span>
                  <h3>{plan.name}</h3>
                  <span className="plan-rate">{plan.price}</span>
                  <small>
                    {currency} ·{' '}
                    {current.recurring
                      ? 'monthly engagement'
                      : 'one-time project'}
                  </small>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Best for</th>
              {plans.map((plan) => (
                <td key={plan.tier}>{plan.scope}</td>
              ))}
            </tr>
            <tr>
              <th scope="row">What you get</th>
              {plans.map((plan) => (
                <td key={plan.tier}>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Check size={15} aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row">
                {category === 'seo'
                  ? 'Initial audit planning'
                  : 'Starting delivery range'}
                <small>Confirmed in your proposal</small>
                <small>Bar scale: 0–{timelineMax} weeks</small>
              </th>
              {plans.map((plan) => (
                <td key={plan.tier} className="plan-delivery">
                  {plan.delivery}
                  {deliveryBar(plan.range)}
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row">Next step</th>
              {plans.map((plan) => (
                <td key={plan.tier}>{chooseButton(plan.tier)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="comparison-mobile">
        {plans.map((plan) => (
          <article
            key={plan.tier}
            className={
              plan.tier === selectedTier
                ? 'plan-mobile is-current'
                : 'plan-mobile'
            }
          >
            <div className="plan-mobile-title">
              <div>
                <span className="plan-note">{plan.note}</span>
                <h3>{plan.name}</h3>
              </div>
              {plan.tier === selectedTier && (
                <span className="plan-selected-label">
                  <Check size={13} aria-hidden="true" /> Selected
                </span>
              )}
            </div>
            <p className="plan-mobile-scope">{plan.scope}</p>
            <strong className="plan-rate">{plan.price}</strong>
            <small>
              {currency} ·{' '}
              {current.recurring ? 'monthly engagement' : 'one-time project'}
            </small>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={15} aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <p className="plan-mobile-delivery">
              {plan.delivery}
              <span>
                {category === 'seo'
                  ? 'Initial audit planning'
                  : 'Indicative delivery'}
              </span>
            </p>
            {chooseButton(plan.tier)}
          </article>
        ))}
      </div>
    </div>
  );
}
