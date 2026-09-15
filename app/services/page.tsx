import Link from 'next/link';
import StudioNav, { StudioFooter } from '../StudioNav';
import './services.css';

const serviceList = [
  {
    number: '01',
    title: 'Website design & development',
    description: 'Distinctive, fast websites that make your value clear and give people a confident next step.',
    details: ['Strategy & content', 'UX and visual design', 'Responsive development'],
  },
  {
    number: '02',
    title: 'Ecommerce & online stores',
    description: 'Product-led storefronts designed to make discovery easy and purchasing feel effortless.',
    details: ['Shopify & custom stores', 'Payments and shipping', 'Product storytelling'],
  },
  {
    number: '03',
    title: 'Brand identity & UI/UX',
    description: 'A clear visual language and interface system that helps every interaction feel recognisably yours.',
    details: ['Identity systems', 'Product interfaces', 'Design direction'],
  },
  {
    number: '04',
    title: 'Software & automation',
    description: 'Practical digital tools and connected workflows that remove friction from everyday work.',
    details: ['Dashboards & portals', 'API integrations', 'AI-assisted workflows'],
  },
  {
    number: '05',
    title: 'Mobile apps',
    description: 'Focused iOS and Android experiences built around the actions people need most.',
    details: ['Product planning', 'Interface design', 'Cross-platform delivery'],
  },
  {
    number: '06',
    title: 'AI assistants & chatbots',
    description: 'Helpful conversational experiences that guide customers and support teams without pretending to be human.',
    details: ['Knowledge assistants', 'Website conversations', 'Workflow integration'],
  },
];

export default function ServicesPage() {
  return (
    <>
      <StudioNav current="services" />
      <main className="services-page">
        <section className="services-page-hero studio-width" aria-labelledby="services-page-title">
          <div>
            <span className="studio-eyebrow">WEBSTELL / SERVICES</span>
            <h1 id="services-page-title">One team.<br /><span>Six ways forward.</span></h1>
          </div>
          <div className="services-page-intro">
            <p>Start with the digital experience that matters most now. Each service can stand alone or connect into one considered system.</p>
            <div className="services-page-actions">
              <Link className="studio-button lime-button" href="/contact">Discuss your project <span aria-hidden="true">↗</span></Link>
              <Link className="services-text-link" href="/projects">See our work <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>

        <section className="services-page-list studio-width" aria-label="WEBSTELL services">
          {serviceList.map((service) => (
            <article className="services-page-card" key={service.number}>
              <span>{service.number}</span>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <ul>
                {service.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </article>
          ))}
        </section>

        <section className="services-page-close studio-width">
          <span className="studio-eyebrow">NOT SURE WHERE TO START?</span>
          <h2>Bring the problem.<br />We’ll help shape the brief.</h2>
          <Link className="studio-button dark-button" href="/contact">Discuss your project <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
      <StudioFooter />
    </>
  );
}
