import PricingExperience from './PricingExperience';
import { createPageMetadata } from '../seo-metadata';
import './pricing-refresh.css';
export const metadata = createPageMetadata({
  title: 'Website & Software Development Pricing | Webstell',
  description:
    'Estimate pricing for a website, portfolio, ecommerce store, custom software or mobile app by selecting the scope and features your project needs.',
  path: '/pricing',
});
export default function PricingPage() {
  return <PricingExperience />;
}
