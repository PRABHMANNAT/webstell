import ScheduleExperience from './ScheduleExperience';
import { createPageMetadata } from '../seo-metadata';
export const metadata = createPageMetadata({
  title: 'Schedule a Project Call | Webstell',
  description:
    'Request a preferred date and time for a 30-minute project call with Webstell to discuss your goals, scope and a practical next step.',
  path: '/schedule',
});
export default function SchedulePage() {
  return <ScheduleExperience />;
}
