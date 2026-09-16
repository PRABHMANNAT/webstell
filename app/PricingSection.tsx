'use client';


const plans = [
  {
    name: 'A strong first impression.',
    priceLabel: '₹20,000–25,000',
    audience: 'For salons, local cafés, small restaurants, tutors and independent service businesses.',
    description:
      'Help people understand your services, find your business and contact you in a few taps.',
    features: [
      'Show your services, prices, photos and story across up to five pages.',
      'Easy-to-read layouts on phones, tablets and computers.',
      'A contact form sends enquiries to your email; a WhatsApp button opens a chat.',
      'Page titles and descriptions help search engines understand your business.',
      'We publish the website and show you where your accounts and access live.',
    ],
    delivery: 'Usually 2–3 weeks',
    type: 'website',
    extras: [] as string[],
    tone: 'starter',
    badge: undefined,
  },
  {
    name: 'Yours to keep fresh.',
    priceLabel: '₹27,000–35,000',
    audience: 'For busy restaurants, clinics, growing salons and teams that change offers or services often.',
    description:
      'Keep menus, offers and photos up to date without asking a developer for every small change.',
    features: [
      'Includes the starter website, contact form, WhatsApp link and mobile layouts.',
      'Log in to change agreed text, photos, services or menu items yourself.',
      'An organised editing dashboard makes everyday updates easy to find.',
      'A guided walkthrough teaches your team how to make and publish changes.',
      'We agree on the editable areas before building so you know what you control.',
    ],
    delivery: 'Usually 3–4 weeks',
    type: 'website',
    extras: ['cms'],
    tone: 'popular',
    badge: 'Most flexible',
  },
  {
    name: 'Open for business.',
    priceLabel: '₹54,900',
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
    priceLabel: '₹65,000–1,00,000',
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
                  <strong>{plan.priceLabel}</strong>
                  <span>one-time project estimate · final scope agreed together</span>
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
