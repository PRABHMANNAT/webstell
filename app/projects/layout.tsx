import { createPageMetadata } from '../seo-metadata';
import StructuredData from '../StructuredData';
import { createPageSchema } from '../structured-data';

export const metadata = createPageMetadata({
  title: 'Website & Software Development Projects | Webstell',
  description:
    'Explore Webstell studio design concepts, illustrative software workflows and credited international project contributions across business sectors.',
  path: '/projects',
});

export default function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <><StructuredData data={createPageSchema({ path: '/projects', name: 'Website & Software Development Projects | Webstell', breadcrumbName: 'Projects' })} />{children}</>;
}
