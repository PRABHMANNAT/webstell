import ScheduleExperience from './ScheduleExperience';
import { createPageMetadata } from '../seo-metadata';
import StructuredData from '../StructuredData';
import { createPageSchema } from '../structured-data';
export const metadata = createPageMetadata({
  title: 'Schedule a Project Call | Webstell',
  description:
    'Request a preferred date and time for a 30-minute project call with Webstell to discuss your goals, scope and a practical next step.',
  path: '/schedule',
});
export default function SchedulePage() {
  return <><StructuredData data={createPageSchema({ path: '/schedule', name: 'Schedule a Project Call | Webstell', breadcrumbName: 'Schedule a Call' })} /><ScheduleExperience /></>;
}
