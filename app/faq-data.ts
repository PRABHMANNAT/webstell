export type FaqItem = {
  question: string;
  answer: string;
};

export const homepageFaqs: FaqItem[] = [
  {
    question: 'How much does a website cost?',
    answer:
      'A custom business website currently starts at ₹25,000. The final price depends on the number of pages, content, integrations and features such as payments, bookings or a CMS. You can build a starting estimate on our Pricing page before contacting us.',
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
export const selectedHomepageFaqs = fullFaqs.filter((item) =>
  homepageFaqs.includes(item) || [
    'Can you redesign my existing website?',
    'Are a domain and hosting included?',
    'Can customers pay or book through my website?',
  ].includes(item.question),
);
