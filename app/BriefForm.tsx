'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, LoaderCircle, MessageCircle } from 'lucide-react';
import { whatsappUrl } from './contact-utils';

type FormState = 'idle' | 'loading' | 'success' | 'error';
type FieldErrors = Record<string, string>;

const projectOptions = [
  'Business website',
  'Personal portfolio',
  'Online store',
  'Custom software',
  'Mobile app',
  'Chatbot or automation',
  'Website redesign',
  'Something else',
];

function field(form: FormData, name: string) {
  return String(form.get(name) || '').trim();
}

function clientErrors(form: FormData, booking: boolean) {
  const errors: FieldErrors = {};
  const name = field(form, 'name');
  const email = field(form, 'email');
  const whatsapp = field(form, 'whatsapp');
  const goal = field(form, 'projectGoal');
  const projectType = field(form, 'projectType');
  const referenceLinks = field(form, 'referenceLinks');
  const targetDate = field(form, 'targetDate');

  if (name.length < 2) errors.name = 'Please enter your name.';
  if (!email && !whatsapp) errors.contact = 'Add an email address or WhatsApp number so we can reply.';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
  if (whatsapp && !/^\+?[\d\s()-]{7,24}$/.test(whatsapp)) errors.whatsapp = 'Enter a valid WhatsApp number, including the country code.';
  if (!booking && !projectType) errors.projectType = 'Choose the closest fit for your project.';
  if (goal.length < 12) errors.projectGoal = booking ? 'Tell us what would make the call useful.' : 'Tell us a little more about the result you need.';
  if (targetDate && targetDate < new Date().toISOString().slice(0, 10)) errors.targetDate = 'Choose today or a future date.';
  if (referenceLinks) {
    const links = referenceLinks.split(/[\s,]+/).filter(Boolean);
    if (links.some((link) => !/^https?:\/\//i.test(link))) errors.referenceLinks = 'Start each link with http:// or https://.';
  }
  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <span className="studio-field-error" id={id}>{message}</span> : null;
}

export default function BriefForm({
  context = '',
  projectType = '',
  compact = false,
  booking = false,
  onValidate,
}: {
  context?: string;
  projectType?: string;
  compact?: boolean;
  booking?: boolean;
  onValidate?: () => boolean;
}) {
  const [state, setState] = useState<FormState>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pricingContext, setPricingContext] = useState('');
  const [customerCopySent, setCustomerCopySent] = useState(false);
  const submissionId = useRef('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('source') !== 'pricing') return;
    const project = (params.get('project') || '').trim().slice(0, 100);
    const estimate = Number(params.get('estimate'));
    if (project && Number.isFinite(estimate) && estimate >= 0 && estimate <= 10_000_000) {
      setPricingContext(`PRICING ESTIMATE\nProject: ${project}\nIndicative estimate: ₹${Math.round(estimate).toLocaleString('en-IN')}`);
    }
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'loading' || state === 'success') return;
    if (onValidate && !onValidate()) return;

    const form = new FormData(event.currentTarget);
    const nextErrors = clientErrors(form, booking);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setState('error');
      setMessage('Please check the highlighted details and try again.');
      return;
    }

    submissionId.current ||= crypto.randomUUID();
    setState('loading');
    setMessage(booking ? 'Sending your call request…' : 'Sending your project brief…');

    const payload = {
      submissionId: submissionId.current,
      kind: booking ? 'call_request' : 'project_enquiry',
      name: field(form, 'name'),
      email: field(form, 'email'),
      whatsapp: field(form, 'whatsapp'),
      businessName: field(form, 'businessName'),
      projectType: booking ? '30-minute project call' : field(form, 'projectType'),
      projectGoal: field(form, 'projectGoal'),
      budgetRange: booking ? '' : field(form, 'budgetRange'),
      targetDate: booking ? '' : field(form, 'targetDate'),
      referenceLinks: field(form, 'referenceLinks'),
      context: [context, pricingContext].filter(Boolean).join('\n\n'),
      website: field(form, 'website'),
    };

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string; errors?: FieldErrors; customerCopySent?: boolean };
      if (!response.ok || !result.ok) {
        setErrors(result.errors || {});
        setState('error');
        setMessage(result.message || 'We could not send this right now. Your details are still here, so please try again.');
        return;
      }
      setCustomerCopySent(Boolean(result.customerCopySent));
      setErrors({});
      setState('success');
      setMessage('');
    } catch {
      setState('error');
      setMessage('We could not reach the studio. Your details are still here, so please try again or use WhatsApp.');
    }
  }

  return (
    <form className={`studio-form ${compact ? 'studio-form-compact' : ''}`} onSubmit={submit} noValidate>
      <input className="studio-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="studio-form-row">
        <label className={compact ? 'studio-form-wide' : undefined}>
          Name {!compact && <b aria-hidden="true">*</b>}
          <input name="name" autoComplete="name" placeholder="What should we call you?" maxLength={100} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
          <FieldError id="name-error" message={errors.name} />
        </label>
        {!compact && <label>
            Business name <span>(optional)</span>
            <input name="businessName" autoComplete="organization" placeholder="Your company or brand" maxLength={150} />
          </label>}
      </div>

      <fieldset className="studio-contact-fields">
        <legend className={compact ? 'sr-only' : undefined}>Email or WhatsApp {!compact && <><b>*</b> <span>at least one</span></>}</legend>
        <div className="studio-form-row">
          <label>
            Email
            <input name="email" type="email" autoComplete="email" placeholder="you@company.com" maxLength={200} aria-invalid={Boolean(errors.email || errors.contact)} aria-describedby={errors.email ? 'email-error' : errors.contact ? 'contact-error' : undefined} />
            <FieldError id="email-error" message={errors.email} />
          </label>
          <label>
            WhatsApp
            <input name="whatsapp" type="tel" autoComplete="tel" placeholder="+91 98765 43210" maxLength={30} aria-invalid={Boolean(errors.whatsapp || errors.contact)} aria-describedby={errors.whatsapp ? 'whatsapp-error' : errors.contact ? 'contact-error' : undefined} />
            <FieldError id="whatsapp-error" message={errors.whatsapp} />
          </label>
        </div>
        <FieldError id="contact-error" message={errors.contact} />
      </fieldset>

      {!booking && (
        <div className="studio-form-row">
          <label className={compact ? 'studio-form-wide' : undefined}>
            What would you like us to build? {!compact && <b aria-hidden="true">*</b>}
            <select name="projectType" defaultValue={projectType} aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? 'project-type-error' : undefined}>
              <option value="" disabled>Choose the closest fit</option>
              {projectOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
            <FieldError id="project-type-error" message={errors.projectType} />
          </label>
          {!compact && <label>
              Budget range <span>(optional)</span>
              <select name="budgetRange" defaultValue="">
                <option value="">Not sure yet</option>
                <option>₹15,000 to ₹25,000</option>
                <option>₹25,000 to ₹50,000</option>
                <option>₹50,000 to ₹1,00,000</option>
                <option>₹1,00,000+</option>
                <option>I would like your advice</option>
              </select>
            </label>}
        </div>
      )}

      <label>
        {booking ? 'What would make this call useful?' : 'What should this project achieve?'} {!compact && <b aria-hidden="true">*</b>}
        <textarea name="projectGoal" rows={compact ? 3 : 4} maxLength={4000} placeholder={booking ? 'Share the question, idea or decision you would like to talk through.' : 'Tell us the goal, what is not working now and what a good result would look like.'} aria-invalid={Boolean(errors.projectGoal)} aria-describedby={errors.projectGoal ? 'project-goal-error' : undefined} />
        <FieldError id="project-goal-error" message={errors.projectGoal} />
      </label>

      {!compact && <div className="studio-form-row">
        {!booking && (
          <label>
            Ideal launch date <span>(optional)</span>
            <input name="targetDate" type="date" aria-invalid={Boolean(errors.targetDate)} aria-describedby={errors.targetDate ? 'target-date-error' : undefined} />
            <FieldError id="target-date-error" message={errors.targetDate} />
          </label>
        )}
        <label className={booking ? 'studio-form-wide' : undefined}>
          Helpful links <span>(optional)</span>
          <input name="referenceLinks" type="text" inputMode="url" placeholder="Your site, a brief or examples you like" maxLength={2000} aria-invalid={Boolean(errors.referenceLinks)} aria-describedby={errors.referenceLinks ? 'reference-links-error' : undefined} />
          <FieldError id="reference-links-error" message={errors.referenceLinks} />
        </label>
      </div>}

      {!compact && <p className="studio-privacy">We use your details only to respond to this enquiry. We do not add you to a marketing list without permission.</p>}
      <button className="studio-button dark-button form-submit" type="submit" disabled={state === 'loading' || state === 'success'}>
        <span>{state === 'loading' ? 'Sending securely…' : state === 'success' ? (booking ? 'Call requested' : 'Brief sent') : booking ? 'Request this time' : 'Send my project brief'}</span>
        {state === 'loading' ? <LoaderCircle className="studio-submit-spinner" size={20} /> : state === 'success' ? <Check size={20} /> : <ArrowUpRight size={20} />}
      </button>

      {state === 'error' && (
        <div className="studio-form-message is-error" role="alert">
          <p>{message}</p>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Message on WhatsApp</a>
        </div>
      )}

      {state === 'success' && (
        <div className="studio-form-message is-success" role="status">
          <span><Check size={18} /></span>
          <div>
            <h3>{booking ? 'Your call request is with us.' : 'Thanks—your brief is with us.'}</h3>
            <p>
              {booking
                ? `A member of the WEBSTELL team will reply within one business day. Your preferred time becomes confirmed only after we reply.${customerCopySent ? ' We have also emailed you a copy.' : ''}`
                : customerCopySent
                  ? 'A member of the WEBSTELL team will reply within one business day. We have also sent a copy to the email address you provided.'
                  : 'A member of the WEBSTELL team will reply within one business day. This page is your confirmation; WhatsApp remains available if you need an immediate copy.'}
            </p>
          </div>
        </div>
      )}
    </form>
  );
}
