'use client';

import { useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, LoaderCircle, MessageCircle } from 'lucide-react';
import { whatsappUrl } from '../contact-utils';

type FormState = 'idle' | 'loading' | 'success' | 'error';
type FieldErrors = Record<string, string>;

function value(form: FormData, name: string) {
  return String(form.get(name) || '').trim();
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <span className="studio-field-error" id={id}>{message}</span> : null;
}

function validate(form: FormData) {
  const errors: FieldErrors = {};
  const name = value(form, 'name');
  const email = value(form, 'email');
  const whatsapp = value(form, 'whatsapp');
  const projectGoal = value(form, 'projectGoal');

  if (name.length < 2) errors.name = 'Please enter your name.';
  if (!email && !whatsapp) errors.contact = 'Add an email address or WhatsApp number so we can reply.';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
  if (whatsapp && !/^\+?[\d\s()-]{7,24}$/.test(whatsapp)) errors.whatsapp = 'Enter a valid phone or WhatsApp number, including the country code.';
  if (projectGoal.length < 12) errors.projectGoal = 'Tell us a little more about what you need.';

  return errors;
}

export default function ContactBriefForm() {
  const [state, setState] = useState<FormState>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const submissionId = useRef('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'loading' || state === 'success') return;

    const form = new FormData(event.currentTarget);
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setState('error');
      setMessage('Please check the highlighted details and try again.');
      return;
    }

    submissionId.current ||= crypto.randomUUID();
    setState('loading');
    setMessage('Sending your project brief…');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: submissionId.current,
          kind: 'project_enquiry',
          name: value(form, 'name'),
          email: value(form, 'email'),
          whatsapp: value(form, 'whatsapp'),
          businessName: value(form, 'businessName'),
          projectType: 'Contact page project brief',
          projectGoal: value(form, 'projectGoal'),
          context: 'Sent from the dedicated WEBSTELL contact page.',
          website: value(form, 'website'),
        }),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string; errors?: FieldErrors };
      if (!response.ok || !result.ok) {
        setErrors(result.errors || {});
        setState('error');
        setMessage(result.message || 'We could not send this right now. Please try again or use WhatsApp.');
        return;
      }
      setErrors({});
      setState('success');
      setMessage('');
    } catch {
      setState('error');
      setMessage('We could not reach the studio. Please try again or use WhatsApp.');
    }
  }

  return (
    <form className="studio-form contact-brief-form" onSubmit={submit} noValidate>
      <input className="studio-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="studio-form-row">
        <label>
          Name <b aria-hidden="true">*</b>
          <input name="name" autoComplete="name" placeholder="What should we call you?" maxLength={100} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} />
          <FieldError id="contact-name-error" message={errors.name} />
        </label>
        <label>
          Business name <span>(optional)</span>
          <input name="businessName" autoComplete="organization" placeholder="Your company or brand" maxLength={150} />
        </label>
      </div>

      <fieldset className="studio-contact-fields">
        <legend>Email or Phone / WhatsApp <b aria-hidden="true">*</b> <span>at least one</span></legend>
        <div className="studio-form-row">
          <label>
            Email
            <input name="email" type="email" autoComplete="email" placeholder="you@company.com" maxLength={200} aria-invalid={Boolean(errors.email || errors.contact)} aria-describedby={errors.email ? 'contact-email-error' : errors.contact ? 'contact-details-error' : undefined} />
            <FieldError id="contact-email-error" message={errors.email} />
          </label>
          <label>
            Phone / WhatsApp
            <input name="whatsapp" type="tel" autoComplete="tel" placeholder="+91 98765 43210" maxLength={30} aria-invalid={Boolean(errors.whatsapp || errors.contact)} aria-describedby={errors.whatsapp ? 'contact-phone-error' : errors.contact ? 'contact-details-error' : undefined} />
            <FieldError id="contact-phone-error" message={errors.whatsapp} />
          </label>
        </div>
        <FieldError id="contact-details-error" message={errors.contact} />
      </fieldset>

      <label>
        Project description <b aria-hidden="true">*</b>
        <textarea name="projectGoal" rows={5} maxLength={4000} placeholder="What are you trying to achieve, and what would a strong outcome look like?" aria-invalid={Boolean(errors.projectGoal)} aria-describedby={errors.projectGoal ? 'contact-description-error' : undefined} />
        <FieldError id="contact-description-error" message={errors.projectGoal} />
      </label>

      <button className={`studio-button dark-button form-submit ${state === 'loading' ? 'is-loading' : ''}`} type="submit" disabled={state === 'loading' || state === 'success'}>
        <span>{state === 'loading' ? 'Sending securely…' : state === 'success' ? 'Brief sent' : 'Send my project brief'}</span>
        {state === 'loading' ? <LoaderCircle className="studio-submit-spinner" size={20} /> : state === 'success' ? <Check size={20} /> : <ArrowUpRight size={20} />}
      </button>

      {state === 'error' && (
        <div className="studio-form-message is-error" role="alert">
          <p>{message}</p>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Message on WhatsApp</a>
        </div>
      )}

      {state === 'success' && (
        <output className="studio-form-message is-success" aria-live="polite">
          <span className="studio-success-icon" aria-hidden="true"><Check size={21} strokeWidth={2.4} /></span>
          <div className="studio-success-content">
            <span className="studio-success-kicker">Project brief received</span>
            <h3>Thank you—we have your brief.</h3>
            <p>Our team will read the details and reply within one business day.</p>
          </div>
        </output>
      )}
    </form>
  );
}
