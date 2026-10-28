import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import {
  industryProjects,
  recentProjects,
  featuredDesigns,
} from '../app/portfolio-data.ts';

test('all published portfolio assets exist and IDs are unique within each collection', () => {
  for (const collection of [
    industryProjects,
    recentProjects,
    featuredDesigns,
  ]) {
    assert.equal(
      new Set(collection.map((item) => item.id)).size,
      collection.length,
    );
    for (const item of collection) {
      assert(
        existsSync(new URL('../public' + item.image, import.meta.url)),
        item.image,
      );
      assert(item.title && item.description && item.category);
    }
  }
});

test('industry designs cover every requested category', () => {
  assert.equal(new Set(industryProjects.map((item) => item.category)).size, 15);
  assert(
    industryProjects.filter((item) => item.category === 'Food & Drink')
      .length >= 3,
  );
  assert(industryProjects.every((item) => item.kind === 'Design concept'));
});

test('live previews have HTTPS links and featured carousel has exactly five images', () => {
  assert.equal(recentProjects.length, 18);
  assert.equal(featuredDesigns.length, 5);
  for (const project of [...recentProjects, ...featuredDesigns])
    assert.equal(new URL(project.url).protocol, 'https:');
  assert(recentProjects.some((project) => project.id === 'naivo'));
  assert(recentProjects.some((project) => project.id === 'maverick'));
});

test('existing hero, work, team and enquiry features remain available on the global homepage', () => {
  const page = readFileSync(
    new URL('../app/HomeExperience.tsx', import.meta.url),
    'utf8',
  );
  for (const component of [
    'WorksMarquee',
    'RecentWorkSection',
    'TeamSection',
    'ContactSection',
    'IndustryExplorer',
    'CapabilityGrid',
  ])
    assert(page.includes('<' + component));
  assert.match(page, /webstell-landscape.avif/);
  assert(!page.includes('cuberto.com'));
});
test('project and testimonial provenance remains explicit', () => {
  const page = readFileSync(
    new URL('../app/projects/page.tsx', import.meta.url),
    'utf8',
  );
  assert.match(page, /Studio concept/);
  assert.match(page, /not client case studies/);
  const testimonials = readFileSync(
    new URL('../app/Testimonials.tsx', import.meta.url),
    'utf8',
  );
  assert.match(testimonials, /not published endorsements/);
  assert(!testimonials.includes('/assets/team/'));
});
