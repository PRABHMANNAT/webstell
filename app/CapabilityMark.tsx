import type { ReactNode } from 'react';

const marks = {
  website: (
    <>
      <path d="M10 9h42l-2 37H13Z" fill="#eae9dd" />
      <path d="m52 9 6 5-2 36-6-4Z" fill="#aeb4a0" />
      <path d="m13 46 37 0 6 4H17Z" fill="#c8cbbd" />
      <rect x="17" y="15" width="28" height="23" rx="3" fill="#252b24" />
      <path d="m24 26 5 4 10-9" fill="none" stroke="#d7ff46" />
      <path d="M22 51h20l5 6H17Z" fill="#eae9dd" />
      <circle cx="43" cy="42" r="1" fill="#252b24" />
    </>
  ),
  store: (
    <>
      <path d="m13 23 36-4 5 34-36 4Z" fill="#eae9dd" />
      <path d="m49 19 6 5 5 32-6-3Z" fill="#aeb4a0" />
      <path d="M23 24v-7a10 10 0 0 1 20-2v7" fill="none" />
      <path d="m25 34 17-2 1 13-17 2Z" fill="#d7ff46" />
      <path d="m29 37 5 4 5-6" fill="none" />
    </>
  ),
  software: (
    <>
      <path d="m9 19 23-12 23 12v28L32 59 9 47Z" fill="#eae9dd" />
      <path d="m32 31 23-12v28L32 59Z" fill="#aeb4a0" />
      <path d="M9 19 32 31v28" fill="none" />
      <path d="m22 31-6 4 6 8m17-13 7 4-7 8" fill="none" />
      <path d="m26 17 7-4 7 4-7 4Z" fill="#d7ff46" />
    </>
  ),
  ai: (
    <>
      <path d="M31 17V8m-4 0h8" fill="none" />
      <rect x="10" y="18" width="44" height="34" rx="11" fill="#eae9dd" />
      <path d="M10 30H5v13h5m44-13h5v13h-5" fill="#aeb4a0" />
      <rect x="17" y="25" width="30" height="15" rx="7" fill="#252b24" />
      <path d="M24 30v5m16-5v5" stroke="#d7ff46" />
      <path d="M25 46h14" fill="none" />
    </>
  ),
  voice: (
    <>
      <path d="m17 27-8 26h46l-8-26Z" fill="#eae9dd" />
      <path d="m9 53 4 5h46l-4-5Z" fill="#aeb4a0" />
      <path d="M10 21C9 4 55 4 54 21l-2 6-11-4v-7H23v7l-11 4Z" fill="#d7ff46" />
      <circle cx="32" cy="39" r="10" fill="#aeb4a0" />
      <circle cx="32" cy="39" r="5" fill="#eae9dd" />
    </>
  ),
  automation: (
    <>
      <rect x="6" y="8" width="21" height="20" rx="5" fill="#eae9dd" />
      <rect x="37" y="36" width="21" height="20" rx="5" fill="#eae9dd" />
      <path
        d="M27 18h18v12m-5-5 5 5 5-5M37 46H19V34m-5 5 5-5 5 5"
        fill="none"
      />
      <path d="m17 11-6 9h6l-2 6 8-10h-6Z" fill="#d7ff46" />
      <path d="m42 46 4 4 7-8" fill="none" />
    </>
  ),
  dashboard: (
    <>
      <path d="m8 10 47 4v40L8 50Z" fill="#eae9dd" />
      <path d="m55 14 5-3v40l-5 3Z" fill="#aeb4a0" />
      <path d="m8 10 5-3 47 4-5 3Z" fill="#c9cebd" />
      <path d="m15 21 12 1v19l-12-1Z" fill="#252b24" />
      <path d="m33 24 15 1v8l-15-1Z" fill="#d7ff46" />
      <path d="m33 39 15 1m-15 5 10 1" fill="none" />
    </>
  ),
  integration: (
    <>
      <path
        d="M18 12v10m10-10v10M12 22h22v9a11 11 0 0 1-22 0Z"
        fill="#eae9dd"
      />
      <path d="M23 42v6a8 8 0 0 0 16 0V35" fill="none" />
      <path d="M32 27h17v12H32Z" fill="#d7ff46" />
      <path d="M36 19v8m9-8v8" fill="none" />
    </>
  ),
  portfolio: (
    <>
      <path d="m11 15 38-6 7 43-38 6Z" fill="#aeb4a0" />
      <path d="M8 12h37v44H8Z" fill="#eae9dd" />
      <rect x="14" y="18" width="25" height="24" rx="2" fill="#d7ff46" />
      <circle cx="32" cy="25" r="3" fill="#eae9dd" />
      <path d="m15 39 8-11 7 10 4-5 5 6M15 48h19" fill="none" />
    </>
  ),
  growth: (
    <>
      <path
        d="M8 52h48M13 52V36h10v16m7 0V26h10v26m7 0V14h10v38"
        fill="#eae9dd"
      />
      <path
        d="M8 26 26 12l11 5L51 6m-10 0h10v10"
        stroke="#768d36"
        fill="none"
      />
      <path d="M47 14h10v38H47Z" fill="#d7ff46" />
    </>
  ),
  mobile: (
    <>
      <path d="m20 6 25 4a5 5 0 0 1 4 5l-5 40-6 3-25-4 6-47Z" fill="#aeb4a0" />
      <rect x="14" y="6" width="27" height="50" rx="6" fill="#eae9dd" />
      <rect x="18" y="13" width="19" height="32" rx="2" fill="#252b24" />
      <path d="m22 27 5 5 7-9" stroke="#d7ff46" fill="none" />
      <path d="M25 50h5" />
    </>
  ),
  design: (
    <>
      <path d="m10 14 29-6 14 30-22 17Z" fill="#eae9dd" />
      <path d="m10 14 21 41 4-24Z" fill="#d7ff46" />
      <circle cx="35" cy="31" r="4" fill="#252b24" />
      <path d="m31 55 22-17 5 8-22 16Z" fill="#aeb4a0" />
      <path d="M49 7v10m-5-5h10" fill="none" />
    </>
  ),
} satisfies Record<string, ReactNode>;
export type CapabilityMarkName = keyof typeof marks;
export default function CapabilityMark({ name }: { name: CapabilityMarkName }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      fill="none"
      stroke="#30362a"
      strokeWidth="1.7"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      {marks[name]}
    </svg>
  );
}
