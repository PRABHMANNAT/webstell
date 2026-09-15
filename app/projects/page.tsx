'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '../portfolio-data';
import StudioNav, { StudioFooter } from '../StudioNav';
import InternationalReferences from '../InternationalReferences';
import WorksMarquee from '../WorksMarquee';
import { conceptDisclosure, getWorkEditorial, orderedWorkProjects, projectIntentMessage } from '../selected-work-data';
import { whatsappUrl } from '../contact-utils';
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

        <InternationalReferences />
        <WorksMarquee />

        <section className="projects-list wrap" aria-labelledby="all-projects-title">
          <div className="projects-list-heading">
            <div>
              <span className="refresh-eyebrow">{String(orderedWorkProjects.length).padStart(2, '0')} STUDIO CONCEPTS</span>
              <h2 id="all-projects-title">All projects.</h2>
            </div>
            <p>Self-initiated directions across travel, hospitality, culture, commerce and technology. Every card is clearly marked as concept work.</p>
          </div>
          <div className="project-grid">
            {orderedWorkProjects.map((project) => {
              const editorial = getWorkEditorial(project);
              return <article className="project" id={`project-${project.id}`} key={project.id}>
                <button className="project-preview" onClick={() => setSelected(project)} aria-label={`Preview ${project.title}`}>
                  <div className="project-image">
                    <Image src={project.image} alt={`${project.title} ${project.category} desktop concept preview`} fill sizes="(max-width: 700px) 92vw, 45vw" />
                    <span className="project-arrow" aria-hidden="true">↗</span>
                  </div>
                </button>
                <span className="project-status">{editorial.status}</span>
                <div className="project-title-row">
                  <h3>{project.title}</h3>
                  <button className="project-view" onClick={() => setSelected(project)}>{editorial.cta} ↗</button>
                </div>
                <p className="project-category">{project.category}</p>
                <p className="project-description">{editorial.purpose}</p>
                <p className="project-role"><strong>Our role:</strong> {editorial.role}</p>
              </article>;
            })}
          </div>
        </section>
      </main>
      <StudioFooter />
      <dialog ref={dialog} className="project-dialog concept-dialog" onCancel={() => setSelected(null)} aria-labelledby="project-preview-title">
        <button type="button" className="close" onClick={() => setSelected(null)} aria-label="Close project">×</button>
        {selected && <>
          <Image src={selected.image} alt={`${selected.title} concept preview`} width={1200} height={760} />
          <span className="refresh-eyebrow">{getWorkEditorial(selected).status} / {selected.category}</span>
          <h2 id="project-preview-title">{selected.title}</h2>
          <p>{getWorkEditorial(selected).purpose}</p>
          <p className="concept-disclosure">{conceptDisclosure}</p>
          <a className="concept-whatsapp" href={whatsappUrl(projectIntentMessage(selected))} target="_blank" rel="noreferrer">Discuss this direction on WhatsApp <span aria-hidden="true">↗</span></a>
        </>}
      </dialog>
    </>
  );
}
