'use client';
import { useEffect, useRef, useState } from 'react';
import WorksMarquee from './WorksMarquee';
import SocialWorkGallery from './SocialWorkGallery';
import CurvedTicker from './CurvedTicker';
import StudioNav, { HireDialog } from './StudioNav';
import HeroProjects from './HeroProjects';
import ContactSection from './ContactSection';
import RecentWorkSection from './RecentWorkSection';
import ServiceShowcase from './ServiceShowcase';
import { type Project } from './portfolio-data';
import SocialIcon from './SocialIcon';
import TeamSection from './TeamSection';
import FaqAccordion from './FaqAccordion';
import { selectedHomepageFaqs } from './faq-data';
import { whatsappUrl } from './contact-utils';
const featuredProjects = [
 {number:'01',title:'Pear',category:'Growth platform',location:'Oslo, Norway',description:'A growth-focused digital platform that brings custom software, search and commercial clarity into one confident customer journey.',tags:['Custom software','Organic growth','Revenue share'],image:'/assets/featured-projects/pear.png',url:'https://pear.no/',tone:'pear'},
 {number:'02',title:'Araku Coffee',category:'Global commerce',location:'India / Global',description:'A richly layered store experience that connects premium products, regenerative farming and the people behind every cup.',tags:['Ecommerce','Brand storytelling','Product discovery'],image:'/assets/featured-projects/araku-coffee.png',url:'https://www.arakucoffee.in/',tone:'araku'},
 {number:'03',title:'Eclipse Space',category:'Digital infrastructure',location:'United States / Global',description:'A clear, credible product experience that makes sophisticated space infrastructure easier for global partners to understand.',tags:['Product narrative','Technical clarity','Global systems'],image:'/assets/featured-projects/eclipse-space-orbit.png',url:'https://www.eclipse.space/',tone:'eclipse'},
];
const insights = [
 {eyebrow:'TRANSFORMATION',title:'Why a distinctive website is still your strongest digital advantage',text:'How focused design, clear positioning and thoughtful development turn a website into a dependable engine for growth.',author:'WEBSTELL Studio'},
 {eyebrow:'ARCHITECTURE',title:'From website to workflow: building connected digital systems',text:'A practical look at connecting customer experiences, internal tools and automation without adding unnecessary complexity.',author:'WEBSTELL Engineering'},
 {eyebrow:'INTELLIGENCE',title:'Designing AI experiences that feel useful, clear and human',text:'Where assistants and smart workflows genuinely improve the customer journey—and where simpler interactions work better.',author:'WEBSTELL Labs'},
];
export default function Home() {
 const [selected,setSelected]=useState<Project|null>(null);
 const [contact,setContact]=useState(false);
 const [subscribed,setSubscribed]=useState(false);
 const projectDialog=useRef<HTMLDialogElement>(null);
 const heroCta=useRef<HTMLButtonElement>(null);
 useEffect(()=>{if(selected!==null)projectDialog.current?.showModal();else projectDialog.current?.close()},[selected]);
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
 <StudioNav/>
 <main>
<section className="launch-hero" aria-labelledby="launch-title"><img className="launch-landscape" src="/assets/hero/webstell-landscape.avif" alt="A retro computer in a sunlit green landscape"/><div className="launch-wash" aria-hidden="true"></div><div className="launch-copy"><span className="launch-kicker">INDEPENDENT MINDS. ONE CREATIVE STUDIO.</span><h1 id="launch-title"><span>Websites people</span><strong>remember<span className="hero-period">.</span></strong></h1><p>Websites, custom software, portfolios and mobile apps. We design and build the things your business needs—with a team you can actually talk to.</p><button ref={heroCta} onClick={()=>setContact(true)}><span className="cta-eyes" aria-hidden="true"><i><b></b></i><i><b></b></i></span> Discuss your project <span className="hero-cta-arrow" aria-hidden="true">↗</span></button><a className="hero-secondary" href="/projects">See our work <span aria-hidden="true">↗</span></a></div><HeroProjects/><div className="launch-capabilities"><p>We build what’s next.<br/><span>You take it further.</span></p><div>{['Websites','Software','Mobile Apps','Portfolios','Chatbots','AI Automations'].map(item=><a key={item} href="/services">{item}<span aria-hidden="true">↗</span></a>)}</div></div></section>
 <WorksMarquee/>
 <RecentWorkSection/>
 <ServiceShowcase/>
 <SocialWorkGallery/>
 <CurvedTicker/>
<section className="case-studies case-studies-international" aria-labelledby="case-studies-title"><div className="case-studies-heading wrap"><span className="case-badge"><span aria-hidden="true">✦</span> International projects</span><h2 id="case-studies-title">Built with teams<br/>worldwide.</h2><p>We partner with ambitious teams across markets to design and develop websites, commerce experiences and digital products that make complex ideas clear—and ready to grow.</p></div><div className="case-grid wrap">{featuredProjects.map((project,i)=><article className={'case-card case-card-'+(i+1)+' case-tone-'+project.tone} key={project.title}><div className="case-copy"><div className="case-meta-row"><span className="case-index">{project.number}</span><span className="case-location">{project.location}</span></div><h3>{project.title}</h3><p>{project.description}</p><a className="case-project-link" href={project.url} target="_blank" rel="noreferrer">View project <span aria-hidden="true">↗</span></a></div><a className="case-visual" href={project.url} target="_blank" rel="noreferrer" aria-label={'View the '+project.title+' project'}><img src={project.image} alt={project.title+' project preview'} loading={i===0?'eager':'lazy'}/><span className="case-visual-open" aria-hidden="true"><b>View project</b><i>↗</i></span></a></article>)}</div><div className="case-action"><a href="/projects">See all projects <span aria-hidden="true">↗</span></a></div></section>
 <TeamSection />
 <section className="queries wrap" id="faq"><div className="section-rule"><span className="section-mark" aria-hidden="true"></span><span className="rule-line"></span><span>YOUR QUESTIONS, ANSWERED</span></div><div className="queries-intro"><p>Clear answers before we start.</p><h2>What clients ask us.</h2></div><FaqAccordion items={selectedHomepageFaqs} /><div className="faq-actions"><a className="faq-whatsapp" href={whatsappUrl('Hi WEBSTELL, I have a question about my project.')} target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span> Ask us about your project</a><a className="faq-contact" href="/contact">Get your website <span aria-hidden="true">↗</span></a></div></section>
 <section className="insights" id="insights"><div className="insights-marquee" aria-label="Why WEBSTELL"><div className="insights-track"><span>Why WEBSTELL <i aria-hidden="true">✳</i> Why WEBSTELL <i aria-hidden="true">✳</i></span><span aria-hidden="true">Why WEBSTELL <i>✳</i> Why WEBSTELL <i>✳</i></span></div></div><div className="insights-inner wrap"><div className="insights-lead"><p>A curated collection of practical ideas on websites, brand systems and intelligent digital products for teams building what comes next.</p><a className="all-articles" href="#insight-grid"><span aria-hidden="true">↗</span> All articles</a></div><div className="insight-grid" id="insight-grid"><div className="insight-image insight-image-red"><img src="/assets/insights-red.avif" alt="Featured website design insight" loading="lazy"/></div><article className="insight-card featured"><span>{insights[1].eyebrow}</span><h3>{insights[1].title}</h3><p>{insights[1].text}</p><footer><small>Written by<br/><b>{insights[1].author}</b></small><button onClick={()=>setContact(true)} aria-label="Discuss this insight">↗</button></footer></article><article className="insight-card"><span>{insights[0].eyebrow}</span><h3>{insights[0].title}</h3><p>{insights[0].text}</p><footer><small>Written by<br/><b>{insights[0].author}</b></small><button onClick={()=>setContact(true)} aria-label="Discuss this insight">↗</button></footer></article><div className="insight-image insight-image-blue"><img src="/assets/insights-blue.avif" alt="Featured digital product insight" loading="lazy"/></div><article className="insight-card wide"><span>{insights[2].eyebrow}</span><h3>{insights[2].title}</h3><p>{insights[2].text}</p><footer><small>Written by<br/><b>{insights[2].author}</b></small><button onClick={()=>setContact(true)} aria-label="Discuss this insight">↗</button></footer></article></div></div></section>
 <ContactSection/>
 </main>
 <footer className="site-footer"><img className="site-footer-bg" src="/assets/footer/webstell-footer.avif" alt="Luminous cube in a landscaped garden" loading="lazy"/><div className="site-footer-shade" aria-hidden="true"></div><div className="footer-panel wrap"><div className="footer-brand"><a className="footer-logo" href="#">WEBSTELL</a><p>We create distinctive websites, brands and digital products for ambitious businesses.</p><form className="subscribe-form" onSubmit={e=>{e.preventDefault();setSubscribed(true)}}><label className="sr-only" htmlFor="footer-email">Email address</label><input id="footer-email" type="email" required placeholder="you@company.com" aria-describedby="subscribe-status"/><button type="submit"><span aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z"/></svg></span>{subscribed?'Subscribed':'Subscribe'}</button></form><p className="subscribe-status" id="subscribe-status" aria-live="polite">{subscribed?'Thanks — you’re on the WEBSTELL list.':'Fresh thinking on design, digital products and growth—sent occasionally.'}</p><span className="footer-social-label">FOLLOW THE TEAM:</span><div className="footer-socials"><a href="https://www.linkedin.com/in/prabhmannat/" target="_blank" rel="noreferrer" aria-label="WEBSTELL team on LinkedIn"><SocialIcon name="linkedin"/></a><a href="https://www.instagram.com/young.elonmusk/" target="_blank" rel="noreferrer" aria-label="WEBSTELL team on Instagram"><SocialIcon name="instagram"/></a><a href="https://github.com/PRABHMANNAT/webstell" target="_blank" rel="noreferrer" aria-label="WEBSTELL on GitHub"><SocialIcon name="github"/></a></div></div><nav className="footer-links" aria-label="Footer navigation"><div><a href="#">Home</a><a href="#services">Services</a><a href="/projects">Works</a><a href="#insights">Insights</a></div><div><a href="#team">About us</a><a href="#team">Meet the team</a><button onClick={()=>setContact(true)}>Start a project</button><a href="#faq">FAQs</a></div><div className="footer-policies"><strong>Explore</strong><a href="/contact">Contact</a><a href="/pricing">Pricing</a><a href="#services">Our services</a><a href="/projects">Selected work</a><a href="#team">Our team</a><a href="#insights">Latest insights</a><a href="#faq">Common questions</a><a href="#" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})}}>Back to top</a></div></nav></div><div className="footer-wordmark" aria-hidden="true">WEBSTELL</div></footer>
 <HireDialog open={contact} onOpenChange={setContact}/>
 <dialog ref={projectDialog} className="project-dialog" onCancel={()=>setSelected(null)} onClick={e=>{if(e.target===e.currentTarget)setSelected(null)}} aria-labelledby="project-preview-title"><button className="close" onClick={()=>setSelected(null)} aria-label="Close project">×</button>{selected!==null&&<><img src={selected.image} alt={selected.title+' preview'}/><span className="refresh-eyebrow">{selected.kind==='Featured design'?'Independent reference · Not WEBSTELL work':selected.kind==='Design concept'?'Studio concept':selected.kind} / {selected.category}</span><h2 id="project-preview-title">{selected.title}</h2><p>{selected.description}</p>{selected.url?<a className="text-link" href={selected.url} target="_blank" rel="noreferrer">Visit source site ↗</a>:<p className="muted">A design direction from our visual collection. Let’s adapt the right ideas to your business, content and goals.</p>}</>}</dialog>
 </>;
}
