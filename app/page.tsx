import HomeExperience from './HomeExperience';
import { createPageMetadata } from './seo-metadata';
export const metadata = {
  ...createPageMetadata({
    title: 'Webstell — Creative Technology, Software & AI Studio',
    description:
      'Distinctive websites, custom software, SaaS, AI automation, SEO and mobile apps. Webstell connects design and engineering for businesses in India and worldwide.',
    path: '/',
  }),
  alternates: {
    canonical: 'https://webstell-studio.com/',
    languages: {
      'en-AU': 'https://webstell-studio.com/',
      'en-IN': 'https://webstell-studio.com/',
      'x-default': 'https://webstell-studio.com/',
    },
  },
};
export default function Home() {
  return <HomeExperience />;
}
