export default function ServiceShowcase() {
  return (
    <section className="quick-services" id="services" aria-label="Services">
      <div className="services-marquee" aria-hidden="true">
        <div className="services-marquee-track">
          <span>Services <i>✳</i> Services <i>✳</i></span>
          <span>Services <i>✳</i> Services <i>✳</i></span>
        </div>
      </div>
      <div className="quick-services-inner wrap">
        <p className="quick-services-summary">From your first website to the tools that run your business. We bring design and development together to make every part work for you.</p>
      </div>
    </section>
  );
}
