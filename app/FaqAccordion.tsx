'use client';

import { useState } from 'react';

import type { FaqItem } from './faq-data';

type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
};

export default function FaqAccordion({ items, className = '' }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`faq-accordion ${className}`.trim()}>
      {items.map((item, index) => (
        <details
          key={item.question}
          open={openIndex === index}
          onToggle={(event) => setOpenIndex(event.currentTarget.open ? index : null)}
        >
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
