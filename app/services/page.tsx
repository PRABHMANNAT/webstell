import Link from 'next/link';
import StudioNav from '../StudioNav';
import SiteFooter from '../SiteFooter';
import ServiceShowcase from '../ServiceShowcase';
import SocialWorkGallery from '../SocialWorkGallery';
import './services.css';

const serviceList = [
  {
    number: '01',
    id: 'website-design-development',
    title: 'Website design & development',
    description: 'We plan, design and build clear, high-performing websites that explain your value, build trust and make it easy for the right people to get in touch. A complete website redesign is available when your current site no longer reflects where the business is going.',
    details: ['Strategy', 'Website redesigns', 'Content structure', 'UI/UX', 'Responsive development', 'Search foundations'],
  },
  {
    number: '02',
    id: 'ecommerce-online-stores',
    title: 'Ecommerce & online stores',
    description: 'Online stores designed around how customers browse, compare and buy—pairing persuasive product pages with simple, dependable checkout and practical tools for managing the day-to-day.',
    details: ['Product catalogue', 'Cart and checkout', 'Payments', 'Shipping setup', 'Store management'],
  },
  {
    number: '03',
    id: 'custom-software',
    title: 'Custom software',
    description: 'Focused dashboards, portals and internal tools built around your real workflow—so your team can reduce manual work, see the right information and move decisions forward faster.',
    details: ['Product planning', 'Interface design', 'Development', 'Integrations', 'Deployment'],
  },
  {
    number: '04',
    id: 'mobile-apps',
    title: 'Mobile apps',
    description: 'Useful mobile products for Android and iOS, shaped around real daily habits from the first flow to launch—then tested and refined so every interaction feels considered.',
    details: ['Product flow', 'UI/UX', 'Development', 'Testing', 'Launch support'],
  },
  {
    number: '05',
    id: 'ai-chatbots-automation',
    title: 'AI chatbots & automation',
    description: 'AI assistants and connected automations that answer common questions, qualify leads and take repetitive work off your team—without making the customer experience feel distant or robotic.',
    details: ['Knowledge assistants', 'Web and WhatsApp chat', 'Workflow automation', 'API integrations'],
  },
  {
    number: '06',
    id: 'brand-identity-ui-ux',
    title: 'Brand identity & UI/UX',
    description: 'A distinct visual identity and interface system that gives your business a recognisable voice, helps customers understand the offer and makes every digital touchpoint feel connected.',
    details: ['Visual direction', 'Design system', 'Web and app UI', 'Prototypes', 'Handover'],
  },
  {
    number: '07',
    id: 'growth-seo-optimisation',
    title: 'Growth, SEO & optimisation',
    description: 'The technical and content foundations that help the right audience find you, reveal what is working and turn more qualified visits into meaningful next steps over time.',
    details: ['Technical SEO', 'Analytics', 'Conversion paths', 'Content support'],
  },
  {
    number: '08',
    id: 'ongoing-support-evolution',
    title: 'Ongoing support & evolution',
    description: 'Practical support after launch to keep your website or product secure, fast and current—plus a clear roadmap for improvements as your business, customers and priorities evolve.',
    details: ['Maintenance', 'Security', 'Updates', 'Roadmaps'],
  },
];

export default function ServicesPage() {
  return (
    <>
      <StudioNav current="services" />
      <main className="services-page">
        <section className="services-page-hero studio-width" aria-labelledby="services-page-title">
          <h1 id="services-page-title" className="sr-only">WEBSTELL services</h1>
          <video className="services-page-hero-video" autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
            <source src="/assets/services/services-hero.mp4" type="video/mp4" />
          </video>
        </section>

        <ServiceShowcase />
        <SocialWorkGallery />

        <section className="services-explorer" aria-labelledby="services-explorer-title">
          <div className="services-explorer-content studio-width">
            <header className="services-explorer-intro">
              <span className="studio-eyebrow">THE WEBSTELL OFFER</span>
              <h2 id="services-explorer-title">Eight ways to make your next move matter.</h2>
              <p>Start with one focused need or combine the right pieces into a digital experience that earns attention, works harder and grows with your business.</p>
            </header>

            <div className="services-page-list" aria-label="WEBSTELL services">
              {serviceList.map((service) => (
                <article className="services-page-card" id={service.id} key={service.number}>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="services-page-close studio-width">
          <span className="studio-eyebrow">NOT SURE WHERE TO START?</span>
          <h2>Bring the problem.<br />We’ll help shape the brief.</h2>
          <Link className="studio-button dark-button" href="/contact">Discuss your project <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
