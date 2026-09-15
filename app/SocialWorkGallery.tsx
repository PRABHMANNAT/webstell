'use client';

import { useEffect, useRef, useState } from 'react';
import ViewportVideo from './ViewportVideo';
import { serviceOverview } from './service-overview-data';
import { useInViewport } from './useInViewport';

const services = serviceOverview;

export default function SocialWorkGallery() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const { ref, isInViewport } = useInViewport<HTMLElement>();

  useEffect(() => {
    if (!isInViewport || paused || interactionPaused || focusPaused || isHolding || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % services.length), 2000);
    return () => window.clearInterval(timer);
  }, [isInViewport, paused, interactionPaused, focusPaused, isHolding]);

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
        <span>WEBSTELL / 06 SERVICES</span>
        <h2 id="social-work-title" className="animated-heading"><span>See what we can build.</span></h2>
        <p>Websites, online stores, software, apps, automation and brand systems—made to help your business move forward.</p>
        <button type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused}>{paused ? 'Play showcase' : 'Pause showcase'}</button>
      </header>
      <div className="social-work-stage" onPointerEnter={() => setInteractionPaused(true)} onPointerLeave={() => setInteractionPaused(false)} onFocusCapture={() => setFocusPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setFocusPaused(false); }}>
        {services.map((service, index) => (
          <button type="button" key={service.slug} className={`social-preview social-preview-${positionFor(index)}`} aria-label={`Show ${service.title}`} onClick={() => setActive(index)}>
            <ViewportVideo src={service.video} loop aria-hidden="true" tabIndex={-1} />
          </button>
        ))}
        <article className="social-post" aria-live="polite" onPointerDown={holdCard} onPointerUp={releaseCard} onPointerCancel={() => { pointerStart.current = null; setIsHolding(false); }}>
          <header><span className="social-avatar" aria-hidden="true"><img src="/assets/brand/webstell-retro-mac.png" alt="" /></span><strong>WEBSTELL</strong><span className="service-post-count">{String(active + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}</span></header>
          <div className="social-post-image service-post-video">
            <ViewportVideo key={current.video} src={current.video} loop aria-label={`${current.title} service video`} />
          </div>
          <footer>
            <div className="social-footer-meta"><span className="social-count"><i aria-hidden="true">✦</i> SERVICE {String(active + 1).padStart(2, '0')}</span></div>
            <div className="social-footer-copy"><p><span>{current.detail}</span><strong>{current.title}</strong></p><a href={`/services#${current.slug}`}>Explore service <i aria-hidden="true">↗</i></a></div>
          </footer>
        </article>
      </div>
    </section>
  );
}
