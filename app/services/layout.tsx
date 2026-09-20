import { createPageMetadata } from '../seo-metadata';

export const metadata = createPageMetadata({
  title: 'Website, Software, AI & App Development Services | Webstell',
  description:
    'Explore Webstell services for websites, ecommerce, custom software, mobile apps, AI automation, brand identity, SEO and ongoing digital support.',
  path: '/services',
});

export default function ServicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
