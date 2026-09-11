'use client';
import { workGallery } from './showcase-data';

const slides = workGallery.slice(0, 5);

export default function SocialWorkGallery({onOpen}:{onOpen:(index:number)=>void}){
 const active=0;
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
  <div className="social-work-stage">
   {slides.map((slide,index)=><button key={slide.title} className={`social-preview social-preview-${positionFor(index)}`} aria-label={`View ${slide.title}`} onClick={()=>onOpen(index)}>
    <img src={slide.image} alt="" loading={index===0?'eager':'lazy'}/>
   </button>)}
   <article className="social-post">
    <header><span className="social-avatar" aria-hidden="true"><i></i></span><strong>WEBSTELL</strong><button type="button" aria-label="More project options">•••</button></header>
    <div className="social-post-image"><img src={current.image} alt={`${current.meta} project`}/><button className="social-prev" type="button" aria-label="Previous image">‹</button><button className="social-next" type="button" aria-label="Next image">›</button><div className="social-dots" aria-hidden="true">{slides.map((_,index)=><i className={index===active?'is-active':''} key={index}></i>)}</div></div>
    <footer>
     <div className="social-actions" aria-hidden="true"><span>♡</span><b>325</b><span>◯</span><span>↻</span><span>▽</span><span className="social-save">▱</span></div>
     <p><strong>WEBSTELL</strong> {current.title}. Built to be noticed and made to be used. <span>✦</span></p>
    </footer>
   </article>
  </div>
 </section>;
}
