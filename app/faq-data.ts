export type FaqItem = {
  question: string;
  answer: string;
  cta?: { href: string; label: string };
};

export const homepageFaqs: FaqItem[] = [
  {
    question: 'How much does a website cost?',
    answer:
      'Start with a package scope and request a written quote in INR, AUD or USD. Price depends on content, design, integrations, delivery and ongoing needs. We agree the full amount before work begins.',
    cta: { href: '/pricing', label: 'See pricing for your project' },
  },
  {
    question: 'How long does a project take?',
    answer:
      'A focused business website usually takes 2–3 weeks. Larger websites and stores often take 3–6 weeks, while custom software is scheduled after discovery. We confirm the timeline before work begins; prompt content and feedback help keep it on track.',
  },
  {
    question: 'What do you need from me?',
    answer:
      'We begin with your business, audience, goals, budget and examples you like. If available, share your logo, text, photographs and brand material. If those are not ready, tell us—we can include content and visual support in the scope.',
  },
  {
    question: 'Can I change the text, images or products myself?',
    answer:
      'Yes, when a content-management system is included in the scope. We can give your team a simple editing dashboard and walkthrough. If a fully custom build is more suitable, we agree on how future updates will be handled before starting.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'We test the agreed journeys, deploy the website, hand over access and show you how to use the parts you manage. The included launch-support period and any optional maintenance plan are stated in your proposal.',
  },
  {
    question: 'Will I own the finished website?',
    answer:
      'The proposal explains ownership and handover clearly. After final payment, we normally hand over the completed custom work and agreed account access. Third-party fonts, media, plugins and software remain subject to their own licences.',
  },
];

export const fullFaqs: FaqItem[] = [
  ...homepageFaqs,
  {
    question: 'Can you redesign my existing website?',
    answer:
      'Yes. We can improve the design, structure, speed or features of an existing website. We first review what should stay, what needs changing and how to protect useful links and content.',
  },
  {
    question: 'Will it work well on mobile phones?',
    answer:
      'Yes. We design for phones, tablets and desktops, then test the main journeys at different screen sizes before launch.',
  },
  {
    question: 'Are a domain and hosting included?',
    answer:
      'A standard, non-premium domain can be included for the first year when it is part of your agreed package. Hosting, renewals and paid services are confirmed clearly in your proposal.',
  },
  {
    question: 'Can customers pay or book through my website?',
    answer:
      'Yes. We can add online checkout, payment links or booking tools when they fit your project. You will need an approved account with the chosen payment or booking provider.',
  },
  {
    question: 'Will my website appear on Google?',
    answer:
      'We set up search-friendly foundations such as clear content, page titles and descriptions. Rankings take time and depend on your market, content and ongoing work.',
  },
  {
    question: 'Do you work with clients outside India?',
    answer:
      'Yes. We work remotely with teams in India and internationally, agreeing clear milestones, meeting times, currency and payment arrangements before work begins.',
  },
  {
    question: 'How do reviews and payments work?',
    answer:
      'We split the project into agreed stages so you can review the direction before moving forward. Your proposal explains the payment schedule, included feedback and how new requests are priced.',
  },
  {
    question: 'Can you build software or connect AI tools?',
    answer:
      'Yes. We can scope dashboards, customer portals, internal tools, useful AI assistants and integrations. We first review your workflow, data needs and ongoing service costs.',
  },
  {
    question: 'How do I share my project idea?',
    answer:
      'You can send a project brief, message us on WhatsApp or book a call. We will use your goals, scope and budget to recommend a clear next step.',
  },
];

// Include the additional questions explicitly selected for the homepage.
export const selectedHomepageFaqs = fullFaqs.filter(
  (item) =>
    homepageFaqs.includes(item) ||
    [
      'Can you redesign my existing website?',
      'Are a domain and hosting included?',
      'Can customers pay or book through my website?',
    ].includes(item.question),
);

export const agencyFaqs: FaqItem[] = [
  {
    question: 'Do you build software and SaaS as well as websites?',
    answer:
      'Yes. We scope customer portals, internal tools, SaaS products and mobile apps alongside websites and e-commerce. Discovery defines users, workflows, integrations, access and the smallest useful release.',
    cta: {
      href: '/services#custom-software',
      label: 'Explore software & SaaS',
    },
  },
  {
    question: 'How do you make AI useful and reliable?',
    answer:
      'We begin with a bounded task and approved information. We agree evaluation examples, human handoff, access controls and operating costs. AI can make mistakes, so consequential decisions stay with people.',
  },
  {
    question: 'Can you connect the tools our team already uses?',
    answer:
      'We review available APIs, permissions, data quality and provider limits before recommending an integration. Where a connection is not supported, we explain the constraints and alternatives.',
  },
  {
    question: 'Can you help with SEO after launch?',
    answer:
      'Yes. We can agree a programme of technical improvements, content priorities and conversion reviews. We measure useful signals and qualified enquiries; we do not guarantee rankings or revenue.',
  },
];
export const australiaFaqs: FaqItem[] = [
  {
    question: 'Where is Webstell based?',
    answer:
      'Webstell is a remote studio based in India, working with Australian and international businesses. We agree communication, meeting times and delivery milestones across time zones.',
  },
  {
    question: 'Can I receive a proposal in Australian dollars?',
    answer:
      'Yes. Australian visitors default to AUD, and you can change the quote currency on pricing or contact pages. The proposal separates project fees, ongoing services, third-party charges and any applicable taxes.',
  },
  {
    question: 'Do you build websites and workflows for tradies?',
    answer:
      'We can scope service-area websites, quote forms, job enquiries and automation for trade businesses. Your team supplies accurate licences, service coverage, job photographs and business details.',
  },
  {
    question: 'How do meetings work across Australian time zones?',
    answer:
      'Choose a preferred call time or send your availability. The schedule shows the studio time zone explicitly; meeting times are requests until our team confirms a time that works for both sides.',
  },
  ...agencyFaqs,
  {
    question: 'Will we own the finished work?',
    answer:
      'Your proposal defines ownership, handover and access after final payment. Third-party services, fonts and software remain subject to their own licences.',
  },
];
