export default function SocialIcon({ name }: { name: 'linkedin' | 'instagram' | 'github' }) {
  if (name === 'instagram') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" className="icon-fill"/></svg>;
  if (name === 'github') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 22v-3.9c0-1-.35-1.75-1-2.2 3.25-.36 6.67-1.6 6.67-7.2A5.6 5.6 0 0 0 19.18 4.8 5.2 5.2 0 0 0 19 .9s-1.18-.38-4.05 1.48a13.9 13.9 0 0 0-7.4 0C4.68.52 3.5.9 3.5.9a5.2 5.2 0 0 0-.18 3.9 5.6 5.6 0 0 0-1.49 3.9c0 5.58 3.42 6.82 6.67 7.2-.52.37-.88.96-1.02 1.66-.92.42-3.25 1.14-4.68-1.34 0 0-.85-1.55-2.47-1.66 0 0-1.57-.02-.11.98 0 0 1.05.5 1.78 2.38 0 0 .94 3.1 5.43 2.05V22"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9v9M6 6.5v.01M10.5 18v-9m0 4.25c.75-2.1 2.25-3.15 4.1-3.15 2.35 0 3.9 1.55 3.9 4.25V18"/></svg>;
}
