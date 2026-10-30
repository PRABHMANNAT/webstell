import StudioNav from '../StudioNav';
import SiteFooter from '../SiteFooter';
import TeamSection from '../TeamSection';
import InternationalProjectsSection from '../InternationalProjectsSection';
import WhyWebstellSection from '../WhyWebstellSection';
import AboutCallToAction from './AboutCallToAction';
import AboutHero from './AboutHero';
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
      <main id="main-content" className="about-page">
        <AboutHero />

        <WhyWebstellSection id="about-why-webstell" />

        <TeamSection />

        <InternationalProjectsSection />

        <AboutCallToAction />
      </main>
      <SiteFooter />
    </>
  );
}
