import LegalPage, { type LegalSection } from '../LegalPage';

export const metadata = {
  title: 'Accessibility Statement | WEBSTELL',
  description: 'WEBSTELL’s commitment to making this website more accessible.',
};

const sections: LegalSection[] = [
  {
    title: 'Our commitment',
    paragraphs: [
      'WEBSTELL is committed to making webstell-studio.com usable by as many people as possible. We believe a strong digital experience should be clear, flexible and inclusive—not just visually distinctive.',
      'We are working toward alignment with the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA. Accessibility is an ongoing process, and we continue to improve the site as it evolves.',
    ],
  },
  {
    title: 'What we are doing',
    paragraphs: [
      'We build and review the site with practical accessibility in mind. This includes structure, interaction and the way content is presented across devices.',
    ],
    items: [
      'Using meaningful headings, landmarks and labels to support navigation.',
      'Providing visible keyboard focus and keeping key actions usable without a mouse.',
      'Writing clear link and button labels wherever possible.',
      'Adding text alternatives for informative images and avoiding colour as the only signal.',
      'Respecting reduced-motion preferences for interface animations.',
      'Reviewing layouts at smaller screen sizes and with browser zoom in mind.',
    ],
  },
  {
    title: 'Known limitations',
    paragraphs: [
      'Some visual content, embedded media or older elements may not yet meet every accessibility expectation. We may also link to third-party websites that are outside our control and may have different accessibility standards.',
      'We do not claim that every part of the site is fully accessible at all times. If something is difficult to use, we want to know so that we can help and improve it.',
    ],
  },
  {
    title: 'Feedback and help',
    paragraphs: [
      'If you experience a barrier, need information in a different format, or have a suggestion, email contact@webstell-studio.com. Please include the page you were using and a short description of what happened if you can.',
      'We aim to acknowledge accessibility feedback promptly and work with you on a suitable alternative where needed.',
    ],
  },
  {
    title: 'Reviewing this statement',
    paragraphs: [
      'We review this statement as the website and our accessibility practices change. The date at the top of the page shows when it was last updated.',
    ],
  },
];

export default function AccessibilityPage() {
  return <LegalPage eyebrow="ACCESS FOR EVERYONE" title="Accessibility Statement" intro="Our commitment to making WEBSTELL easier to use, understand and navigate for more people." sections={sections} heroVariant="accessibility" />;
}
