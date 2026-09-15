import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';
import BriefForm from './BriefForm';
import { whatsappUrl } from './contact-utils';

export default function ContactSection() {
  return (
    <section className="home-contact-form" id="contact" aria-labelledby="home-contact-title">
      <img
        className="home-contact-background"
        src="/assets/contact/webstell-contact-background.jpg"
        alt=""
        aria-hidden="true"
      />
      <div className="home-contact-shade" aria-hidden="true" />
      <div className="studio-width home-contact-shell">
        <div className="home-contact-form-intro">
          <span className="studio-eyebrow">START A CONVERSATION</span>
          <h2 id="home-contact-title">Tell us what you want to build—or what is not working yet.</h2>
          <p>
            You do not need a finished brief. Share the goal, the rough scope and
            any deadline you are working toward. We will reply with questions or
            a sensible next step within one business day.
          </p>
          <div className="home-contact-details" aria-label="WEBSTELL contact details">
            <a href="mailto:contact@webstell-studio.com"><Mail size={17} /> contact@webstell-studio.com</a>
            <a href="tel:+917696403580"><Phone size={17} /> +91 76964 03580</a>
          </div>
          <a href={whatsappUrl('Hi WEBSTELL! I would like to discuss a project.')} target="_blank" rel="noreferrer" className="home-contact-whatsapp">
            <span className="home-contact-whatsapp-icon"><MessageCircle size={19} /></span>
            <span><small>Prefer WhatsApp?</small><strong>Message WEBSTELL directly</strong></span>
            <ArrowUpRight size={19} />
          </a>
          <figure className="home-contact-image">
            <img src="/assets/contact/webstell-contact-connection.png" alt="A retro computer and telephone on a flower-covered hill beneath a bright sky" />
            <figcaption>An open line to the people building your project.</figcaption>
          </figure>
        </div>
        <div className="home-contact-form-card">
          <span>PROJECT BRIEF</span>
          <h3>A few useful details.</h3>
          <p>Start with what you know. We can work out the rest together.</p>
          <BriefForm compact context="Sent from the WEBSTELL website contact form." />
        </div>
      </div>
    </section>
  );
}
