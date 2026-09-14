'use client';

import { calculateEstimate, money } from './pricing-data';

const plans = [
  {
    name: 'A strong first impression.',
    audience: 'For a business, a service, or a point of view that deserves a clear home.',
    description:
      'A focused website designed to explain what you do and turn interest into a useful next step.',
    features: [
      'Five considered pages to start',
      'A great experience on mobile',
      'Contact form & WhatsApp link',
      'Search foundations & launch handover',
    ],
    delivery: 'Usually 2–3 weeks',
    type: 'website',
    extras: [] as string[],
    tone: 'starter',
    badge: undefined,
  },
  {
    name: 'Yours to keep fresh.',
    audience: 'For teams who want control of everyday updates without losing the craft.',
    description:
      'A business website with a tailored editing space and a proper walkthrough for your team.',
    features: [
      'Everything in a business website',
      'Update text and imagery yourself',
      'A clear content dashboard',
      'Walkthrough with your team',
    ],
    delivery: 'Usually 3–4 weeks',
    type: 'website',
    extras: ['cms'],
    tone: 'popular',
    badge: 'Most flexible',
  },
  {
    name: 'Open for business.',
    audience: 'For products ready to find their people and make buying feel effortless.',
    description:
      'A considered store experience built around product discovery, checkout and a confident launch.',
    features: [
      'Product catalogue & shopping cart',
      'Payment gateway integration',
      'Product management essentials',
      'Mobile shopping & launch handover',
    ],
    delivery: 'Usually 3–4 weeks',
    type: 'store',
    extras: ['payments'],
    tone: 'growth',
    badge: undefined,
  },
  {
    name: 'Build the useful thing.',
    audience: 'For teams ready to turn a workflow, service or idea into a digital product.',
    description:
      'A clear starting point for a focused dashboard, customer portal or custom web application.',
    features: [
      'A focused product journey',
      'Responsive interface design',
      'Thoughtful handover & support plan',
      'Scope shaped around your workflow',
    ],
    delivery: 'Usually 4–6 weeks',
    type: 'software',
    extras: [] as string[],
    tone: 'global',
    badge: undefined,
  },
] as const;

export default function PricingSection({
  onChoose,
}: {
  onChoose: (type: string, extras: string[]) => void;
}) {
  return (
    <section className="pricing pricing-showcase" aria-labelledby="pricing-title">
      <div className="pricing-marquee" aria-hidden="true">
        <div className="pricing-track">
          <span>
            Clear starts <i>✳</i> Room to grow <i>✳</i>
          </span>
          <span>
            Clear starts <i>✳</i> Room to grow <i>✳</i>
          </span>
        </div>
      </div>
      <div className="pricing-inner wrap">
        <header className="pricing-intro">
          <h2 id="pricing-title">Choose a good place to begin.</h2>
          <p>
            The right starting point makes the rest of the project feel
            simpler. Choose one, then shape the details in the calculator.
          </p>
        </header>

        <div className="pricing-grid">
          {plans.map((plan, index) => {
            const estimate = calculateEstimate(plan.type, [...plan.extras], false, 0);
            return (
              <article
                className={'pricing-card pricing-card-' + plan.tone}
                key={plan.name}
              >
                <div className="pricing-card-top">
                  <span className="pricing-index">0{index + 1}</span>
                  {plan.badge && (
                    <span className="pricing-badge">{plan.badge}</span>
                  )}
                </div>
                <h3>{plan.name}</h3>
                <div className="pricing-price">
                  <strong>{money(estimate.total)}</strong>
                  <span>starting estimate · one-time</span>
                </div>
                <p className="pricing-audience">{plan.audience}</p>
                <p className="pricing-description">{plan.description}</p>
                <div className="pricing-includes">
                  <span>What’s included</span>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="pricing-card-footer">
                  <p>
                    <span>Typical delivery</span>
                    <strong>{plan.delivery}</strong>
                  </p>
                  <a
                    href="#calculator"
                    onClick={() => onChoose(plan.type, [...plan.extras])}
                  >
                    <span aria-hidden="true">↗</span> Make this yours
                  </a>
                </div>
              </article>
            );
          })}
        </div>
        <p className="pricing-note">
          <strong>A note on estimates:</strong> these are one-time project starting points. Eligible website projects include a standard, non-premium domain allowance; hosting, taxes, third-party subscriptions and payment-provider fees are separate and confirmed in your final proposal.
        </p>
      </div>
    </section>
  );
}
