'use client';

import { useEffect, useId, useRef, useState, type SyntheticEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Check, LoaderCircle, Mail, Send } from 'lucide-react';
import type { Currency } from '../../lib/region';
import './ambitious-enquiry.css';
import EnquiryEarth from './EnquiryEarth';

type DeliveryState = 'idle' | 'sending' | 'sent' | 'error';
type FieldErrors = Record<string, string>;

export type AmbitiousEnquiryProps = {
  context?: string;
  projectType?: string;
  currency?: Currency;
};

function GlobeNote({
  note,
  sent,
  reduced,
}: {
  note: string;
  sent: boolean;
  reduced: boolean;
}) {
  const [rotation, setRotation] = useState(240);
  const drag = useRef<{ x: number; rotation: number } | null>(null);
  const turn = (value: number) =>
    setRotation(((Math.round(value) % 360) + 360) % 360);
  return (
    <div className="ambitious-globe-stage">
      <span className="ambitious-postmark" aria-hidden="true">
        A LITTLE NOTE. A BIG POSSIBILITY.
      </span>
      <span className="ambitious-rotation-hint" aria-hidden="true">
        Drag to rotate · ← →
      </span>
      <div
        className="ambitious-globe-control"
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- This graphical slider supports dragging the globe as well as keyboard input.
        role="slider"
        tabIndex={0}
        aria-label="Rotate the globe"
        aria-valuemin={0}
        aria-valuemax={359}
        aria-valuenow={rotation}
        aria-valuetext={`${rotation} degrees. Use left and right arrow keys to rotate.`}
        aria-orientation="horizontal"
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            turn(rotation + (event.key === 'ArrowRight' ? 15 : -15));
          }
          if (event.key === 'Home' || event.key === 'End') {
            event.preventDefault();
            turn(event.key === 'Home' ? 0 : 359);
          }
        }}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          drag.current = { x: event.clientX, rotation };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (drag.current)
            turn(
              drag.current.rotation + (event.clientX - drag.current.x) * 0.6,
            );
        }}
        onPointerUp={(event) => {
          drag.current = null;
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <EnquiryEarth rotation={rotation} sent={sent} reduced={reduced} />
      </div>
      <motion.div
        className="ambitious-letter"
        aria-hidden="true"
        initial={false}
        animate={
          sent
            ? {
                opacity: 0,
                y: 48,
                rotateX: 70,
                rotate: -25,
                scaleX: 0.12,
                scaleY: 0.4,
                clipPath: 'polygon(50% 0%, 100% 100%, 50% 75%, 0% 100%)',
              }
            : {
                opacity: 1,
                y: 0,
                rotateX: 0,
                rotate: -2,
                scaleX: 1,
                scaleY: 1,
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              }
        }
        transition={{ duration: reduced ? 0 : 0.65, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <div className="ambitious-letter-top">
          <span>NOTE TO WEBSTELL</span>
          <span className="ambitious-stamp">
            <Send size={20} />
          </span>
        </div>
        <div className="ambitious-letter-lines">
          {note.trim() ||
            'I have an idea. Let’s make something people will love.'}
        </div>
        <span className="ambitious-letter-signature">
          The next chapter starts here. ↗
        </span>
      </motion.div>
      <div className="ambitious-destination" aria-hidden="true">
        <span className={sent ? 'is-delivered' : ''} />
        <Mail size={13} />{' '}
        {sent ? 'SENT TO THE STUDIO' : 'YOUR IDEA → OUR INBOX'}
      </div>
    </div>
  );
}

export default function AmbitiousEnquiry({
  context = '',
  projectType = 'Custom project',
  currency = 'USD',
}: AmbitiousEnquiryProps) {
  const id = useId();
  const reduceMotion = Boolean(useReducedMotion());
  const [fields, setFields] = useState({
    name: '',
    email: '',
    projectGoal: '',
    website: '',
  });
  const [state, setState] = useState<DeliveryState>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState('');
  const submissionId = useRef('');
  const inFlight = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);
  const ideaRef = useRef<HTMLTextAreaElement>(null);
  const focusIdeaOnReset = useRef(false);

  useEffect(() => {
    if (state === 'sent') successRef.current?.focus({ preventScroll: true });
    if (state === 'idle' && focusIdeaOnReset.current) {
      ideaRef.current?.focus();
      focusIdeaOnReset.current = false;
    }
  }, [state]);

  function update(name: keyof typeof fields, value: string) {
    setFields((current) => ({ ...current, [name]: value }));
    submissionId.current = '';
  }

  async function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || state === 'sent') return;
    const form = event.currentTarget;
    const next: FieldErrors = {};
    if (fields.name.trim().length < 2) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
      next.email = 'Enter an email address we can reply to.';
    if (fields.projectGoal.trim().length < 12)
      next.projectGoal =
        'Tell us a little more about your idea (at least 12 characters).';
    setErrors(next);
    if (Object.keys(next).length) {
      setState('error');
      setMessage('Check the highlighted fields and try again.');
      requestAnimationFrame(() =>
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    inFlight.current = true;
    submissionId.current ||= crypto.randomUUID();
    setState('sending');
    setMessage('Sending your idea to the studio…');
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: submissionId.current,
          kind: 'project_enquiry',
          name: fields.name.trim(),
          email: fields.email.trim(),
          projectType,
          projectGoal: fields.projectGoal.trim(),
          budgetRange: `${currency} — to discuss`,
          context: [
            'Sent from “Something more ambitious?” on the pricing page.',
            context,
            `Quote currency: ${currency}`,
          ]
            .filter(Boolean)
            .join('\n\n'),
          website: fields.website,
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        errors?: FieldErrors;
      };
      if (!response.ok || !result.ok) {
        setErrors(result.errors || {});
        setState('error');
        setMessage(
          result.message ||
            'Your message could not be sent. Your idea is saved here—please try again.',
        );
        return;
      }
      setState('sent');
      setMessage(
        'Your message was sent to the studio. We’ll reply to your email.',
      );
    } catch {
      setState('error');
      setMessage(
        'We couldn’t reach the studio. Your idea is still here—please try again.',
      );
    } finally {
      inFlight.current = false;
    }
  }

  return (
    <div className="ambitious-enquiry">
      <GlobeNote
        note={fields.projectGoal.slice(0, 180)}
        sent={state === 'sent'}
        reduced={reduceMotion}
      />
      <form
        className="ambitious-composer"
        onSubmit={submit}
        noValidate
        aria-label="Send a custom project idea"
        aria-busy={state === 'sending'}
      >
        <div className="ambitious-composer-heading">
          <span className="ambitious-to">
            <span>TO</span>
            <Mail size={14} /> WEBSTELL STUDIO
          </span>
          <h3>{state === 'sent' ? 'A good start.' : 'Tell us the idea.'}</h3>
          <p>
            {state === 'sent'
              ? 'Your next conversation starts from here.'
              : 'A rough thought is enough. We’ll help you find the next step.'}
          </p>
        </div>
        <label className="ambitious-honeypot" aria-hidden="true">
          Leave this empty
          <input
            name="website"
            value={fields.website}
            onChange={(e) => update('website', e.target.value)}
            autoComplete="off"
            tabIndex={-1}
          />
        </label>
        {state === 'sent' ? (
          <div
            className="ambitious-success"
            aria-live="polite"
            aria-atomic="true"
            tabIndex={-1}
            ref={successRef}
          >
            <span className="ambitious-success-check">
              <Check size={26} />
            </span>
            <h4>Sent to WEBSTELL.</h4>
            <p>{message}</p>
            <button
              className="ambitious-again"
              type="button"
              onClick={() => {
                focusIdeaOnReset.current = true;
                setState('idle');
                setMessage('');
                setFields((current) => ({ ...current, projectGoal: '' }));
                submissionId.current = '';
              }}
            >
              Send another idea <ArrowUpRight size={17} />
            </button>
          </div>
        ) : (
          <>
            <div className="ambitious-fields">
              <label htmlFor={`${id}-name`}>
                Your name
                <input
                  id={`${id}-name`}
                  name="name"
                  autoComplete="name"
                  value={fields.name}
                  onChange={(e) => update('name', e.target.value)}
                  disabled={state === 'sending'}
                  maxLength={100}
                  required
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name ? `${id}-name-error` : undefined
                  }
                  placeholder="Alex Morgan"
                />
                {errors.name && (
                  <span
                    className="ambitious-field-error"
                    id={`${id}-name-error`}
                  >
                    {errors.name}
                  </span>
                )}
              </label>
              <label htmlFor={`${id}-email`}>
                Email address
                <input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={(e) => update('email', e.target.value)}
                  disabled={state === 'sending'}
                  maxLength={200}
                  required
                  aria-invalid={Boolean(errors.email || errors.contact)}
                  aria-describedby={
                    errors.email || errors.contact
                      ? `${id}-email-error`
                      : undefined
                  }
                  placeholder="you@company.com"
                />
                {(errors.email || errors.contact) && (
                  <span
                    className="ambitious-field-error"
                    id={`${id}-email-error`}
                  >
                    {errors.email || errors.contact}
                  </span>
                )}
              </label>
            </div>
            <label className="ambitious-note-label" htmlFor={`${id}-note`}>
              What do you have in mind?
              <textarea
                ref={ideaRef}
                id={`${id}-note`}
                name="projectGoal"
                value={fields.projectGoal}
                onChange={(e) => update('projectGoal', e.target.value)}
                disabled={state === 'sending'}
                rows={2}
                maxLength={4000}
                required
                aria-invalid={Boolean(errors.projectGoal)}
                aria-describedby={
                  errors.projectGoal ? `${id}-goal-error` : undefined
                }
                placeholder="An app, a new product, a better way to work…"
              />
              {errors.projectGoal && (
                <span className="ambitious-field-error" id={`${id}-goal-error`}>
                  {errors.projectGoal}
                </span>
              )}
            </label>
            <div className="ambitious-send-row">
              <span>Goes straight to our studio inbox.</span>
              <button
                className="ambitious-send"
                type="submit"
                disabled={state === 'sending'}
              >
                {state === 'sending' ? (
                  <>
                    <LoaderCircle className="ambitious-spinner" size={17} />{' '}
                    Sending…
                  </>
                ) : (
                  <>
                    Send my idea <Send size={17} />
                  </>
                )}
              </button>
            </div>
            <div
              className="ambitious-message"
              role={state === 'error' ? 'alert' : 'status'}
              aria-live="polite"
            >
              {message}
              {state === 'error' && (
                <a
                  href={`mailto:contact@webstell-studio.com?subject=${encodeURIComponent('A new project idea for WEBSTELL')}&body=${encodeURIComponent(`${fields.projectGoal}\n\nFrom: ${fields.name}\nReply to: ${fields.email}`)}`}
                >
                  Email the studio directly <ArrowUpRight size={13} />
                </a>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}
