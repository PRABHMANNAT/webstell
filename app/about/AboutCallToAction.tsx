'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern';
import { HireDialog } from '../StudioNav';

export default function AboutCallToAction() {
  const [hireOpen, setHireOpen] = useState(false);

  return (
    <>
      <section className="about-next studio-width" aria-labelledby="about-next-title">
        <AnimatedGridPattern
          className="about-next-grid"
          duration={3}
          maxOpacity={0.1}
          numSquares={30}
          repeatDelay={1}
        />
        <div className="about-next-content">
          <span>HAVE SOMETHING IN MIND?</span>
          <h2 id="about-next-title">Let’s make the next move count.</h2>
          <div className="about-next-actions">
            <button
              type="button"
              className="about-primary"
              onClick={() => setHireOpen(true)}
            >
              <span>Discuss your project</span>
              <i aria-hidden="true">↗</i>
            </button>
            <Link className="about-secondary" href="/projects">
              <span>See our work</span>
              <i aria-hidden="true">↗</i>
            </Link>
          </div>
        </div>
      </section>
      <HireDialog open={hireOpen} onOpenChange={setHireOpen} />
    </>
  );
}
