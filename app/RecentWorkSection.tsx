'use client';

import { recentWorkProjects, type Project } from './portfolio-data';
import Link from 'next/link';

export default function RecentWorkSection({ onOpen }: { onOpen: (project: Project) => void }) {
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
            <button className="project-preview" onClick={() => onOpen(project)} aria-label={`Preview ${project.title}`}>
              <div className="project-image">
                <img src={project.image} alt={`${project.title} website design direction`} loading="lazy" />
                <span className="project-arrow" aria-hidden="true">↗</span>
              </div>
            </button>
            <span className="project-status">Studio concept</span>
            <div className="project-title-row">
              <h3>{project.title}</h3>
              <button className="project-view" onClick={() => onOpen(project)}>View direction ↗</button>
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
