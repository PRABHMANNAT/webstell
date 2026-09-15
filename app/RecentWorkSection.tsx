'use client';

import Link from 'next/link';
import { recentWorkProjects } from './portfolio-data';

export default function RecentWorkSection() {
  return (
    <section className="work wrap" id="projects" aria-labelledby="recent-work-title">
      <div className="section-heading">
        <div>
          <span className="refresh-eyebrow">WEBSTELL / SELECTED DIRECTIONS</span>
          <h2 id="recent-work-title">Built for a<br />point of view.</h2>
        </div>
        <p className="recent-intro">
          Travel, hospitality, culture, commerce and technology—twelve visual directions for brands that want to be remembered.
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
            <span className="project-status">Studio concept</span>
            <div className="project-title-row">
              <h3>{project.title}</h3>
            </div>
            <p className="project-category">{project.category}</p>
            <p className="project-description">{project.description}</p>
          </article>
        ))}
      </div>
      <div className="center">
        <Link className="outline-pill" href="/projects">
          Explore the full portfolio <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
