import type { Metadata } from 'next';
import './globals.css';
import './hero.css';
import './hero-motion.css';
import './service-showcase.css';
import './case-studies.css';
import './systems.css';
import './editorial.css';
import './team.css';
import './sections.css';
import './work-gallery.css';
import './curved-ticker.css';
import './testimonials.css';
import './pricing.css';
import './contact-section.css';
import './button-motion.css';
export const metadata: Metadata = { title:'WEBSTELL | Website Design & Development Agency', description:'Websites that look exceptional and work for you. WEBSTELL creates websites, ecommerce experiences, brand identities and digital products.' };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
