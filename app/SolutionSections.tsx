'use client';
import SiteLink from './SiteLink';
import { useState } from 'react';
import { ArrowUpRight, ArrowRight, Check, Plus } from 'lucide-react';
import {
  services,
  industries,
  enquiryHref,
  type IndustryId,
} from './service-catalog';
import IndustryIcon from './IndustryIcon';
import './industry-explorer.css';

export function CapabilityGrid() {
  return (
    <section
      className="capability-section studio-width"
      aria-labelledby="capability-title"
    >
      <div className="agency-section-heading">
        <span className="studio-eyebrow">
          CREATIVE THINKING. PRACTICAL TECHNOLOGY.
        </span>
        <h2 id="capability-title">
          A better presence.
          <br />
          <em>A more capable business.</em>
        </h2>
        <p>
          One team for what customers see, the software your team uses, and the
          systems that connect it all.
        </p>
      </div>
      <div className="capability-grid">
        {services.map((service) => (
          <SiteLink
            className="capability-card"
            key={service.id}
            href={`/services#${service.id}`}
          >
            <span>
              {service.number}
              <ArrowUpRight aria-hidden="true" size={23} />
            </span>
            <h3>{service.short}</h3>
            <p>{service.description}</p>
            <small>Explore the possibilities</small>
          </SiteLink>
        ))}
      </div>
    </section>
  );
}

const problems = [
  {
    label: 'Our offer is hard to explain',
    title: 'Make your value clear from the first visit.',
    service: 0,
    steps: [
      'Clarify the offer and audience',
      'Design a focused website or store',
      'Connect the next step to a useful enquiry',
    ],
    output:
      'A clear website, a stronger story and an enquiry path your team can use.',
  },
  {
    label: 'Work lives in too many spreadsheets',
    title: 'Give your team one useful source of truth.',
    service: 1,
    steps: [
      'Map the current workflow',
      'Prototype roles, screens and data',
      'Build and test a focused first release',
    ],
    output:
      'A portal, dashboard or internal tool shaped around an agreed workflow.',
  },
  {
    label: 'We repeat the same answers',
    title: 'Handle routine questions. Keep people in control.',
    service: 2,
    steps: [
      'Organise approved knowledge',
      'Set boundaries and escalation rules',
      'Evaluate answers and review usage',
    ],
    output:
      'An assistant that helps customers and hands over when a person is needed.',
  },
  {
    label: 'Good work is not getting found',
    title: 'Make discovery part of the product.',
    service: 4,
    steps: [
      'Audit search and conversion gaps',
      'Prioritise useful pages and technical fixes',
      'Measure qualified enquiries and iterate',
    ],
    output:
      'A practical SEO and conversion plan with reporting tied to business goals.',
  },
] as const;

export function SolutionFinder() {
  const [active, setActive] = useState(0);
  const problem = problems[active];
  const service = services[problem.service];
  return (
    <section
      className="solution-finder studio-width"
      aria-labelledby="solution-title"
    >
      <div className="agency-section-heading">
        <span className="studio-eyebrow">START WITH THE PROBLEM</span>
        <h2 id="solution-title">
          What’s slowing
          <br />
          <em>you down?</em>
        </h2>
        <p>
          You do not need a technical brief to start. Choose the situation
          closest to yours.
        </p>
      </div>
      <div className="solution-layout">
        <fieldset
          className="solution-options"
          aria-label="Choose a business challenge"
        >
          {problems.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={active === index}
              aria-controls="solution-result"
              onClick={() => setActive(index)}
            >
              <span>0{index + 1}</span>
              {item.label}
              <ArrowUpRight aria-hidden="true" size={20} />
            </button>
          ))}
        </fieldset>
        <div
          className="solution-result"
          id="solution-result"
          aria-live="polite"
        >
          <span className="studio-eyebrow">{service.label}</span>
          <h3>{problem.title}</h3>
          <ol>
            {problem.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p>{problem.output}</p>
          <SiteLink
            className="agency-button"
            href={enquiryHref(service.project, problem.label)}
          >
            Discuss this challenge <ArrowUpRight size={19} />
          </SiteLink>
        </div>
      </div>
    </section>
  );
}

const industryLabels: Record<IndustryId, string> = {
  'cafes-restaurants': 'Cafés & dining',
  'sweets-beverages': 'Sweets & drinks',
  'beauty-makeup': 'Beauty & makeup',
  'jewellery-fashion': 'Jewellery & fashion',
  'furniture-home': 'Furniture & home',
  retail: 'Retail stores',
  'real-estate': 'Real estate',
  clinics: 'Clinics & care',
  'australian-tradies': 'Australian tradies',
};

export function IndustryExplorer({
  australia = false,
}: {
  australia?: boolean;
}) {
  const [active, setActive] = useState<IndustryId>(
    australia ? 'australian-tradies' : 'cafes-restaurants',
  );
  const industry =
    industries.find((item) => item.id === active) ?? industries[0];
  return (
    <section
      className="industry-explorer industry-compact studio-width"
      id="industries"
      aria-labelledby="industry-title"
    >
      <header className="industry-heading">
        <div>
          <span className="studio-eyebrow">
            A WEBSITE THAT KNOWS YOUR WORLD
          </span>
          <h2 id="industry-title">
            Made for <em>your business.</em>
          </h2>
          <p>
            Choose your industry. Explore what we can build.
          </p>
        </div>
        <span className="industry-heading-note">
          <span aria-hidden="true">✳</span> DIFFERENT BUSINESSES.
          <br />
          THEIR OWN POSSIBILITIES.
        </span>
      </header>
      <div className="industry-browser">
        <label className="industry-mobile-picker">
          Your industry
          <select
            value={active}
            onChange={(event) => setActive(event.target.value as IndustryId)}
          >
            {industries.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <fieldset
          className="industry-selector"
          aria-label="Explore an industry"
        >
          {industries.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.name}
              aria-pressed={active === item.id}
              aria-controls="industry-focus"
              onClick={() => setActive(item.id)}
            >
              <span className="industry-tile-icon">
                <IndustryIcon industry={item.id} />
              </span>
              <span>{industryLabels[item.id]}</span>
              <span className="industry-selected-dot" aria-hidden="true" />
            </button>
          ))}
        </fieldset>
        <article
          className="industry-focus"
          id="industry-focus"
          aria-labelledby="industry-focus-title"
        >
          <div className="industry-focus-intro">
            <span className="industry-focus-icon">
              <IndustryIcon industry={industry.id} />
            </span>
            <div>
              <span className="industry-focus-kicker">BUILT AROUND</span>
              <p>{industry.name}</p>
            </div>
            <span className="industry-focus-number" aria-hidden="true">
              0{industries.findIndex((item) => item.id === industry.id) + 1} /
              09
            </span>
          </div>
          <div
            className="industry-focus-copy"
            aria-live="polite"
            aria-atomic="true"
          >
            <h3 id="industry-focus-title">{industry.tagline}</h3>
            <p>{industry.need}</p>
            <ul>
              {industry.features.map((feature) => (
                <li key={feature}>
                  <Check size={16} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="industry-focus-actions">
            <SiteLink
              className="agency-button"
              href={enquiryHref(industry.project, industry.name, {
                industry: industry.id,
              })}
            >
              Plan my project <ArrowUpRight size={18} aria-hidden="true" />
            </SiteLink>
            <SiteLink
              className="industry-work-link"
              href={'/projects?industry=' + industry.filter}
            >
              View concepts <ArrowRight size={16} aria-hidden="true" />
            </SiteLink>
          </div>
          <details className="industry-journey" key={industry.id}>
            <summary>
              A typical customer journey <Plus size={15} aria-hidden="true" />
            </summary>
            <p>{industry.workflow}</p>
          </details>
        </article>
      </div>
    </section>
  );
}

export function DeliveryProcess() {
  const steps = [
    [
      'Discover',
      'Agree the problem, people, constraints and what success should mean.',
      'A focused brief and scope.',
    ],
    [
      'Design',
      'Review the structure and key journeys before committing to the build.',
      'A direction you can respond to.',
    ],
    [
      'Build & test',
      'Develop in agreed milestones, test real journeys and review together.',
      'A working, reviewable release.',
    ],
    [
      'Launch & evolve',
      'Hand over access and documentation, then agree the right support.',
      'Clear ownership and a next-step plan.',
    ],
  ];
  return (
    <section
      className="delivery-process studio-width"
      aria-labelledby="delivery-title"
    >
      <div className="agency-section-heading">
        <span className="studio-eyebrow">NO BLACK BOX</span>
        <h2 id="delivery-title">
          Clear steps.
          <br />
          <em>Shared decisions.</em>
        </h2>
      </div>
      <ol>
        {steps.map(([title, description, output], index) => (
          <li key={title}>
            <span>0{index + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
            <small>{output}</small>
          </li>
        ))}
      </ol>
      <div className="process-footnote">
        <p>
          Scope, milestones, ownership, third-party costs and support are
          written into your proposal.
        </p>
        <SiteLink className="agency-text-link" href="/schedule">
          Talk through your project <ArrowUpRight size={18} />
        </SiteLink>
      </div>
    </section>
  );
}
