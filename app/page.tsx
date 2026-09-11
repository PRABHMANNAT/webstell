'use client';
import { useEffect, useRef, useState } from 'react';
import WorksMarquee from './WorksMarquee';
import SocialWorkGallery from './SocialWorkGallery';
import CurvedTicker from './CurvedTicker';
import Testimonials from './Testimonials';
import PricingSection from './PricingSection';
import ContactSection from './ContactSection';
import RecentWorkSection from './RecentWorkSection';
import { industryProjects, recentProjects, type Project } from './portfolio-data';

function SocialIcon({name}:{name:'linkedin'|'instagram'|'github'}) {
 if(name==='instagram') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" className="icon-fill"/></svg>;
 if(name==='github') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 22v-3.9c0-1-.35-1.75-1-2.2 3.25-.36 6.67-1.6 6.67-7.2A5.6 5.6 0 0 0 19.18 4.8 5.2 5.2 0 0 0 19 .9s-1.18-.38-4.05 1.48a13.9 13.9 0 0 0-7.4 0C4.68.52 3.5.9 3.5.9a5.2 5.2 0 0 0-.18 3.9 5.6 5.6 0 0 0-1.49 3.9c0 5.58 3.42 6.82 6.67 7.2-.52.37-.88.96-1.02 1.66-.92.42-3.25 1.14-4.68-1.34 0 0-.85-1.55-2.47-1.66 0 0-1.57-.02-.11.98 0 0 1.05.5 1.78 2.38 0 0 .94 3.1 5.43 2.05V22"/></svg>;
 return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9v9M6 6.5v.01M10.5 18v-9m0 4.25c.75-2.1 2.25-3.15 4.1-3.15 2.35 0 3.9 1.55 3.9 4.25V18"/></svg>;
}

const services = [
 {title:'Website Design & Development',text:'Business websites, portfolios, landing pages and custom digital experiences. We turn your goals into a fast, responsive website built to bring in your next customer.',tags:['Business websites','React / Next.js','WordPress','Webflow','Responsive development'],color:'#e9e4f3'},
 {title:'Ecommerce Experiences',text:'From the first product to the final checkout, we create online stores that make shopping effortless. Built for clothing, jewellery, beauty, food and growing D2C brands.',tags:['Shopify','Product management','Payment integration','Shipping & inventory','WhatsApp ordering'],color:'#eeeeda'},
 {title:'UI / UX & Brand Identity',text:'A clear identity and an intuitive experience, designed together. We shape logos, visual systems, website interfaces and digital products around the people who use them.',tags:['Brand identity','Figma design','Design systems','Interactive prototypes','Packaging & graphics'],color:'#dfeaf4'},
 {title:'Web Apps & AI Automation',text:'Websites that do more for your business. Connect your tools, automate everyday tasks and build useful products, from customer portals to AI-powered assistants.',tags:['Dashboards & portals','SaaS / MVPs','AI chatbots','WhatsApp automation','API integration'],color:'#f4e2df'},
 {title:'Growth & Website Care',text:'Keep your website fast, secure and ready for what comes next. We support your launch with search-friendly foundations, clear analytics and ongoing website maintenance.',tags:['Technical SEO','Performance','Analytics & tracking','Maintenance','Content updates'],color:'#e3ebe1'},
];
const offerServices = [
  {
    "title": "Website Design & Development",
    "description": "A website that makes your business easy to understand, easy to find and easy to contact. Built for your customers, in India or anywhere in the world.",
    "tags": [
      "Business websites",
      "Mobile-first design",
      "Search-ready foundations"
    ],
    "images": [
      "/assets/refresh/local/coffee.webp",
      "/assets/refresh/local/travel.webp",
      "/assets/refresh/local/interiors.webp"
    ]
  },
  {
    "title": "Ecommerce & Online Stores",
    "description": "Help customers discover your products, choose with confidence and check out smoothly. From independent shops to growing consumer brands.",
    "tags": [
      "Online stores",
      "Payments & shipping",
      "Product management"
    ],
    "images": [
      "/assets/refresh/local/beauty.webp",
      "/assets/refresh/local/fashion.webp",
      "/assets/refresh/local/commerce.webp"
    ]
  },
  {
    "title": "Brand Identity & UI/UX",
    "description": "Give your business a recognisable look and your customers a clear path. We connect visual identity with thoughtful, easy-to-use interfaces.",
    "tags": [
      "Visual identity",
      "Website & app design",
      "Interactive prototypes"
    ],
    "images": [
      "/assets/refresh/local/branding.webp",
      "/assets/refresh/local/agency.webp",
      "/assets/refresh/local/portfolio.webp"
    ]
  },
  {
    "title": "Software & Automation",
    "description": "Build the tools your business actually needs: customer portals, dashboards, web apps and automations that cut down repetitive work.",
    "tags": [
      "Custom software",
      "AI & workflows",
      "API integrations"
    ],
    "images": [
      "/assets/refresh/local/software.webp",
      "/assets/refresh/local/finance.webp",
      "/assets/refresh/local/logistics.webp"
    ]
  }
];
const projects = recentProjects;
const industries = [["01","GET FOUND","Show customers what you do, where you are and why they should choose you."],["02","TAKE ENQUIRIES","Turn interest into a useful conversation with clear contact and booking flows."],["03","SELL ONLINE","Help shoppers browse, pay and order from a phone or a computer."],["04","BUILD TRUST","Present your work, expertise and business story with confidence."],["05","SAVE TIME","Connect forms, tools and routine tasks so your team can focus on customers."],["06","GROW FURTHER","Reach new markets with a digital presence ready for your next stage."]];
const team = [
 {name:'Bhumi Kapoor',role:'Marketing & Brand Strategy',image:'/assets/team/bhumi-kapoor.png',bio:'Turns products into brands people remember through positioning, content, storytelling, and growth-focused execution.',note:'She combines creative storytelling with brand strategy and market understanding to make ideas clearer, more relevant, and more memorable.',linkedin:'https://www.linkedin.com/in/bhumikapoor/',instagram:'https://www.instagram.com/bhumikapoor16/'},
 {name:'Arnav Hooda',role:'Frontend Engineer',image:'/assets/team/arnav-hooda.png',bio:'Creates responsive, scalable digital experiences with a strong understanding of modern software and AI-driven products.',note:'He brings together frontend development, product thinking, and an understanding of intelligent systems to make complex products feel simple and effortless to use.',linkedin:'https://www.linkedin.com/in/arnav-hooda-87061486/',instagram:'https://www.instagram.com/arnavhooda_7777/'},
 {name:'Prabhmannat Singh',role:'Senior Full-Stack & FDE',image:'/assets/team/prabhmannat-singh.png',bio:'Builds and deploys production-grade AI products, turning complex client problems into scalable software.',note:'Working at the intersection of product, engineering, and AI, he focuses on making sophisticated technology practical, reliable, and ready for real users.',linkedin:'https://www.linkedin.com/in/prabhmannat/',instagram:'https://www.instagram.com/young.elonmusk/',github:'https://github.com/PRABHMANNAT'},
 {name:'Adhiraj Dogra',role:'Senior AI/ML Engineer',image:'/assets/team/adhiraj-dogra.png',bio:'Designs intelligent systems spanning GenAI, RAG, multi-agent workflows, machine learning, and production software infrastructure.',note:'He builds AI systems that move beyond prototypes, combining model intelligence with strong software architecture for dependable real-world workflows.',linkedin:'https://www.linkedin.com/in/adhiraj-dogra/',instagram:'https://www.instagram.com/adirajdogra/',github:'https://github.com/AdiBoi007'},
];
const faqs = [
  [
    "What can you build for my business?",
    "We build business websites, online stores, portfolios, booking websites and custom software. Whether you run a café, clinic, creative studio or software company, we start with what your customers need to do."
  ],
  [
    "How much does a website cost?",
    "Our website packages start at ₹10,000–15,000. More involved projects are shown in the pricing section. We agree on the features, final price and any extra costs before starting. Custom software is quoted separately."
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
    "Use “Get your Website Now” or the contact form to prepare your project brief. The current form downloads a copy for you to share; it does not send a message automatically."
  ]
];
const insights = [
 {eyebrow:'TRANSFORMATION',title:'Why a distinctive website is still your strongest digital advantage',text:'How focused design, clear positioning and thoughtful development turn a website into a dependable engine for growth.',author:'WEBSTELL Studio'},
 {eyebrow:'ARCHITECTURE',title:'From website to workflow: building connected digital systems',text:'A practical look at connecting customer experiences, internal tools and automation without adding unnecessary complexity.',author:'WEBSTELL Engineering'},
 {eyebrow:'INTELLIGENCE',title:'Designing AI experiences that feel useful, clear and human',text:'Where assistants and smart workflows genuinely improve the customer journey—and where simpler interactions work better.',author:'WEBSTELL Labs'},
];
const editorialCapabilities = [
  {
    "title": "Your business, understood.",
    "items": [
      "We listen before we design",
      "Clear scope and practical advice",
      "A style that fits your audience",
      "Content people can understand",
      "A clear next step for visitors"
    ],
    "images": [
      "/assets/refresh/local/coffee.webp",
      "/assets/refresh/local/beauty.webp",
      "/assets/refresh/local/travel.webp"
    ]
  },
  {
    "title": "Design and development, together.",
    "items": [
      "One team from first sketch to launch",
      "Thoughtful desktop and mobile layouts",
      "Useful features, not unnecessary extras",
      "Regular previews and shared feedback",
      "Careful checks before going live"
    ],
    "images": [
      "/assets/refresh/local/portfolio.webp",
      "/assets/refresh/local/interiors.webp",
      "/assets/refresh/local/software.webp"
    ]
  }
];
export default function Home() {
 const [menu,setMenu]=useState(false);
 const [selected,setSelected]=useState<Project|null>(null);
 const [contact,setContact]=useState(false);
 const [saved,setSaved]=useState(false);
 const [subscribed,setSubscribed]=useState(false);
 const [flippedTeam,setFlippedTeam]=useState<number|null>(null);
 const [activeOffer,setActiveOffer]=useState(0);
 const dialog=useRef<HTMLDialogElement>(null);
 const projectDialog=useRef<HTMLDialogElement>(null);
 const heroCta=useRef<HTMLButtonElement>(null);
 useEffect(()=>{if(contact)dialog.current?.showModal();else dialog.current?.close()},[contact]);
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
 function saveBrief(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();const data=new FormData(event.currentTarget);
  const enteredName=String(data.get('name')||'').trim();const splitName=[data.get('firstName'),data.get('lastName')].filter(Boolean).join(' ');
  const text=['WEBSTELL — Project brief','','Name: '+(enteredName||splitName),'Email: '+data.get('email'),'Phone: '+(data.get('phone')||'Not provided'),'Service: '+data.get('service'),'','Project details:',String(data.get('details'))].join('\n');
  const url=URL.createObjectURL(new Blob([text],{type:'text/plain'}));const link=document.createElement('a');link.href=url;link.download='WEBSTELL-project-brief.txt';link.click();URL.revokeObjectURL(url);setSaved(true);
 }
 return <>
 <header className="site-header"><div className="header wrap"><div className="nav-capsule"><a className="nav-mark" href="#" aria-label="WEBSTELL home">WEBSTELL</a><nav id="navigation" className={menu?'open':''}>{[['Works','projects'],['Services','services'],['Pricing','pricing'],['Insights','insights'],['Team','team'],['FAQ','faq']].map(([label,id])=><a key={id} href={'#'+id} onClick={()=>setMenu(false)}>{label}</a>)}</nav></div><button className="menu-button" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-controls="navigation">{menu?'Close':'Menu'} <span aria-hidden="true">{menu?'−':'☰'}</span></button><button className="hire-pill" onClick={()=>setContact(true)}><span aria-hidden="true">↗</span> Hire Team</button></div></header>
 <main>
<section className="launch-hero" aria-labelledby="launch-title"><img className="launch-landscape" src="/assets/hero/webstell-landscape.avif" alt="Surreal digital landscape representing ideas coming to life"/><div className="launch-wash" aria-hidden="true"></div><div className="launch-copy"><span className="launch-kicker">WEBSTELL · WEBSITE & SOFTWARE STUDIO</span><h1 id="launch-title"><span>Build attention.</span><strong>Ship what matters.</strong></h1><p>WEBSTELL is a website and software development agency turning ambitious ideas into fast, memorable digital products built to win customers.</p><button ref={heroCta} onClick={()=>setContact(true)}><span className="cta-eyes" aria-hidden="true"><i><b></b></i><i><b></b></i></span> Get your website today</button></div><article className="launch-console" aria-label="WEBSTELL launch console preview"><div className="console-screen"><div className="console-top"><i></i><i></i><i></i><span>WEBSTELL / LIVE</span></div><div className="console-stage"><div className="console-orbit" aria-hidden="true"><span></span><span></span><span></span></div><small>LAUNCH CONSOLE</small><strong>Built to perform.</strong><div className="console-status"><span><i></i> Experience online</span><b>99.9%</b></div></div></div><footer><div><strong>Digital Launchpad</strong><span>// Websites · Software · AI</span></div><span aria-hidden="true">↗</span></footer></article><div className="launch-capabilities"><p>One focused team, from first sketch to every release after.</p><div><span>Websites</span><span>Software</span><span>AI Automations</span><span>Brand Systems</span><span>Digital Products</span></div></div></section>
 <section className="showreel wrap top-showreel"><video src="/assets/short.mp4" autoPlay muted playsInline loop controls aria-label="WEBSTELL opening showreel"/></section>
 <section className="offer-showcase" id="services" aria-labelledby="offer-title"><div className="offer-heading wrap"><span className="offer-badge"><span aria-hidden="true">◫</span> Services</span><h2 id="offer-title">What can we build for you?</h2><p>Websites, online stores and software for businesses across India and around the world. One team to connect the design, the technology and your goals.</p></div><div className="offer-panel wrap"><div className="offer-list" role="tablist" aria-label="WEBSTELL services">{offerServices.map((service,index)=><button key={service.title} className={activeOffer===index?'is-active':''} onClick={()=>setActiveOffer(index)} onPointerEnter={()=>setActiveOffer(index)} role="tab" aria-selected={activeOffer===index} aria-controls="offer-detail"><span>0{index+1}</span>{service.title}<i aria-hidden="true">↗</i></button>)}</div><article className="offer-detail" id="offer-detail" role="tabpanel" aria-live="polite" key={activeOffer}><div className="offer-detail-top"><span>WEBSTELL / 0{activeOffer+1}</span><button onClick={()=>setContact(true)}>Start a project <i aria-hidden="true">↗</i></button></div><h3>{offerServices[activeOffer].title}</h3><p>{offerServices[activeOffer].description}</p><div className="offer-gallery">{offerServices[activeOffer].images.map((image,index)=><div key={image}><img src={image} alt="" loading="lazy"/><span>0{index+1}</span></div>)}</div><div className="offer-tags">{offerServices[activeOffer].tags.map(tag=><span key={tag}>{tag}</span>)}</div></article></div></section>
<WorksMarquee/>
 <RecentWorkSection onOpen={setSelected}/>
 <SocialWorkGallery onOpen={setSelected}/>
 <CurvedTicker/>
 <section className="case-studies" aria-labelledby="case-studies-title"><div className="case-studies-heading wrap"><span className="case-badge"><span aria-hidden="true">▦</span> Projects</span><h2 id="case-studies-title">Project spotlights</h2><p>A closer look at digital experiences for coffee, beauty and growing businesses. Explore the design, then visit the live website.</p></div><div className="case-grid wrap">{projects.slice(0,3).map((project,i)=><button className={'case-card case-card-'+(i+1)} key={project.id} onClick={()=>setSelected(project)} aria-label={'View '+project.title+' project'}><div className="case-copy"><span className="case-index">0{i+1}</span><h3>{project.title}</h3><p>{project.description}</p><ul>{(i===0?['Specialty coffee','Online store','India']:i===1?['Beauty & grooming','Product storytelling','Online store']:['Specialty coffee','Product discovery','India']).map(item=><li key={item}>{item}</li>)}</ul></div><div className="case-visual"><img src={project.image} alt={project.title+' website preview'} loading="lazy"/><span aria-hidden="true">↗</span></div></button>)}</div><div className="case-action"><a href="#projects">Explore all projects <span aria-hidden="true">↗</span></a></div></section>
 <section className="editorial-showcase" aria-labelledby="editorial-title"><div className="editorial-intro wrap"><div><span className="editorial-kicker">WHY CHOOSE WEBSTELL</span><h2 id="editorial-title">Good people.<br/>Better websites.</h2></div><div className="editorial-statement"><p>You know your business. We bring the design and development expertise to turn it into a clear, useful digital experience—with straightforward communication along the way.</p><div><span>INDIA · WORKING WORLDWIDE</span><button onClick={()=>setContact(true)}>Get your Website Now</button></div></div></div><div className="editorial-filmstrip wrap" aria-label="Design directions for different businesses">{[industryProjects[0],industryProjects[3],industryProjects[9],industryProjects[7]].map((project,index)=><button key={project.id} onClick={()=>setSelected(project)} aria-label={'View '+project.title}><img src={project.image} alt="" loading="lazy"/><span>0{index+1} / {project.category}</span></button>)}</div><div className="editorial-services wrap">{editorialCapabilities.map((capability,index)=><article className="editorial-row" key={capability.title}><div className="editorial-row-copy"><span>0{index+1}</span><h3>{capability.title}</h3><ol>{capability.items.map((item,itemIndex)=><li key={item}><span>0{itemIndex+1}.</span>{item}</li>)}</ol></div><div className="editorial-stack">{capability.images.map((image,imageIndex)=><img key={image} src={image} alt={imageIndex===capability.images.length-1?capability.title+' project work':''} loading="lazy"/>)}</div></article>)}</div></section>
 <section className="industries wrap"><h2>What should your website do for you?</h2><div className="industry-grid">{industries.map(([n,title,desc])=><div key={n}><span>{n}</span><h3>{title}</h3><p>{desc}</p></div>)}</div></section>
 <section className="studio-systems wrap" aria-labelledby="systems-title"><div className="systems-card systems-tools"><span className="systems-label">TOOLS & PROCESS</span><h2 id="systems-title">A modern stack for ambitious builds.</h2><div className="systems-logos" aria-label="Tools we work with"><span>Figma</span><span>Next.js</span><span>React</span><span>Shopify</span><span>WordPress</span><span>Cloudflare</span></div></div><article className="systems-card systems-dark"><strong>01</strong><h3>One connected team</h3><p>Design, development and practical advice in the same conversation, from your first brief to launch.</p></article><article className="systems-card systems-signal"><span className="systems-label">Built to scale</span><div className="signal-field" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><h3>Connected everywhere</h3><p>Responsive experiences made for customers across devices, locations and platforms.</p></article><article className="systems-card systems-dark"><strong>QA</strong><h3>Checked before launch</h3><p>Every interface is reviewed across real breakpoints before it reaches your customers.</p></article><article className="systems-card systems-process"><span className="systems-label">Our process</span><ol><li><span>01</span>Discovery & strategy</li><li><span>02</span>Research & structure</li><li><span>03</span>Design & development</li><li><span>04</span>Quality assurance</li><li><span>05</span>Launch & support</li></ol></article><article className="systems-card systems-dark"><strong>24/7</strong><h3>Digital presence</h3><p>Fast, clear and always ready to turn the next visitor into a real opportunity.</p></article></section>
 <section className="team" id="team"><div className="team-inner"><div className="team-heading"><div><span className="team-kicker">The people behind the work</span><h2>Meet our team</h2></div><button className="team-story" onClick={()=>setContact(true)}><span aria-hidden="true">↗</span> Work with us</button></div><div className="team-grid">{team.map((member,index)=><article className={'team-card '+(flippedTeam===index?'is-flipped':'')} key={member.name}><div className="team-card-inner"><div className="team-face team-front"><button className="team-front-button" onClick={()=>setFlippedTeam(index)} aria-label={'Read more about '+member.name}><div className="team-photo"><img src={member.image} alt={member.name} loading="lazy"/></div><div className="team-meta"><span>{member.name}</span><p>{member.role}</p><span className="team-toggle" aria-hidden="true">+</span></div></button></div><div className="team-face team-back"><div className="team-socials" aria-label={'Social profiles for '+member.name}><a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={member.name+' on LinkedIn'}><SocialIcon name="linkedin"/></a><a href={member.instagram} target="_blank" rel="noreferrer" aria-label={member.name+' on Instagram'}><SocialIcon name="instagram"/></a>{member.github&&<a href={member.github} target="_blank" rel="noreferrer" aria-label={member.name+' on GitHub'}><SocialIcon name="github"/></a>}</div><button className="team-close" onClick={()=>setFlippedTeam(null)} aria-label={'Close '+member.name+' profile'}><span aria-hidden="true"></span></button><div className="team-bio"><p>{member.bio}</p><p>{member.note}</p></div><div className="team-meta"><span>{member.name}</span><p>{member.role}</p></div></div></div></article>)}</div></div></section>
 <Testimonials/>
 <PricingSection onContact={()=>setContact(true)}/>
 <section className="queries wrap" id="faq"><div className="section-rule"><span className="section-mark" aria-hidden="true"></span><span className="rule-line"></span><span>YOUR QUESTIONS, ANSWERED</span></div><div className="queries-intro"><p>Starting a website project should feel simple. Here are the things clients usually ask us first.</p><h2>A few things you might be wondering.</h2><button className="support-pill" onClick={()=>setContact(true)}><span aria-hidden="true">↗</span> Ask us about your project</button></div><div className="query-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
 <section className="insights" id="insights"><div className="insights-marquee" aria-label="Insights"><div className="insights-track"><span>Insights <i aria-hidden="true">✳</i> Insights <i aria-hidden="true">✳</i></span><span aria-hidden="true">Insights <i>✳</i> Insights <i>✳</i></span></div></div><div className="insights-inner wrap"><div className="insights-lead"><p>A curated collection of practical ideas on websites, brand systems and intelligent digital products for teams building what comes next.</p><a className="all-articles" href="#insight-grid"><span aria-hidden="true">↗</span> All articles</a></div><div className="insight-grid" id="insight-grid"><div className="insight-image insight-image-red"><img src="/assets/refresh/local/branding.webp" alt="Brand strategy website design" loading="lazy"/></div><article className="insight-card featured"><span>{insights[1].eyebrow}</span><h3>{insights[1].title}</h3><p>{insights[1].text}</p><footer><small>Written by<br/><b>{insights[1].author}</b></small><button onClick={()=>setContact(true)} aria-label="Discuss this insight">↗</button></footer></article><article className="insight-card"><span>{insights[0].eyebrow}</span><h3>{insights[0].title}</h3><p>{insights[0].text}</p><footer><small>Written by<br/><b>{insights[0].author}</b></small><button onClick={()=>setContact(true)} aria-label="Discuss this insight">↗</button></footer></article><div className="insight-image insight-image-blue"><img src="/assets/insights-ai.avif" alt="AI product website design" loading="lazy"/></div><article className="insight-card wide"><span>{insights[2].eyebrow}</span><h3>{insights[2].title}</h3><p>{insights[2].text}</p><footer><small>Written by<br/><b>{insights[2].author}</b></small><button onClick={()=>setContact(true)} aria-label="Discuss this insight">↗</button></footer></article></div></div></section>
 <ContactSection onSubmit={saveBrief} saved={saved}/>
 </main>
 <footer className="site-footer"><img className="site-footer-bg" src="/assets/footer/webstell-footer.avif" alt="Luminous cube in a landscaped garden" loading="lazy"/><div className="site-footer-shade" aria-hidden="true"></div><div className="footer-panel wrap"><div className="footer-brand"><a className="footer-logo" href="#">WEBSTELL</a><p>We create distinctive websites, brands and digital products for ambitious businesses.</p><form className="subscribe-form" onSubmit={e=>{e.preventDefault();setSubscribed(true)}}><label className="sr-only" htmlFor="footer-email">Email address</label><input id="footer-email" type="email" required placeholder="you@company.com" aria-describedby="subscribe-status"/><button type="submit"><span aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z"/></svg></span>{subscribed?'Subscribed':'Subscribe'}</button></form><p className="subscribe-status" id="subscribe-status" aria-live="polite">{subscribed?'Thanks — you’re on the WEBSTELL list.':'Fresh thinking on design, digital products and growth—sent occasionally.'}</p><span className="footer-social-label">FOLLOW THE TEAM:</span><div className="footer-socials"><a href="https://www.linkedin.com/in/prabhmannat/" target="_blank" rel="noreferrer" aria-label="WEBSTELL team on LinkedIn"><SocialIcon name="linkedin"/></a><a href="https://www.instagram.com/young.elonmusk/" target="_blank" rel="noreferrer" aria-label="WEBSTELL team on Instagram"><SocialIcon name="instagram"/></a><a href="https://github.com/PRABHMANNAT/webstell" target="_blank" rel="noreferrer" aria-label="WEBSTELL on GitHub"><SocialIcon name="github"/></a></div></div><nav className="footer-links" aria-label="Footer navigation"><div><a href="#">Home</a><a href="#services">Services</a><a href="#projects">Works</a><a href="#insights">Insights</a></div><div><a href="#about">About us</a><a href="#team">Meet the team</a><button onClick={()=>setContact(true)}>Start a project</button><a href="#faq">FAQs</a></div><div className="footer-policies"><strong>Explore</strong><a href="#" onClick={e=>{e.preventDefault();setContact(true)}}>Contact</a><a href="#services">Our services</a><a href="#projects">Selected work</a><a href="#team">Our team</a><a href="#insights">Latest insights</a><a href="#faq">Common questions</a><a href="#" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})}}>Back to top</a></div></nav></div><div className="footer-wordmark" aria-hidden="true">WEBSTELL</div></footer>
 <dialog ref={dialog} onCancel={()=>setContact(false)} onClick={e=>{if(e.target===e.currentTarget)setContact(false)}}><button className="close" onClick={()=>setContact(false)} aria-label="Close contact form">×</button><h2>Let’s make<br/>something great.</h2><p className="dialog-description">Start with a few details. Save your brief, ready to share with WEBSTELL.</p><form onSubmit={saveBrief}><div className="form-row"><label>Your name<input name="name" required autoComplete="name" placeholder="Alex Smith"/></label><label>Your email<input name="email" required type="email" autoComplete="email" placeholder="alex@company.com"/></label></div><label>What do you need?<select name="service">{services.map(s=><option key={s.title}>{s.title}</option>)}</select></label><label>Tell us about your project<textarea name="details" required rows={4} placeholder="Your business, goals, timeline and anything else we should know…"/></label><button className="pill" type="submit">Save project brief ↗</button>{saved&&<p className="success" role="status">Your brief has been downloaded. No message has been sent.</p>}</form></dialog>
 <dialog ref={projectDialog} className="project-dialog" onCancel={()=>setSelected(null)} onClick={e=>{if(e.target===e.currentTarget)setSelected(null)}} aria-labelledby="project-preview-title"><button className="close" onClick={()=>setSelected(null)} aria-label="Close project">×</button>{selected!==null&&<><img src={selected.image} alt={selected.title+' preview'}/><span className="refresh-eyebrow">{selected.kind} / {selected.category}</span><h2 id="project-preview-title">{selected.title}</h2><p>{selected.description}</p>{selected.url?<a className="text-link" href={selected.url} target="_blank" rel="noreferrer">Visit {selected.kind==='Featured design'?'image source':'live website'} ↗</a>:<p className="muted">A design direction from our visual collection. Let’s adapt the right ideas to your business, content and goals.</p>}</>}</dialog>
 </>;
}
