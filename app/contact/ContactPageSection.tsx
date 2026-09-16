import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import ContactBriefForm from './ContactBriefForm';
import { whatsappUrl } from '../contact-utils';

export default function ContactPageSection() {
  return (
    <>
      <div className="contact-page-marquee" aria-label="Share your project brief and start a conversation with WEBSTELL.">
        <div className="contact-page-marquee-track">
          <span>Share your brief <i aria-hidden="true">✳</i> Meet the team behind the work <i aria-hidden="true">✳</i> Build with a clear next step <i aria-hidden="true">✳</i></span>
          <span aria-hidden="true">Share your brief <i>✳</i> Meet the team behind the work <i>✳</i> Build with a clear next step <i>✳</i></span>
        </div>
      </div>
      <section className="contact-page-section" id="contact" aria-labelledby="contact-page-title">
        <div className="studio-width contact-page-shell">
          <div className="contact-page-form-card">
            <div className="contact-page-form-heading">
              <span className="studio-eyebrow">YOUR PROJECT, IN YOUR WORDS</span>
              <h1 id="contact-page-title">Tell us what you’re building.</h1>
              <p>Start with the essentials. You can add more detail whenever you’re ready.</p>
            </div>
            <ContactBriefForm />
          </div>

          <div className="contact-page-conversation">
            <div className="contact-page-intro">
              <span className="studio-eyebrow">START A CONVERSATION</span>
              <h2>Make your next digital move matter.</h2>
              <p>Bring the ambition, the obstacle or the rough idea. We’ll bring the strategic thinking and craft to turn it into something people trust.</p>
              <div className="contact-page-details" aria-label="WEBSTELL contact details">
                <a href="mailto:contact@webstell-studio.com"><Mail size={17} /> contact@webstell-studio.com</a>
                <a href="tel:+917696403580"><Phone size={17} /> +91 76964 03580</a>
              </div>
            </div>
            <div className="contact-page-aside">
              <a href={whatsappUrl('Hi WEBSTELL! I would like to discuss a project.')} target="_blank" rel="noreferrer" className="home-contact-whatsapp">
                <span className="home-contact-whatsapp-icon"><img src="/assets/contact/whatsapp-icon.png" alt="" /></span>
                <span><small>Prefer WhatsApp?</small><strong>Message WEBSTELL directly</strong></span>
                <ArrowUpRight size={19} />
              </a>
              <figure className="contact-page-image">
                <img src="/assets/contact/webstell-contact-connection.png" alt="A retro computer and telephone on a flower-covered hill beneath a bright sky" />
                <figcaption>Clear brief. Good conversation. Better work.</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
