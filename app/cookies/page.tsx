import LegalPage, { type LegalSection } from '../LegalPage';
import { createPageMetadata } from '../seo-metadata';

export const metadata = createPageMetadata({
  title: 'Cookie Policy | Webstell',
  description:
    'Learn how Webstell uses cookies and similar technologies, which technical information may be processed and what choices visitors have.',
  path: '/cookies',
});

const sections: LegalSection[] = [
  {
    title: 'What cookies are',
    paragraphs: [
      'Cookies are small text files placed on your device by a website. They can help a site remember information, keep features working and understand how people use a service. Similar technologies can include local storage, pixels and server-side identifiers.',
      'This policy explains how WEBSTELL uses these technologies on webstell-studio.com.',
    ],
  },
  {
    title: 'Essential preferences',
    paragraphs: [
      'WEBSTELL uses first-party browser storage to remember whether you accepted or rejected optional analytics. This preference contains only the words “accepted” or “rejected” and does not contain your name, email address, phone number, form entries or other personal details.',
      'Basic technical information may still be processed by the hosting, content delivery or email services that help run the site. That processing is covered by the relevant provider’s own policies and our Privacy Policy.',
    ],
  },
  {
    title: 'Optional analytics',
    paragraphs: [
      'If you accept analytics, WEBSTELL uses Google Analytics 4 to understand broad patterns such as which pages are visited and which website actions are useful. Google Analytics may then use cookies such as _ga and _ga_* to distinguish visits and produce aggregated reports.',
      'Analytics storage is denied by default. Advertising storage, advertising user data, advertising personalisation and personalisation storage remain denied whether you accept or reject analytics. We do not send names, email addresses, phone numbers or form contents to Google Analytics.',
    ],
  },
  {
    title: 'Managing your choice',
    paragraphs: [
      'You can accept or reject analytics when the privacy banner appears. Your choice is remembered on that browser so the banner does not appear on every visit.',
      'You can change your choice at any time by selecting “Cookie settings” in the website footer. Rejecting non-essential cookies updates Google Consent Mode so analytics storage remains denied.',
    ],
  },
  {
    title: 'Your browser controls',
    paragraphs: [
      'Most browsers let you view, delete or block cookies through their settings. You can usually find these controls in your browser’s privacy, security or site settings.',
      'Blocking or deleting optional analytics cookies does not prevent you from browsing the main site. Clearing this site’s browser storage may cause the privacy banner to appear again so you can make a new choice.',
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
  return <LegalPage eyebrow="A SMALL EXPLANATION" title="Cookie Policy" intro="How this website uses essential preferences and optional analytics cookies." sections={sections} heroVariant="cookies" />;
}
