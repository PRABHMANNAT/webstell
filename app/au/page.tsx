import AustralianHome from './AustralianHome';
import { createPageMetadata } from '../seo-metadata';
export const metadata = {
  ...createPageMetadata({
    title: 'Webstell Australia | Websites, Software, AI & Growth',
    description:
      'Creative technology for Australian businesses. Explore websites, e-commerce, software, SaaS, AI automation, SEO and mobile apps with Webstell’s remote studio.',
    path: '/au',
  }),
  alternates: {
    canonical: 'https://webstell-studio.com/au',
    languages: {
      'en-AU': 'https://webstell-studio.com/au',
      'en-IN': 'https://webstell-studio.com/',
      'x-default': 'https://webstell-studio.com/',
    },
  },
};
export default function AustraliaPage() {
  return <AustralianHome />;
}
