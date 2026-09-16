import StudioNav, { StudioFooter } from '../StudioNav';
import TeamSection from '../TeamSection';
import InternationalProjectsSection from '../InternationalProjectsSection';
import WhyWebstellSection from '../WhyWebstellSection';
import AboutCallToAction from './AboutCallToAction';
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

        <AboutCallToAction />
      </main>
      <StudioFooter />
    </>
  );
}
