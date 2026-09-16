import StudioNav, { StudioFooter } from '../StudioNav';
import Link from 'next/link';
import TeamSection from '../TeamSection';
import InternationalProjectsSection from '../InternationalProjectsSection';
import WhyWebstellSection from '../WhyWebstellSection';
import './about.css';

export default function AboutPage() {
  return (
    <>
      <StudioNav current="about" />
      <main className="about-page">
        <section className="about-hero studio-width" aria-labelledby="about-page-title">
          <h1 id="about-page-title">A small studio for<br/><em>ambitious digital work.</em></h1>
          <div className="about-hero-copy">
            <p>WEBSTELL brings strategy, design and engineering together for businesses that want to be understood, remembered and easier to choose.</p>
            <p>You work directly with the people making the work. That keeps decisions clear, collaboration human and every detail connected to the original goal.</p>
          </div>
        </section>

        <WhyWebstellSection id="about-why-webstell" />

        <TeamSection />

        <InternationalProjectsSection />

        <section className="about-next studio-width" aria-labelledby="about-next-title">
          <span>HAVE SOMETHING IN MIND?</span>
          <h2 id="about-next-title">Let’s make the next move count.</h2>
          <div><Link className="about-primary" href="/contact">Discuss your project <span aria-hidden="true">↗</span></Link><Link className="about-secondary" href="/projects">See our work <span aria-hidden="true">↗</span></Link></div>
        </section>
      </main>
      <StudioFooter />
    </>
  );
}
