'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ViewportVideo from './ViewportVideo';
import { serviceOverview } from './service-overview-data';
import { useInViewport } from './useInViewport';

const services = serviceOverview;

export default function SocialWorkGallery() {
  const [active, setActive] = useState(0);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const { ref, isInViewport } = useInViewport<HTMLElement>('300px 0px');

  useEffect(() => {
    if (!isInViewport || interactionPaused || focusPaused || isHolding || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % services.length), 2000);
    return () => window.clearInterval(timer);
  }, [isInViewport, interactionPaused, focusPaused, isHolding]);

  const move = (direction: number) => setActive((current) => (current + direction + services.length) % services.length);
  const positionFor = (index: number) => {
    let distance = index - active;
    if (distance > services.length / 2) distance -= services.length;
    if (distance < -services.length / 2) distance += services.length;
    return Math.max(-2, Math.min(2, distance));
  };
  const current = services[active];
  const holdCard = (event: React.PointerEvent<HTMLElement>) => {
    pointerStart.current = event.clientX;
    setIsHolding(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const releaseCard = (event: React.PointerEvent<HTMLElement>) => {
    const start = pointerStart.current;
    const distance = start === null ? 0 : event.clientX - start;
    pointerStart.current = null;
    setIsHolding(false);
    if (Math.abs(distance) > 36) move(distance > 0 ? -1 : 1);
  };

  return (
    <section ref={ref} className="social-work service-social-gallery" id="service-previews" aria-labelledby="social-work-title">
      <header className="featured-design-heading wrap">
        <h2 id="social-work-title" className="animated-heading"><span>See what we can build.</span></h2>
        <p>Take a closer look at the services we create for growing businesses.</p>
      </header>
      <div className="social-work-stage" onPointerEnter={() => setInteractionPaused(true)} onPointerLeave={() => setInteractionPaused(false)} onFocusCapture={() => setFocusPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setFocusPaused(false); }}>
        {services.map((service, index) => {
          const position = positionFor(index);
          const isAdjacentPreview = Math.abs(position) === 1;

          return (
            <button type="button" key={service.slug} className={`social-preview social-preview-${position}`} aria-label={`Show ${service.title}`} onClick={() => setActive(index)}>
              <ViewportVideo src={isInViewport && isAdjacentPreview ? service.video : undefined} loop aria-hidden="true" tabIndex={-1} />
            </button>
          );
        })}
        <article className="social-post" aria-live="polite" onPointerDown={holdCard} onPointerUp={releaseCard} onPointerCancel={() => { pointerStart.current = null; setIsHolding(false); }}>
          <header><span className="social-avatar" aria-hidden="true"><Image src="/assets/brand/webstell-retro-mac.png" alt="" width={30} height={30} sizes="30px" unoptimized /></span><strong>WEBSTELL</strong><span className="service-post-count">{String(active + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}</span></header>
          <div className="social-post-image service-post-video">
            <ViewportVideo key={current.video} src={isInViewport ? current.video : undefined} loop aria-label={`${current.title} service video`} />
            <button className="social-prev" type="button" aria-label="Previous service" onPointerDown={(event) => event.stopPropagation()} onPointerUp={(event) => event.stopPropagation()} onClick={() => move(-1)}>‹</button>
            <button className="social-next" type="button" aria-label="Next service" onPointerDown={(event) => event.stopPropagation()} onPointerUp={(event) => event.stopPropagation()} onClick={() => move(1)}>›</button>
          </div>
          <footer className="service-card-footer">
            <h3>{current.title}</h3>
            <a href={`/services#${current.slug}`}>Explore service <i aria-hidden="true">→</i></a>
          </footer>
        </article>
        <p className="service-carousel-hint">Swipe or use arrows to explore.</p>
      </div>
    </section>
  );
}
