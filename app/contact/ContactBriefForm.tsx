'use client';

import { useRef, useState, type ChangeEvent, type SyntheticEvent } from 'react';
import { ArrowUpRight, Check, LoaderCircle, MessageCircle } from 'lucide-react';
import { whatsappUrl } from '../contact-utils';

type FormState = 'idle' | 'loading' | 'success' | 'error';
type FieldErrors = Record<string, string>;

const maxAttachmentBytes = 2_400_000;
const allowedFileExtensions = /\.(pdf|doc|docx|txt|rtf|png|jpe?g|webp)$/i;
const confettiPieces = Array.from({ length: 22 }, (_, index) => index);

function value(form: FormData, name: string) {
  const input = form.get(name);
  return typeof input === 'string' ? input.trim() : '';
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <span className="studio-field-error" id={id}>{message}</span> : null;
}

function validate(form: FormData) {
  const errors: FieldErrors = {};
  const name = value(form, 'name');
  const email = value(form, 'email');
  const whatsapp = value(form, 'whatsapp');

  if (name.length < 2) errors.name = 'Please enter your name.';
  if (!email && !whatsapp) errors.contact = 'Add an email address or WhatsApp number so we can reply.';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
  if (whatsapp && !/^\+?[\d\s()-]{7,24}$/.test(whatsapp)) errors.whatsapp = 'Enter a valid phone or WhatsApp number, including the country code.';
  return errors;
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      const content = result.split(',')[1];
      if (!content) reject(new Error('The attachment could not be read.'));
      else resolve(content);
    };
    reader.onerror = () => reject(new Error('The attachment could not be read.'));
    reader.readAsDataURL(file);
  });
}

export default function ContactBriefForm() {
  const [state, setState] = useState<FormState>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [attachment, setAttachment] = useState<File | null>(null);
  const submissionId = useRef('');

  function chooseAttachment(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    if (!file) {
      setAttachment(null);
      setErrors((current) => ({ ...current, attachment: '' }));
      return;
    }
    if (file.size > maxAttachmentBytes) {
      setAttachment(null);
      setErrors((current) => ({ ...current, attachment: 'Choose a file smaller than 2.4 MB.' }));
      event.target.value = '';
      return;
    }
    if (!allowedFileExtensions.test(file.name)) {
      setAttachment(null);
      setErrors((current) => ({ ...current, attachment: 'Upload a PDF, document, text file or image.' }));
      event.target.value = '';
      return;
    }
    setAttachment(file);
    setErrors((current) => ({ ...current, attachment: '' }));
  }

  async function submit(event: SyntheticEvent<HTMLFormElement>) {
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
      const attachmentPayload = attachment
        ? { filename: attachment.name, content: await fileToBase64(attachment) }
        : undefined;
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
          budgetRange: value(form, 'budgetRange'),
          targetDate: value(form, 'targetDate'),
          referenceLinks: value(form, 'referenceLinks'),
          attachment: attachmentPayload,
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
      setMessage(attachment ? 'We could not prepare that file. Please try another one or use WhatsApp.' : 'We could not reach the studio. Please try again or use WhatsApp.');
    }
  }

  return (
    <form className="studio-form contact-brief-form" onSubmit={submit} noValidate>
      {state === 'success' ? (
        <div className="contact-success-confetti" aria-hidden="true">
          {confettiPieces.map((piece) => <span key={piece} />)}
        </div>
      ) : null}
      <input className="studio-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="studio-form-row">
        <label>
          Name
          <input name="name" autoComplete="name" placeholder="What should we call you?" maxLength={100} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} />
          <FieldError id="contact-name-error" message={errors.name} />
        </label>
        <label>
          Business name <span className="contact-optional-label">optional</span>
          <input name="businessName" autoComplete="organization" placeholder="Your company or brand" maxLength={150} />
        </label>
      </div>

      <fieldset className="studio-contact-fields">
        <legend className="sr-only">Email or phone number</legend>
        <div className="studio-form-row">
          <label>
            Email
            <input name="email" type="email" autoComplete="email" placeholder="you@company.com" maxLength={200} aria-invalid={Boolean(errors.email || errors.contact)} aria-describedby={errors.email ? 'contact-email-error' : errors.contact ? 'contact-details-error' : undefined} />
            <FieldError id="contact-email-error" message={errors.email} />
          </label>
          <span className="contact-method-or" aria-hidden="true">or</span>
          <label>
            Phone / WhatsApp
            <input name="whatsapp" type="tel" autoComplete="tel" placeholder="+91 98765 43210" maxLength={30} aria-invalid={Boolean(errors.whatsapp || errors.contact)} aria-describedby={errors.whatsapp ? 'contact-phone-error' : errors.contact ? 'contact-details-error' : undefined} />
            <FieldError id="contact-phone-error" message={errors.whatsapp} />
          </label>
        </div>
        <FieldError id="contact-details-error" message={errors.contact} />
      </fieldset>

      <label>
        Project description <span className="contact-optional-label">optional</span>
        <textarea name="projectGoal" rows={5} maxLength={4000} placeholder="What are you trying to achieve, and what would a strong outcome look like?" />
      </label>

      <details className="contact-optional-details">
        <summary>
          <span>Add optional project details</span>
          <small>Budget, timing, a file or references</small>
        </summary>
        <div className="contact-optional-details-body">
          <div className="studio-form-row">
            <label>
              Budget <span>(optional)</span>
              <select name="budgetRange" defaultValue="">
                <option value="">Not sure yet</option>
                <option>₹15,000 to ₹25,000</option>
                <option>₹25,000 to ₹50,000</option>
                <option>₹50,000 to ₹1,00,000</option>
                <option>₹1,00,000+</option>
                <option>I would like your advice</option>
              </select>
            </label>
            <label>
              Target delivery date <span>(optional)</span>
              <input name="targetDate" type="date" />
            </label>
          </div>
          <label className="contact-file-field">
            <span>Requirement file, PRD or brief <em>(optional · PDF, document or image · max 2.4 MB)</em></span>
            <input name="projectFile" type="file" accept=".pdf,.doc,.docx,.txt,.rtf,.png,.jpg,.jpeg,.webp" onChange={chooseAttachment} aria-invalid={Boolean(errors.attachment)} aria-describedby={errors.attachment ? 'contact-attachment-error' : undefined} />
            <strong>{attachment ? attachment.name : 'Choose a file'}</strong>
            <FieldError id="contact-attachment-error" message={errors.attachment} />
          </label>
          <label>
            Reference link <span>(optional)</span>
            <input name="referenceLinks" type="url" inputMode="url" placeholder="A website, doc, Figma file or examples you like" maxLength={2000} />
          </label>
        </div>
      </details>

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
