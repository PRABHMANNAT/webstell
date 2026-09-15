'use client';

import { useEffect, useRef, useState } from 'react';

export function useInViewport<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setIsInViewport(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isInViewport };
}
