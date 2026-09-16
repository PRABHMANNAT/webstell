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
          <h1 id="about-page-title">Made to be noticed.<br/><em>Built to be trusted.</em></h1>
          <div className="about-hero-copy">
            <p>WEBSTELL combines <strong>clear strategy, distinctive design and dependable engineering</strong> to give ambitious businesses a presence people <strong>notice, trust and choose.</strong></p>
            <p>We are a hands-on team of designers and developers working across <strong>multiple countries</strong>—with direct access, honest collaboration and care for the details that make digital work feel real.</p>
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
