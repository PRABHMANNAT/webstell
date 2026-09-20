import PricingExperience from './PricingExperience';
import { createPageMetadata } from '../seo-metadata';
import StructuredData from '../StructuredData';
import { createPageSchema } from '../structured-data';
import './pricing-refresh.css';
export const metadata = createPageMetadata({
  title: 'Website & Software Development Pricing | Webstell',
  description:
    'Estimate pricing for a website, portfolio, ecommerce store, custom software or mobile app by selecting the scope and features your project needs.',
  path: '/pricing',
});
export default function PricingPage() {
  return <><StructuredData data={createPageSchema({ path: '/pricing', name: 'Website & Software Development Pricing | Webstell', breadcrumbName: 'Pricing' })} /><PricingExperience /></>;
}
