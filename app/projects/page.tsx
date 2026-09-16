'use client';

import { useEffect, useRef, useState } from 'react';
import { recentWorkProjects, type Project } from '../portfolio-data';
import StudioNav from '../StudioNav';
import SiteFooter from '../SiteFooter';
import InternationalProjectsSection from '../InternationalProjectsSection';
import './projects.css';

type ProjectFilter = {
  value: string;
  label: string;
  description: string;
  matches?: (category: string) => boolean;
};

const projectFilters: ProjectFilter[] = [
  { value: 'all', label: 'All projects', description: 'Show every direction' },
  { value: 'food', label: 'Cafés & food', description: 'Menus, coffee and culinary brands', matches: (category) => category.includes('Food') },
  { value: 'travel', label: 'Travel & tourism', description: 'Journeys, routes and destinations', matches: (category) => category.includes('Travel') },
  { value: 'hospitality', label: 'Hospitality & stays', description: 'Places designed to be experienced', matches: (category) => category.includes('Hospitality') || category.includes('Leisure') },
  { value: 'health', label: 'Health & wellbeing', description: 'Care, fitness and balanced living', matches: (category) => category.includes('Health') },
  { value: 'fashion', label: 'Fashion & beauty', description: 'Collections, care and personal style', matches: (category) => category.includes('Fashion') || category.includes('Beauty') },
  { value: 'technology', label: 'Technology & innovation', description: 'Products, platforms and systems', matches: (category) => category.includes('Technology') || category.includes('Tech') || category.includes('Logistics') || category.includes('Automotive') },
  { value: 'creative', label: 'Creative & culture', description: 'Studios, stories and visual identity', matches: (category) => category.includes('Creative') || category.includes('Culture') },
  { value: 'agriculture', label: 'Agriculture & sustainability', description: 'Growing smarter, more responsibly', matches: (category) => category.includes('Agriculture') },
  { value: 'places', label: 'Property, home & events', description: 'Spaces, celebrations and places to live', matches: (category) => category.includes('Property') || category.includes('Home') || category.includes('Weddings') },
];

export default function ProjectsPage() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const filterMenu = useRef<HTMLDivElement>(null);
  const filterTrigger = useRef<HTMLButtonElement>(null);
  const activeFilter = projectFilters.find((item) => item.value === filter);
  const visibleProjects = activeFilter?.matches
    ? recentWorkProjects.filter((project) => activeFilter.matches(project.category))
    : recentWorkProjects;

  useEffect(() => {
    if (selected) dialog.current?.showModal();
    else dialog.current?.close();
  }, [selected]);

  useEffect(() => {
    if (!filterOpen) return;

    const closeFilter = (event: MouseEvent) => {
      if (!filterMenu.current?.contains(event.target as Node)) setFilterOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setFilterOpen(false);
      filterTrigger.current?.focus();
    };

    document.addEventListener('mousedown', closeFilter);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeFilter);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [filterOpen]);

  return (
    <>
      <StudioNav current="work" />
      <main>
        <section className="projects-hero">
          <video className="projects-hero-video" autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
            <source src="/assets/projects/projects-hero.mp4" type="video/mp4" />
          </video>
          <div className="projects-hero-inner wrap">
            <h1>Built to make<br />your next move<br />impossible to ignore.</h1>
            <p>
              Explore bold website directions—from distinctive storefronts to
              smarter digital products—built to turn attention into action.
            </p>
          </div>
        </section>

        <section className="projects-list wrap" aria-labelledby="all-projects-title">
          <div className="projects-list-heading">
            <div>
              <span className="refresh-eyebrow" aria-live="polite">{String(visibleProjects.length).padStart(2, '0')} PROJECTS</span>
              <h2 id="all-projects-title">All projects.</h2>
            </div>
            <div className={`project-filter${filterOpen ? ' is-open' : ''}`} ref={filterMenu}>
              <span className="project-filter-label">Browse by industry</span>
              <button ref={filterTrigger} type="button" className="project-filter-trigger" onClick={() => setFilterOpen((isOpen) => !isOpen)} aria-expanded={filterOpen} aria-haspopup="menu" aria-controls="project-filter-menu">
                <span>{activeFilter?.label ?? 'Filter projects'}</span>
                <span className="project-filter-chevron" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="m4 6 4 4 4-4" /></svg></span>
              </button>
              {filterOpen && <div className="project-filter-menu" id="project-filter-menu" role="menu" aria-label="Project industries">
                <span className="project-filter-menu-label">Choose an industry</span>
                {projectFilters.map((item, index) => (
                  <button type="button" role="menuitemradio" key={item.value} aria-checked={filter === item.value || (filter === '' && index === 0)} className={`project-filter-option${filter === item.value || (filter === '' && index === 0) ? ' is-selected' : ''}`} onClick={() => { setFilter(item.value); setFilterOpen(false); requestAnimationFrame(() => filterTrigger.current?.focus()); }}>
                    <span><strong>{item.label}</strong><small>{item.description}</small></span>
                    <span className="project-filter-check" aria-hidden="true">{filter === item.value || (filter === '' && index === 0) ? '✓' : ''}</span>
                  </button>
                ))}
              </div>}
            </div>
          </div>
          <div className="project-grid">
            {visibleProjects.map((project) => (
              <article className="project" key={project.id}>
                <button className="project-preview" onClick={() => setSelected(project)} aria-label={`Preview ${project.title}`}>
                  <div className="project-image">
                    <img src={project.image} alt={`${project.title} website design direction`} loading="lazy" />
                    <span className="project-arrow" aria-hidden="true">↗</span>
                  </div>
                </button>
                <div className="project-title-row">
                  <h3>{project.title}</h3>
                </div>
                <p className="project-category">{project.category}</p>
                <p className="project-description">{project.description}</p>
              </article>
            ))}
          </div>
        </section>
        <InternationalProjectsSection />
      </main>
      <SiteFooter />
      <dialog ref={dialog} className="project-dialog" onCancel={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }} aria-labelledby="project-preview-title">
        <button className="close" onClick={() => setSelected(null)} aria-label="Close project">×</button>
        {selected && <>
          <img src={selected.image} alt={`${selected.title} preview`} />
          <span className="refresh-eyebrow">Studio concept / {selected.category}</span>
          <h2 id="project-preview-title">{selected.title}</h2>
          <p>{selected.description}</p>
        </>}
      </dialog>
    </>
  );
}
