import { createPageMetadata } from '../seo-metadata';
import StructuredData from '../StructuredData';
import { createPageSchema } from '../structured-data';

export const metadata = createPageMetadata({
  title: 'Website & Software Development Projects | Webstell',
  description:
    'Explore Webstell website directions and digital product projects across ecommerce, hospitality, technology, travel, health and growing businesses.',
  path: '/projects',
});

export default function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <><StructuredData data={createPageSchema({ path: '/projects', name: 'Website & Software Development Projects | Webstell', breadcrumbName: 'Projects' })} />{children}</>;
}
