'use client';
import { useState } from 'react';
import { workFilters, workGallery, type WorkCategory } from './showcase-data';

export default function WorkGallery({onOpen}:{onOpen:(index:number)=>void}){
 const [filter,setFilter]=useState<WorkCategory>('All');
 const visible=filter==='All'?workGallery:workGallery.filter(item=>item.category===filter);
 return <section className="work-gallery" aria-labelledby="work-gallery-title">
  <header className="work-gallery-heading wrap">
   <span>OUR WORK / SELECTED PROJECTS</span>
   <h2 id="work-gallery-title">Built to be noticed.<br/>Made to be used.</h2>
  </header>
  <div className="work-filters" role="toolbar" aria-label="Filter selected work">
   {workFilters.map(item=><button key={item} className={filter===item?'is-active':''} onClick={()=>setFilter(item)} aria-pressed={filter===item}>{item}</button>)}
  </div>
  <div className="work-masonry wrap" role="list">
   {visible.map(item=><button className={'work-tile work-tile-'+item.shape} key={item.title} onClick={()=>onOpen(workGallery.indexOf(item))} role="listitem" aria-label={'Open '+item.title}>
    <img src={item.image} alt="" loading="lazy"/>
    <span className="work-tile-copy"><strong>{item.title}</strong><small>{item.meta}</small></span>
   </button>)}
  </div>
 </section>;
}
