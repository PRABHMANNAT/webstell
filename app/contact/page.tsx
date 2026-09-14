import { ArrowUpRight, MessageCircle } from 'lucide-react';
import StudioNav, { StudioFooter } from '../StudioNav';
import { whatsappUrl } from '../contact-utils';
import BriefForm from '../BriefForm';
export const metadata = {
  title: 'Tell Us About Your Project | WEBSTELL',
  description:
    'A new website, an app, or a better way of doing things. Share your idea with the WEBSTELL team.',
};
export default function ContactPage() {
  return (
    <>
      <StudioNav current="contact" />
      <main className="studio-page contact-page">
        <section className="contact-page-grid studio-width">
          <div className="contact-story">
            <span className="studio-eyebrow">LET’S MAKE SOMETHING HAPPEN</span>
            <h1>
              Big idea?
              <br />
              Small question?
              <br />
              <span>We’re listening.</span>
            </h1>
            <p>
              You don’t need a perfect brief. Tell us where you are, where you
              want to go, and what’s getting in the way.
            </p>
            <a
              className="contact-whatsapp"
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={21} />
              <span>
                More of a WhatsApp person?<strong>+91 76964 03580</strong>
              </span>
              <ArrowUpRight size={20} />
            </a>
            <div className="contact-art">
              <img
                src="/assets/contact/webstell-contact.avif"
                alt="A retro computer in a mountain landscape"
              />
              <div>
                <span>FROM “WHAT IF” TO “IT’S LIVE.”</span>
                <strong>
                  Something good
                  <br />
                  starts here.
                </strong>
              </div>
            </div>
          </div>
          <div className="contact-form-card">
            <span className="form-step">01 / YOUR PROJECT</span>
            <h2>Tell us a little about it.</h2>
            <p className="section-subtitle">
              The more we know, the more useful we can be.
            </p>
            <BriefForm />
          </div>
        </section>
      </main>
      <StudioFooter />
    </>
  );
}
