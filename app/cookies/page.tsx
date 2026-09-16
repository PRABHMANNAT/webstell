import LegalPage, { type LegalSection } from '../LegalPage';

export const metadata = {
  title: 'Cookie Policy | WEBSTELL',
  description: 'How WEBSTELL uses cookies and similar technologies.',
};

const sections: LegalSection[] = [
  {
    title: 'What cookies are',
    paragraphs: [
      'Cookies are small text files placed on your device by a website. They can help a site remember information, keep features working and understand how people use a service. Similar technologies can include local storage, pixels and server-side identifiers.',
      'This policy explains how WEBSTELL uses these technologies on webstell-studio.com.',
    ],
  },
  {
    title: 'Cookies we use today',
    paragraphs: [
      'At the date this policy was last updated, the WEBSTELL website is designed to operate without advertising or analytics cookies. We do not currently use Google Analytics, Meta Pixel or similar marketing trackers on this site.',
      'Basic technical information may still be processed by the hosting, content delivery or email services that help run the site. That processing is covered by the relevant provider’s own policies and our Privacy Policy.',
    ],
  },
  {
    title: 'If this changes',
    paragraphs: [
      'If we add optional analytics, advertising or personalisation technologies in the future, we will update this policy. Where required, we will ask for your consent before placing non-essential cookies on your device.',
      'We will describe the purpose of each non-essential category and give you a clear way to manage your preferences.',
    ],
  },
  {
    title: 'Your browser controls',
    paragraphs: [
      'Most browsers let you view, delete or block cookies through their settings. You can usually find these controls in your browser’s privacy, security or site settings.',
      'Blocking all cookies can affect how some websites work. As this site does not rely on non-essential cookies at present, changing these settings should not prevent you from browsing the main site.',
    ],
  },
  {
    title: 'Questions and updates',
    paragraphs: [
      'If you have a question about cookies or similar technologies on this site, contact us at contact@webstell-studio.com.',
      'We may update this policy as the site changes. The date at the top of the page tells you when it was last revised.',
    ],
  },
];

export default function CookiePolicyPage() {
  return <LegalPage eyebrow="A SMALL EXPLANATION" title="Cookie Policy" intro="How this website uses cookies today—and what we will do if that changes." sections={sections} />;
}
