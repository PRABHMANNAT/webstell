'use client';
import { useState } from 'react';
import { workFilters, workGallery, type WorkCategory } from './showcase-data';

import type { Project } from './portfolio-data';

export default function WorkGallery({onOpen}:{onOpen:(project:Project)=>void}){
 const [filter,setFilter]=useState<WorkCategory>('All');
 const visible=filter==='All'?workGallery:workGallery.filter(item=>item.category===filter);
 return <section className="work-gallery" aria-labelledby="work-gallery-title">
  <header className="work-gallery-heading wrap">
   <span>OUR PROJECTS / EXPLORE BY INDUSTRY</span>
   <h2 id="work-gallery-title" className="animated-heading"><span>Built to be noticed.</span><span>Made to be used.</span></h2>
  </header>
  <p className="gallery-intro wrap">From a neighbourhood café to a global software product. Explore website design directions for businesses like yours.</p>
  <div className="work-filters" role="toolbar" aria-label="Filter selected work">
   {workFilters.map(item=><button key={item} className={filter===item?'is-active':''} onClick={()=>setFilter(item)} aria-pressed={filter===item}>{item}</button>)}
  </div>
  <ul className="work-masonry wrap">
   {visible.map(item=><li key={item.id}><button className={'work-tile work-tile-'+item.shape} onClick={()=>onOpen(item)} aria-label={'Open '+item.title}>
    <img src={item.image} alt={item.title+" website design preview"} loading="lazy"/>
    <span className="work-tile-copy"><strong>{item.title}</strong><small>{item.meta}</small></span>
   </button></li>)}
  </ul>
 </section>;
}
