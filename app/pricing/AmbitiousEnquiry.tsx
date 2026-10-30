'use client';

import { useEffect, useId, useRef, useState, type SyntheticEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Check, LoaderCircle, Mail, Send } from 'lucide-react';
import type { Currency } from '../../lib/region';
import './ambitious-enquiry.css';

type DeliveryState = 'idle' | 'sending' | 'sent' | 'error';
type FieldErrors = Record<string, string>;

// Deliberately simplified, original outlines in longitude/latitude coordinates.
const LAND: readonly (readonly (readonly [number, number])[])[] = [
  [
    [-168, 69],
    [-140, 72],
    [-124, 54],
    [-104, 49],
    [-94, 18],
    [-81, 25],
    [-60, 52],
    [-78, 72],
  ],
  [
    [-81, 11],
    [-62, 10],
    [-36, -8],
    [-47, -26],
    [-68, -55],
    [-75, -35],
    [-70, -15],
  ],
  [
    [-17, 35],
    [10, 37],
    [34, 30],
    [51, 10],
    [40, -14],
    [20, -35],
    [10, -29],
    [-5, 0],
    [-17, 20],
  ],
  [
    [-12, 36],
    [-5, 58],
    [24, 71],
    [65, 72],
    [112, 62],
    [150, 57],
    [174, 45],
    [143, 32],
    [122, 7],
    [104, -5],
    [83, 24],
    [57, 23],
    [38, 35],
    [21, 33],
    [7, 44],
  ],
  [
    [113, -22],
    [132, -11],
    [151, -22],
    [153, -35],
    [135, -39],
    [115, -33],
  ],
  [
    [-57, 83],
    [-24, 75],
    [-42, 60],
    [-65, 67],
  ],
  [
    [48, -13],
    [51, -23],
    [46, -26],
    [44, -17],
  ],
];

function projectedLand(
  points: readonly (readonly [number, number])[],
  rotation: number,
) {
  const radians = Math.PI / 180;
  const vertices = points.map(([longitude, latitude]) => {
    const lon = (longitude + rotation) * radians;
    const lat = latitude * radians;
    return {
      x: Math.sin(lon) * Math.cos(lat),
      y: -Math.sin(lat),
      z: Math.cos(lon) * Math.cos(lat),
    };
  });
  const visible: { x: number; y: number }[] = [];
  for (let i = 0; i < vertices.length; i++) {
    const a = vertices[i];
    const b = vertices[(i + 1) % vertices.length];
    if (a.z >= 0) visible.push(a);
    if (a.z >= 0 !== b.z >= 0) {
      const ratio = a.z / (a.z - b.z);
      const x = a.x + (b.x - a.x) * ratio;
      const y = a.y + (b.y - a.y) * ratio;
      const length = Math.hypot(x, y) || 1;
      visible.push({ x: x / length, y: y / length });
    }
  }
  return visible.length < 3
    ? ''
    : visible
        .map(
          ({ x, y }, i) =>
            `${i ? 'L' : 'M'}${(200 + x * 170).toFixed(1)} ${(200 + y * 170).toFixed(1)}`,
        )
        .join(' ') + 'Z';
}

export type AmbitiousEnquiryProps = {
  context?: string;
  projectType?: string;
  currency?: Currency;
};

function PaperPlane({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 25 76 4 52 59 34 38 3 25Z"
        fill="#d7ff46"
        stroke="#131b10"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="m34 38 42-34-27 41-15-7Z"
        fill="#a5cf2e"
        stroke="#131b10"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="m34 38-5 19 13-12"
        fill="#efffc4"
        stroke="#131b10"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeNote({
  note,
  sent,
  reduced,
}: {
  note: string;
  sent: boolean;
  reduced: boolean;
}) {
  const id = useId().replace(/:/g, '');
  const [rotation, setRotation] = useState(340);
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
        <svg
          className="ambitious-globe"
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={`${id}-sphere`} cx=".34" cy=".23" r=".8">
              <stop stopColor="#426e40" />
              <stop offset=".52" stopColor="#1b3727" />
              <stop offset="1" stopColor="#0b160f" />
            </radialGradient>
            <radialGradient id={`${id}-light`} cx=".32" cy=".23" r=".76">
              <stop stopColor="#e1ff98" stopOpacity=".12" />
              <stop offset="1" stopColor="#0a120c" stopOpacity=".6" />
            </radialGradient>
            <clipPath id={`${id}-clip`}>
              <circle cx="200" cy="200" r="170" />
            </clipPath>
          </defs>
          <circle
            cx="200"
            cy="200"
            r="179"
            stroke="#d7ff46"
            strokeOpacity=".1"
          />
          <circle
            cx="200"
            cy="200"
            r="170"
            fill={`url(#${id}-sphere)`}
            stroke="#b8d789"
            strokeOpacity=".35"
          />
          <g clipPath={`url(#${id}-clip)`}>
            <g stroke="#c9e4ab" strokeOpacity=".17" strokeWidth="1">
              <ellipse cx="200" cy="200" rx="62" ry="170" />
              <ellipse cx="200" cy="200" rx="128" ry="170" />
              <ellipse cx="200" cy="200" rx="170" ry="64" />
              <ellipse cx="200" cy="200" rx="170" ry="128" />
              <path d="M30 200h340M200 30v340" />
            </g>
            <g
              fill="#94b66c"
              fillOpacity=".52"
              stroke="#c3db95"
              strokeOpacity=".22"
              strokeLinejoin="round"
            >
              {LAND.map((points, index) => (
                <path key={index} d={projectedLand(points, rotation)} />
              ))}
            </g>
            <circle cx="200" cy="200" r="170" fill={`url(#${id}-light)`} />
          </g>
          <motion.path
            d="M57 266C112 340 337 321 350 175c5-54-25-93-65-111"
            stroke="#d7ff46"
            strokeWidth="2"
            strokeDasharray="5 7"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              sent
                ? { pathLength: 1, opacity: 0.8 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{ duration: reduced ? 0 : 1.8, ease: 'easeOut' }}
          />
          <motion.g
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: sent ? 1 : 0, scale: sent ? 1 : 0.4 }}
            transition={{
              delay: reduced ? 0 : 1.45,
              duration: reduced ? 0 : 0.3,
            }}
            style={{ transformOrigin: '285px 65px' }}
          >
            <circle cx="285" cy="65" r="13" fill="#d7ff46" fillOpacity=".2" />
            <circle cx="285" cy="65" r="5" fill="#d7ff46" />
          </motion.g>
        </svg>
      </div>
      <motion.div
        className="ambitious-letter"
        aria-hidden="true"
        initial={false}
        animate={
          sent
            ? { opacity: 0, y: -32, rotate: -12, scale: 0.65 }
            : { opacity: 1, y: 0, rotate: -5, scale: 1 }
        }
        transition={{ duration: reduced ? 0 : 0.5, ease: [0.2, 0.7, 0.2, 1] }}
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
      <motion.div
        className="ambitious-flight"
        aria-hidden="true"
        initial={false}
        animate={
          sent
            ? reduced
              ? { opacity: 1, x: 80, y: -70, rotate: -15, scale: 0.8 }
              : {
                  opacity: [0, 1, 1, 1, 0],
                  x: [-20, -90, 75, 132, 82],
                  y: [30, -3, 57, -65, -126],
                  rotate: [-12, 20, -24, -38, -65],
                  scale: [0.7, 1, 1.1, 0.75, 0.35],
                }
            : { opacity: 0, x: 0, y: 0, rotate: 0, scale: 1 }
        }
        transition={{
          duration: reduced ? 0 : 2.1,
          ease: 'easeInOut',
          delay: reduced ? 0 : 0.28,
        }}
      >
        <PaperPlane />
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
    if (state === 'sent') successRef.current?.focus();
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
                rows={4}
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
