import { createPageMetadata } from '../seo-metadata';

export const metadata = createPageMetadata({
  title: 'Website & Software Development Projects | Webstell',
  description:
    'Explore Webstell website directions and digital product projects across ecommerce, hospitality, technology, travel, health and growing businesses.',
  path: '/projects',
});

export default function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
