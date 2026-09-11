'use client';

const plans = [
  {
    name: 'Starter Site',
    price: '₹10K–15K',
    audience: 'Best for cafés, salons, freelancers and local services launching online.',
    description: 'A sharp one-page website that helps people understand what you do, find you and enquire without friction.',
    features: [
      'One conversion-focused landing page',
      'Up to 6 thoughtfully arranged sections',
      'Mobile-first responsive development',
      'WhatsApp, call and Google Maps actions',
      'Contact or enquiry form',
      'Basic search and social setup',
      '1 focused revision round',
    ],
    delivery: '7–10 working days',
    tone: 'starter',
  },
  {
    name: 'Business Site',
    price: '₹25K–35K',
    audience: 'Best for restaurants, content creators, clinics, consultants and growing local brands.',
    description: 'A complete multi-page presence for businesses ready to look established and generate steady enquiries.',
    features: [
      'Up to 5 custom-designed pages',
      'Menu, services or portfolio structure',
      'Easy-to-update CMS or blog',
      'Forms, WhatsApp and social integrations',
      'Analytics and on-page SEO',
      'Subtle interactions that feel premium',
      '2 revision rounds',
    ],
    delivery: '2–3 weeks',
    tone: 'popular',
    badge: 'Most chosen',
  },
  {
    name: 'Growth Platform',
    price: '₹50K–55K',
    audience: 'Best for D2C brands, startups, real-estate teams, education and service companies.',
    description: 'A strategic website built to explain a bigger offer, capture qualified leads and support the way your team sells.',
    features: [
      'Up to 8 custom-designed pages',
      'Conversion strategy and user journeys',
      'Advanced motion and interactions',
      'CMS with reusable page sections',
      'Booking, lead or email automation',
      'Performance and technical SEO setup',
      '3 revision rounds',
    ],
    delivery: '3–4 weeks',
    tone: 'growth',
  },
  {
    name: 'Global Standard',
    price: '₹70K–1L',
    audience: 'Best for funded startups, multi-location brands and businesses selling internationally.',
    description: 'A distinctive, scalable digital presence for teams that need global-level craft, complex journeys and room to grow.',
    features: [
      'Custom design system and art direction',
      '10+ pages or complex user flows',
      'Multilingual-ready site structure',
      'Advanced motion and brand storytelling',
      'Custom tools and third-party integrations',
      'Accessibility and cross-browser QA',
      'Priority launch support',
    ],
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
        <p className="pricing-note"><strong>Good to know:</strong> Domain, hosting, paid plugins, photography and third-party subscriptions are quoted separately. Final pricing is confirmed after a short scope call.</p>
      </div>
    </section>
  );
}
