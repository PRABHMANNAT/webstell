'use client';

import Link from 'next/link';
import type { PointerEvent, ReactNode } from 'react';

export default function EyesLink({ href, children }: { href: string; children: ReactNode }) {
  const followPointer = (event: PointerEvent<HTMLAnchorElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const eyes = event.currentTarget.querySelector<HTMLElement>('.eyes-link-eyes')?.getBoundingClientRect();
    if (!eyes) return;
    const angle = Math.atan2(event.clientY - (eyes.top + eyes.height / 2), event.clientX - (eyes.left + eyes.width / 2));
    event.currentTarget.style.setProperty('--eyes-x', `${Math.cos(angle) * 4}px`);
    event.currentTarget.style.setProperty('--eyes-y', `${Math.sin(angle) * 3}px`);
  };

  const resetPointer = (event: PointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.removeProperty('--eyes-x');
    event.currentTarget.style.removeProperty('--eyes-y');
  };

  return (
    <Link className="eyes-link" href={href} onPointerMove={followPointer} onPointerLeave={resetPointer}>
      <span className="eyes-link-eyes" aria-hidden="true"><i><b /></i><i><b /></i></span>
      <span>{children}</span>
      <span className="eyes-link-arrow" aria-hidden="true">↗</span>
    </Link>
  );
}
