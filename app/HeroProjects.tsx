'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Pause, Play } from 'lucide-react';

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
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (paused || hovered || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((index) => (index + 1) % slides.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [paused, hovered, reducedMotion]);
  const slide = slides[active];
  return (
    <article
      className="hero-projects"
      aria-label="Website design showcase"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setHovered(false);
      }}
    >
      <div className="project-window-bar">
        <span>
          <i />
          <i />
          <i />
        </span>
        <small>THE POSSIBILITY EDIT</small>
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
          {slide.category} <small>DESIGN REFERENCE</small>
        </span>
        <h2>{slide.title}</h2>
        <p>{slide.description}</p>
      </div>
      <div className="hero-project-controls">
        <span className="slide-count">
          0{active + 1}
          <i> / 08</i>
        </span>
        <div className="slide-dots">
          {slides.map((item, index) => (
            <button
              key={item.title}
              aria-label={`Show ${item.title}`}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
        <button
          className="slide-pause"
          aria-label={
            paused || reducedMotion
              ? 'Play project slideshow'
              : 'Pause project slideshow'
          }
          onClick={() => {
            setPaused(!(paused || reducedMotion));
            setReducedMotion(false);
          }}
        >
          {paused || reducedMotion ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>
    </article>
  );
}
