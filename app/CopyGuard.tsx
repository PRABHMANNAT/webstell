'use client';

import { useEffect } from 'react';

export default function CopyGuard() {
  useEffect(() => {
    const preventClipboardCopy = (event: ClipboardEvent) => event.preventDefault();
    const preventTextSelection = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest('input, textarea, [contenteditable="true"]')) event.preventDefault();
    };

    document.addEventListener('copy', preventClipboardCopy);
    document.addEventListener('cut', preventClipboardCopy);
    document.addEventListener('selectstart', preventTextSelection);

    return () => {
      document.removeEventListener('copy', preventClipboardCopy);
      document.removeEventListener('cut', preventClipboardCopy);
      document.removeEventListener('selectstart', preventTextSelection);
    };
  }, []);

  return null;
}
