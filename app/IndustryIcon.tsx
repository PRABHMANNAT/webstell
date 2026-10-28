import type { ReactNode } from 'react';
import type { IndustryId } from './service-catalog';

const drawings: Record<IndustryId, ReactNode> = {
  'cafes-restaurants': (
    <>
      <path d="M10 22h23v10a9 9 0 0 1-9 9h-5a9 9 0 0 1-9-9Z" />
      <path d="M33 23h3a6 6 0 0 1 0 12h-4M7 42h29M16 16c-4-4 4-5 0-9M24 16c-4-4 4-5 0-9" />
      <path
        className="industry-icon-accent"
        d="M12 27h19v5a7 7 0 0 1-7 7h-5a7 7 0 0 1-7-7Z"
      />
    </>
  ),
  'sweets-beverages': (
    <>
      <path d="M9 25h30v16H9ZM9 31c5-7 10 7 15 0s10 7 15 0M7 42h34M13 25v-8h22v8M24 17v-6" />
      <path className="industry-icon-accent" d="M24 4c-5 5-4 8 0 8s5-3 0-8Z" />
      <path d="M15 36v3M33 36v3" />
    </>
  ),
  'beauty-makeup': (
    <>
      <circle cx="19" cy="29" r="13" />
      <circle className="industry-icon-accent" cx="19" cy="29" r="9" />
      <path d="m31 13 4-7 7 4-4 7ZM31 13l7 4-7 21-5-3ZM14 29h10M19 24v10M11 10h6M14 7v6" />
    </>
  ),
  'jewellery-fashion': (
    <>
      <path d="m7 17 8-9h18l8 9-17 23ZM7 17h34M15 8l3 9 6 23 6-23 3-9M18 17l6-9 6 9" />
      <path className="industry-icon-accent" d="m20 19 4 14 4-14Z" />
      <path d="M40 32v8M36 36h8" />
    </>
  ),
  'furniture-home': (
    <>
      <path d="M13 27V14a6 6 0 0 1 6-6h10a6 6 0 0 1 6 6v13M12 22a5 5 0 0 0-5 5v10h34V27a5 5 0 0 0-10 0v4H17v-4a5 5 0 0 0-5-5ZM12 37v5M36 37v5" />
      <path className="industry-icon-accent" d="M19 13h10v13H19Z" />
    </>
  ),
  retail: (
    <>
      <path d="M9 22v20h30V22M5 15l5-9h28l5 9v6a5 5 0 0 1-9 3 6 6 0 0 1-10 0 6 6 0 0 1-10 0 5 5 0 0 1-9-3ZM5 15h38M19 42V30h10v12" />
      <path
        className="industry-icon-accent"
        d="M12 8h7l-2 5H9ZM29 8h7l3 5h-8Z"
      />
    </>
  ),
  'real-estate': (
    <>
      <path d="m5 23 19-16 19 16M11 20v21h26V20M20 41V29h8v12" />
      <path className="industry-icon-accent" d="M17 21h14v5H17Z" />
      <path d="M34 10V5h5v10M6 42h36" />
    </>
  ),
  clinics: (
    <>
      <path d="M8 42V14h32v28M17 14V7h14v7M6 42h36M19 42V31h10v11M13 34h2M33 34h2" />
      <path
        className="industry-icon-accent"
        d="M22 18h4v4h4v4h-4v4h-4v-4h-4v-4h4Z"
      />
    </>
  ),
  'australian-tradies': (
    <>
      <path d="m10 36 18-18 6 6-18 18ZM25 15l9-9 9 9-9 9M7 18h13M9 14l-3 4 3 4M5 42h38" />
      <path
        className="industry-icon-accent"
        d="m28 15 6-6 6 6-6 6ZM12 35l3-3 4 4-3 3Z"
      />
    </>
  ),
};

export default function IndustryIcon({ industry }: { industry: IndustryId }) {
  return (
    <svg
      className="industry-icon"
      viewBox="0 0 48 48"
      width="48"
      height="48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {drawings[industry]}
    </svg>
  );
}
