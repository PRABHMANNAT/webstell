'use client';

import { useState } from 'react';
import StudioNav, { HireDialog } from '../StudioNav';
import SiteFooter from '../SiteFooter';
import ServiceShowcase from '../ServiceShowcase';
import SocialWorkGallery from '../SocialWorkGallery';
import './services.css';

const serviceList = [
  {
    id: 'website-design-development',
    title: 'Website design & development',
    intro: 'A modern website built from the ground up—or a complete redesign that brings an outdated site up to the level of your business.',
    details: ['Business and customer research', 'Page planning and content structure', 'Custom design for desktop and mobile', 'Website redesigns and content refreshes', 'Search-ready setup, testing and launch support'],
  },
  {
    id: 'ecommerce-online-stores',
    title: 'Ecommerce & online stores',
    intro: 'An online store that makes it easy for customers to find the right product, trust the purchase and check out with confidence.',
    details: ['Product catalogue and collection setup', 'Product pages that explain and persuade', 'Cart, checkout and payment setup', 'Shipping, stock and order management', 'Store training for your team'],
  },
  {
    id: 'custom-software',
    title: 'Custom software',
    intro: 'A focused digital tool built around the way your team already works, so less time is spent chasing information or repeating tasks.',
    details: ['Dashboards, portals and internal tools', 'Simple product planning and user flows', 'Useful integrations with your existing tools', 'Clear interface design and development', 'Testing, launch and team handover'],
  },
  {
    id: 'mobile-apps',
    title: 'Mobile apps',
    intro: 'A practical mobile app that feels simple from the first tap, whether it helps customers buy, book, learn or stay connected.',
    details: ['App idea, user journey and feature planning', 'Interface design for iOS and Android', 'Mobile app development', 'Real-device testing and quality checks', 'App-store launch support'],
  },
  {
    id: 'ai-chatbots-automation',
    title: 'AI chatbots & automation',
    intro: 'Helpful AI tools that answer routine questions, guide potential customers and take repetitive work off your team without losing the human touch.',
    details: ['Website and WhatsApp chat assistants', 'Lead capture and qualification', 'Knowledge bases your team can update', 'Automated follow-ups and workflows', 'Connections to the tools you already use'],
  },
  {
    id: 'brand-identity-ui-ux',
    title: 'Brand identity & UI/UX',
    intro: 'A clear, recognisable brand and digital design system that helps customers understand who you are and why they should choose you.',
    details: ['Brand direction, colours and typography', 'Logo and visual identity guidance', 'Website and app interface design', 'Clickable prototypes before development', 'Simple design system for future updates'],
  },
  {
    id: 'growth-seo-optimisation',
    title: 'Growth, SEO & optimisation',
    intro: 'A stronger foundation for showing up in search, understanding visitor behaviour and steadily improving the parts of your website that drive enquiries.',
    details: ['Technical SEO setup and fixes', 'Analytics and conversion tracking', 'Clearer calls to action and enquiry paths', 'Content priorities for search visibility', 'Ongoing performance improvements'],
  },
  {
    id: 'ongoing-support-evolution',
    title: 'Ongoing support & evolution',
    intro: 'Reliable support after launch, so your website or product stays secure, current and ready to keep up with your business.',
    details: ['Regular maintenance and security checks', 'Fast fixes when something needs attention', 'Content, feature and design updates', 'Performance monitoring', 'A practical roadmap for the next improvements'],
  },
];

export default function ServicesPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <StudioNav current="services" />
      <main className="services-page">
        <section className="services-page-hero studio-width" aria-labelledby="services-page-title">
          <h1 id="services-page-title" className="sr-only">WEBSTELL services</h1>
          <video className="services-page-hero-video" autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
            <source src="/assets/services/services-hero.mp4" type="video/mp4" />
          </video>
        </section>

        <ServiceShowcase />
        <SocialWorkGallery />

        <section className="services-explorer" aria-labelledby="services-explorer-title">
          <div className="services-explorer-content studio-width">
            <header className="services-explorer-intro">
              <span className="studio-eyebrow">THE WEBSTELL OFFER</span>
              <h2 id="services-explorer-title">Eight ways to make your next move matter.</h2>
              <p>Start with one focused need or combine the right pieces into a digital experience that earns attention, works harder and grows with your business.</p>
            </header>

            <div className="services-page-list" aria-label="WEBSTELL services">
              {serviceList.map((service) => (
                <article className="services-page-card" id={service.id} key={service.id}>
                  <h3>{service.title}</h3>
                  <p>{service.intro}</p>
                  <ul>
                    {service.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                  <button type="button" className="services-card-cta" onClick={() => setContactOpen(true)}>
                    Discuss this service
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <HireDialog open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
}
