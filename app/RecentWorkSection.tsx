'use client';

import Link from 'next/link';
import { recentWorkProjects } from './portfolio-data';

export default function RecentWorkSection() {
  return (
    <section className="work wrap" id="projects" aria-labelledby="recent-work-title">
      <div className="section-heading">
        <div>
          <span className="refresh-eyebrow">SELECTED WORK</span>
          <h2 id="recent-work-title">A few things we are proud<br />to put our name on.</h2>
        </div>
        <p className="recent-intro">
          Websites and digital products built around a real audience, a clear goal and the details that earn trust.
        </p>
      </div>
      <div className="project-grid">
        {recentWorkProjects.map((project) => (
          <article className="project" key={project.id}>
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
        <Link className="outline-pill portfolio-cta" href="/projects">
          <span className="portfolio-cta-eyes" aria-hidden="true">
            <i><b /></i>
            <i><b /></i>
          </span>
          <span>View all projects</span>
          <span className="portfolio-cta-arrow" aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
