import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { industryProjects, recentProjects, featuredDesigns } from '../app/portfolio-data.ts';

test('all published portfolio assets exist and IDs are unique within each collection', () => {
 for (const collection of [industryProjects,recentProjects,featuredDesigns]) {
  assert.equal(new Set(collection.map(item=>item.id)).size,collection.length);
  for(const item of collection) {
   assert(existsSync(new URL('../public'+item.image,import.meta.url)),item.image);
   assert(item.title && item.description && item.category);
  }
 }
});

test('industry designs cover every requested category',()=>{
 assert.equal(new Set(industryProjects.map(item=>item.category)).size,15);
 assert(industryProjects.filter(item=>item.category==='Food & Drink').length>=3);
 assert(industryProjects.every(item=>item.kind==='Design concept'));
});

test('live previews have HTTPS links and featured carousel has exactly five images',()=>{
 assert.equal(recentProjects.length,18);
 assert.equal(featuredDesigns.length,5);
 for(const project of [...recentProjects,...featuredDesigns]) assert.equal(new URL(project.url).protocol,'https:');
 assert(recentProjects.some(project=>project.id==='naivo'));
 assert(recentProjects.some(project=>project.id==='maverick'));
});

test('section flow and protected imagery stay intact',()=>{
 const page=readFileSync(new URL('../app/page.tsx',import.meta.url),'utf8');
 assert.match(page,/<WorksMarquee\/>\s*<WorkGallery/);
 assert.match(page,/\/assets\/hero\/webstell-landscape.avif/);
 assert.match(page,/\/assets\/footer\/webstell-footer.avif/);
 assert.match(page,/<ContactSection onSubmit=\{saveBrief\} saved=\{saved\}/);
 for(const section of ['case-studies','editorial-showcase','industries wrap','studio-systems','showreel wrap']) assert(page.includes(section));
 assert(!page.includes('cuberto.com'));
});

test('pricing and testimonial copy make their limits explicit',()=>{
 const pricing=readFileSync(new URL('../app/PricingSection.tsx',import.meta.url),'utf8');
 assert(!/Up to \d|\d\+ pages|revision rounds/.test(pricing));
 assert.match(pricing,/standard, non-premium domain/);
 assert.match(pricing,/payment-provider fees are separate/);
 const testimonials=readFileSync(new URL('../app/Testimonials.tsx',import.meta.url),'utf8');
 assert.match(testimonials,/not published endorsements/);
 assert(!testimonials.includes('/assets/team/'));
});
