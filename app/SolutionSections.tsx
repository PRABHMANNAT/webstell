'use client';
import SiteLink from './SiteLink';
import { useState } from 'react';
import { ArrowUpRight, ArrowRight, Check } from 'lucide-react';
import { services, industries, enquiryHref } from './service-catalog';

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

export function IndustryExplorer({
  australia = false,
}: {
  australia?: boolean;
}) {
  const [active, setActive] = useState(
    australia ? 'australian-tradies' : 'cafes-restaurants',
  );
  const industry =
    industries.find((item) => item.id === active) ?? industries[0];
  return (
    <section
      className="industry-explorer studio-width"
      id="industries"
      aria-labelledby="industry-title"
    >
      <div className="agency-section-heading">
        <span className="studio-eyebrow">BUILT AROUND YOUR BUSINESS</span>
        <h2 id="industry-title">
          Your industry.
          <br />
          <em>Its own possibilities.</em>
        </h2>
        <p>
          Practical use cases to shape a brief. These describe what we can
          build, rather than claimed client results.
        </p>
      </div>
      <fieldset className="industry-options" aria-label="Explore an industry">
        {industries.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setActive(item.id)}
            aria-pressed={active === item.id}
            aria-controls="industry-detail"
          >
            {item.name}
          </button>
        ))}
      </fieldset>
      <article
        className="industry-detail"
        id="industry-detail"
        aria-live="polite"
      >
        <div>
          <span className="studio-eyebrow">{industry.name}</span>
          <h3>{industry.tagline}</h3>
          <p>{industry.need}</p>
          <SiteLink
            className="agency-button"
            href={enquiryHref(industry.project, industry.name, {
              industry: industry.id,
            })}
          >
            Plan something for my business <ArrowUpRight size={19} />
          </SiteLink>
        </div>
        <div>
          <ul>
            {industry.features.map((feature) => (
              <li key={feature}>
                <Check size={17} />
                {feature}
              </li>
            ))}
          </ul>
          <div className="industry-workflow">
            <small>A POSSIBLE CUSTOMER JOURNEY</small>
            <p>{industry.workflow}</p>
          </div>
          <SiteLink
            className="agency-text-link"
            href={`/projects?industry=${industry.filter}`}
          >
            Explore related design directions <ArrowRight size={18} />
          </SiteLink>
        </div>
      </article>
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
