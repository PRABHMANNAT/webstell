'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WorksMarquee from './WorksMarquee';
import SocialWorkGallery from './SocialWorkGallery';
import CurvedTicker from './CurvedTicker';
import StudioNav, { HireDialog } from './StudioNav';
import HeroProjects from './HeroProjects';
import ContactSection from './ContactSection';
import RecentWorkSection from './RecentWorkSection';
import ServiceShowcase from './ServiceShowcase';
import { type Project } from './portfolio-data';
import TeamSection from './TeamSection';
import FaqAccordion from './FaqAccordion';
import { selectedHomepageFaqs } from './faq-data';
import { whatsappUrl } from './contact-utils';
import SiteFooter from './SiteFooter';
import InternationalProjectsSection from './InternationalProjectsSection';
import WhyWebstellSection from './WhyWebstellSection';
import StructuredData from './StructuredData';
import { homepageSchema } from './structured-data';
export default function Home() {
 const [selected,setSelected]=useState<Project|null>(null);
 const [contact,setContact]=useState(false);
 const projectDialog=useRef<HTMLDialogElement>(null);
 const heroCta=useRef<HTMLButtonElement>(null);
 useEffect(()=>{
  const dialog=projectDialog.current;
  if(!dialog)return;
  if(selected!==null){if(!dialog.open)dialog.showModal();}
  else if(dialog.open)dialog.close();
 },[selected]);
 useEffect(()=>{
  const dialog=projectDialog.current;
  if(!dialog)return;
  const closeOnBackdrop=(event:MouseEvent)=>{if(event.target===dialog)setSelected(null);};
  dialog.addEventListener('click',closeOnBackdrop);
  return()=>dialog.removeEventListener('click',closeOnBackdrop);
 },[]);
 useEffect(()=>{
  const button=heroCta.current;
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const follow=(event:PointerEvent)=>{
   if(!button||reducedMotion.matches)return;
   const eyes=button.querySelector<HTMLElement>('.cta-eyes')?.getBoundingClientRect();
   if(!eyes)return;
   const angle=Math.atan2(event.clientY-(eyes.top+eyes.height/2),event.clientX-(eyes.left+eyes.width/2));
   button.style.setProperty('--eye-x',Math.cos(angle)*6+'px');button.style.setProperty('--eye-y',Math.sin(angle)*5+'px');
  };
  window.addEventListener('pointermove',follow,{passive:true});
  return()=>window.removeEventListener('pointermove',follow);
 },[]);
 return <>
 <StructuredData data={homepageSchema} />
 <StudioNav/>
 <main>
<section className="launch-hero" aria-labelledby="launch-title"><Image className="launch-landscape" src="/assets/hero/webstell-landscape.avif" alt="A retro computer in a sunlit green landscape" fill priority sizes="100vw"/><div className="launch-wash" aria-hidden="true"></div><div className="launch-copy"><h1 id="launch-title"><span>Websites people</span><strong>remember<span className="hero-period">.</span></strong></h1><p>Websites, custom software, portfolios and mobile apps. We design and build the things your business needs—with a team you can actually talk to.</p><button ref={heroCta} onClick={()=>setContact(true)}><span className="cta-eyes" aria-hidden="true"><i><b></b></i><i><b></b></i></span> Discuss your project <span className="hero-cta-arrow" aria-hidden="true">↗</span></button><a className="hero-secondary" href="https://wa.me/917696403580?text=Hi%20WEBSTELL%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer">Message us on WhatsApp <span aria-hidden="true">↗</span></a></div><HeroProjects/><div className="launch-capabilities"><div>{['Websites','Software','Mobile Apps','Portfolios','Chatbots','AI Automations'].map(item=><Link key={item} href="/services">{item}<span aria-hidden="true">↗</span></Link>)}</div></div></section>
 <WorksMarquee/>
 <RecentWorkSection/>
 <ServiceShowcase/>
 <SocialWorkGallery/>
<CurvedTicker/>
<InternationalProjectsSection />
 <WhyWebstellSection id="insights" onDiscuss={()=>setContact(true)} />
 <TeamSection />
 <section className="queries wrap" id="faq"><div className="section-rule"><span className="section-mark" aria-hidden="true"></span><span className="rule-line"></span><span>YOUR QUESTIONS, ANSWERED</span></div><div className="queries-intro"><p>Clear answers before we start.</p><h2>What clients ask us.</h2></div><FaqAccordion items={selectedHomepageFaqs} /><div className="faq-actions"><a className="faq-whatsapp" href={whatsappUrl('Hi WEBSTELL, I have a question about my project.')} target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span> Ask us about your project</a><Link className="faq-contact" href="/contact">Get your website <span aria-hidden="true">↗</span></Link></div></section>
 <ContactSection/>
 </main>
 <SiteFooter />
 <HireDialog open={contact} onOpenChange={setContact}/>
 <dialog ref={projectDialog} className="project-dialog" onCancel={()=>setSelected(null)} aria-labelledby="project-preview-title"><button className="close" onClick={()=>setSelected(null)} aria-label="Close project">×</button>{selected!==null&&<><Image src={selected.image} alt={selected.title+' preview'} width={1600} height={1000} sizes="(max-width: 900px) 92vw, 800px" unoptimized/><span className="refresh-eyebrow">{selected.kind==='Featured design'?'Independent reference · Not WEBSTELL work':selected.kind==='Design concept'?'Studio concept':selected.kind} / {selected.category}</span><h2 id="project-preview-title">{selected.title}</h2><p>{selected.description}</p>{selected.url?<a className="text-link" href={selected.url} target="_blank" rel="noreferrer">Visit source site ↗</a>:<p className="muted">A design direction from our visual collection. Let’s adapt the right ideas to your business, content and goals.</p>}</>}</dialog>
 </>;
}
