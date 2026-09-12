'use client';

import { useEffect, useRef, useState } from 'react';

type OfferService = {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  video?: string;
  imageAlt: string;
  fit?: 'contain';
};

const offerServices: OfferService[] = [
  {
    title: 'Website Design & Development',
    description: 'A distinctive, high-performing website that makes your business easy to understand, trust and contact.',
    tags: ['Business websites', 'Mobile-first design', 'Search-ready foundations'],
    video: '/assets/service-website-design.mp4',
    imageAlt: 'Website design and development showreel',
  },
  {
    title: 'Ecommerce & Online Stores',
    description: 'Product-led storefronts that make discovery feel effortless and turn attention into confident purchases.',
    tags: ['Online stores', 'Payments & shipping', 'Product management'],
    video: '/assets/service-ecommerce.mp4',
    imageAlt: 'Ecommerce and online stores showreel',
  },
  {
    title: 'Brand Identity & UI/UX',
    description: 'A recognisable visual language and an interface system designed to stay clear across every customer touchpoint.',
    tags: ['Visual identity', 'Website & app design', 'Interactive prototypes'],
    video: '/assets/service-brand-uiux.mp4',
    imageAlt: 'Brand identity and UI UX motion showcase',
  },
  {
    title: 'Software & Automation',
    description: 'Useful digital products, customer portals and automations that simplify complex work for your team.',
    tags: ['Custom software', 'AI & workflows', 'API integrations'],
    video: '/assets/service-software-automation.mp4',
    imageAlt: 'Software and automation showreel',
  },
];

export default function ServiceShowcase({ onContact }: { onContact: () => void }) {
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
      <div className="offer-heading wrap">
        <span className="offer-badge"><span aria-hidden="true">◫</span> Services</span>
        <h2 id="offer-title">What can we build for you?</h2>
        <p>Websites, online stores and software for businesses across India and around the world. One team connecting design, technology and your goals.</p>
      </div>

      <div className="showreel service-showreel wrap">
        <video src="/assets/short.mp4" autoPlay muted playsInline loop controls aria-label="WEBSTELL studio showreel" />
      </div>

      <div className="offer-scroll-zone" ref={scrollZone}>
        <div className="offer-panel wrap">
          <div className="offer-list" role="tablist" aria-label="WEBSTELL services">
            <p className="offer-scroll-label">Scroll to explore <span aria-hidden="true">↓</span></p>
            {offerServices.map((item, index) => (
              <button
                key={item.title}
                className={activeOffer === index ? 'is-active' : ''}
                onClick={() => setActiveOffer(index)}
                role="tab"
                aria-selected={activeOffer === index}
                aria-controls="offer-detail"
              >
                <span>0{index + 1}</span>
                {item.title}
                <i aria-hidden="true">↗</i>
              </button>
            ))}
            <div className="offer-progress" aria-hidden="true">
              {offerServices.map((item, index) => <i key={item.title} className={activeOffer === index ? 'is-active' : ''} />)}
            </div>
          </div>

          <article className="offer-detail" id="offer-detail" role="tabpanel" aria-live="polite" key={activeOffer}>
            <div className={`offer-media${service.fit === 'contain' ? ' is-contain' : ''}`}>
              {service.video ? (
                <video src={service.video} autoPlay muted loop playsInline preload="metadata" aria-label={service.imageAlt} />
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
              <button onClick={onContact}>Start a project <i aria-hidden="true">↗</i></button>
            </div>

            <div className="offer-glass-copy">
              <span className="offer-glass-index">0{activeOffer + 1} / 0{offerServices.length}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="offer-tags">
                {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
