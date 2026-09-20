'use client';

import { useState } from 'react';
import Link from '../SiteLink';
import { HireDialog } from '../StudioNav';

export default function AboutCallToAction() {
  const [hireOpen, setHireOpen] = useState(false);

  return (
    <>
      <section className="about-next studio-width" aria-labelledby="about-next-title">
        <div className="about-next-content">
          <span>READY TO MOVE?</span>
          <h2 id="about-next-title">Build the next thing people choose.</h2>
          <p className="about-next-copy">Bring the idea, roadblock or ambition. We’ll shape a clear digital next step that earns attention, builds trust and is ready to grow.</p>
          <div className="about-next-actions">
            <button
              type="button"
              className="about-primary"
              onClick={() => setHireOpen(true)}
            >
              <span>Start a conversation</span>
              <i aria-hidden="true">↗</i>
            </button>
            <Link className="about-secondary" href="/projects">
              <span>Explore our work</span>
              <i aria-hidden="true">↗</i>
            </Link>
          </div>
        </div>
      </section>
      <HireDialog open={hireOpen} onOpenChange={setHireOpen} />
    </>
  );
}
