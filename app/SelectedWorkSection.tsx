import Image from 'next/image';
import Link from 'next/link';
import { selectedWorkProjects } from './selected-work-data';
import EyesLink from './EyesLink';

export default function SelectedWorkSection() {
  return (
    <section className="selected-work" id="selected-work" aria-labelledby="selected-work-title">
      <div className="selected-work-inner wrap">
        <header className="selected-work-heading">
          <span>SELECTED WORK</span>
          <h2 id="selected-work-title">A few things we are proud to put our name on.</h2>
          <p>Websites and digital products shaped around a real audience, a clear goal and the details that make people trust what they see.</p>
        </header>

        <div className="selected-work-grid">
          {selectedWorkProjects.map((project, index) => (
            <article className={`selected-work-card selected-work-card-${index + 1}`} id={`project-${project.id}`} key={project.id}>
              <Link className="selected-work-preview" href={`/projects#project-${project.id}`} aria-label={`${project.cta}: ${project.title}`}>
                <Image src={project.image} alt={`${project.title} ${project.category} desktop concept preview`} fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 40vw" />
                <span aria-hidden="true">↗</span>
              </Link>
              <div className="selected-work-copy">
                <span className="selected-work-status"><i aria-hidden="true" />{project.status}</span>
                <div className="selected-work-title-row"><h3>{project.title}</h3><span>{project.category}</span></div>
                <p>{project.purpose}</p>
                <p className="selected-work-role"><strong>Our role:</strong> {project.role}</p>
                <Link className="selected-work-link" href={`/projects#project-${project.id}`}>{project.cta}<span aria-hidden="true">↗</span></Link>
              </div>
            </article>
          ))}
        </div>

        <div className="selected-work-action"><EyesLink href="/projects">Explore all work</EyesLink></div>
      </div>
    </section>
  );
}
