'use client';

import { useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Clock3,
  Minus,
  Plus,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import StudioNav, { HireDialog, StudioFooter } from '../StudioNav';
import BriefForm from '../BriefForm';
import FaqAccordion from '../FaqAccordion';
import PricingSection from '../PricingSection';
import { fullFaqs } from '../faq-data';
import {
  calculateEstimate,
  getAvailableExtras,
  getProjectType,
  MAX_EXTRA_UNITS,
  money,
  projectTypes,
} from '../pricing-data';

export default function PricingExperience() {
  const [hireOpen, setHireOpen] = useState(false);
  const [type, setType] = useState('website');
  const [selected, setSelected] = useState<string[]>([]);
  const [ownDomain, setOwnDomain] = useState(false);
  const [extraUnits, setExtraUnits] = useState(0);
  const {
    project,
    additions,
    unitCost,
    total,
    deposit,
    delivery,
    domainSaving,
  } = calculateEstimate(type, selected, ownDomain, extraUnits);
  const availableExtras = getAvailableExtras(type);
  const recommendedExtras = availableExtras.filter((item) =>
    item.recommendedFor.includes(project.id),
  );
  const callHref = `/schedule?source=pricing&project=${encodeURIComponent(
    project.name,
  )}&estimate=${total}`;
  const context = [
    'PROJECT ESTIMATE',
    `Project: ${project.name}`,
    `Starting scope: ${project.includedUnits} ${project.unitLabel}`,
    `Starting price: ${money(project.price)}`,
    ...additions.map((item) => `${item.name}: +${money(item.price)}`),
    ...(extraUnits
      ? [
          `${extraUnits} ${project.extraUnitLabel}${extraUnits === 1 ? '' : 's'}: +${money(unitCost)}`,
        ]
      : []),
    domainSaving
      ? 'Client supplies eligible domain: −₹3,500'
      : project.domainEligible
        ? 'Standard domain allowance included: ₹3,500'
        : 'Domain is not part of this project type.',
    `Indicative delivery: ${delivery}`,
    `Estimated first milestone: ${money(deposit)}`,
    `Estimated total: ${money(total)}`,
    'Indicative estimate only. Final scope, delivery and price are agreed in the proposal.',
  ].join('\n');

  function selectProjectType(nextType: string) {
    const nextProject = getProjectType(nextType);
    const nextAvailable = getAvailableExtras(nextType);
    setType(nextType);
    setSelected((current) =>
      current.filter((id) => nextAvailable.some((item) => item.id === id)),
    );
    if (!nextProject.domainEligible) setOwnDomain(false);
  }

  function applyPlan(nextType: string, nextExtras: string[]) {
    const nextAvailable = getAvailableExtras(nextType);
    setType(nextType);
    setSelected(
      nextExtras.filter((id) => nextAvailable.some((item) => item.id === id)),
    );
    setExtraUnits(0);
    setOwnDomain(false);
  }

  function toggle(id: string) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function addRecommended() {
    setSelected((current) => [
      ...new Set([...current, ...recommendedExtras.map((item) => item.id)]),
    ]);
  }

  return (
    <>
      <StudioNav current="pricing" />
      <main className="pricing-page studio-page">
        <section className="pricing-page-intro studio-width">
          <div>
            <h1>
              Good work.
              <br />
              <span>Clear pricing.</span>
            </h1>
          </div>
          <div className="pricing-intro-aside">
            <p>
              Start with the closest fit, then shape it around the work you
              actually need. Every number stays visible as you go.
            </p>
            <div className="pricing-intro-actions">
              <a className="pricing-scroll-link" href="#calculator">
                Build an estimate <ArrowDown size={18} />
              </a>
              <a className="pricing-call-button" href={callHref}>
                <span>
                  Still figuring it out?
                  <small>Request a 30-minute call</small>
                </span>
                <ArrowUpRight size={20} />
              </a>
            </div>
          </div>
        </section>

        <PricingSection onChoose={applyPlan} />

        <section
          className="estimate-layout studio-width"
          id="calculator"
          aria-labelledby="calculator-title"
        >
          <div className="estimate-builder">
            <div className="calculator-heading">
              <span>
                <SlidersHorizontal size={18} /> YOUR PROJECT, YOUR WAY
              </span>
              <small>01 — 04</small>
            </div>
            <h2 id="calculator-title">What are we building?</h2>
            <p className="section-subtitle">
              Choose the nearest starting point. We’ll keep the practical
              details in view as the estimate takes shape.
            </p>
            <fieldset className="project-type-options">
              <legend className="sr-only">Project type</legend>
              {projectTypes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={type === item.id}
                  className={type === item.id ? 'selected' : ''}
                  onClick={() => selectProjectType(item.id)}
                >
                  {item.name}
                  {type === item.id && <Check size={16} />}
                </button>
              ))}
            </fieldset>
            <p className="type-description">{project.description}</p>
            <div className="included-strip">
              <Check size={16} />
              <span>
                Starts with {project.includedUnits} {project.unitLabel}, custom
                design, mobile-ready layouts, search foundations and a launch
                handover.
              </span>
            </div>

            <div className="builder-section-heading addon-heading">
              <span>02</span>
              <div>
                <h3>Add what makes it useful.</h3>
                <p>
                  Pick the features that fit this kind of project. Every card
                  is a one-time addition to your estimate.
                </p>
              </div>
              {recommendedExtras.length > 0 && (
                <button
                  type="button"
                  className="recommended-button"
                  onClick={addRecommended}
                  disabled={recommendedExtras.every((item) =>
                    selected.includes(item.id),
                  )}
                >
                  <Sparkles size={15} /> Add good fits
                </button>
              )}
            </div>
            <div className="addon-grid">
              {availableExtras.map((item) => {
                const isSelected = selected.includes(item.id);
                const isRecommended = item.recommendedFor.includes(project.id);
                return (
                  <label
                    className={'addon-card ' + (isSelected ? 'is-selected' : '')}
                    key={item.id}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggle(item.id)}
                    />
                    <span className="addon-card-top">
                      <span className="addon-check" aria-hidden="true">
                        {isSelected ? <Check size={14} /> : <Plus size={14} />}
                      </span>
                      {isRecommended && <em>Good fit</em>}
                    </span>
                    <strong>{item.name}</strong>
                    <span className="addon-detail">{item.detail}</span>
                    <span className="addon-price">+ {money(item.price)}</span>
                  </label>
                );
              })}
            </div>

            <div className="builder-section-heading scope-heading">
              <span>03</span>
              <div>
                <h3>Give it the right amount of room.</h3>
                <p>
                  Your starting scope includes {project.includedUnits}{' '}
                  {project.unitLabel}. Add only what you know you need.
                </p>
              </div>
            </div>
            <div className="extra-pages">
              <div className="scope-copy">
                <span className="scope-count">
                  {project.includedUnits + extraUnits} {project.unitLabel}
                </span>
                <p>
                  {extraUnits
                    ? `${extraUnits} ${project.extraUnitLabel}${extraUnits === 1 ? '' : 's'} · ${money(project.extraUnitPrice)} each`
                    : `Add ${project.extraUnitLabel}s only if your project needs them.`}
                </p>
              </div>
              <div className="page-stepper" aria-label="Extra project scope">
                <button
                  type="button"
                  onClick={() => setExtraUnits(Math.max(0, extraUnits - 1))}
                  disabled={extraUnits === 0}
                  aria-label={`Remove an ${project.extraUnitLabel}`}
                >
                  <Minus size={16} />
                </button>
                <output aria-label={`Number of ${project.extraUnitLabel}s`}>
                  {extraUnits}
                </output>
                <button
                  type="button"
                  onClick={() =>
                    setExtraUnits(Math.min(MAX_EXTRA_UNITS, extraUnits + 1))
                  }
                  disabled={extraUnits === MAX_EXTRA_UNITS}
                  aria-label={`Add an ${project.extraUnitLabel}`}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {project.domainEligible && (
              <>
                <div className="builder-section-heading domain-heading">
                  <span>04</span>
                  <div>
                    <h3>Already have a domain?</h3>
                    <p>Bring your own and we’ll take ₹3,500 off.</p>
                  </div>
                </div>
                <label
                  className={
                    'domain-option ' + (ownDomain ? 'is-selected' : '')
                  }
                >
                  <input
                    type="checkbox"
                    checked={ownDomain}
                    onChange={(event) => setOwnDomain(event.target.checked)}
                  />
                  <span>
                    <strong>I’ll cover the domain.</strong>
                    <small>I have one, or I’ll buy it myself.</small>
                  </span>
                  <b>− ₹3,500</b>
                </label>
              </>
            )}
          </div>

          <aside className="estimate-receipt" id="estimate-summary">
            <div className="receipt-top">
              <span>THE BIG PICTURE</span>
              <Sparkles size={20} />
            </div>
            <p className="receipt-label">Your estimated investment</p>
            <div
              className="receipt-total"
              aria-live="polite"
              aria-atomic="true"
              data-testid="estimate-total"
            >
              {money(total)}
            </div>
            <span className="receipt-currency">
              INR · one-time project estimate
            </span>
            <div className="receipt-measures">
              <div>
                <Clock3 size={16} />
                <span>Working timeline</span>
                <strong>{delivery}</strong>
              </div>
              <div>
                <Sparkles size={16} />
                <span>First milestone</span>
                <strong>from {money(deposit)}</strong>
              </div>
            </div>
            <div className="receipt-rule" />
            <dl>
              <div>
                <dt>{project.name}</dt>
                <dd>{money(project.price)}</dd>
              </div>
              {additions.map((item) => (
                <div key={item.id}>
                  <dt>{item.name}</dt>
                  <dd>+{money(item.price)}</dd>
                </div>
              ))}
              {extraUnits > 0 && (
                <div>
                  <dt>
                    {extraUnits} {project.extraUnitLabel}
                    {extraUnits === 1 ? '' : 's'}
                  </dt>
                  <dd>+{money(unitCost)}</dd>
                </div>
              )}
              {domainSaving > 0 && (
                <div className="receipt-saving">
                  <dt>You supply the domain</dt>
                  <dd>−{money(domainSaving)}</dd>
                </div>
              )}
            </dl>
            <BriefForm context={context} projectType={project.name} compact />
            <a href={callHref} className="receipt-call-link">
              Still undecided? Request a 30-minute call <ArrowUpRight size={16} />
            </a>
            <p className="receipt-note">
              This is a working estimate, not a final quote. We’ll confirm the
              requirements, delivery and price before work begins.
            </p>
            <div className="receipt-minimum">
              Minimum project value: ₹15,000
            </div>
            <span className="receipt-stamp">
              MADE FOR YOUR BUSINESS. <span>✳</span>
            </span>
          </aside>
        </section>

        <section className="pricing-faq studio-width" aria-labelledby="pricing-faq-title">
          <div className="pricing-faq-intro">
            <span className="studio-eyebrow">FULL FAQ</span>
            <h2 id="pricing-faq-title">
              More questions,
              <br />
              <em>clear answers.</em>
            </h2>
            <p>
              Everything else you may want to know before you begin.
            </p>
          </div>
          <FaqAccordion items={fullFaqs} />
        </section>

        <section className="pricing-custom studio-width">
          <h2>
            Something more
            <br />
            <em>ambitious?</em>
          </h2>
          <div>
            <p>
              A complex app, a new product, or a job the calculator can’t
              describe? We’ll build a custom quote around your actual
              requirements — not squeeze your idea into a box.
            </p>
            <button type="button" onClick={() => setHireOpen(true)}>
              Talk through the bigger picture <ArrowUpRight size={18} />
            </button>
          </div>
        </section>

        <div className="mobile-estimate-bar">
          <div>
            <span>Your estimate</span>
            <strong aria-live="polite">{money(total)}</strong>
          </div>
          <a href="#estimate-summary">
            View breakdown <ArrowUpRight size={18} />
          </a>
        </div>
      </main>
      <StudioFooter />
      <HireDialog open={hireOpen} onOpenChange={setHireOpen} />
    </>
  );
}
