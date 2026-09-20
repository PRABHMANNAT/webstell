import LegalPage, { type LegalSection } from '../LegalPage';
import { createPageMetadata } from '../seo-metadata';

export const metadata = createPageMetadata({
  title: 'Terms & Conditions | Webstell',
  description:
    'Review the terms governing use of the Webstell website, including acceptable use, intellectual property, third-party links and liability.',
  path: '/terms',
});

const sections: LegalSection[] = [
  {
    title: 'Using this website',
    paragraphs: [
      'These Terms of Use govern your use of webstell-studio.com. By accessing or using the site, you agree to these terms. If you do not agree, please do not use the site.',
      'The site is provided to help you learn about WEBSTELL and start a conversation about potential work. You may use it for lawful, personal or business purposes only.',
    ],
  },
  {
    title: 'Our content and intellectual property',
    paragraphs: [
      'The site’s design, copy, graphics, images, videos, code, logos and other materials are owned by or licensed to WEBSTELL and are protected by applicable intellectual property laws.',
      'You may view and share links to the site for legitimate purposes. You may not copy, reproduce, adapt, publish, sell, reverse engineer or exploit site content without our prior written permission, except where the law allows it.',
    ],
  },
  {
    title: 'Project examples and third-party material',
    paragraphs: [
      'Project previews may describe WEBSTELL concepts, independent references or work contributed to with partner and client teams. Any specific label or attribution shown beside a project controls how that project should be understood.',
      'Names, logos, screenshots and links belonging to third parties remain the property of their respective owners. Their appearance does not imply an endorsement, partnership or ownership relationship unless we say so expressly.',
    ],
  },
  {
    title: 'Enquiries and communications',
    paragraphs: [
      'When you send a form, request a call or subscribe for updates, you confirm that the information is accurate and that you are entitled to provide it. Sending an enquiry does not create a client, agency, employment or other contractual relationship.',
      'We may respond to genuine enquiries, but we are not obliged to accept every request, provide a proposal or begin work. Any project work is governed by a separate written agreement, statement of work or invoice terms agreed with the client.',
    ],
  },
  {
    title: 'Links to other websites',
    paragraphs: [
      'This site may link to websites or services operated by others. We provide those links for convenience only and do not control, endorse or take responsibility for their content, availability, privacy practices or security.',
      'Your use of any third-party site is subject to that site’s own terms and policies.',
    ],
  },
  {
    title: 'Availability and liability',
    paragraphs: [
      'We aim to keep the site accurate, useful and available, but we do not guarantee that it will always be uninterrupted, error-free, secure or suitable for every purpose. Information on the site is provided for general information and may change without notice.',
      'To the fullest extent permitted by law, WEBSTELL is not liable for indirect, incidental, special, consequential or punitive losses arising from use of, or inability to use, this site. Nothing in these terms limits liability that cannot legally be limited.',
    ],
  },
  {
    title: 'Changes and contact',
    paragraphs: [
      'We may change these Terms of Use from time to time. Updated terms apply when they are published here. If a change is material, we will take reasonable steps to make it clear on the site.',
      'Questions about these terms can be sent to contact@webstell-studio.com.',
    ],
  },
];

export default function TermsPage() {
  return <LegalPage eyebrow="THE GROUND RULES" title="Terms of Use" intro="The simple terms that apply when you browse, share or get in touch through the WEBSTELL website." sections={sections} heroVariant="terms" />;
}
