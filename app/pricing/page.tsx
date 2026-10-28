import PricingExperience from './PricingExperience';
import { createPageMetadata } from '../seo-metadata';
import StructuredData from '../StructuredData';
import { createPageSchema } from '../structured-data';
import './pricing-refresh.css';
export const metadata = createPageMetadata({
  title: 'Website, Software & AI Packages | Webstell',
  description:
    'Compare website, e-commerce, software, AI, automation, SEO and mobile packages. Build a project brief and request a regional quote in INR, AUD or USD.',
  path: '/pricing',
});
export default function PricingPage() {
  return <><StructuredData data={createPageSchema({ path: '/pricing', name: 'Website, Software & AI Packages | Webstell', breadcrumbName: 'Pricing' })} /><PricingExperience /></>;
}
