import type { Metadata } from 'next';
import CookieConsent from './CookieConsent';
import RegionProvider from './RegionProvider';
import GoogleAnalytics from './GoogleAnalytics';
import StructuredData from './StructuredData';
import { createPageMetadata, metadataBase } from './seo-metadata';
import { organizationSchema } from './structured-data';
import './globals.css';
import './hero.css';
import './hero-motion.css';
import './service-showcase.css';
import './case-studies.css';
import './systems.css';
import './editorial.css';
import './team.css';
import './sections.css';
import './work-gallery.css';
import './works-marquee.css';
import './social-work-gallery.css';
import './curved-ticker.css';
import './testimonials.css';
import './pricing.css';
import './contact-section.css';
import './button-motion.css';
import './content-refresh.css';
import './client-feedback.css';
import './service-showcase-glass.css';
import './studio-pages.css'; // Shared project, pricing and enquiry experiences.
import './navigation.css';
import './project-labels.css';
import './services-refresh.css';
import './contact-refresh.css';
import './legal-pages.css';
import './legal-hero-variants.css';
import './cookie-consent.css';
import './insight-pages.css';
import './agency.css';
export const metadata: Metadata = {
  metadataBase,
  ...createPageMetadata({
    title: 'Webstell — Creative Technology, Software & AI Studio',
    description:
      'Webstell is a creative technology studio building distinctive websites, custom software, SaaS, AI automation, SEO and mobile apps for businesses worldwide.',
    path: '/',
  }),
  icons: { icon: '/assets/brand/webstell-retro-mac.png' },
};
const analyticsEnabled =
  process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'preview';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <StructuredData data={organizationSchema} />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <RegionProvider>{children}</RegionProvider>
        <CookieConsent />
        {analyticsEnabled ? <GoogleAnalytics /> : null}
      </body>
    </html>
  );
}
