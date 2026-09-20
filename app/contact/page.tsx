import StudioNav from '../StudioNav';
import SiteFooter from '../SiteFooter';
import { createPageMetadata } from '../seo-metadata';
import ContactPageSection from './ContactPageSection';
export const metadata = createPageMetadata({
  title: 'Contact Webstell | Start Your Project',
  description:
    'Tell Webstell what you want to build or improve. Share your website, software, ecommerce, mobile app or automation project with the team.',
  path: '/contact',
});
export default function ContactPage() {
  return (
    <>
      <StudioNav current="contact" />
      <main className="studio-page contact-page contact-page-refresh">
        <ContactPageSection />
      </main>
      <SiteFooter />
    </>
  );
}
