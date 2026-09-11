import type { Metadata } from 'next';
import './globals.css';
import './team.css';
export const metadata: Metadata = { title:'WEBSTHAL | Website Design & Development Agency', description:'Websites that look exceptional and work for you. WEBSTHAL creates websites, ecommerce experiences, brand identities and digital products.' };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
