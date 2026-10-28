export const services = [
  {
    id: 'website-design-development',
    label: 'Websites & E-commerce',
    short: 'Websites & stores',
    number: '01',
    project: 'website',
    intro: 'A distinctive front door. A confident next step.',
    description:
      'Business websites and online stores that make your offer clear, feel effortless to use and connect interest to an enquiry or order.',
    details: [
      'Original interface design and responsive development',
      'Product catalogues, checkout and order journeys',
      'CMS, enquiry forms and booking integrations',
      'Technical SEO, analytics and launch handover',
    ],
    example:
      'From a café menu to a store with product variants and fulfilment rules.',
  },
  {
    id: 'custom-software',
    label: 'Custom Software & SaaS',
    short: 'Software & SaaS',
    number: '02',
    project: 'software',
    intro: 'Make your way of working work better.',
    description:
      'Customer portals, internal systems and SaaS products shaped around the people, permissions and workflows that matter to your business.',
    details: [
      'Discovery, product architecture and interactive prototypes',
      'Portals, dashboards and multi-role workflows',
      'Data modelling, integrations and migration planning',
      'Testing, staged releases and documented handover',
    ],
    example:
      'A service portal that connects requests, approvals, documents and reporting.',
  },
  {
    id: 'ai-chatbots-automation',
    label: 'AI Chatbots & Automation',
    short: 'AI & automation',
    number: '03',
    project: 'ai',
    intro: 'Give repetitive work a better system.',
    description:
      'Useful assistants and connected workflows with clear boundaries, reliable handoffs and a person in control of important decisions.',
    details: [
      'Knowledge-grounded website or messaging assistants',
      'Lead qualification and human escalation',
      'CRM, inbox and operations workflow integrations',
      'Evaluation, failure handling and usage-cost planning',
    ],
    example:
      'An enquiry assistant that collects the right details and routes a qualified brief.',
  },
  {
    id: 'portfolios',
    label: 'Portfolios (Personal & Brand)',
    short: 'Personal & brand portfolios',
    number: '04',
    project: 'portfolio',
    intro: 'Make your best work easier to choose.',
    description:
      'An authored home for founders, professionals, creatives and brands, built around your point of view and the opportunities you want next.',
    details: [
      'Positioning, story and content structure',
      'Selected work and case-study layouts',
      'Personal or brand visual direction',
      'Enquiry, contact and CMS options',
    ],
    example:
      'A designer’s selected work, a founder’s profile or a brand’s collection.',
  },
  {
    id: 'growth-seo-optimisation',
    label: 'SEO & Growth',
    short: 'SEO & growth',
    number: '05',
    project: 'seo',
    intro: 'Be easier to find. Give people a reason to act.',
    description:
      'Search strategy, technical improvements and measured conversion work that connect your content with the questions customers already ask.',
    details: [
      'Technical and content audits with priorities',
      'Local search and service-page structure',
      'Analytics, conversion events and useful reporting',
      'Content plans and ongoing optimisation',
    ],
    example:
      'Turn scattered service pages into a clear search and enquiry journey. No ranking guarantees.',
  },
  {
    id: 'mobile-apps',
    label: 'Mobile Apps',
    short: 'Mobile apps',
    number: '06',
    project: 'mobile',
    intro: 'Useful in the moments that matter.',
    description:
      'Mobile products for customers and teams, from the first prototype to the everyday journeys people return to.',
    details: [
      'iOS and Android product and interface planning',
      'Accounts, notifications and device integrations',
      'API connections and offline scope where needed',
      'Real-device testing and app-store submission support',
    ],
    example:
      'A booking companion, a field-team tool or a customer self-service app.',
  },
] as const;

export const industries = [
  {
    id: 'cafes-restaurants',
    name: 'Cafés & Restaurants',
    tagline: 'From “what’s on the menu?” to a table booked.',
    need: 'Keep menus, hours and booking information clear on a phone.',
    features: [
      'Editable menus and dietary notes',
      'Reservations or ordering integrations',
      'Location, opening hours and enquiry routes',
    ],
    workflow:
      'Guest finds the menu → chooses a visit or order → your team receives the details.',
    project: 'website',
    filter: 'food',
  },
  {
    id: 'sweets-beverages',
    name: 'Sweets & Beverages',
    tagline: 'Make every collection easier to order.',
    need: 'Explain gifting, seasonal products and custom orders without a long message thread.',
    features: [
      'Product and gifting collections',
      'Custom-order enquiry with quantities',
      'Pickup, delivery and seasonal availability',
    ],
    workflow:
      'Customer browses → selects a collection → orders or requests a custom quote.',
    project: 'store',
    filter: 'food',
  },
  {
    id: 'beauty-makeup',
    name: 'Beauty & Makeup',
    tagline: 'Let your work start the conversation.',
    need: 'Connect services, genuine work galleries and appointment requests.',
    features: [
      'Service menus and real before/after work',
      'Booking-provider integration',
      'Bridal and event enquiry flows',
    ],
    workflow:
      'Client explores a service → checks your work → requests an appointment.',
    project: 'website',
    filter: 'fashion',
  },
  {
    id: 'jewellery-fashion',
    name: 'Jewellery & Fashion',
    tagline: 'Give the details room to sell.',
    need: 'Make collections, variants and product care easy to understand.',
    features: [
      'Collections, size and material guides',
      'Variants, payments and stock integrations',
      'Custom-design and styling enquiries',
    ],
    workflow:
      'Shopper discovers a collection → compares details → checks out confidently.',
    project: 'store',
    filter: 'fashion',
  },
  {
    id: 'furniture-home',
    name: 'Furniture & Home Essentials',
    tagline: 'Help people picture the right fit.',
    need: 'Show dimensions, materials, availability and delivery expectations.',
    features: [
      'Detailed product and room collections',
      'Delivery-area and lead-time information',
      'Custom-size and trade enquiries',
    ],
    workflow:
      'Buyer compares products → checks fit and delivery → orders or requests advice.',
    project: 'store',
    filter: 'places',
  },
  {
    id: 'retail',
    name: 'Retail Stores',
    tagline: 'Connect the counter and the catalogue.',
    need: 'Bring products, orders and customer questions into a manageable workflow.',
    features: [
      'Storefront and product catalogue',
      'Payment, inventory and delivery integrations',
      'Repeat-order and customer-support flows',
    ],
    workflow:
      'Order arrives → stock and fulfilment update → customer receives useful information.',
    project: 'store',
    filter: 'all',
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    tagline: 'Turn property interest into useful enquiries.',
    need: 'Help buyers find relevant listings and give agents meaningful context.',
    features: [
      'Searchable property listings',
      'Inspection and callback requests',
      'CRM routing and lead qualification',
    ],
    workflow:
      'Buyer filters properties → requests a viewing → the right agent receives the brief.',
    project: 'software',
    filter: 'places',
  },
  {
    id: 'clinics',
    name: 'Clinics',
    tagline: 'Clear information. A calmer booking journey.',
    need: 'Explain services and appointment options without collecting unnecessary health details.',
    features: [
      'Practitioner and service information',
      'Booking links and general enquiries',
      'Accessible layouts and privacy-conscious forms',
    ],
    workflow:
      'Visitor finds the right service → books through an approved provider → receives next steps.',
    project: 'website',
    filter: 'health',
  },
  {
    id: 'australian-tradies',
    name: 'Australian Tradies',
    tagline: 'Less chasing leads. More clarity before the job.',
    need: 'Help customers understand your services, coverage and what to include in a quote request.',
    features: [
      'Service-area and project galleries',
      'Job-type, suburb and photo enquiries',
      'Quote follow-ups and CRM automation',
    ],
    workflow:
      'Customer describes the job → you review the scope → quote and follow-up stay organised.',
    project: 'automation',
    filter: 'places',
  },
] as const;

export function enquiryHref(
  project: string,
  detail: string,
  extra: Record<string, string> = {},
) {
  return `/contact?${new URLSearchParams({ source: 'services', project, detail, ...extra }).toString()}`;
}
