'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { recentWorkProjects, type Project } from '../portfolio-data';
import StudioNav, { StudioFooter } from '../StudioNav';
import './projects.css';

export default function ProjectsPage() {
  const [selected, setSelected] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (selected) dialog.current?.showModal();
    else dialog.current?.close();
  }, [selected]);

  return (
    <>
      <StudioNav current="work" />
      <main>
        <section className="projects-hero">
          <div className="projects-hero-inner wrap">
            <span className="refresh-eyebrow">WEBSTELL / ALL PROJECTS</span>
            <h1>Directions made<br />to be explored.</h1>
            <p>
              A growing collection of WEBSTELL studio concepts for brands with
              something worth saying. Open any direction to take a closer look.
            </p>
            <Link className="projects-back" href="/#projects">Back to home <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="projects-list wrap" aria-labelledby="all-projects-title">
          <div className="projects-list-heading">
            <div>
              <span className="refresh-eyebrow">{String(recentWorkProjects.length).padStart(2, '0')} PROJECTS</span>
              <h2 id="all-projects-title">All projects.</h2>
            </div>
            <p>Travel, hospitality, culture, commerce and technology, brought together in one visual collection.</p>
          </div>
          <div className="project-grid">
            {recentWorkProjects.map((project) => (
              <article className="project" key={project.id}>
                <button className="project-preview" onClick={() => setSelected(project)} aria-label={`Preview ${project.title}`}>
                  <div className="project-image">
                    <img src={project.image} alt={`${project.title} website design direction`} loading="lazy" />
                    <span className="project-arrow" aria-hidden="true">↗</span>
                  </div>
                </button>
                <div className="project-title-row">
                  <h3>{project.title}</h3>
                  <button className="project-view" onClick={() => setSelected(project)}>View direction ↗</button>
                </div>
                <p className="project-category">{project.category}</p>
                <p className="project-description">{project.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <StudioFooter />
      <dialog ref={dialog} className="project-dialog" onCancel={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }} aria-labelledby="project-preview-title">
        <button className="close" onClick={() => setSelected(null)} aria-label="Close project">×</button>
        {selected && <>
          <img src={selected.image} alt={`${selected.title} preview`} />
          <span className="refresh-eyebrow">Studio concept / {selected.category}</span>
          <h2 id="project-preview-title">{selected.title}</h2>
          <p>{selected.description}</p>
        </>}
      </dialog>
    </>
  );
}
