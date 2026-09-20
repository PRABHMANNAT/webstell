'use client';
import Link from './SiteLink';
import LostRunner from './LostRunner';

export default function LostPage() {
 return <main className="lost-page">
  <header className="lost-nav"><Link href="/">WEBSTELL</Link><span>ERROR / 404</span></header>
  <section className="lost-copy">
   <h1 aria-label="404 — Page not found"><span>4</span><span className="lost-orbit" aria-hidden="true">{Array.from({length:7},(_,i)=><i key={i} style={{transform:`rotate(${i*25}deg)`}}/>)}</span><span>4</span></h1>
   <h2>A small detour. A little play.</h2>
   <p>We build websites that take you places. This link took a wrong turn.<br/>Head back to WEBSTELL, or jump a few obstacles while you’re here.</p>
   <div className="lost-links"><Link href="/">↗ Back home</Link><Link href="/#projects">Explore our work →</Link></div>
  </section>
  <LostRunner/>
  <footer className="lost-footer"><span>LOST IN THE INTERNET. FOUND SOMETHING FUN.</span><Link href="/">WEBSTELL © {new Date().getFullYear()}</Link></footer>
 </main>;
}
