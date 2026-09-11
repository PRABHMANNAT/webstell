'use client';
import { useEffect, useState } from 'react';

const testimonials=[
  {
    "name": "Café owner",
    "role": "Sample review",
    "location": "Illustrative portrait",
    "title": "A menu people can actually find.",
    "quote": "“I want guests to see our menu, find directions and book a table without having to call.”",
    "image": "/assets/refresh/portraits/sample-0.webp"
  },
  {
    "name": "Independent founder",
    "role": "Sample review",
    "location": "Illustrative portrait",
    "title": "A website that feels like the brand.",
    "quote": "“I need an online shop that looks like us and makes choosing a product simple.”",
    "image": "/assets/refresh/portraits/sample-1.webp"
  },
  {
    "name": "Software team",
    "role": "Sample review",
    "location": "Illustrative portrait",
    "title": "Make the product easier to explain.",
    "quote": "“Our visitors should understand what the software does and know how to book a demo.”",
    "image": "/assets/refresh/portraits/sample-2.webp"
  },
  {
    "name": "Creative studio",
    "role": "Sample review",
    "location": "Illustrative portrait",
    "title": "Let the work do the talking.",
    "quote": "“Give our projects room to shine, with an easy way for the right clients to get in touch.”",
    "image": "/assets/refresh/portraits/sample-3.webp"
  },
  {
    "name": "Travel business",
    "role": "Sample review",
    "location": "Illustrative portrait",
    "title": "A better start to the journey.",
    "quote": "“We want travellers to explore our trips and send a useful enquiry, even on a phone.”",
    "image": "/assets/refresh/portraits/sample-4.webp"
  }
];

export default function Testimonials(){
 const [active,setActive]=useState(0);
 const [paused,setPaused]=useState(false);
 const move=(step:number)=>setActive(current=>(current+step+testimonials.length)%testimonials.length);
 useEffect(()=>{if(paused||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const timer=window.setInterval(()=>move(1),5200);return()=>window.clearInterval(timer)},[paused]);
 const slot=(index:number)=>{let distance=(index-active+testimonials.length)%testimonials.length;if(distance>2)distance-=testimonials.length;return distance};
 const current=testimonials[active];
 return <section className="testimonials" aria-labelledby="testimonials-title" onPointerEnter={()=>setPaused(true)} onPointerLeave={()=>setPaused(false)} onFocusCapture={()=>setPaused(true)} onBlurCapture={()=>setPaused(false)}>
  <header className="testimonial-heading wrap"><span>CLIENT PERSPECTIVES / PREVIEW</span><h2 id="testimonials-title">Good websites solve real needs.</h2><p>Illustrative client briefs, not published endorsements. Sample copy and stock portraits will be replaced with approved client testimonials.</p></header>
  <div className="testimonial-stage">
   {testimonials.map((item,index)=><button type="button" key={item.name} className={'testimonial-person testimonial-slot-'+slot(index)+(index===active?' is-active':'')} onClick={()=>setActive(index)} aria-label={'Show testimonial from '+item.name} aria-current={index===active?'true':undefined}>
    <img src={item.image} alt="" loading="lazy"/>
    <span className="testimonial-person-copy"><b aria-hidden="true">★★★★★</b><strong>{item.name}</strong><small>{item.role}<br/>{item.location}</small></span>
   </button>)}
   <span className="testimonial-quote-mark" aria-hidden="true">“</span>
  </div>
  <div className="testimonial-copy" aria-live="polite"><h3>{current.title}</h3><p>{current.quote}</p></div>
  <div className="testimonial-controls">
   <button type="button" onClick={()=>move(-1)} aria-label="Previous testimonial">‹</button>
   <div>{testimonials.map((item,index)=><button type="button" key={item.name} className={index===active?'is-active':''} onClick={()=>setActive(index)} aria-label={'Show testimonial '+(index+1)} aria-current={index===active?'true':undefined}></button>)}</div>
   <button type="button" onClick={()=>move(1)} aria-label="Next testimonial">›</button>
  </div>
 </section>;
}
