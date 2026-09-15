'use client';

import Link from 'next/link';
import { recentWorkProjects } from './portfolio-data';

export default function RecentWorkSection() {
  const desktopHiddenProjectIds = new Set(['wedding', 'fintechx', 'above', 'aeronis']);

  return (
    <section className="work wrap" id="projects" aria-labelledby="recent-work-title">
      <div className="section-heading">
        <div>
          <h2 id="recent-work-title">Work that moves you forward.</h2>
        </div>
        <p className="recent-intro">
          Clear strategy, sharp design and thoughtful technology—built to earn trust and turn interest into action.
        </p>
      </div>
      <div className="project-grid">
        {recentWorkProjects.map((project) => (
          <article
            className={`project${desktopHiddenProjectIds.has(project.id) ? ' project-home-hide-desktop' : ''}`}
            key={project.id}
          >
            <Link className="project-preview" href="/projects" aria-label={`View ${project.title} in all projects`}>
              <div className="project-image">
                <img src={project.image} alt={`${project.title} website design direction`} loading="lazy" />
                <span className="project-arrow" aria-hidden="true">↗</span>
              </div>
            </Link>
            <div className="project-title-row">
              <h3>{project.title}</h3>
            </div>
            <p className="project-category">{project.category}</p>
            <p className="project-description">{project.description}</p>
          </article>
        ))}
      </div>
      <div className="center">
        <Link className="outline-pill portfolio-cta" href="/projects" aria-label="Explore our work">
          <span className="portfolio-cta-eyes" aria-hidden="true">
            <i><b /></i>
            <i><b /></i>
          </span>
          <span className="portfolio-cta-label">Explore our work</span>
          <span className="portfolio-cta-arrow" aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
