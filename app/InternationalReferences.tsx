import Image from 'next/image';

const references = [
  { number: '01', title: 'Pear', category: 'Growth systems', location: 'Oslo, Norway', description: 'A fearless, outcome-led experience that makes a radical commercial promise feel simple: custom software, organic search and a model tied directly to growth.', tags: ['Custom software', 'Organic growth', 'Revenue share'], image: '/assets/featured-projects/pear.png', url: 'https://pear.no/', tone: 'pear' },
  { number: '02', title: 'Araku Coffee', category: 'Regenerative commerce', location: 'India / Global', description: 'A richly merchandised commerce experience where premium coffee, regenerative farming and farmer stories meet in one distinctive brand world.', tags: ['Ecommerce', 'Origin stories', 'Product discovery'], image: '/assets/featured-projects/araku-coffee.png', url: 'https://www.arakucoffee.in/', tone: 'araku' },
  { number: '03', title: 'Eclipse Space', category: 'Space infrastructure', location: 'United States / Global', description: 'A precise, mission-led product story that makes complex sovereign space infrastructure feel clear, credible and within reach.', tags: ['Product narrative', 'Technical clarity', 'Global systems'], image: '/assets/featured-projects/eclipse-space-orbit.png', url: 'https://www.eclipse.space/', tone: 'eclipse' },
] as const;

export default function InternationalReferences() {
  return (
    <section className="case-studies case-studies-international" aria-labelledby="international-references-title">
      <div className="case-studies-heading wrap">
        <span className="case-badge"><span aria-hidden="true">✦</span> Independent references</span>
        <h2 id="international-references-title">Global work<br/>we admire.</h2>
        <p>Pear, Araku Coffee and Eclipse Space are independent reference websites selected for their clarity and ambition. They are not WEBSTELL client work.</p>
      </div>
      <div className="case-grid wrap">
        {references.map((project, index) => (
          <article className={`case-card case-card-${index + 1} case-tone-${project.tone}`} key={project.title}>
            <div className="case-copy">
              <div className="case-meta-row"><span className="case-index">{project.number}</span><span className="case-location">{project.location}</span></div>
              <span className="case-category">Independent reference · {project.category}</span>
              <h3>{project.title}</h3><p>{project.description}</p>
              <ul>{project.tags.map((item) => <li key={item}>{item}</li>)}</ul>
              <a className="case-project-link" href={project.url} target="_blank" rel="noreferrer">Visit source site <span aria-hidden="true">↗</span></a>
            </div>
            <a className="case-visual" href={project.url} target="_blank" rel="noreferrer" aria-label={`Open the independent ${project.title} reference website`}>
              <Image src={project.image} alt={`${project.title} independent website reference preview`} fill sizes="(max-width: 980px) 100vw, 50vw" />
              <span className="case-visual-open" aria-hidden="true"><b>Open source site</b><i>↗</i></span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
