'use client';

import type { FaqItem } from './faq-data';

type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
};

export default function FaqAccordion({ items, className = '' }: FaqAccordionProps) {
  return (
    <div className={`faq-accordion ${className}`.trim()}>
      {items.map((item) => (
        <details key={item.question}>
          <summary>
            <span>{item.question}</span>
            <i aria-hidden="true">+</i>
          </summary>
          <div className="faq-answer">
            <div>
              <p>{item.answer}</p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
