'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ViewportVideo from './ViewportVideo';

type OfferService = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  supportingImage?: string;
  video?: string;
  imageAlt: string;
  fit?: 'contain';
};

const offerServices: OfferService[] = [
  {
    slug: 'website-design-development',
    title: 'Website Design & Development',
    description: 'Clear, fast websites that explain your value, build trust and turn visits into useful enquiries.',
    tags: ['Strategy', 'Content structure', 'UI/UX', 'Responsive development', 'Search foundations'],
    video: '/assets/service-website-design-reel.mp4',
    imageAlt: 'Website design and development animation',
  },
  {
    slug: 'ecommerce-online-stores',
    title: 'Ecommerce & Online Stores',
    description: 'Shopping experiences that make products easy to discover and buying feel straightforward.',
    tags: ['Product catalogue', 'Cart and checkout', 'Payments', 'Shipping setup', 'Store management'],
    video: '/assets/service-ecommerce.mp4',
    imageAlt: 'Ecommerce and online stores showreel',
  },
  {
    slug: 'custom-software',
    title: 'Custom Software',
    description: 'Focused dashboards, portals and internal tools built around how your team actually works.',
    tags: ['Product planning', 'Interface design', 'Development', 'Integrations', 'Deployment'],
    video: '/assets/service-software-automation.mp4',
    imageAlt: 'Custom software dashboard showreel',
  },
  {
    slug: 'mobile-apps',
    title: 'Mobile Apps',
    description: 'Practical mobile experiences designed for real daily use on Android and iOS.',
    tags: ['Product flow', 'UI/UX', 'Development', 'Testing', 'Launch support'],
    video: '/assets/service-mobile-apps.mp4',
    imageAlt: 'Mobile app development showreel',
  },
  {
    slug: 'ai-chatbots-automation',
    title: 'AI Chatbots & Automation',
    description: 'Useful AI systems that answer questions, qualify leads and reduce repetitive work without making the customer experience feel robotic.',
    tags: ['Knowledge assistants', 'Web & WhatsApp chat', 'Workflow automation', 'API integrations'],
    video: '/assets/service-chatbot.mp4',
    imageAlt: 'AI chatbot and workflow automation showreel',
  },
  {
    slug: 'brand-identity-ui-ux',
    title: 'Brand Identity & UI/UX',
    description: 'A visual and interface system that makes your business easier to recognise, understand and trust.',
    tags: ['Visual direction', 'Design system', 'Web and app UI', 'Prototypes', 'Handover'],
    video: '/assets/service-brand-uiux.mp4',
    imageAlt: 'Brand identity and UI UX motion showcase',
  },
];

export default function ServiceShowcase() {
  const [activeOffer, setActiveOffer] = useState(0);
  const scrollZone = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateFromScroll = () => {
      if (window.innerWidth <= 920 || !scrollZone.current) return;
      const rect = scrollZone.current.getBoundingClientRect();
      const trigger = window.innerHeight * 0.28;
      if (rect.top > trigger || rect.bottom < window.innerHeight * 0.62) return;
      const travel = Math.max(rect.height - window.innerHeight * 0.72, 1);
      const progress = Math.min(0.999, Math.max(0, (trigger - rect.top) / travel));
      setActiveOffer(Math.floor(progress * offerServices.length));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateFromScroll);
    };

    updateFromScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const service = offerServices[activeOffer];

  return (
    <section className="offer-showcase" id="services" aria-labelledby="offer-title">
      <div className="services-marquee" aria-hidden="true">
        <div className="services-marquee-track">
          <span>Services <i>✳</i> Services <i>✳</i></span>
          <span>Services <i>✳</i> Services <i>✳</i></span>
        </div>
      </div>
      <div className="offer-heading wrap">
        <span className="offer-badge"><span aria-hidden="true">◫</span> Services</span>
        <h2 id="offer-title">What can we build for you?</h2>
        <p>Websites, online stores and software for businesses across India and around the world. One team connecting design, technology and your goals.</p>
      </div>

      <div className="showreel service-showreel wrap">
        <ViewportVideo src="/assets/short.mp4" loop playOnHover aria-label="WEBSTELL studio showreel" />
      </div>

      <div className="offer-scroll-zone" ref={scrollZone}>
        <div className="offer-panel wrap">
          <nav className="offer-list" aria-label="WEBSTELL services">
            <p className="offer-scroll-label">Scroll to explore <span aria-hidden="true">↓</span></p>
            {offerServices.map((item, index) => (
              <Link
                key={item.title}
                className={activeOffer === index ? 'is-active' : ''}
                href={`/services#${item.slug}`}
                onFocus={() => setActiveOffer(index)}
                onPointerEnter={() => setActiveOffer(index)}
                aria-current={activeOffer === index ? 'page' : undefined}
              >
                <span>0{index + 1}</span>
                {item.title}
                <i aria-hidden="true">↗</i>
              </Link>
            ))}
            <div className="offer-progress" aria-hidden="true">
              {offerServices.map((item, index) => <i key={item.title} className={activeOffer === index ? 'is-active' : ''} />)}
            </div>
          </nav>

          <article className="offer-detail" aria-live="polite" key={activeOffer}>
            <div className={`offer-media${service.fit === 'contain' ? ' is-contain' : ''}`}>
              {service.video ? (
                <ViewportVideo src={service.video} loop playOnHover aria-label={service.imageAlt} />
              ) : (
                <img src={service.image} alt={service.imageAlt} />
              )}
              {service.supportingImage && (
                <div className="offer-supporting-image">
                  <img src={service.supportingImage} alt="Hiking website interface design" />
                </div>
              )}
              <div className="offer-media-shade" aria-hidden="true" />
            </div>

            <div className="offer-detail-top">
              <span>WEBSTELL / 0{activeOffer + 1}</span>
              <Link href="/services" className="offer-all-services">Explore all services <i aria-hidden="true">↗</i></Link>
            </div>

            <div className="offer-glass-copy">
              <span className="offer-glass-index">0{activeOffer + 1} / 0{offerServices.length}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="offer-tags">
                {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <Link className="offer-service-link" href={`/services#${service.slug}`}>
                Explore this service <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
