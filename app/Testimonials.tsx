'use client';
import { useEffect, useState } from 'react';

const testimonials=[
 {name:'Aanya Rao',role:'Founder',location:'Bengaluru',image:'/assets/team/bhumi-kapoor.png',title:'They made the complicated feel clear.',quote:'WEBSTELL turned a loose idea into a focused product and a website our customers understood immediately.'},
 {name:'Kabir Sethi',role:'Product Director',location:'Singapore',image:'/assets/team/arnav-hooda.png',title:'Fast without ever feeling rushed.',quote:'Every decision had a reason. The team protected the details that mattered and kept the launch moving.'},
 {name:'Meera Shah',role:'Head of Growth',location:'Mumbai',image:'/assets/team/prabhmannat-singh.png',title:'Craft you can feel in the details.',quote:'The experience looks sharp, performs beautifully and finally gives our sales team a story they are proud to share.'},
 {name:'Jonas Müller',role:'Creative Lead',location:'Berlin',image:'/assets/team/adhiraj-dogra.png',title:'A true extension of our team.',quote:'They challenged the brief in all the right places, then shipped a system we can keep growing with.'},
 {name:'Leila Hassan',role:'Operations Lead',location:'Dubai',image:'/assets/team/bhumi-kapoor.png',title:'Built for the real world.',quote:'The final product feels effortless for our customers and refreshingly simple for our team to manage.'},
];

export default function Testimonials(){
 const [active,setActive]=useState(0);
 const [paused,setPaused]=useState(false);
 const move=(step:number)=>setActive(current=>(current+step+testimonials.length)%testimonials.length);
 useEffect(()=>{if(paused)return;const timer=window.setInterval(()=>move(1),5200);return()=>window.clearInterval(timer)},[paused]);
 const slot=(index:number)=>{let distance=(index-active+testimonials.length)%testimonials.length;if(distance>2)distance-=testimonials.length;return distance};
 const current=testimonials[active];
 return <section className="testimonials" aria-labelledby="testimonials-title" onPointerEnter={()=>setPaused(true)} onPointerLeave={()=>setPaused(false)} onFocusCapture={()=>setPaused(true)} onBlurCapture={()=>setPaused(false)}>
  <h2 id="testimonials-title" className="sr-only">What our clients say</h2>
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
