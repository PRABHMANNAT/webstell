import LegalPage, { type LegalSection } from '../LegalPage';
import { createPageMetadata } from '../seo-metadata';

export const metadata = createPageMetadata({
  title: 'Privacy Policy | Webstell',
  description:
    'Read how Webstell collects, uses, stores and protects personal information submitted through its website, contact forms and project enquiries.',
  path: '/privacy',
});

const sections: LegalSection[] = [
  {
    title: 'Who this applies to',
    paragraphs: [
      'This Privacy Policy explains how WEBSTELL handles personal information collected through webstell-studio.com, including when you contact us, request a call, submit a project brief or subscribe for updates.',
      'In this policy, “WEBSTELL”, “we”, “us” and “our” refer to the WEBSTELL studio. This policy applies to information collected through this website, not to information collected by third-party sites we may link to.',
    ],
  },
  {
    title: 'Information you share',
    paragraphs: [
      'We collect the information you choose to send through our forms or email. That can include your name, email address, WhatsApp number, business name, project type, goals, budget range, preferred timing and any reference links or notes you provide.',
      'If you subscribe for updates, we collect the email address you enter. We may also receive limited technical information that is routinely provided when a website is visited, such as browser type and basic server logs.',
    ],
    items: [
      'Contact details so we can reply to an enquiry or call request.',
      'Project information so we can understand the work you are considering.',
      'Subscription details so we can send occasional WEBSTELL updates.',
    ],
  },
  {
    title: 'How we use it',
    paragraphs: [
      'We use personal information to respond to your enquiry, arrange a call, prepare or discuss a proposal, provide our services, send updates you have asked for, and keep the website secure and functioning properly.',
      'We do not sell personal information. We do not use the information in your enquiry to make automated decisions about you.',
    ],
  },
  {
    title: 'How information is shared',
    paragraphs: [
      'Form submissions are sent to WEBSTELL through our email delivery provider, Resend, and are accessible to the WEBSTELL team handling your request. Service providers only receive information needed to operate their service for us.',
      'We may also disclose information where required by law, to protect our rights or safety, or as part of a business reorganisation. We do not otherwise share your personal information without a valid reason.',
    ],
  },
  {
    title: 'How long we keep it',
    paragraphs: [
      'We keep enquiry and project information for as long as reasonably necessary to respond, maintain our business records, resolve questions and meet legal or accounting obligations. We remove or anonymise information when it is no longer needed.',
      'You can ask us to remove your details from future updates at any time. Some information may need to be retained where the law requires it or where it is needed to establish, exercise or defend legal claims.',
    ],
  },
  {
    title: 'Your choices and rights',
    paragraphs: [
      'Depending on where you live, you may have rights to request access to, correction of, deletion of, or a copy of your personal information, and to object to or restrict certain processing. You may also withdraw consent where processing relies on consent.',
      'To make a request, email contact@webstell-studio.com. We may need to confirm your identity before responding. You may also have the right to complain to your local data protection authority.',
    ],
  },
  {
    title: 'Security and updates',
    paragraphs: [
      'We use reasonable organisational and technical measures to protect information in our care. No method of sending or storing data online is completely secure, so please avoid including sensitive information that is not needed for your enquiry.',
      'We may update this policy as our services or legal obligations change. The date at the top shows when it was last revised.',
    ],
  },
];

export default function PrivacyPage() {
  return <LegalPage eyebrow="YOUR PRIVACY" title="Privacy Policy" intro="A clear explanation of the information you share with us, why we use it and the choices you have." sections={sections} heroVariant="privacy" />;
}
