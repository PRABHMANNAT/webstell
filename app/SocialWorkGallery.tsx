'use client';
import { useEffect, useState } from 'react';
import { featuredDesigns, type Project } from './portfolio-data';

const slides = featuredDesigns;

export default function SocialWorkGallery({onOpen}:{onOpen:(project:Project)=>void}){
 const [active,setActive]=useState(0);
 const [paused,setPaused]=useState(false);
 const [interactionPaused,setInteractionPaused]=useState(false);
 const [focusPaused,setFocusPaused]=useState(false);
 useEffect(()=>{
  if(paused || interactionPaused || focusPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const timer=window.setInterval(()=>setActive(current=>(current+1)%slides.length),2000);
  return()=>window.clearInterval(timer);
 },[paused,interactionPaused,focusPaused]);
 const move=(direction:number)=>setActive(current=>(current+direction+slides.length)%slides.length);
 const positionFor=(index:number)=>{
  let distance=index-active;
  if(distance>slides.length/2) distance-=slides.length;
  if(distance<-slides.length/2) distance+=slides.length;
  return Math.max(-2,Math.min(2,distance));
 };
 const current=slides[active];
 return <section className="social-work" aria-labelledby="social-work-title">
  <header className="featured-design-heading wrap"><span>THE VISUAL EDIT / 05 IDEAS</span><h2 id="social-work-title" className="animated-heading"><span>Featured design.</span></h2><p>Texture, colour and character. Five visual ideas from independent brands that make us look twice.</p><button type="button" onClick={()=>setPaused(value=>!value)} aria-pressed={paused}>{paused?'Play slideshow':'Pause slideshow'}</button></header>
  <div className="social-work-stage" onPointerEnter={()=>setInteractionPaused(true)} onPointerLeave={()=>setInteractionPaused(false)} onFocusCapture={()=>setFocusPaused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))setFocusPaused(false)}}>
   {slides.map((slide,index)=><button type="button" key={slide.title} className={`social-preview social-preview-${positionFor(index)}`} aria-label={`Show ${slide.title}`} onClick={()=>setActive(index)}>
    <img src={slide.image} alt="" loading={index===0?'eager':'lazy'}/>
   </button>)}
   <article className="social-post" aria-live="polite">
    <header><span className="social-avatar" aria-hidden="true"><i></i></span><strong>WEBSTELL</strong><button type="button" aria-label={`Open ${current.title} project`} onClick={()=>onOpen(current)}>•••</button></header>
    <div className="social-post-image"><img key={current.image} src={current.image} alt={`${current.category} featured design`}/><button className="social-prev" type="button" aria-label="Previous image" onClick={()=>move(-1)}>‹</button><button className="social-next" type="button" aria-label="Next image" onClick={()=>move(1)}>›</button><div className="social-dots">{slides.map((slide,index)=><button type="button" className={index===active?'is-active':''} key={slide.title} aria-label={`Show image ${index+1}: ${slide.title}`} aria-current={index===active?'true':undefined} onClick={()=>setActive(index)}></button>)}</div></div>
    <footer>
     <div className="social-actions" aria-hidden="true"><span>♡</span><b>{active+1} / {slides.length}</b><span>◯</span><span>↻</span><span>▽</span><span className="social-save">▱</span></div>
     <p><strong>{current.category}</strong> {current.title}. <span>✦</span></p>
    </footer>
   </article>
  </div>
 </section>;
}
