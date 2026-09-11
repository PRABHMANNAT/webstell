'use client';

const plans = [
  {
    name: 'Starter Site',
    price: '₹10K–15K',
    audience: 'Best for cafés, salons, freelancers and local services launching online.',
    description: 'A focused website that helps people understand what you do, find you and enquire without friction.',
    features: ["Free standard domain for the first year*","Mobile-friendly design and SSL setup","WhatsApp, call and Google Maps links","Contact or enquiry form setup","Search titles and social sharing previews","Help connecting your hosting","Launch walkthrough and handover"],
    delivery: '7–10 working days',
    tone: 'starter',
  },
  {
    name: 'Business Site',
    price: '₹25K–35K',
    audience: 'Best for restaurants, content creators, clinics, consultants and growing local brands.',
    description: 'A complete online presence for businesses ready to look established and generate steady enquiries.',
    features: ["Everything in Starter Site","An easy-to-update blog, menu or portfolio","Appointment or reservation integration","Payment link or gateway setup*","Analytics and search engine tools","Branded forms and automated acknowledgements","Guidance for managing your own content"],
    delivery: '2–3 weeks',
    tone: 'popular',
    badge: 'Recommended',
  },
  {
    name: 'Growth Platform',
    price: '₹50K–55K',
    audience: 'Best for D2C brands, startups, real-estate teams, education and service companies.',
    description: 'A strategic website built to explain a bigger offer, capture qualified leads and support the way your team sells.',
    features: ["Everything in Business Site","Product catalogue and online checkout","Payment gateway and shipping integration*","Booking or lead follow-up automation","CRM or email marketing connection","Performance and technical SEO review","Reusable layouts for future updates"],
    delivery: '3–4 weeks',
    tone: 'growth',
  },
  {
    name: 'Global Standard',
    price: '₹70K–1L',
    audience: 'Best for funded startups, multi-location brands and businesses selling internationally.',
    description: 'A distinctive, scalable digital presence for teams that need global-level craft, complex journeys and room to grow.',
    features: ["Everything in Growth Platform","Custom visual system and art direction","Multi-language-ready content structure","International payment configuration*","Custom integrations agreed in your scope","Accessibility and cross-browser testing","Launch planning and team handover"],
    delivery: '4–6 weeks',
    tone: 'global',
  },
];

export default function PricingSection({onContact}:{onContact:()=>void}) {
  return (
    <section className="pricing" id="pricing" aria-labelledby="pricing-title">
      <div className="pricing-marquee" aria-label="Pricing">
        <div className="pricing-track">
          <span>Pricing <i aria-hidden="true">✳</i> Pricing <i aria-hidden="true">✳</i></span>
          <span aria-hidden="true">Pricing <i>✳</i> Pricing <i>✳</i></span>
        </div>
      </div>
      <div className="pricing-inner wrap">
        <header className="pricing-intro">
          <div>
            <span className="pricing-kicker"><i aria-hidden="true"></i> Pricing · one-time projects</span>
            <h2 id="pricing-title">Pick the website your next stage needs.</h2>
          </div>
          <p>No vague packages or monthly lock-ins. Choose the closest starting point and we’ll shape the final scope around your goals, content and customers.</p>
        </header>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <article className={`pricing-card pricing-card-${plan.tone}`} key={plan.name}>
              <div className="pricing-card-top">
                <span className="pricing-index">0{index + 1}</span>
                {plan.badge && <span className="pricing-badge">{plan.badge}</span>}
              </div>
              <h3>{plan.name}</h3>
              <div className="pricing-price"><strong>{plan.price}</strong><span>INR · one-time</span></div>
              <p className="pricing-audience">{plan.audience}</p>
              <p className="pricing-description">{plan.description}</p>
              <div className="pricing-includes">
                <span>What’s included</span>
                <ul>{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
              </div>
              <div className="pricing-card-footer">
                <p><span>Typical delivery</span><strong>{plan.delivery}</strong></p>
                <button type="button" onClick={onContact}><span aria-hidden="true">↗</span> Connect with us</button>
              </div>
            </article>
          ))}
        </div>
        <p className="pricing-note"><strong>Good to know:</strong> *A standard, non-premium domain is included for one year; extension and availability are agreed in your quote. Renewal, hosting, taxes where applicable, paid tools and payment-provider fees are separate. Gateway setup requires your approved merchant account. Features and delivery are confirmed in the written scope; content readiness can affect timing.</p>
      </div>
    </section>
  );
}
