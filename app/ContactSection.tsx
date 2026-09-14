import { ArrowUpRight } from 'lucide-react';
export default function ContactSection() {
  return (
    <section className="home-contact-invite" id="contact">
      <div className="studio-width">
        <span className="studio-eyebrow">YOUR IDEA DESERVES A GOOD TEAM.</span>
        <h2>
          Let’s make it
          <br />
          <span>something real.</span>
        </h2>
        <div>
          <p>
            A website, an app, a better way to run your business.
            <br />
            Tell us what you have in mind.
          </p>
          <a href="/contact" className="studio-button lime-button">
            Start the conversation <ArrowUpRight size={21} />
          </a>
        </div>
      </div>
    </section>
  );
}
