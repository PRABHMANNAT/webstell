'use client';
import { useEffect, useRef, useState } from 'react';
import WorksMarquee from './WorksMarquee';
import SocialWorkGallery from './SocialWorkGallery';
import CurvedTicker from './CurvedTicker';
import Testimonials from './Testimonials';
import StudioNav, { HireDialog } from './StudioNav';
import HeroProjects from './HeroProjects';
import ContactSection from './ContactSection';
import RecentWorkSection from './RecentWorkSection';
import ServiceShowcase from './ServiceShowcase';
import { type Project } from './portfolio-data';
import SocialIcon from './SocialIcon';
import TeamSection from './TeamSection';
import { team } from './team-data';
const serviceSpectrum = [
 {slug:'web',label:'Websites',title:'Website design & development',text:'Clear, fast websites that make your business memorable and easy to choose.',tags:['Strategy & content','Design & build','Search-ready launch'],video:'/assets/service-website-design-reel.mp4',image:'/assets/recent-work/safario.png'},
 {slug:'commerce',label:'Commerce',title:'Ecommerce & online stores',text:'Shopping experiences designed to turn discovery into confident orders.',tags:['Shopify & custom stores','Payments & shipping'],video:'/assets/service-ecommerce.mp4',image:'/assets/refresh/sites/maverick.jpg'},
 {slug:'brand',label:'Identity',title:'Brand identity & UI/UX',text:'A visual voice and interface system people understand at a glance.',tags:['Brand systems','Product & web UI'],video:'/assets/service-brand-uiux.mp4',image:'/assets/refresh/local/branding.webp'},
 {slug:'automation',label:'Automation',title:'Software & automation',text:'Useful tools and connected workflows that give your team more time.',tags:['Portals & dashboards','AI workflows & APIs'],video:'/assets/service-software-automation.mp4',image:'/assets/refresh/sites/attio.jpg'},
 {slug:'mobile',label:'Mobile',title:'Mobile apps',text:'Reliable Android and iOS experiences built around real daily use.',tags:['iOS & Android','Product design to launch'],video:'/assets/service-mobile-apps.mp4',image:'/assets/hero-projects/config.png'},
 {slug:'ai',label:'Intelligence',title:'AI chatbots & assistants',text:'Helpful conversations that qualify leads and keep customers supported.',tags:['Website & WhatsApp bots','Knowledge assistants'],video:'/assets/service-chatbot.mp4',image:'/assets/refresh/sites/tana.jpg'},
];
const featuredProjects = [
 {number:'01',title:'Pear',category:'Growth systems',location:'Oslo, Norway',description:'A fearless, outcome-led experience that makes a radical commercial promise feel simple: custom software, organic search and a model tied directly to growth.',tags:['Custom software','Organic growth','Revenue share'],image:'/assets/featured-projects/pear.png',url:'https://pear.no/',tone:'pear'},
 {number:'02',title:'Araku Coffee',category:'Regenerative commerce',location:'India / Global',description:'A richly merchandised commerce experience where premium coffee, regenerative farming and farmer stories meet in one distinctive brand world.',tags:['Ecommerce','Origin stories','Product discovery'],image:'/assets/featured-projects/araku-coffee.png',url:'https://www.arakucoffee.in/',tone:'araku'},
 {number:'03',title:'Eclipse Space',category:'Space infrastructure',location:'United States / Global',description:'A precise, mission-led product story that makes complex sovereign space infrastructure feel clear, credible and within reach.',tags:['Product narrative','Technical clarity','Global systems'],image:'/assets/featured-projects/eclipse-space-orbit.png',url:'https://www.eclipse.space/',tone:'eclipse'},
];
const industries = [
 {number:'01',eyebrow:'Be discoverable',title:'Be the clear choice.',description:'Make it easy for the right people to find you—and understand your value in seconds.',signal:'Visibility that compounds'},
 {number:'02',eyebrow:'Create demand',title:'Start better conversations.',description:'Turn curiosity into qualified enquiries, bookings and opportunities your team wants to have.',signal:'Interest into action'},
 {number:'03',eyebrow:'Sell with ease',title:'Make buying effortless.',description:'Give customers a clear, confident path from first look to checkout on every screen.',signal:'Fewer steps to sale'},
 {number:'04',eyebrow:'Build belief',title:'Earn trust faster.',description:'Put your proof, personality and expertise to work before the first conversation begins.',signal:'Credibility by design'},
 {number:'05',eyebrow:'Work smarter',title:'Free up your team.',description:'Let connected tools and useful automation take care of the repeatable work.',signal:'More time for people'},
 {number:'06',eyebrow:'Keep moving',title:'Grow without rebuilding.',description:'Build a digital foundation ready for new offers, markets and bigger ambitions.',signal:'Made for what’s next'},
];
const faqs = [
  [
    "What can you build for my business?",
    "We build business websites, online stores, portfolios, booking websites and custom software. Whether you run a café, clinic, creative studio or software company, we start with what your customers need to do."
  ],
  [
    "How much does a website cost?",
    "A business website starts at ₹20,000, or ₹16,500 if you supply the domain. Explore the pricing page to add features and see your estimate. Every quote is tailored to your requirements, with a minimum project value of ₹15,000."
  ],
  [
    "How long will it take?",
    "A focused starter site usually takes 7–10 working days. Larger websites typically take 2–6 weeks. We confirm a schedule after reviewing your requirements; timely content and feedback help us keep it on track."
  ],
  [
    "What do you need from me to get started?",
    "Tell us about your business, customers, goals and budget. Share your logo, photos, text and any websites you like. If you do not have these ready, we can discuss help with content and design."
  ],
  [
    "Can you redesign my existing website?",
    "Yes. We can improve the look, structure, speed or features of your current website. First we check what should stay, what needs changing and how to protect important existing links."
  ],
  [
    "Will it work well on mobile phones?",
    "Yes. We design for phones, tablets and desktops and test the main journeys at different screen sizes before launch."
  ],
  [
    "Are a domain and hosting included?",
    "The packages include a standard, non-premium domain for the first year, subject to the extension and availability agreed in your quote. Renewals, hosting and paid services are separate. We explain those costs and help with setup."
  ],
  [
    "Can customers pay or book through my website?",
    "Yes. We can add booking tools, payment links or an online checkout depending on your package. You will need an approved account with the payment or booking provider. Their transaction fees and subscriptions are separate."
  ],
  [
    "Can I change the text, images or products myself?",
    "If your scope includes a content management system, yes. We show you how to make everyday updates. For a custom-coded site, we agree on how edits will be handled before development starts."
  ],
  [
    "Will I own the website when it is finished?",
    "We agree on ownership and handover in the project contract. This normally covers the completed custom work after final payment. Third-party fonts, photos, plugins and software remain subject to their own licences."
  ],
  [
    "Will my website appear on Google?",
    "We set up search-friendly foundations such as page titles, descriptions and indexable content. Search rankings take time and depend on your content, competition and ongoing work; no specific position is guaranteed."
  ],
  [
    "Do you work with clients outside India?",
    "Yes. We work remotely with Indian and international clients. We agree on a useful meeting time, clear milestones, currency and payment arrangements before starting."
  ],
  [
    "How do reviews and payments work?",
    "We split the project into agreed stages so you can review the direction before we move ahead. Your proposal explains the payment schedule, included feedback and how any new requests will be priced."
  ],
  [
    "What happens after launch?",
    "We hand over the agreed access and explain how to use your website. Launch fixes and ongoing support are defined in your quote. Maintenance, new features and regular content changes can be arranged separately."
  ],
  [
    "Can you build software or connect AI tools?",
    "Yes. We can scope dashboards, customer portals, internal tools, useful AI assistants and integrations. We first check your workflow, data needs and ongoing service costs."
  ],
  [
    "How do I share my project idea?",
    "Click Hire Team to start on WhatsApp, write a project brief, or choose a time for a call. The contact and scheduling forms currently prepare a brief for you to share; they do not send emails or confirm bookings yet."
  ]
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
<section className="launch-hero" aria-labelledby="launch-title"><img className="launch-landscape" src="/assets/hero/webstell-landscape.avif" alt="A retro computer in a sunlit green landscape"/><div className="launch-wash" aria-hidden="true"></div><div className="launch-copy"><span className="launch-kicker">INDEPENDENT MINDS. ONE CREATIVE STUDIO.</span><h1 id="launch-title"><span>Websites people</span><strong>remember<span className="hero-period">.</span></strong></h1><p>Websites, custom software, portfolios and mobile apps. We design and build the things your business needs—with a team you can actually talk to.</p><button ref={heroCta} onClick={()=>setContact(true)}><span className="cta-eyes" aria-hidden="true"><i><b></b></i><i><b></b></i></span> Let’s build your idea <span className="hero-cta-arrow" aria-hidden="true">↗</span></button><a className="hero-secondary" href="/pricing">Find your starting price <span aria-hidden="true">↗</span></a></div><HeroProjects/><div className="launch-capabilities"><p>We build what’s next.<br/><span>You take it further.</span></p><div>{['Websites','Software','Mobile Apps','Portfolios','Chatbots','AI Automations'].map(item=><a key={item} href="/#services">{item}<span aria-hidden="true">↗</span></a>)}</div></div></section>
 <WorksMarquee/>
 <RecentWorkSection onOpen={setSelected}/>
 <SocialWorkGallery onOpen={setSelected}/>
 <ServiceShowcase onContact={()=>setContact(true)}/>
 <section className="service-spectrum wrap" aria-labelledby="service-spectrum-title">
   <div className="service-spectrum-intro"><span className="systems-label">OUR SERVICES</span><h2 id="service-spectrum-title">One studio, six ways to move your business forward.</h2><p>Start with the digital experience that will make the biggest difference now. Every service can stand alone—or connect into a system that grows with you.</p></div>
   <div className="service-spectrum-grid">{serviceSpectrum.map((service,index)=><article className={'service-spectrum-card spectrum-'+service.slug+(index===0?' is-featured':'')} key={service.slug} style={{'--service-order':index} as React.CSSProperties}><div className="service-card-bar"><span>0{index+1} / {service.label}</span><button onClick={()=>setContact(true)} aria-label={'Discuss '+service.title}><b>Start a project</b><i aria-hidden="true">↗</i></button></div><div className="service-card-media"><video src={service.video} poster={service.image} autoPlay muted loop playsInline preload="metadata" aria-hidden="true"/><div className="service-media-shade" aria-hidden="true"></div><span className="service-live"><i></i> Made to move</span><span className="service-media-number">0{index+1}</span><img className="service-proof-image" src={service.image} alt="" loading="lazy"/></div><div className="service-card-copy"><h3>{service.title}</h3><p>{service.text}</p><ul>{service.tags.map(tag=><li key={tag}>{tag}</li>)}</ul></div></article>)}</div>
 </section>
 <CurvedTicker/>
 <section className="case-studies case-studies-international" aria-labelledby="case-studies-title"><div className="case-studies-heading wrap"><span className="case-badge"><span aria-hidden="true">✦</span> International edit</span><h2 id="case-studies-title">Digital work<br/>without borders.</h2><p>Three standout experiences spanning growth, specialty coffee and space infrastructure—chosen for the clarity of their ideas and the ambition of their execution.</p></div><div className="case-grid wrap">{featuredProjects.map((project,i)=><article className={'case-card case-card-'+(i+1)+' case-tone-'+project.tone} key={project.title}><div className="case-copy"><div className="case-meta-row"><span className="case-index">{project.number}</span><span className="case-location">{project.location}</span></div><span className="case-category">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><ul>{project.tags.map(item=><li key={item}>{item}</li>)}</ul><a className="case-project-link" href={project.url} target="_blank" rel="noreferrer">Visit live project <span aria-hidden="true">↗</span></a></div><a className="case-visual" href={project.url} target="_blank" rel="noreferrer" aria-label={'Open '+project.title+' live website'}><img src={project.image} alt={project.title+' website preview'} loading={i===0?'eager':'lazy'}/><span className="case-visual-open" aria-hidden="true"><b>Open live site</b><i>↗</i></span></a></article>)}</div><div className="case-action"><a href="/projects">Explore the full portfolio <span aria-hidden="true">↗</span></a></div></section>
 <section className="editorial-showcase studio-about-shell" id="about" aria-labelledby="about-title"><div className="about-studio wrap"><div className="about-studio-copy"><div className="about-kicker"><span>ABOUT WEBSTELL</span><i>INDIA / WORLDWIDE</i></div><h2 id="about-title">Small team.<br/><em>Serious craft.</em></h2><div className="about-lead"><p>WEBSTELL is an independent design and technology studio for businesses that want to look distinct, work smarter and grow with confidence.</p><p>Strategy, design and engineering sit in the same room here. That means fewer handoffs, clearer decisions and digital work that feels considered from first idea to launch.</p></div><div className="about-principles"><article><span>01</span><h3>Clarity first</h3><p>We make complex ideas easy to understand.</p></article><article><span>02</span><h3>One connected team</h3><p>The people you meet are the people doing the work.</p></article><article><span>03</span><h3>Built to last</h3><p>Useful systems, thoughtful details and room to grow.</p></article></div><div className="about-actions"><button onClick={()=>setContact(true)}>Build something with us <span aria-hidden="true">↗</span></button><div className="about-crew"><div>{team.map(member=><img key={member.name} src={member.image} alt="" loading="lazy"/>)}</div><p>Four specialists.<br/>One conversation.</p></div></div></div><div className="about-studio-visual"><video src="/assets/short.mp4" poster="/assets/service-webstell.png" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"/><div className="about-visual-shade" aria-hidden="true"></div><span className="about-live"><i></i> Studio reel / 2026</span><div className="about-orbit" aria-hidden="true"><span>DESIGN · TECHNOLOGY · STRATEGY ·</span></div><figure className="about-frame about-frame-one"><img src="/assets/service-webstell.png" alt="WEBSTELL website design work" loading="lazy"/><figcaption>Selected work / Web</figcaption></figure><figure className="about-frame about-frame-two"><img src="/assets/service-parley.png" alt="AI product website design" loading="lazy"/><figcaption>Selected work / AI</figcaption></figure><figure className="about-frame about-frame-three"><img src="/assets/service-elevare.png" alt="Editorial ecommerce design" loading="lazy"/><figcaption>Selected work / Commerce</figcaption></figure><div className="about-studio-mark" aria-hidden="true"><strong>W</strong><span>Independent<br/>since 2026</span></div></div></div></section>
 <section className="industries wrap" aria-labelledby="outcomes-title"><div className="industry-heading"><div><span>WHAT A SMARTER WEBSITE CAN DO</span><h2 id="outcomes-title">Turn every visit<br/>into momentum.</h2></div><p>Not just a website that looks good. A focused digital experience that makes your next business move easier.</p></div><div className="industry-grid">{industries.map(item=><article className="industry-card" key={item.number}><div className="industry-card-top"><span>{item.number}</span><i aria-hidden="true">↗</i></div><small>{item.eyebrow}</small><h3>{item.title}</h3><p>{item.description}</p><div className="industry-card-signal"><span>{item.signal}</span><b aria-hidden="true">+</b></div></article>)}</div></section>
 <TeamSection />
 <Testimonials/>
 <section className="queries wrap" id="faq"><div className="section-rule"><span className="section-mark" aria-hidden="true"></span><span className="rule-line"></span><span>YOUR QUESTIONS, ANSWERED</span></div><div className="queries-intro"><p>Starting a website project should feel simple. Here are the things clients usually ask us first.</p><h2>A few things you might be wondering.</h2><button className="support-pill" onClick={()=>setContact(true)}><span aria-hidden="true">↗</span> Ask us about your project</button></div><div className="query-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
 <section className="insights" id="insights"><div className="insights-marquee" aria-label="Insights"><div className="insights-track"><span>Insights <i aria-hidden="true">✳</i> Insights <i aria-hidden="true">✳</i></span><span aria-hidden="true">Insights <i>✳</i> Insights <i>✳</i></span></div></div><div className="insights-inner wrap"><div className="insights-lead"><p>A curated collection of practical ideas on websites, brand systems and intelligent digital products for teams building what comes next.</p><a className="all-articles" href="#insight-grid"><span aria-hidden="true">↗</span> All articles</a></div><div className="insight-grid" id="insight-grid"><div className="insight-image insight-image-red"><img src="/assets/insights-red.avif" alt="Featured website design insight" loading="lazy"/></div><article className="insight-card featured"><span>{insights[1].eyebrow}</span><h3>{insights[1].title}</h3><p>{insights[1].text}</p><footer><small>Written by<br/><b>{insights[1].author}</b></small><button onClick={()=>setContact(true)} aria-label="Discuss this insight">↗</button></footer></article><article className="insight-card"><span>{insights[0].eyebrow}</span><h3>{insights[0].title}</h3><p>{insights[0].text}</p><footer><small>Written by<br/><b>{insights[0].author}</b></small><button onClick={()=>setContact(true)} aria-label="Discuss this insight">↗</button></footer></article><div className="insight-image insight-image-blue"><img src="/assets/insights-blue.avif" alt="Featured digital product insight" loading="lazy"/></div><article className="insight-card wide"><span>{insights[2].eyebrow}</span><h3>{insights[2].title}</h3><p>{insights[2].text}</p><footer><small>Written by<br/><b>{insights[2].author}</b></small><button onClick={()=>setContact(true)} aria-label="Discuss this insight">↗</button></footer></article></div></div></section>
 <ContactSection/>
 </main>
 <footer className="site-footer"><img className="site-footer-bg" src="/assets/footer/webstell-footer.avif" alt="Luminous cube in a landscaped garden" loading="lazy"/><div className="site-footer-shade" aria-hidden="true"></div><div className="footer-panel wrap"><div className="footer-brand"><a className="footer-logo" href="#">WEBSTELL</a><p>We create distinctive websites, brands and digital products for ambitious businesses.</p><form className="subscribe-form" onSubmit={e=>{e.preventDefault();setSubscribed(true)}}><label className="sr-only" htmlFor="footer-email">Email address</label><input id="footer-email" type="email" required placeholder="you@company.com" aria-describedby="subscribe-status"/><button type="submit"><span aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z"/></svg></span>{subscribed?'Subscribed':'Subscribe'}</button></form><p className="subscribe-status" id="subscribe-status" aria-live="polite">{subscribed?'Thanks — you’re on the WEBSTELL list.':'Fresh thinking on design, digital products and growth—sent occasionally.'}</p><span className="footer-social-label">FOLLOW THE TEAM:</span><div className="footer-socials"><a href="https://www.linkedin.com/in/prabhmannat/" target="_blank" rel="noreferrer" aria-label="WEBSTELL team on LinkedIn"><SocialIcon name="linkedin"/></a><a href="https://www.instagram.com/young.elonmusk/" target="_blank" rel="noreferrer" aria-label="WEBSTELL team on Instagram"><SocialIcon name="instagram"/></a><a href="https://github.com/PRABHMANNAT/webstell" target="_blank" rel="noreferrer" aria-label="WEBSTELL on GitHub"><SocialIcon name="github"/></a></div></div><nav className="footer-links" aria-label="Footer navigation"><div><a href="#">Home</a><a href="#services">Services</a><a href="/projects">Works</a><a href="#insights">Insights</a></div><div><a href="#team">About us</a><a href="#team">Meet the team</a><button onClick={()=>setContact(true)}>Start a project</button><a href="#faq">FAQs</a></div><div className="footer-policies"><strong>Explore</strong><a href="/contact">Contact</a><a href="/pricing">Pricing</a><a href="#services">Our services</a><a href="/projects">Selected work</a><a href="#team">Our team</a><a href="#insights">Latest insights</a><a href="#faq">Common questions</a><a href="#" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})}}>Back to top</a></div></nav></div><div className="footer-wordmark" aria-hidden="true">WEBSTELL</div></footer>
 <HireDialog open={contact} onOpenChange={setContact}/>
 <dialog ref={projectDialog} className="project-dialog" onCancel={()=>setSelected(null)} onClick={e=>{if(e.target===e.currentTarget)setSelected(null)}} aria-labelledby="project-preview-title"><button className="close" onClick={()=>setSelected(null)} aria-label="Close project">×</button>{selected!==null&&<><img src={selected.image} alt={selected.title+' preview'}/><span className="refresh-eyebrow">{selected.kind} / {selected.category}</span><h2 id="project-preview-title">{selected.title}</h2><p>{selected.description}</p>{selected.url?<a className="text-link" href={selected.url} target="_blank" rel="noreferrer">Visit {selected.kind==='Featured design'?'image source':'live website'} ↗</a>:<p className="muted">A design direction from our visual collection. Let’s adapt the right ideas to your business, content and goals.</p>}</>}</dialog>
 </>;
}
