'use client';
import { useEffect, useState } from 'react';
import { featuredDesigns, type Project } from './portfolio-data';
import { useInViewport } from './useInViewport';

const slides = featuredDesigns;

export default function SocialWorkGallery({onOpen}:{onOpen:(project:Project)=>void}){
 const [active,setActive]=useState(0);
 const [paused,setPaused]=useState(false);
 const [interactionPaused,setInteractionPaused]=useState(false);
 const [focusPaused,setFocusPaused]=useState(false);
 const {ref,isInViewport}=useInViewport<HTMLElement>();
 useEffect(()=>{
  if(!isInViewport || paused || interactionPaused || focusPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const timer=window.setInterval(()=>setActive(current=>(current+1)%slides.length),2000);
  return()=>window.clearInterval(timer);
 },[isInViewport,paused,interactionPaused,focusPaused]);
 const move=(direction:number)=>setActive(current=>(current+direction+slides.length)%slides.length);
 const positionFor=(index:number)=>{
  let distance=index-active;
  if(distance>slides.length/2) distance-=slides.length;
  if(distance<-slides.length/2) distance+=slides.length;
  return Math.max(-2,Math.min(2,distance));
 };
 const current=slides[active];
 return <section ref={ref} className="social-work" aria-labelledby="social-work-title">
  <header className="featured-design-heading wrap"><span>INDEPENDENT REFERENCES / 05 IDEAS</span><h2 id="social-work-title" className="animated-heading"><span>Work we admire.</span></h2><p>Five independent brand references selected for their texture, colour and character. They are not WEBSTELL client work.</p><button type="button" onClick={()=>setPaused(value=>!value)} aria-pressed={paused}>{paused?'Play slideshow':'Pause slideshow'}</button></header>
  <div className="social-work-stage" onPointerEnter={()=>setInteractionPaused(true)} onPointerLeave={()=>setInteractionPaused(false)} onFocusCapture={()=>setFocusPaused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))setFocusPaused(false)}}>
   {slides.map((slide,index)=><button type="button" key={slide.title} className={`social-preview social-preview-${positionFor(index)}`} aria-label={`Show ${slide.title}`} onClick={()=>setActive(index)}>
    <img src={slide.image} alt="" loading={index===0?'eager':'lazy'}/>
   </button>)}
   <article className="social-post" aria-live="polite">
    <header><span className="social-avatar" aria-hidden="true"><img src="/assets/brand/webstell-retro-mac.png" alt=""/></span><strong>REFERENCE / NOT OUR WORK</strong><button type="button" aria-label={`Read about the ${current.title} reference`} onClick={()=>onOpen(current)}>•••</button></header>
    <div className="social-post-image"><img key={current.image} src={current.image} alt={`${current.category} featured design`}/><button className="social-prev" type="button" aria-label="Previous image" onClick={()=>move(-1)}>‹</button><button className="social-next" type="button" aria-label="Next image" onClick={()=>move(1)}>›</button><div className="social-dots">{slides.map((slide,index)=><button type="button" className={index===active?'is-active':''} key={slide.title} aria-label={`Show image ${index+1}: ${slide.title}`} aria-current={index===active?'true':undefined} onClick={()=>setActive(index)}></button>)}</div></div>
    <footer>
     <div className="social-footer-meta"><span className="social-count"><i aria-hidden="true">✦</i> {String(active+1).padStart(2,'0')} <em>/ {String(slides.length).padStart(2,'0')}</em></span><span className="social-actions" aria-hidden="true"><i>♡</i><i>⌁</i><i>↗</i></span></div>
     <div className="social-footer-copy"><p><span>{current.category}</span><strong>{current.title}</strong></p><button type="button" onClick={()=>onOpen(current)}>View reference <i aria-hidden="true">↗</i></button></div>
    </footer>
   </article>
  </div>
 </section>;
}
