import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import BriefForm from './BriefForm';
import { whatsappUrl } from './contact-utils';

export default function ContactSection() {
  return (
    <section className="home-contact-form" id="contact" aria-labelledby="home-contact-title">
      <div className="studio-width home-contact-shell">
        <div className="home-contact-form-intro">
          <span className="studio-eyebrow">START A CONVERSATION</span>
          <h2 id="home-contact-title">Let’s build it.</h2>
          <p>Tell us what you need. We’ll take it from there.</p>
          <div className="home-contact-details" aria-label="WEBSTELL contact details">
            <a href="mailto:contact@webstell-studio.com"><Mail size={17} /> contact@webstell-studio.com</a>
            <a href="tel:+917696403580"><Phone size={17} /> +91 76964 03580</a>
          </div>
          <a href={whatsappUrl('Hi WEBSTELL! I would like to discuss a project.')} target="_blank" rel="noreferrer" className="home-contact-whatsapp">
            <span className="home-contact-whatsapp-icon"><img src="/assets/contact/whatsapp-icon.png" alt="" /></span>
            <span><small>Prefer WhatsApp?</small><strong>Message WEBSTELL directly</strong></span>
            <ArrowUpRight size={19} />
          </a>
          <figure className="home-contact-image">
            <img src="/assets/contact/webstell-contact-connection.png" alt="A retro computer and telephone on a flower-covered hill beneath a bright sky" />
            <figcaption>Choose WEBSTELL.</figcaption>
          </figure>
        </div>
        <div className="home-contact-form-card">
          <h3>Start your project.</h3>
          <BriefForm compact context="Sent from the WEBSTELL website contact form." />
        </div>
      </div>
    </section>
  );
}
