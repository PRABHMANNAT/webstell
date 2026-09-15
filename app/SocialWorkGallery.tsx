'use client';

import { useState } from 'react';
import ViewportVideo from './ViewportVideo';
import { serviceOverview } from './service-overview-data';

export default function SocialWorkGallery() {
  const [active, setActive] = useState(0);
  const current = serviceOverview[active];
  const move = (direction: number) => setActive(value => (value + direction + serviceOverview.length) % serviceOverview.length);

  return (
    <section className="social-work service-gallery" aria-labelledby="social-work-title">
      <header className="featured-design-heading wrap">
        <span>WEBSTELL / SERVICES IN MOTION</span>
        <h2 id="social-work-title">See what we can build.</h2>
        <p>Six ways to bring your business forward. Choose a service and take a closer look.</p>
      </header>
      <div className="service-gallery-layout wrap">
        <nav className="service-gallery-menu" aria-label="Choose a service preview">
          {serviceOverview.map((service, index) => (
            <button type="button" key={service.slug} onClick={() => setActive(index)} aria-pressed={index === active}>
              <span>0{index + 1}</span>{service.title}<span aria-hidden="true">↗</span>
            </button>
          ))}
        </nav>
        <article className="social-post">
          <header>
            <span className="social-avatar" aria-hidden="true"><img src="/assets/brand/webstell-retro-mac.png" alt="" /></span>
            <strong>WEBSTELL</strong>
            <span className="service-gallery-count">0{active + 1} / 06</span>
          </header>
          <div className="service-gallery-video">
            <ViewportVideo key={current.video} src={current.video} loop controls aria-label={current.title + ' service video'} />
          </div>
          <footer>
            <div className="service-gallery-copy" aria-live="polite">
              <h3>{current.title}</h3>
              <p>{current.description}</p>
            </div>
            <div className="service-gallery-bottom">
              <a href={`/services#${current.slug}`}>Explore {current.title.toLowerCase()} <span aria-hidden="true">↗</span></a>
              <div className="service-gallery-arrows">
                <button type="button" aria-label="Previous service" onClick={() => move(-1)}>←</button>
                <button type="button" aria-label="Next service" onClick={() => move(1)}>→</button>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </section>
  );
}
