import LegalPage, { type LegalSection } from '../LegalPage';
import { createPageMetadata } from '../seo-metadata';

export const metadata = createPageMetadata({
  title: 'Refund Policy | Webstell',
  description:
    'Read Webstell’s approach to project deposits, cancellations, completed work, committed costs and requests for refunds or account balances.',
  path: '/refunds',
});

const sections: LegalSection[] = [
  {
    title: 'Project terms come first',
    paragraphs: [
      'WEBSTELL provides custom design, development and digital services. Each project is scoped differently, so the signed proposal, statement of work, agreement or invoice terms for your project take priority over this general policy where they differ.',
      'This page explains the approach we normally follow when a client needs to cancel a project or ask about a refund.',
    ],
  },
  {
    title: 'Deposits and booking a project',
    paragraphs: [
      'A deposit or first milestone payment may be required to reserve production time and begin work. Once a project has started, that payment covers the time, planning and materials already committed to the work.',
      'Unless a project agreement says otherwise, deposits are non-refundable after work begins. This does not affect any rights that cannot be excluded under applicable law.',
    ],
  },
  {
    title: 'Cancelling before work begins',
    paragraphs: [
      'If you need to cancel before the agreed start date and before WEBSTELL has begun planning, research, design or production, contact us as soon as possible. We will confirm any refund or credit available after deducting reasonable payment-processing or administration costs.',
      'Where time has been reserved or preparatory work has already been completed, we may retain an amount that reflects that commitment.',
    ],
  },
  {
    title: 'Cancelling after work begins',
    paragraphs: [
      'You may ask to pause or cancel a project in writing at any time. You remain responsible for completed work, approved milestones, committed third-party costs and time reasonably required to close or hand over the project.',
      'Payments for completed custom services are generally not refundable. If a payment exceeds the value of work completed and committed costs, we will review the balance fairly and discuss the available options with you.',
    ],
  },
  {
    title: 'Changes, delays and approvals',
    paragraphs: [
      'Small revisions within the agreed scope are handled as described in your project agreement. Material changes, new features or delays caused by missing content, access or approvals may require a revised timeline and additional fees.',
      'If a project is inactive for an extended period, we may need to reschedule it or apply a restart fee. We will communicate this before taking that step whenever practical.',
    ],
  },
  {
    title: 'Refund requests',
    paragraphs: [
      'To request a refund or discuss a cancellation, email contact@webstell-studio.com with your project name, invoice number and the reason for your request. We will review the project record and respond with the next steps.',
      'Approved refunds are returned to the original payment method where possible. Processing times can vary by payment provider or bank.',
    ],
  },
];

export default function RefundPolicyPage() {
  return <LegalPage eyebrow="CLEAR EXPECTATIONS" title="Refund & Cancellation Policy" intro="A straightforward guide to deposits, project changes and cancellations for custom WEBSTELL work." sections={sections} heroVariant="refunds" />;
}
