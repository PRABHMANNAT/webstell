'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useInViewport } from './useInViewport';

const slides = [
  {
    image: '/assets/hero-projects/kuvat.png',
    title: 'Kuvat.',
    category: 'CREATIVE STUDIO',
    description: 'A bold introduction for a brand with something to say.',
  },
  {
    image: '/assets/hero-projects/hedvig.png',
    title: 'Hedvig',
    category: 'DIGITAL PRODUCT',
    description: 'A thoughtful product, introduced with colour and character.',
  },
  {
    image: '/assets/hero-projects/interiors.png',
    title: 'Made for living',
    category: 'HOME & INTERIORS',
    description: 'A considered collection, made easy to explore.',
  },
  {
    image: '/assets/hero-projects/roofex.png',
    title: 'Roofex',
    category: 'BUSINESS WEBSITE',
    description: 'Clear services and a simple path from visitor to enquiry.',
  },
  {
    image: '/assets/hero-projects/anclote.png',
    title: 'Anclote',
    category: 'REAL ESTATE',
    description: 'A property experience that lets the spaces do the talking.',
  },
  {
    image: '/assets/hero-projects/cafes.png',
    title: 'Cafés of India',
    category: 'EDITORIAL & DISCOVERY',
    description: 'Local stories, good coffee, and places worth finding.',
  },
  {
    image: '/assets/hero-projects/config.png',
    title: 'Config',
    category: 'EVENT WEBSITE',
    description: 'Big ideas meet a confident, energetic event experience.',
  },
  {
    image: '/assets/hero-projects/whimsy.png',
    title: 'Whimsy’s',
    category: 'FOOD & HOSPITALITY',
    description: 'An appetite-first website that brings people to the table.',
  },
];

export default function HeroProjects() {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { ref, isInViewport } = useInViewport<HTMLElement>();
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!isInViewport || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((index) => (index + 1) % slides.length);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isInViewport, reducedMotion]);
  const slide = slides[active];
  return (
    <article
      ref={ref}
      className="hero-projects"
      aria-label="Website design showcase"
      aria-roledescription="carousel"
    >
      <div className="project-window-bar">
        <span>
          <i />
          <i />
          <i />
        </span>
        <small>PREVIOUS DIRECTIONS</small>
        <ArrowUpRight size={16} />
      </div>
      <div className="hero-project-image">
        {slides.map((item, index) => (
          <img
            key={item.image}
            src={item.image}
            alt={
              index === active ? `${item.title} website design reference` : ''
            }
            aria-hidden={index !== active}
            className={index === active ? 'is-active' : ''}
            fetchPriority={index === 0 ? 'high' : 'auto'}
          />
        ))}
      </div>
      <div className="hero-project-caption" key={slide.title}>
        <span>
          {slide.category} <small>INDEPENDENT REFERENCE · NOT CLIENT WORK</small>
        </span>
        <h2>{slide.title}</h2>
        <p>{slide.description}</p>
      </div>
    </article>
  );
}
