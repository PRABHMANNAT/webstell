'use client';

import { useId } from 'react';

import type { FaqItem } from './faq-data';

type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
};

export default function FaqAccordion({ items, className = '' }: FaqAccordionProps) {
  const groupName = useId();

  return (
    <div className={`faq-accordion ${className}`.trim()}>
      {items.map((item) => (
        <details
          key={item.question}
          name={groupName}
        >
          <summary>
            <span className="faq-question">{item.question}</span>
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
