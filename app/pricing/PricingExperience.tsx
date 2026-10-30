'use client';
import SiteLink from '../SiteLink';
import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  FileCheck2,
  Layers,
  ReceiptText,
} from 'lucide-react';
import StudioNav from '../StudioNav';
import SiteFooter from '../SiteFooter';
import FaqAccordion from '../FaqAccordion';
import PackageComparison from './PackageComparison';
import AmbitiousEnquiry from './AmbitiousEnquiry';
import { CurrencySwitcher, useRegion } from '../RegionProvider';
import { formatMoney, taxNotes } from '../../lib/region';
import { pricingFaqs } from './pricing-faqs';
import {
  packageCategories,
  getPackageCategory,
  includedExtras,
  type Tier,
} from './packages';
import { whatsappUrl } from '../contact-utils';
import {
  calculateEstimate,
  getAvailableExtras,
  getProjectType,
  MAX_EXTRA_UNITS,
} from '../pricing-data';

export default function PricingExperience() {
  const { currency, ready } = useRegion();
  const [type, setType] = useState('website');
  const [tier, setTier] = useState<Tier>('starter');
  const [selected, setSelected] = useState<string[]>([]);
  const [ownDomain, setOwnDomain] = useState(false);
  const [extraUnits, setExtraUnits] = useState(0);
  const [goal, setGoal] = useState('');
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const service = params.get('service');
      if (!service) return;
      const project = getProjectType(service);
      const requestedTier = params.get('package');
      const packageTier =
        requestedTier === 'growth' || requestedTier === 'custom'
          ? requestedTier
          : 'starter';
      setType(project.id);
      setTier(packageTier);
      setSelected(includedExtras(project.id, packageTier));
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const estimate = calculateEstimate(
    type,
    selected,
    ownDomain,
    extraUnits,
    currency,
    tier,
  );
  const { project, additions, total, delivery } = estimate;
  const category = getPackageCategory(type);
  const availableExtras = getAvailableExtras(type);
  const included = includedExtras(type, tier);
  const context = [
    `PROJECT SCOPE · ${tier.toUpperCase()}`,
    `Project: ${project.name}`,
    `Currency: ${currency}`,
    `Business goal: ${goal || 'To discuss together'}`,
    tier === 'custom'
      ? 'Scope: tailored after discovery.'
      : `Starting scope: ${project.includedUnits} ${project.unitLabel}`,
    `Additional units: ${estimate.extraUnits}`,
    ...additions.map(
      (item) =>
        `${item.name}${item.included ? ' (included in selected package)' : ''}`,
    ),
    ownDomain
      ? 'Client provides their domain.'
      : 'Domain requirements to be agreed.',
    tier === 'custom'
      ? 'Delivery: agreed after discovery.'
      : `Planning range: ${delivery}; confirmed after discovery.`,
    total === null
      ? 'Price: written quote requested.'
      : `Indicative ${category.recurring ? 'monthly' : 'one-time'} amount: ${formatMoney(total, currency)}`,
    'Recurring services, usage, third-party costs and applicable taxes require a separate written breakdown.',
  ].join('\n');
  const handoff = new URLSearchParams({
    source: 'pricing',
    project: project.name,
    package: tier,
    currency,
    detail: goal || `${category.label} ${tier} package`,
    features: additions.map((item) => item.name).join(', '),
    units: String(estimate.extraUnits),
    domain: ownDomain ? 'Client supplied' : 'To discuss',
  });
  if (total !== null) handoff.set('estimate', String(total));
  const callHref = `/schedule?${handoff}`;
  function choose(
    next: string,
    extras: string[] = [],
    nextTier: Tier = 'starter',
  ) {
    const nextId = getProjectType(next).id;
    const retained =
      nextId === type
        ? selected.filter((id) => !includedExtras(type, tier).includes(id))
        : [];
    setType(nextId);
    setTier(nextTier);
    setSelected([
      ...new Set([...includedExtras(nextId, nextTier), ...retained, ...extras]),
    ]);
    if (nextId !== type) {
      setExtraUnits(0);
      setOwnDomain(false);
    }
  }
  function toggle(id: string) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }
  return (
    <>
      <StudioNav current="pricing" />
      <main
        id="main-content"
        className="pricing-page studio-page agency-pricing"
      >
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
              Choose a package, add what you need, and get a written quote for
              your project.
            </p>
            <div className="pricing-intro-actions">
              <SiteLink className="pricing-scroll-link" href="#calculator">
                Build your brief <ArrowUpRight size={18} />
              </SiteLink>
              <SiteLink className="pricing-call-button" href={callHref}>
                Book a call <ArrowUpRight size={18} />
              </SiteLink>
            </div>
          </div>
        </section>
        <nav
          className="pricing-wayfinding studio-width"
          aria-label="Pricing guide"
        >
          <a href="#packages">
            <span>01</span> Compare packages
          </a>
          <a href="#calculator">
            <span>02</span> Shape your brief
          </a>
          <a href="#ambitious">
            <span>03</span> Talk to our team
          </a>
        </nav>
        <section
          className="pricing-compare studio-width"
          id="packages"
          aria-labelledby="comparison-title"
        >
          <header className="simple-section-heading">
            <div>
              <span className="simple-kicker">01 / FIND YOUR FIT</span>
              <h2 id="comparison-title">The right starting point.</h2>
              <p>Choose what you need. Compare what’s included.</p>
            </div>
            <CurrencySwitcher />
          </header>
          <fieldset
            className="simple-category-grid"
            aria-label="Choose a pricing category"
          >
            {packageCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={type === item.id}
                onClick={() => {
                  if (type !== item.id) choose(item.id);
                }}
              >
                {item.label}
              </button>
            ))}
          </fieldset>
          <label className="simple-category-mobile">
            What would you like to build?
            <select
              value={type}
              onChange={(event) => choose(event.target.value)}
            >
              {packageCategories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <PackageComparison
            category={type}
            selectedTier={tier}
            onChoose={(nextTier) => choose(type, [], nextTier)}
          />
          <div className="pricing-next" aria-labelledby="pricing-next-title">
            <header className="pricing-next-heading">
              <span className="simple-kicker">WHAT HAPPENS NEXT</span>
              <h3 id="pricing-next-title">A clear path to launch.</h3>
            </header>
            <ol className="pricing-path">
              <li>
                <span aria-hidden="true">01</span>
                <div>
                  <h4>Agree the scope</h4>
                  <p>A clear brief, a written quote and an agreed plan.</p>
                </div>
              </li>
              <li>
                <span aria-hidden="true">02</span>
                <div>
                  <h4>Build it together</h4>
                  <p>See progress and share feedback at review checkpoints.</p>
                </div>
              </li>
              <li>
                <span aria-hidden="true">03</span>
                <div>
                  <h4>Launch with a plan</h4>
                  <p>Your handover, ownership and next steps, made clear.</p>
                </div>
              </li>
            </ol>
            <div className="pricing-clarity">
              <p>
                <FileCheck2 size={19} aria-hidden="true" />
                <span>
                  <strong>In writing before we start</strong>
                  Scope, deliverables, review points and ownership.
                </span>
              </p>
              <p>
                <ReceiptText size={19} aria-hidden="true" />
                <span>
                  <strong>Ongoing costs, itemised</strong>
                  Hosting, licences, usage fees and ongoing care are quoted
                  separately.
                </span>
              </p>
            </div>
          </div>
        </section>
        <section
          className="simple-scope studio-width"
          id="calculator"
          aria-labelledby="calculator-title"
        >
          <header className="simple-section-heading">
            <div>
              <span className="simple-kicker">02 / MAKE IT YOURS</span>
              <h2 id="calculator-title">A little about your project.</h2>
              <p>Tell us the goal. Add any extras you already have in mind.</p>
            </div>
          </header>
          <div className="simple-scope-grid">
            <div className="simple-scope-fields">
              <div className="scope-current">
                <Layers size={19} aria-hidden="true" />
                <span>
                  {category.label}{' '}
                  <b> / {tier[0].toUpperCase() + tier.slice(1)}</b>
                </span>
                <SiteLink href="#packages">Change</SiteLink>
              </div>
              <label className="planner-goal">
                What would you like to achieve?
                <textarea
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)}
                  rows={4}
                  maxLength={600}
                  placeholder="For example: a website that makes it easy for customers to find us and book a visit."
                />
                <small>
                  Not sure about the details? A sentence is enough to start.
                </small>
              </label>
              <details className="planner-details">
                <summary>
                  <div>
                    <strong>Choose extra capabilities</strong>
                    <span>
                      Optional ·{' '}
                      {additions.filter((item) => !item.included).length} added
                    </span>
                  </div>
                  <ChevronDown size={19} aria-hidden="true" />
                </summary>
                <div className="planner-additions">
                  {availableExtras.map((item) => (
                    <label
                      key={item.id}
                      className={
                        selected.includes(item.id) ? 'is-selected' : ''
                      }
                    >
                      <input
                        type="checkbox"
                        checked={selected.includes(item.id)}
                        disabled={included.includes(item.id)}
                        onChange={() => toggle(item.id)}
                      />
                      <span>
                        <strong>{item.name}</strong>
                        <small>{item.detail}</small>
                        {included.includes(item.id) && (
                          <em>Included in {tier}</em>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </details>
              <details className="planner-details">
                <summary>
                  <div>
                    <strong>More project details</strong>
                    <span>
                      Optional · scope
                      {project.domainEligible ? ' and domain' : ''}
                    </span>
                  </div>
                  <ChevronDown size={19} aria-hidden="true" />
                </summary>
                <div className="planner-project-details">
                  <p>
                    <Check size={16} aria-hidden="true" />
                    {tier === 'custom'
                      ? 'Your scope is tailored after discovery.'
                      : `${project.includedUnits} ${project.unitLabel} in the starting brief. Final scope is agreed together.`}
                  </p>
                  <label>
                    Additional {project.unitLabel}
                    <input
                      type="number"
                      min="0"
                      max={MAX_EXTRA_UNITS}
                      value={extraUnits}
                      onChange={(event) =>
                        setExtraUnits(
                          Math.min(
                            MAX_EXTRA_UNITS,
                            Math.max(
                              0,
                              Math.floor(Number(event.target.value) || 0),
                            ),
                          ),
                        )
                      }
                    />
                    <small>
                      Additional scope can affect the quote and delivery.
                    </small>
                  </label>
                  {project.domainEligible && (
                    <label className="planner-domain">
                      <input
                        type="checkbox"
                        checked={ownDomain}
                        onChange={(event) => setOwnDomain(event.target.checked)}
                      />
                      I have a domain, or I’ll supply one.
                    </label>
                  )}
                </div>
              </details>
            </div>
            <aside
              className="simple-quote"
              aria-labelledby="quote-summary-title"
            >
              <span className="simple-kicker">YOUR PROJECT, AT A GLANCE</span>
              <h3 id="quote-summary-title">{project.name}</h3>
              <div className="simple-quote-price" aria-live="polite">
                {!ready
                  ? 'Preparing your brief…'
                  : total === null
                    ? 'Let’s price your idea.'
                    : formatMoney(total, currency)}
              </div>
              <p>
                {currency} ·{' '}
                {category.recurring ? 'monthly engagement' : 'one-time project'}
              </p>
              <dl>
                <div>
                  <dt>Package</dt>
                  <dd>{tier[0].toUpperCase() + tier.slice(1)}</dd>
                </div>
                <div>
                  <dt>Extra capabilities</dt>
                  <dd>
                    {additions.filter((item) => !item.included).length ||
                      'None added'}
                  </dd>
                </div>
                <div>
                  <dt>
                    <Clock3 size={14} aria-hidden="true" />
                    {type === 'seo'
                      ? 'Initial audit planning'
                      : 'Indicative delivery'}
                  </dt>
                  <dd>{tier === 'custom' ? 'After discovery' : delivery}</dd>
                </div>
              </dl>
              {additions.length > 0 && (
                <ul className="simple-quote-features">
                  {additions.map((item) => (
                    <li key={item.id}>
                      <Check size={14} aria-hidden="true" />
                      {item.name}
                      {item.included && <span>Included</span>}
                    </li>
                  ))}
                </ul>
              )}
              <SiteLink
                className="simple-quote-primary"
                href={`/contact?${handoff}`}
              >
                Request my quote <ArrowUpRight size={18} aria-hidden="true" />
              </SiteLink>
              <SiteLink
                className="simple-quote-secondary"
                href={whatsappUrl(`Hi WEBSTELL!\n${context}`)}
                target="_blank"
                rel="noreferrer"
              >
                Talk it through on WhatsApp{' '}
                <ArrowUpRight size={15} aria-hidden="true" />
              </SiteLink>
              <p className="simple-quote-note">
                No payment now. Your proposal confirms scope, delivery, taxes
                and ongoing costs before you commit.
              </p>
            </aside>
          </div>
        </section>
        <details className="simple-costs studio-width">
          <summary>
            <div>
              <span className="simple-kicker">NO SURPRISES</span>
              <h2>What does the quote cover?</h2>
            </div>
            <ChevronDown size={22} aria-hidden="true" />
          </summary>
          <div className="simple-cost-grid">
            <article>
              <span>01 / PROJECT</span>
              <h3>The agreed work</h3>
              <p>
                Discovery, design, development, testing and handover, with
                review checkpoints and payment milestones in your proposal.
              </p>
            </article>
            <article>
              <span>02 / ONGOING</span>
              <h3>Care after launch</h3>
              <p>
                Optional maintenance, SEO and support are agreed separately.
                Hosting, licences and AI usage may have recurring costs.
              </p>
            </article>
            <article>
              <span>03 / THIRD PARTIES</span>
              <h3>External services</h3>
              <p>
                Domains, paid tools, payment fees, app-store accounts and
                advertising are separate unless explicitly included.
              </p>
            </article>
          </div>
          <p className="simple-tax-note">{taxNotes[currency]}</p>
        </details>
        <section className="agency-faq pricing-faq studio-width">
          <div className="agency-section-heading">
            <span className="studio-eyebrow">BEFORE WE BEGIN</span>
            <h2>
              Good questions.
              <br />
              <em>Clear answers.</em>
            </h2>
          </div>
          <FaqAccordion items={pricingFaqs} />
        </section>
        <section className="pricing-custom studio-width" id="ambitious">
          <h2>
            Something more
            <br />
            <em>ambitious?</em>
          </h2>
          <div>
            <p>
              A custom app, a new product or a project that needs a different
              approach? Let’s work out the scope together.
            </p>
            <SiteLink className="agency-button" href={callHref}>
              Discuss your project <ArrowUpRight size={19} />
            </SiteLink>
          </div>
          <AmbitiousEnquiry
            context={`Current pricing selection, for reference:\n${context}`}
            projectType="Custom project"
            currency={currency}
          />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
