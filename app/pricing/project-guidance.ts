import type { ProjectTypeId } from '../pricing-data';

export const projectGuidance: Record<ProjectTypeId, { included: string; goals: string[] }> = {
  website: { included: 'Your services, customer enquiries, WhatsApp contact, mobile layouts and search-friendly page titles.', goals: ['Get more customer enquiries', 'Help local customers find us', 'Explain our services clearly'] },
  portfolio: { included: 'A work gallery, your story, a contact form and a layout that looks good on phones.', goals: ['Win more client projects', 'Find job opportunities', 'Show my best work'] },
  store: { included: 'Product listings, a shopping basket, order management and a checkout journey. Add payments below.', goals: ['Sell products online', 'Encourage repeat purchases', 'Make ordering easier'] },
  software: { included: 'A scoped business workflow, a clear dashboard, data entry and testing of the agreed tasks.', goals: ['Save time on daily work', 'Organise customer information', 'Reduce manual mistakes'] },
  mobile: { included: 'An agreed customer journey, mobile interface design and testing on the agreed devices.', goals: ['Get more app users', 'Keep customers coming back', 'Let customers act on the go'] },
};
