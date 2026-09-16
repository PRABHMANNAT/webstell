import { fullFaqs } from '../faq-data';
import { whatsappUrl } from '../contact-utils';

export const pricingFaqs = fullFaqs.map((item) => ({
  ...item,
  answer: item.question === 'How much does a website cost?'
    ? 'A starter business website is estimated at ₹20,000–25,000. A website you can edit yourself is ₹27,000–35,000, an online store starts at ₹54,900, and custom software is typically ₹65,000–1,00,000 for the agreed starter scope. Choose what your business needs now, then add features when they are useful. We explain the scope and final price before you commit.'
    : item.answer,
  cta: {
    href: whatsappUrl(`Hi WEBSTELL! I am exploring your pricing. My question is: ${item.question} Please help me choose the right option for my business.`),
    label: 'Talk to us on WhatsApp',
  },
}));
