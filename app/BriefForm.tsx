'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, Download, Check, MessageCircle } from 'lucide-react';
import { whatsappUrl } from './contact-utils';

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
  const [brief, setBrief] = useState('');
  const [status, setStatus] = useState('');
  useEffect(() => {
    setBrief('');
    setStatus('');
  }, [context]);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (onValidate && !onValidate()) return;
    const data = new FormData(event.currentTarget);
    const lines = Array.from(data.entries())
      .filter(([key]) => key !== 'consent')
      .map(([key, value]) => `${key}: ${String(value).trim()}`);
    setBrief(
      ['Hi WEBSTELL! I’d like to discuss a project.', '', ...lines, '', context]
        .filter(Boolean)
        .join('\n'),
    );
    setStatus(
      booking ? 'Your call request is ready.' : 'Your project brief is ready.',
    );
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([brief], { type: 'text/plain;charset=utf-8' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = booking
      ? 'WEBSTELL-call-request.txt'
      : 'WEBSTELL-project-brief.txt';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <form
      className="studio-form"
      onSubmit={prepare}
      onChange={() => {
        setBrief('');
        setStatus('');
      }}
    >
      <div className="studio-form-row">
        <label>
          Your name
          <input
            name="Name"
            autoComplete="name"
            placeholder="What should we call you?"
            required
            maxLength={100}
          />
        </label>
        <label>
          Email address
          <input
            name="Email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            maxLength={200}
          />
        </label>
      </div>
      <div className="studio-form-row">
        <label>
          Phone / WhatsApp <span>(optional)</span>
          <input
            name="Phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91"
            maxLength={30}
          />
        </label>
        <label>
          Business or brand <span>(optional)</span>
          <input
            name="Business"
            autoComplete="organization"
            placeholder="Your business name"
            maxLength={150}
          />
        </label>
      </div>
      {!compact && (
        <>
          <label>
            What are we building?
            <select name="Project type" defaultValue={projectType} required>
              <option value="" disabled>
                Choose your project
              </option>
              <option>Business website</option>
              <option>Personal portfolio</option>
              <option>Online store</option>
              <option>Custom software</option>
              <option>Mobile app</option>
              <option>Chatbot or automation</option>
              <option>Website redesign</option>
              <option>Something else — let’s talk</option>
            </select>
          </label>
          <div className="studio-form-row">
            <label>
              Your budget
              <select name="Budget" defaultValue="">
                <option value="" disabled>
                  Select a range
                </option>
                <option>₹15,000–₹25,000</option>
                <option>₹25,000–₹50,000</option>
                <option>₹50,000–₹1,00,000</option>
                <option>₹1,00,000+</option>
                <option>I’d like your advice</option>
              </select>
            </label>
            <label>
              When do you need it?
              <select name="Timeline" defaultValue="">
                <option value="" disabled>
                  Pick a timeline
                </option>
                <option>Within a month</option>
                <option>1–3 months</option>
                <option>3+ months</option>
                <option>Just exploring</option>
              </select>
            </label>
          </div>
        </>
      )}
      <label>
        {booking
          ? 'What would you like to discuss?'
          : 'Tell us about your idea'}
        <textarea
          name="Project details"
          required
          rows={compact ? 4 : 5}
          maxLength={4000}
          placeholder="What do you do? What should this project help you achieve? Share any features, special requirements or websites you love."
        />
      </label>
      {!compact && (
        <label>
          Anything specific we should include? <span>(optional)</span>
          <textarea
            name="Special requirements"
            rows={2}
            maxLength={2000}
            placeholder="Payments, a chatbot, a custom CMS, integrations, accessibility needs…"
          />
        </label>
      )}
      <label className="studio-consent">
        <input type="checkbox" name="consent" required />
        <span>You can use these details to respond to my enquiry.</span>
      </label>
      <button className="studio-button dark-button form-submit" type="submit">
        {booking ? 'Prepare call request' : 'Prepare project enquiry'}
        <ArrowUpRight size={20} />
      </button>
      <p className="form-preview-note">
        {booking
          ? 'Choose a preferred time. Your call is only booked once we confirm it.'
          : 'Email delivery is not connected yet. You can review your brief and share it on WhatsApp.'}
      </p>
      {brief && (
        <div className="brief-ready" role="status">
          <span className="brief-ready-icon">
            <Check size={20} />
          </span>
          <h3>{status}</h3>
          <p>
            {booking
              ? 'No slot has been reserved or invitation sent. Share the request with us to confirm availability.'
              : 'No message has been sent. Download your brief or open it in WhatsApp to send it to our team.'}
          </p>
          <details>
            <summary>Review your {booking ? 'call request' : 'brief'}</summary>
            <pre>{brief}</pre>
          </details>
          <div>
            <a href={whatsappUrl(brief)} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> Share on WhatsApp
            </a>
            <button type="button" onClick={download}>
              <Download size={16} /> Download brief
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
