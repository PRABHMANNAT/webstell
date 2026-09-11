'use client';
import { useEffect, useState } from 'react';
import { workGallery } from './showcase-data';

const slides = workGallery.slice(0, 5);

export default function SocialWorkGallery({onOpen}:{onOpen:(index:number)=>void}){
 const [active,setActive]=useState(0);
 const [paused,setPaused]=useState(false);
 useEffect(()=>{
  if(paused) return;
  const timer=window.setInterval(()=>setActive(current=>(current+1)%slides.length),2000);
  return()=>window.clearInterval(timer);
 },[paused]);
 const move=(direction:number)=>setActive(current=>(current+direction+slides.length)%slides.length);
 const positionFor=(index:number)=>{
  let distance=index-active;
  if(distance>slides.length/2) distance-=slides.length;
  if(distance<-slides.length/2) distance+=slides.length;
  return Math.max(-2,Math.min(2,distance));
 };
 const current=slides[active];
 return <section className="social-work" aria-labelledby="social-work-title">
  <div className="social-work-switch" aria-label="Gallery type">
   <span className="is-active">Project Gallery</span><span>Websites</span><span>Brand Systems</span>
  </div>
  <h2 id="social-work-title" className="sr-only">WEBSTELL project gallery</h2>
  <div className="social-work-stage" onPointerEnter={()=>setPaused(true)} onPointerLeave={()=>setPaused(false)} onFocusCapture={()=>setPaused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))setPaused(false)}}>
   {slides.map((slide,index)=><button type="button" key={slide.title} className={`social-preview social-preview-${positionFor(index)}`} aria-label={`Show ${slide.title}`} onClick={()=>setActive(index)}>
    <img src={slide.image} alt="" loading={index===0?'eager':'lazy'}/>
   </button>)}
   <article className="social-post" aria-live="polite">
    <header><span className="social-avatar" aria-hidden="true"><i></i></span><strong>WEBSTELL</strong><button type="button" aria-label={`Open ${current.title} project`} onClick={()=>onOpen(active)}>•••</button></header>
    <div className="social-post-image"><img src={current.image} alt={`${current.meta} project`}/><button className="social-prev" type="button" aria-label="Previous image" onClick={()=>move(-1)}>‹</button><button className="social-next" type="button" aria-label="Next image" onClick={()=>move(1)}>›</button><div className="social-dots">{slides.map((slide,index)=><button type="button" className={index===active?'is-active':''} key={slide.title} aria-label={`Show image ${index+1}: ${slide.title}`} aria-current={index===active?'true':undefined} onClick={()=>setActive(index)}></button>)}</div></div>
    <footer>
     <div className="social-actions" aria-hidden="true"><span>♡</span><b>325</b><span>◯</span><span>↻</span><span>▽</span><span className="social-save">▱</span></div>
     <p><strong>WEBSTELL</strong> {current.title}. Built to be noticed and made to be used. <span>✦</span></p>
    </footer>
   </article>
  </div>
 </section>;
}
