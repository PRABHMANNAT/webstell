export const projectTypes = [
  {
    id: 'website',
    name: 'Business website',
    price: 20000,
    description: 'A confident home for your business, with room for your story and next customer.',
    includedUnits: 5,
    unitLabel: 'pages',
    extraUnitLabel: 'extra page',
    extraUnitPrice: 1500,
    delivery: [2, 3] as const,
    domainEligible: true,
  },
  {
    id: 'portfolio',
    name: 'Personal portfolio',
    price: 20000,
    description: 'A considered place for your work, point of view and next opportunity.',
    includedUnits: 5,
    unitLabel: 'pages',
    extraUnitLabel: 'extra page',
    extraUnitPrice: 1500,
    delivery: [2, 3] as const,
    domainEligible: true,
  },
  {
    id: 'store',
    name: 'Online store',
    price: 30000,
    description: 'A shopping experience that makes browsing, paying and ordering feel simple.',
    includedUnits: 6,
    unitLabel: 'pages',
    extraUnitLabel: 'extra page',
    extraUnitPrice: 2000,
    delivery: [3, 4] as const,
    domainEligible: true,
  },
  {
    id: 'software',
    name: 'Custom software',
    price: 45000,
    description: 'A focused estimate for a dashboard, portal or web app with a clear first job.',
    includedUnits: 4,
    unitLabel: 'core screens',
    extraUnitLabel: 'extra screen',
    extraUnitPrice: 3000,
    delivery: [4, 6] as const,
    domainEligible: false,
  },
  {
    id: 'mobile',
    name: 'Mobile app',
    price: 60000,
    description: 'A focused mobile product estimate, shaped around one useful customer journey.',
    includedUnits: 5,
    unitLabel: 'core screens',
    extraUnitLabel: 'extra screen',
    extraUnitPrice: 3500,
    delivery: [5, 7] as const,
    domainEligible: false,
  },
] as const;

export type ProjectTypeId = (typeof projectTypes)[number]['id'];

export const extras = [
  {
    id: 'chatbot',
    name: 'A chatbot for visitors',
    detail: 'Answer common questions and collect useful enquiries.',
    price: 5000,
    effort: 1,
    availableFor: ['website', 'portfolio', 'store', 'software'] as ProjectTypeId[],
    recommendedFor: ['website', 'store'] as ProjectTypeId[],
  },
  {
    id: 'payments',
    name: 'Accept online payments',
    detail: 'Connect a payment gateway for checkout or payment links.',
    price: 4000,
    effort: 1,
    availableFor: ['website', 'portfolio', 'store', 'software', 'mobile'] as ProjectTypeId[],
    recommendedFor: ['store', 'mobile'] as ProjectTypeId[],
  },
  {
    id: 'cms',
    name: 'Update the website myself',
    detail: 'A custom editing space for your text, images and pages.',
    price: 7000,
    effort: 1,
    availableFor: ['website', 'portfolio', 'store'] as ProjectTypeId[],
    recommendedFor: ['website', 'portfolio'] as ProjectTypeId[],
  },
  {
    id: 'booking',
    name: 'Bookings & appointments',
    detail: 'Let customers choose a date and time that works for them.',
    price: 4000,
    effort: 1,
    availableFor: ['website', 'portfolio', 'store', 'software', 'mobile'] as ProjectTypeId[],
    recommendedFor: ['website'] as ProjectTypeId[],
  },
  {
    id: 'blog',
    name: 'A blog or journal',
    detail: 'Publish stories, news and useful articles without a developer.',
    price: 3000,
    effort: 1,
    availableFor: ['website', 'portfolio', 'store'] as ProjectTypeId[],
    recommendedFor: ['website', 'portfolio'] as ProjectTypeId[],
  },
  {
    id: 'accounts',
    name: 'Customer accounts',
    detail: 'Secure sign-in and a personal space for your customers.',
    price: 5000,
    effort: 1,
    availableFor: ['store', 'software', 'mobile'] as ProjectTypeId[],
    recommendedFor: ['store', 'software'] as ProjectTypeId[],
  },
  {
    id: 'languages',
    name: 'Another language',
    detail: 'Reach more people with a second language and clear structure.',
    price: 5000,
    effort: 1,
    availableFor: ['website', 'portfolio', 'store', 'software', 'mobile'] as ProjectTypeId[],
    recommendedFor: ['website', 'store'] as ProjectTypeId[],
  },
  {
    id: 'automation',
    name: 'Connect my business tools',
    detail: 'Send leads to your CRM or automate a routine business task.',
    price: 6000,
    effort: 1,
    availableFor: ['website', 'store', 'software', 'mobile'] as ProjectTypeId[],
    recommendedFor: ['software', 'mobile'] as ProjectTypeId[],
  },
  {
    id: 'content',
    name: 'Help with the words',
    detail: 'Clear, useful website copy shaped around your business.',
    price: 3500,
    effort: 1,
    availableFor: ['website', 'portfolio', 'store'] as ProjectTypeId[],
    recommendedFor: ['website', 'portfolio'] as ProjectTypeId[],
  },
] as const;

export const money = (value: number) => '₹' + value.toLocaleString('en-IN');

export const MAX_EXTRA_UNITS = 24;

export function getProjectType(id: string) {
  return projectTypes.find((item) => item.id === id) || projectTypes[0];
}

export function getAvailableExtras(type: string) {
  const project = getProjectType(type);
  return extras.filter((item) => item.availableFor.includes(project.id));
}

export function estimateDelivery(
  type: string,
  selected: string[],
  extraUnits: number,
) {
  const project = getProjectType(type);
  const additions = getAvailableExtras(project.id).filter((item) =>
    selected.includes(item.id),
  );
  const featureWeeks = Math.ceil(
    additions.reduce((sum, item) => sum + item.effort, 0) / 3,
  );
  const unitWeeks = Math.ceil(Math.max(0, extraUnits) / 6);
  const [min, max] = project.delivery;
  return `${min + featureWeeks + unitWeeks}–${max + featureWeeks + unitWeeks} weeks`;
}

export function calculateEstimate(
  type: string,
  selected: string[],
  ownDomain: boolean,
  extraUnits: number,
) {
  const project = getProjectType(type);
  const additions = getAvailableExtras(project.id).filter((item) =>
    selected.includes(item.id),
  );
  const normalizedUnits = Math.min(
    MAX_EXTRA_UNITS,
    Math.max(0, Math.floor(extraUnits || 0)),
  );
  const unitCost = normalizedUnits * project.extraUnitPrice;
  const domainSaving = ownDomain && project.domainEligible ? 3500 : 0;
  const subtotal =
    project.price +
    additions.reduce((sum, item) => sum + item.price, 0) +
    unitCost -
    domainSaving;
  const total = Math.max(15000, subtotal);
  const deposit = Math.round((total * 0.5) / 500) * 500;

  return {
    project,
    additions,
    unitCost,
    extraUnits: normalizedUnits,
    domainSaving,
    total,
    deposit,
    delivery: estimateDelivery(project.id, selected, normalizedUnits),
  };
}
