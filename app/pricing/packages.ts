export type Tier = 'starter' | 'growth' | 'custom';
export const packageCategories = [
  {
    id: 'website',
    label: 'Websites',
    headline: 'A stronger place to start.',
    scope: ['A focused business website', 'An editable, expanding website'],
    features: [
      [
        'Up to five core pages',
        'Original responsive design',
        'Enquiry form and search foundations',
      ],
      [
        'Content management and team handover',
        'Expanded service and content structure',
        'Conversion-event setup',
      ],
    ],
    extras: [[], ['cms', 'content']],
    recurring: false,
  },
  {
    id: 'store',
    label: 'E-commerce',
    headline: 'Turn a collection into a store.',
    scope: ['A focused online store', 'A connected commerce experience'],
    features: [
      [
        'Agreed catalogue and product templates',
        'Cart, checkout and payment integration',
        'Order-management walkthrough',
      ],
      [
        'Richer catalogue and collection journeys',
        'Shipping integration and customer accounts',
        'Merchandising and launch review',
      ],
    ],
    extras: [['payments'], ['payments', 'shipping', 'accounts']],
    recurring: false,
  },
  {
    id: 'software',
    label: 'Software & SaaS',
    headline: 'Build the system you actually need.',
    scope: [
      'A focused first product release',
      'A connected product for growing teams',
    ],
    features: [
      [
        'One core workflow and prototype',
        'Agreed data model and core screens',
        'Testing and technical handover',
      ],
      [
        'Multiple roles and connected workflows',
        'Reporting and integration planning',
        'Staged releases and operational guidance',
      ],
    ],
    extras: [[], ['roles', 'reports']],
    recurring: false,
  },
  {
    id: 'ai',
    label: 'AI solutions',
    headline: 'Helpful intelligence, with boundaries.',
    scope: [
      'A focused knowledge assistant',
      'An assistant connected to your workflows',
    ],
    features: [
      [
        'One approved knowledge source',
        'Evaluation against agreed questions',
        'Human handoff and usage visibility',
      ],
      [
        'Connected knowledge and business tools',
        'Lead routing and escalation workflows',
        'Expanded evaluation and monitoring',
      ],
    ],
    extras: [
      ['knowledge', 'handoff'],
      ['knowledge', 'handoff', 'automation', 'monitoring'],
    ],
    recurring: false,
  },
  {
    id: 'automation',
    label: 'Automation',
    headline: 'Let useful work keep moving.',
    scope: [
      'One repetitive workflow, connected',
      'A coordinated set of business workflows',
    ],
    features: [
      [
        'Workflow mapping and exception planning',
        'An agreed tool-to-tool connection',
        'Failure alerts and handover',
      ],
      [
        'Multiple connected processes',
        'Reporting, review and retry handling',
        'Access and operational documentation',
      ],
    ],
    extras: [['monitoring'], ['monitoring', 'reports', 'roles']],
    recurring: false,
  },
  {
    id: 'portfolio',
    label: 'Portfolios',
    headline: 'Give your work the right setting.',
    scope: [
      'A personal or brand portfolio',
      'A portfolio you can keep building on',
    ],
    features: [
      [
        'Story, selected work and contact',
        'Responsive custom design',
        'Search and sharing metadata',
      ],
      [
        'CMS and detailed work stories',
        'Content direction and flexible layouts',
        'Editing walkthrough',
      ],
    ],
    extras: [[], ['cms', 'case-studies', 'content']],
    recurring: false,
  },
  {
    id: 'seo',
    label: 'SEO & growth',
    headline: 'Build on evidence, not promises.',
    scope: [
      'A focused ongoing optimisation plan',
      'A broader search and conversion programme',
    ],
    features: [
      [
        'Initial audit and priority roadmap',
        'Agreed monthly optimisation scope',
        'Clear reporting and review',
      ],
      [
        'Content briefs and local search planning',
        'Conversion analysis and technical improvements',
        'Ongoing reporting and prioritisation',
      ],
    ],
    extras: [[], ['local-search', 'reports']],
    recurring: true,
  },
  {
    id: 'mobile',
    label: 'Mobile apps',
    headline: 'A better experience in their hands.',
    scope: ['One useful mobile journey', 'A connected customer or team app'],
    features: [
      [
        'Product scope and interface prototype',
        'Agreed iOS or Android platform scope',
        'Device testing and release handover',
      ],
      [
        'Connected accounts and backend workflows',
        'Notifications and richer user journeys',
        'App-store submission support',
      ],
    ],
    extras: [[], ['accounts', 'notifications']],
    recurring: false,
  },
] as const;

export function getPackageCategory(id: string) {
  return (
    packageCategories.find((category) => category.id === id) ??
    packageCategories[0]
  );
}
export function includedExtras(id: string, tier: Tier): string[] {
  return tier === 'custom'
    ? []
    : [...getPackageCategory(id).extras[tier === 'growth' ? 1 : 0]];
}
