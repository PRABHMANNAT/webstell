import { serviceOverview } from './service-overview-data';

export default function ServiceShowcase() {
  return (
    <section className="quick-services" id="services" aria-labelledby="offer-title">
      <div className="services-marquee" aria-hidden="true">
        <div className="services-marquee-track">
          <span>Services <i>✳</i> Services <i>✳</i></span>
          <span>Services <i>✳</i> Services <i>✳</i></span>
        </div>
      </div>
      <div className="quick-services-inner wrap">
        <header className="quick-services-heading">
          <div><span>WHAT WE DO / 06 SERVICES</span><h2 id="offer-title">Your next idea.<br />Our kind of work.</h2></div>
          <p>From your first website to the tools that run your business. We bring design and development together to make every part work for you.</p>
        </header>
        <div className="quick-services-grid">
          {serviceOverview.map((service, index) => (
            <a className="quick-service" key={service.slug} href={`/services#${service.slug}`}>
              <span className="quick-service-index">0{index + 1}<span aria-hidden="true">↗</span></span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="quick-service-detail">{service.detail}</span>
            </a>
          ))}
        </div>
        <a className="quick-services-link" href="/contact">Have something in mind? Let’s talk <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
