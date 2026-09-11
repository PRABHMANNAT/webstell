'use client';
import { useEffect, useRef, useState } from 'react';

const services = [
 {title:'Website Design & Development',text:'Business websites, portfolios, landing pages and custom digital experiences. We turn your goals into a fast, responsive website built to bring in your next customer.',tags:['Business websites','React / Next.js','WordPress','Webflow','Responsive development'],color:'#e9e4f3'},
 {title:'Ecommerce Experiences',text:'From the first product to the final checkout, we create online stores that make shopping effortless. Built for clothing, jewellery, beauty, food and growing D2C brands.',tags:['Shopify','Product management','Payment integration','Shipping & inventory','WhatsApp ordering'],color:'#eeeeda'},
 {title:'UI / UX & Brand Identity',text:'A clear identity and an intuitive experience, designed together. We shape logos, visual systems, website interfaces and digital products around the people who use them.',tags:['Brand identity','Figma design','Design systems','Interactive prototypes','Packaging & graphics'],color:'#dfeaf4'},
 {title:'Web Apps & AI Automation',text:'Websites that do more for your business. Connect your tools, automate everyday tasks and build useful products, from customer portals to AI-powered assistants.',tags:['Dashboards & portals','SaaS / MVPs','AI chatbots','WhatsApp automation','API integration'],color:'#f4e2df'},
 {title:'Growth & Website Care',text:'Keep your website fast, secure and ready for what comes next. We support your launch with search-friendly foundations, clear analytics and ongoing website maintenance.',tags:['Technical SEO','Performance','Analytics & tracking','Maintenance','Content updates'],color:'#e3ebe1'},
];
const projects = [
 ['puntopago','Punto Pago','A connected digital experience for everyday payments.'],
 ['sca','SCA','A fresh digital presence for an industry leader.'],
 ['flipaclip','FlipaClip','A playful world built around creativity.'],
 ['zelt','Zelt','People, payroll and technology in one place.'],
 ['cisco','Cisco','A scalable design language for a connected world.'],
 ['find','Find','An elevated real estate brand and digital platform.'],
 ['daoway','DaoWay','A mindful mobile experience, from idea to identity.'],
 ['riyadh','Riyadh','An immersive introduction to a city in motion.'],
 ['qvino','Qvino','Discovering, learning and buying wine, made effortless.'],
 ['potion','Potion','Branding, storytelling and motion for a digital product.'],
];
const industries = [['01','FOOD','Cafes · Restaurants · Bakeries'],['02','FASHION','Clothing · Jewellery · Streetwear'],['03','WELLNESS','Gyms · Salons · Spas'],['04','WEDDINGS','Photography · Films · Planners'],['05','PROFESSIONAL','Architects · Consultants · Clinics'],['06','STARTUPS','SaaS · AI · Fintech']];
const team = [
 ['01','TEAM MEMBER 01','Creative Director','#ffb347'],
 ['02','TEAM MEMBER 02','Lead Developer','#2aa79f'],
 ['03','TEAM MEMBER 03','Brand Strategist','#377fa8'],
 ['04','TEAM MEMBER 04','Project Manager','#e65d70'],
];
const faqs = [
 ['What kind of websites do you create?','We create business websites, portfolios, landing pages, ecommerce stores, booking websites, membership platforms and custom web applications. Every project starts with your audience and the job your website needs to do.'],
 ['What does the process look like?','We begin with your goals, content and audience. Then we plan the pages, design the experience, develop the website and check it across screen sizes before launch. You review the work at each key stage.'],
 ['Do you build with custom code or a website platform?','Both. We can work with React and Next.js, WordPress, Shopify or Webflow. The right approach depends on the features, content management needs and budget of your project.'],
 ['Can you help with branding and content?','Yes. Brand identity, interface design, graphics and content structure can be included alongside your website. We agree on the deliverables before the project starts.'],
 ['Can you add AI or WhatsApp automation?','Yes. We can scope website assistants, lead collection, appointment flows, WhatsApp integrations and connections to your existing business tools.'],
 ['Do you offer SEO and ongoing support?','Technical SEO, speed optimization and analytics can be included with your website. Ongoing care can cover updates, backups, content changes and new features.'],
 ['How much will my website cost?','Pricing depends on the pages, design, functionality and integrations you need. Share your project brief so we can define a clear scope, timeline and estimate.'],
];
export default function Home() {
 const [menu,setMenu]=useState(false);
 const [active,setActive]=useState(0);
 const [more,setMore]=useState(false);
 const [selected,setSelected]=useState<number|null>(null);
 const [contact,setContact]=useState(false);
 const [saved,setSaved]=useState(false);
 const dialog=useRef<HTMLDialogElement>(null);
 const projectDialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{if(contact)dialog.current?.showModal();else dialog.current?.close()},[contact]);
 useEffect(()=>{if(selected!==null)projectDialog.current?.showModal();else projectDialog.current?.close()},[selected]);
 function saveBrief(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();const data=new FormData(event.currentTarget);
  const text=['WEBSTHAL — Project brief','','Name: '+data.get('name'),'Email: '+data.get('email'),'Service: '+data.get('service'),'','Project details:',String(data.get('details'))].join('\n');
  const url=URL.createObjectURL(new Blob([text],{type:'text/plain'}));const link=document.createElement('a');link.href=url;link.download='WEBSTHAL-project-brief.txt';link.click();URL.revokeObjectURL(url);setSaved(true);
 }
 return <>
 <header className="site-header"><div className="header wrap"><div className="nav-capsule"><a className="nav-mark" href="#" aria-label="WEBSTHAL home"><span aria-hidden="true"></span><b className="sr-only">WEBSTHAL</b></a><nav id="navigation" className={menu?'open':''}>{[['Works','projects'],['Services','services'],['About','about'],['Team','team'],['FAQ','faq']].map(([label,id])=><a key={id} href={'#'+id} onClick={()=>setMenu(false)}>{label}</a>)}</nav></div><button className="menu-button" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-controls="navigation">{menu?'Close':'Menu'} <span aria-hidden="true">{menu?'−':'☰'}</span></button><button className="hire-pill" onClick={()=>setContact(true)}><span aria-hidden="true">↗</span> Hire Team</button></div></header>
 <main>
 <section className="hero"><h1>Digital design &<br/>development agency</h1><p>We design and build websites, brands and digital experiences for businesses<br className="desktop-break"/> ready to move beyond the ordinary.</p></section>
 <section className="showreel wrap"><video src="/assets/short.mp4" autoPlay muted playsInline loop controls aria-label="WEBSTHAL opening showreel"/></section>
 <section className="intro wrap" id="about"><h2>What we do</h2><p>Websites first. From an ambitious first idea to a business ready to grow, we create distinctive websites that look exceptional and work for you.</p></section>
 <section className="services wrap" id="services" aria-label="Our services">{services.map((s,i)=><article className={'service '+(active===i?'active':'')} style={{background:s.color}} key={s.title}><img className="service-art" src={'/assets/feature/bg/'+(i+1)+'.png'} alt="" loading="lazy"/><button className="service-heading" aria-expanded={active===i} aria-controls={'service-'+i} onClick={()=>setActive(active===i?-1:i)}><span className="service-number">0{i+1}</span><h3>{s.title}</h3><span className="service-toggle" aria-hidden="true">{active===i?'−':'+'}</span></button><div id={'service-'+i} className="service-content" hidden={active!==i}><p>{s.text}</p><div className="tags">{s.tags.map(t=><span key={t}>{t}</span>)}</div><button className="text-link" onClick={()=>setContact(true)}>Let’s talk <span>↗</span></button></div></article>)}</section>
 <section className="industries wrap"><h2>Built for your kind of business</h2><div className="industry-grid">{industries.map(([n,title,desc])=><div key={n}><span>{n}</span><h3>{title}</h3><p>{desc}</p></div>)}</div></section>
 <section className="work wrap" id="projects"><div className="section-heading"><h2>Selected work</h2><span className="muted">Visual reference gallery · Cuberto</span></div><div className="project-grid">{projects.slice(0,more?10:6).map(([id,name,description],i)=><button className="project" key={id} onClick={()=>setSelected(i)} aria-label={'View '+name+' reference'}><div className="project-image"><img src={'/assets/projects/'+id+'/cover.jpg'} alt={name+' website design'} loading="lazy"/><span className="project-arrow">↗</span></div><h3>{description}</h3><p>{name} <span>Design & development reference</span></p></button>)}</div><div className="center"><button className="outline-pill" onClick={()=>setMore(!more)}>{more?'Show fewer projects':'View all projects'} <span>{more?'−':'↗'}</span></button></div></section>
 <section className="why"><div className="wrap"><div className="intro"><h2>Why WEBSTHAL</h2><p>Your website should do more than look good. It should make your business easier to discover, understand and choose.</p></div><div className="principles"><article><span>01</span><h3>Website-first<br/>thinking</h3><p>One clear focus, from your first landing page to a complete online business.</p></article><article><span>02</span><h3>Design meets<br/>development</h3><p>Beautiful interfaces, thoughtful interactions and a dependable foundation.</p></article><article><span>03</span><h3>Ready for<br/>what’s next</h3><p>Integrations, automation and ongoing care that grow with your business.</p></article></div></div></section>
 <section className="team" id="team"><div className="team-inner"><div className="team-heading"><div><span className="team-kicker">The people behind the work</span><h2>Meet our team</h2></div><button className="team-story" onClick={()=>setContact(true)}><span aria-hidden="true">↗</span> Work with us</button></div><div className="team-grid">{team.map(([number,name,role,color])=><article className="team-card" key={number}><div className="team-photo" style={{background:color}} role="img" aria-label={'Image placeholder for '+name}><span className="team-placeholder">Image<br/>placeholder</span><span className="team-card-mark" aria-hidden="true"></span></div><div className="team-meta"><span>{name}</span><p>{role}</p></div></article>)}</div></div></section>
 <section className="faq wrap" id="faq"><h2>FAQ</h2><div>{faqs.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
 <section className="outro" id="contact"><img src="/assets/outro/bg.png" alt="" loading="lazy"/><div className="outro-content"><h2>Have an idea?</h2><button onClick={()=>setContact(true)}>Tell us about it <span>↗</span></button></div></section>
 </main>
 <footer className="footer wrap"><div className="footer-top"><a className="logo" href="#">WEBSTHAL</a><p>Websites. Brands. Digital experiences.</p><button className="text-link" onClick={()=>setContact(true)}>Start a project ↗</button></div><div className="footer-bottom"><span>© {new Date().getFullYear()} WEBSTHAL</span><div><a href="#services">Services</a><a href="#projects">Projects</a><a href="#about">About</a><a href="#faq">FAQ</a></div><a href="#">Back to top ↑</a></div></footer>
 <dialog ref={dialog} onCancel={()=>setContact(false)} onClick={e=>{if(e.target===e.currentTarget)setContact(false)}}><button className="close" onClick={()=>setContact(false)} aria-label="Close contact form">×</button><h2>Let’s make<br/>something great.</h2><p className="dialog-description">Start with a few details. Save your brief, ready to share with WEBSTHAL.</p><form onSubmit={saveBrief}><div className="form-row"><label>Your name<input name="name" required autoComplete="name" placeholder="Alex Smith"/></label><label>Your email<input name="email" required type="email" autoComplete="email" placeholder="alex@company.com"/></label></div><label>What do you need?<select name="service">{services.map(s=><option key={s.title}>{s.title}</option>)}</select></label><label>Tell us about your project<textarea name="details" required rows={4} placeholder="Your business, goals, timeline and anything else we should know…"/></label><button className="pill" type="submit">Save project brief ↗</button>{saved&&<p className="success" role="status">Your brief has been downloaded. No message has been sent.</p>}</form></dialog>
 <dialog ref={projectDialog} className="project-dialog" onCancel={()=>setSelected(null)} onClick={e=>{if(e.target===e.currentTarget)setSelected(null)}}><button className="close" onClick={()=>setSelected(null)} aria-label="Close project">×</button>{selected!==null&&<><img src={'/assets/projects/'+projects[selected][0]+'/cover.jpg'} alt={projects[selected][1]+' reference'}/><h2>{projects[selected][1]}</h2><p>{projects[selected][2]}</p><p className="muted">Original work by Cuberto. Included as a visual reference for this WEBSTHAL website.</p><a className="text-link" href={'https://cuberto.com/projects/'+projects[selected][0]+'/'} target="_blank" rel="noreferrer">View original project ↗</a></>}</dialog>
 </>;
}
