'use client';
import SiteLink from '../SiteLink';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Plus, Sparkles } from 'lucide-react';
import StudioNav from '../StudioNav';
import SiteFooter from '../SiteFooter';
import BriefForm from '../BriefForm';
import FaqAccordion from '../FaqAccordion';
import PricingSection from '../PricingSection';
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
  const recommended = availableExtras.filter((item) =>
    (item.recommendedFor as readonly string[]).includes(type),
  );
  const included = includedExtras(type, tier);
  const context = [
    `PROJECT SCOPE · ${tier.toUpperCase()}`,
    `Project: ${project.name}`,
    `Currency: ${currency}`,
    `Business goal: ${goal || 'To discuss together'}`,
    `Starting scope: ${project.includedUnits} ${project.unitLabel}`,
    `Additional units: ${estimate.extraUnits}`,
    ...additions.map(
      (item) =>
        `${item.name}${item.included ? ' (included in selected package)' : ''}`,
    ),
    ownDomain
      ? 'Client provides their domain.'
      : 'Domain requirements to be agreed.',
    `Planning range: ${delivery}; confirmed after discovery.`,
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
    setType(getProjectType(next).id);
    setTier(nextTier);
    setSelected([...new Set([...includedExtras(next, nextTier), ...extras])]);
    setExtraUnits(0);
    setOwnDomain(false);
    setGoal('');
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
      <main id="main-content" className="pricing-page agency-pricing">
        <section className="agency-pricing-hero studio-width">
          <span className="studio-eyebrow">SCOPE FIRST. CLARITY ALWAYS.</span>
          <div>
            <h1>
              Good work.
              <br />
              <em>Clear next steps.</em>
            </h1>
            <p>
              From a first website to software that runs your business. Compare
              useful starting scopes, build your brief, and get a proposal that
              spells out the investment.
            </p>
          </div>
          <div className="pricing-region-row">
            <CurrencySwitcher />
            <p>
              Choose your quote currency. Packages are scoped for each market,
              with a written price before you commit.
            </p>
            <SiteLink className="agency-text-link" href={callHref}>
              Talk it through <ArrowUpRight size={18} />
            </SiteLink>
          </div>
        </section>
        <div className="studio-width">
          <fieldset
            className="package-tabs"
            aria-label="Choose a pricing category"
          >
            {packageCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={type === item.id}
                onClick={() => choose(item.id)}
              >
                {item.label}
              </button>
            ))}
          </fieldset>
          <PricingSection category={type} onChoose={choose} />
        </div>
        <section
          className="scope-planner studio-width"
          id="calculator"
          aria-labelledby="calculator-title"
        >
          <div className="scope-builder">
            <span className="studio-eyebrow">MAKE IT YOURS</span>
            <h2 id="calculator-title">Build a useful brief.</h2>
            <p>
              Keep the starting package, add the capabilities you need, and tell
              us what should change for your business.
            </p>
            <div className="scope-selection">
              <label>
                Project type
                <select
                  value={type}
                  onChange={(event) => choose(event.target.value)}
                >
                  {packageCategories.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Package
                <select
                  value={tier}
                  onChange={(event) =>
                    choose(
                      type,
                      includedExtras(type, event.target.value as Tier),
                      event.target.value as Tier,
                    )
                  }
                >
                  <option value="starter">Starter</option>
                  <option value="growth">Growth</option>
                  <option value="custom">Custom</option>
                </select>
              </label>
            </div>
            <p className="scope-included">
              <Check size={17} />
              {project.includedUnits} {project.unitLabel} in the starting brief.
              Final scope is agreed together.
            </p>
            <div className="scope-heading">
              <h3>What else should it do?</h3>
              {recommended.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setSelected((current) => [
                      ...new Set([
                        ...current,
                        ...recommended.map((item) => item.id),
                      ]),
                    ])
                  }
                >
                  <Sparkles size={15} /> Add good fits
                </button>
              )}
            </div>
            <div className="scope-extras">
              {availableExtras.map((item) => (
                <label
                  key={item.id}
                  className={selected.includes(item.id) ? 'is-selected' : ''}
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
                      <em>Included with {tier}</em>
                    )}
                  </span>
                </label>
              ))}
            </div>
            <label className="scope-units">
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
                      Math.max(0, Math.floor(Number(event.target.value) || 0)),
                    ),
                  )
                }
              />
              <small>More scope can affect both price and delivery.</small>
            </label>
            {project.domainEligible && (
              <label className="scope-domain">
                <input
                  type="checkbox"
                  checked={ownDomain}
                  onChange={(event) => setOwnDomain(event.target.checked)}
                />
                I already have a domain, or I will supply one.
              </label>
            )}
            <label className="scope-goal">
              What would a good result look like?
              <textarea
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                rows={3}
                maxLength={600}
                placeholder="For example: route enquiries to the right team and reduce manual follow-up."
              />
            </label>
          </div>
          <aside className="scope-summary" id="estimate-summary">
            <span className="studio-eyebrow">YOUR NEXT MOVE</span>
            <h3>{project.name}</h3>
            <div className="scope-price" aria-live="polite">
              {!ready
                ? 'Preparing your brief…'
                : total === null
                  ? 'Request a quote'
                  : formatMoney(total, currency)}
            </div>
            <p>
              {currency} ·{' '}
              {category.recurring
                ? 'recurring monthly engagement'
                : 'one-time project scope'}
            </p>
            <dl>
              <div>
                <dt>Package</dt>
                <dd>{tier}</dd>
              </div>
              <div>
                <dt>Selected capabilities</dt>
                <dd>{additions.length}</dd>
              </div>
              <div>
                <dt>
                  {type === 'seo'
                    ? 'Initial audit planning'
                    : 'Indicative delivery'}
                </dt>
                <dd>{delivery}</dd>
              </div>
            </dl>
            <p className="scope-note">
              Timelines depend on discovery, content and integrations. Your
              proposal confirms the full scope, payment milestones, taxes and
              ongoing costs.
            </p>
            <SiteLink className="agency-button" href={`/contact?${handoff}`}>
              Request my proposal <ArrowUpRight size={18} />
            </SiteLink>
            <SiteLink
              className="agency-text-link"
              href={whatsappUrl(`Hi WEBSTELL!\n${context}`)}
              target="_blank"
              rel="noreferrer"
            >
              Share this scope on WhatsApp <ArrowUpRight size={17} />
            </SiteLink>
            <details className="scope-send">
              <summary>
                Send the full brief here <Plus size={18} />
              </summary>
              <BriefForm
                context={context}
                projectType={project.name}
                estimate={total ?? undefined}
                currency={currency}
              />
            </details>
          </aside>
        </section>
        <section
          className="pricing-boundaries studio-width"
          aria-labelledby="cost-title"
        >
          <div className="agency-section-heading">
            <span className="studio-eyebrow">THE WHOLE PICTURE</span>
            <h2 id="cost-title">
              Know what’s included.
              <br />
              <em>Know what comes next.</em>
            </h2>
          </div>
          <div className="cost-grid">
            <article>
              <span>01 / PROJECT</span>
              <h3>One-time work</h3>
              <p>
                Discovery, design, the agreed build, testing and handover. Your
                proposal defines scope, revision checkpoints, ownership and
                payment milestones.
              </p>
            </article>
            <article>
              <span>02 / ONGOING</span>
              <h3>Recurring services</h3>
              <p>
                Optional maintenance and optimisation, hosting, SaaS
                subscriptions, AI model usage and messaging charges. SEO
                programmes are monthly engagements with an agreed scope.
              </p>
            </article>
            <article>
              <span>03 / SEPARATE</span>
              <h3>Third-party costs</h3>
              <p>
                Domains and renewals, premium media, content production,
                payment-provider fees, app-store accounts and advertising spend
                are separate unless explicitly included.
              </p>
            </article>
          </div>
          <p className="tax-note">{taxNotes[currency]}</p>
        </section>
        <section className="agency-faq studio-width">
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
        <section className="agency-closing studio-width">
          <h2>
            Not sure where
            <br />
            to start?
          </h2>
          <p>
            Bring the problem. We’ll help you decide whether it needs a website,
            a product, an integration—or a simpler first step.
          </p>
          <SiteLink className="agency-button" href={callHref}>
            Request a discovery call <ArrowUpRight size={19} />
          </SiteLink>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
