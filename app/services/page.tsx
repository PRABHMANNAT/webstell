import Link from 'next/link';
import StudioNav, { StudioFooter } from '../StudioNav';
import './services.css';

const serviceList = [
  {
    number: '01',
    id: 'website-design-development',
    title: 'Website design & development',
    description: 'Clear, fast websites that explain your value, build trust and turn visits into useful enquiries.',
    details: ['Strategy', 'Content structure', 'UI/UX', 'Responsive development', 'Search foundations'],
  },
  {
    number: '02',
    id: 'ecommerce-online-stores',
    title: 'Ecommerce & online stores',
    description: 'Shopping experiences that make products easy to discover and buying feel straightforward.',
    details: ['Product catalogue', 'Cart and checkout', 'Payments', 'Shipping setup', 'Store management'],
  },
  {
    number: '03',
    id: 'custom-software',
    title: 'Custom software',
    description: 'Focused dashboards, portals and internal tools built around how your team actually works.',
    details: ['Product planning', 'Interface design', 'Development', 'Integrations', 'Deployment'],
  },
  {
    number: '04',
    id: 'mobile-apps',
    title: 'Mobile apps',
    description: 'Practical mobile experiences designed for real daily use on Android and iOS.',
    details: ['Product flow', 'UI/UX', 'Development', 'Testing', 'Launch support'],
  },
  {
    number: '05',
    id: 'ai-chatbots-automation',
    title: 'AI chatbots & automation',
    description: 'Useful AI systems that answer questions, qualify leads and reduce repetitive work without making the customer experience feel robotic.',
    details: ['Knowledge assistants', 'Web and WhatsApp chat', 'Workflow automation', 'API integrations'],
  },
  {
    number: '06',
    id: 'brand-identity-ui-ux',
    title: 'Brand identity & UI/UX',
    description: 'A visual and interface system that makes your business easier to recognise, understand and trust.',
    details: ['Visual direction', 'Design system', 'Web and app UI', 'Prototypes', 'Handover'],
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
            <article className="services-page-card" id={service.id} key={service.number}>
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
