'use client';
import { workGallery } from './showcase-data';

export default function WorkGallery({onOpen}:{onOpen:(index:number)=>void}){
 return <section className="work-gallery" aria-labelledby="work-gallery-title">
  <header className="work-gallery-heading wrap">
   <span>OUR WORK / SELECTED PROJECTS</span>
   <h2 id="work-gallery-title">Built to be noticed.<br/>Made to be used.</h2>
  </header>
  <div className="work-masonry wrap" role="list">
   {workGallery.map((item,index)=><button className={'work-tile work-tile-'+item.shape} key={item.title} onClick={()=>onOpen(index)} role="listitem" aria-label={'Open '+item.title}>
    <img src={item.image} alt="" loading="lazy"/>
    <span className="work-tile-copy"><strong>{item.title}</strong><small>{item.meta}</small></span>
   </button>)}
  </div>
 </section>;
}
