'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { recentWorkProjects } from '../portfolio-data';
import { whatsappUrl } from '../contact-utils';
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

const projectWhatsAppUrl = (projectTitle: string) => whatsappUrl(
  `Hi WEBSTELL, I was exploring the ${projectTitle} website direction and I’m interested in a website like this for my business. Could you tell me more about how we can make it happen?`,
);

export default function ProjectsPage() {
  const [filter, setFilter] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [showScrollShortcut, setShowScrollShortcut] = useState(false);
  const [atInternationalEnd, setAtInternationalEnd] = useState(false);
  const filterMenu = useRef<HTMLDivElement>(null);
  const filterTrigger = useRef<HTMLButtonElement>(null);
  const allProjectsRef = useRef<HTMLElement>(null);
  const internationalProjectsRef = useRef<HTMLDivElement>(null);
  const internationalEndRef = useRef<HTMLDivElement>(null);
  const activeFilter = projectFilters.find((item) => item.value === filter);
  const filterMatches = activeFilter?.matches;
  const visibleProjects = filterMatches
    ? recentWorkProjects.filter((project) => filterMatches(project.category))
    : recentWorkProjects;

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

  useEffect(() => {
    const updateScrollShortcut = () => {
      const allProjectsTop = allProjectsRef.current?.getBoundingClientRect().top;
      const internationalEndTop = internationalEndRef.current?.getBoundingClientRect().top;
      if (allProjectsTop === undefined || internationalEndTop === undefined) return;

      setShowScrollShortcut(allProjectsTop <= window.innerHeight * .72);
      setAtInternationalEnd(internationalEndTop <= window.innerHeight * .78);
    };

    updateScrollShortcut();
    window.addEventListener('scroll', updateScrollShortcut, { passive: true });
    window.addEventListener('resize', updateScrollShortcut);
    return () => {
      window.removeEventListener('scroll', updateScrollShortcut);
      window.removeEventListener('resize', updateScrollShortcut);
    };
  }, []);

  const navigateProjects = () => {
    const destination = atInternationalEnd ? allProjectsRef.current : internationalProjectsRef.current;
    destination?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <StudioNav current="work" />
      <main>
        <section className="projects-hero">
          <video className="projects-hero-video" autoPlay loop muted playsInline preload="metadata" poster="/assets/projects/optimized/projects-hero.webp" aria-hidden="true">
            <source src="/assets/projects/optimized/projects-hero.web.mp4" type="video/mp4" />
          </video>
          <div className="projects-hero-inner wrap">
            <h1>Designs<br />impossible<br />to ignore.</h1>
            <p>
              Explore bold website directions—from distinctive storefronts to
              smarter digital products—built to turn attention into action.
            </p>
          </div>
        </section>

        <section className="projects-list wrap" ref={allProjectsRef} aria-labelledby="all-projects-title">
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
                <a className="project-preview" href={projectWhatsAppUrl(project.title)} target="_blank" rel="noreferrer" aria-label={`Ask WEBSTELL about a website like ${project.title}`}>
                  <div className="project-image">
                    <Image src={project.image} alt={`${project.title} website design direction`} fill sizes="(max-width: 700px) 100vw, 50vw" unoptimized />
                    <span className="project-arrow" aria-hidden="true">↗</span>
                  </div>
                </a>
                <div className="project-title-row">
                  <h3><a className="project-title-link" href={projectWhatsAppUrl(project.title)} target="_blank" rel="noreferrer">{project.title}</a></h3>
                </div>
                <p className="project-category">{project.category}</p>
                <p className="project-description">{project.description}</p>
              </article>
            ))}
          </div>
        </section>
        <div className="international-projects-anchor" ref={internationalProjectsRef}>
          <InternationalProjectsSection />
        </div>
        <div ref={internationalEndRef} aria-hidden="true" />
      </main>
      {showScrollShortcut && <button type="button" className={`project-scroll-shortcut${atInternationalEnd ? ' is-up' : ''}`} onClick={navigateProjects} aria-label={atInternationalEnd ? 'Back to the beginning of all projects' : 'Jump to international projects'} data-label={atInternationalEnd ? 'Back to all projects' : 'International projects'}>
        {atInternationalEnd ? <ArrowUp aria-hidden="true" /> : <ArrowDown aria-hidden="true" />}
      </button>}
      <SiteFooter />
    </>
  );
}
