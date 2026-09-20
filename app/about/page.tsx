import StudioNav from '../StudioNav';
import SiteFooter from '../SiteFooter';
import TeamSection from '../TeamSection';
import InternationalProjectsSection from '../InternationalProjectsSection';
import WhyWebstellSection from '../WhyWebstellSection';
import AboutCallToAction from './AboutCallToAction';
import { createPageMetadata } from '../seo-metadata';
import StructuredData from '../StructuredData';
import { createPageSchema } from '../structured-data';
import './about.css';

export const metadata = createPageMetadata({
  title: 'About Webstell | Software & Digital Product Agency',
  description:
    'Meet Webstell, a hands-on design and development team creating distinctive websites, software and digital products for businesses across markets.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <StructuredData data={createPageSchema({ path: '/about', name: 'About Webstell | Software & Digital Product Agency', breadcrumbName: 'About' })} />
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
      <SiteFooter />
    </>
  );
}
