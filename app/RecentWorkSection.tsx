'use client';

import Link from './SiteLink';
import Image from 'next/image';
import { recentWorkProjects } from './portfolio-data';
import { useInViewport } from './useInViewport';

export default function RecentWorkSection() {
  const { ref, isInViewport } = useInViewport<HTMLElement>('400px', 0);

  return (
    <section ref={ref} className="work wrap" id="projects" aria-labelledby="recent-work-title">
      <div className="section-heading">
        <div>
          <h2 id="recent-work-title">Work that works.</h2>
        </div>
        <p className="recent-intro">
          Clear strategy, sharp design and thoughtful technology—built to earn trust and turn interest into action.
        </p>
      </div>
      <div className="project-grid">
        {recentWorkProjects.slice(0, 6).map((project) => (
          <article className="project" key={project.id}>
            <Link className="project-preview" href="/projects" aria-label={`View ${project.title} in all projects`}>
              <div className="project-image">
                {isInViewport && (
                  <Image
                    src={project.image}
                    alt={`${project.title} website design direction`}
                    fill
                    sizes="(max-width: 700px) 100vw, 50vw"
                    loading="lazy"
                    decoding="async"
                    unoptimized
                  />
                )}
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
