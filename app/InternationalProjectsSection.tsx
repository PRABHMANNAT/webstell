'use client';

import { useState } from 'react';
import Image from 'next/image';
import { HireDialog } from './StudioNav';

const internationalProjects = [
  { number: '01', title: 'Pear', location: 'Oslo, Norway', description: 'A growth-focused digital platform bringing search, custom software and commercial clarity into one confident customer journey.', image: '/assets/featured-projects/pear.png', url: 'https://pear.no/', tone: 'pear' },
  { number: '02', title: 'Araku Coffee', location: 'India / Global', description: 'A rich e-commerce experience connecting premium coffee, regenerative farming and the people behind every cup.', image: '/assets/featured-projects/araku-coffee.png', url: 'https://www.arakucoffee.in/', tone: 'araku' },
  { number: '03', title: 'Eclipse Space', location: 'United States / Global', description: 'A clear product experience that makes sophisticated space infrastructure easier for global partners to understand and act on.', image: '/assets/featured-projects/eclipse-space-orbit.png', url: 'https://www.eclipse.space/', tone: 'eclipse' },
];

export default function InternationalProjectsSection() {
  const [hireOpen, setHireOpen] = useState(false);

  return (
    <>
      <section className="case-studies case-studies-international" aria-labelledby="case-studies-title">
        <div className="case-studies-heading wrap">
          <span className="case-badge"><span aria-hidden="true">✦</span> International projects</span>
          <h2 id="case-studies-title">Digital experiences<br />built worldwide.</h2>
          <p>WEBSTELL team members have contributed to these digital experiences as part of international partner and client teams.</p>
        </div>
        <div className="case-grid wrap">
          {internationalProjects.map((project, index) => (
            <article className={`case-card case-card-${index + 1} case-tone-${project.tone}`} key={project.title}>
              <div className="case-copy">
                <div className="case-meta-row"><span className="case-index">{project.number}</span><span className="case-location">{project.location}</span></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a className="case-project-link" href={project.url} target="_blank" rel="noreferrer">View project <span aria-hidden="true">→</span></a>
              </div>
              <a className="case-visual" href={project.url} target="_blank" rel="noreferrer" aria-label={`View the ${project.title} project`}>
                <Image src={project.image} alt={`${project.title} project preview`} fill sizes="(max-width: 760px) 100vw, (max-width: 980px) 60vw, 50vw" loading="lazy" />
                <span className="case-visual-open" aria-hidden="true"><b>View project</b><i>↗</i></span>
              </a>
            </article>
          ))}
        </div>
        <div className="case-action">
          {/* oxlint-disable-next-line next/no-html-link-for-pages -- Preserve a no-JavaScript contact fallback while opening the existing dialog when JavaScript is available. */}
          <a href="/contact" onClick={(event) => { event.preventDefault(); setHireOpen(true); }}>
            Get your website <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <HireDialog open={hireOpen} onOpenChange={setHireOpen} />
    </>
  );
}
