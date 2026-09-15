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
        <p className="quick-services-summary">Websites, digital products and smarter systems—designed to win attention, simplify work and help your business grow.</p>
      </div>
    </section>
  );
}
