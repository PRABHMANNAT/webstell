'use client';

import { useId, useState } from 'react';
import './industry-service-strip.css';

const labels = [
  'AI receptionists',
  'Cafés & restaurants',
  'Real estate',
  'Online stores',
  'AI chatbots',
  'Clinics',
  'Business automation',
  'Beauty & salons',
  'Australian tradies',
  'Dashboards & portals',
  'Jewellery & fashion',
  'Retail stores',
  'Custom software',
  'Hotels & stays',
  'Personal portfolios',
  'Furniture & home',
];

export default function IndustryServiceStrip() {
  const [paused, setPaused] = useState(false);
  const descriptionId = useId();

  return (
    <section
      className="industry-service-strip"
      aria-label="Services and industries"
    >
      <span className="sr-only" id={descriptionId}>
        {labels.join(', ')}.
      </span>
      <button
        type="button"
        className={`industry-strip-control${paused ? ' is-paused' : ''}`}
        aria-label={`${paused ? 'Resume' : 'Pause'} scrolling services and industries`}
        aria-describedby={descriptionId}
        aria-pressed={paused}
        onClick={() => setPaused((current) => !current)}
      >
        <span className="industry-strip-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <span className="industry-strip-set" key={copy}>
              {labels.map((label, index) => (
                <span
                  className={`industry-strip-word${index % 3 === 2 ? ' is-outline' : ''}`}
                  key={label}
                >
                  {label}
                  <i />
                </span>
              ))}
            </span>
          ))}
        </span>
      </button>
    </section>
  );
}
