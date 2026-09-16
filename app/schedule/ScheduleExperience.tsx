'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  Sparkles,
} from 'lucide-react';
import StudioNav from '../StudioNav';
import SiteFooter from '../SiteFooter';

const slots = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
const customSlots = Array.from({ length: 96 }, (_, index) => {
  const hour = Math.floor(index / 4);
  const minute = (index % 4) * 15;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
});
const timeZones = [
  { value: 'Asia/Kolkata', label: 'India · IST (UTC+05:30)' },
  { value: 'Asia/Dubai', label: 'United Arab Emirates · GST (UTC+04:00)' },
  { value: 'Asia/Singapore', label: 'Singapore · SGT (UTC+08:00)' },
  { value: 'Europe/London', label: 'United Kingdom · UK time' },
  { value: 'America/New_York', label: 'United States · Eastern time' },
  { value: 'Australia/Sydney', label: 'Australia · Sydney time' },
];
const dateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
function indiaToday() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  return ['year', 'month', 'day']
    .map((type) => parts.find((part) => part.type === type)?.value)
    .join('-');
}
function slotLabel(slot: string, date: string, timeZone: string) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(`${date}T${slot}:00+05:30`));
}

type BookingState = 'idle' | 'loading' | 'success' | 'error';
type BookingErrors = {
  name?: string;
  phone?: string;
  date?: string;
  time?: string;
};

export default function ScheduleExperience() {
  const [today, setToday] = useState('');
  const [month, setMonth] = useState<Date | null>(null);
  const [chosen, setChosen] = useState('');
  const [slot, setSlot] = useState('');
  const [customTimeOpen, setCustomTimeOpen] = useState(false);
  const [timeZone, setTimeZone] = useState('Asia/Kolkata');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bookingState, setBookingState] = useState<BookingState>('idle');
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingErrors, setBookingErrors] = useState<BookingErrors>({});
  const submissionId = useRef('');
  const [pricingHandoff, setPricingHandoff] = useState<{
    project: string;
    estimate: string;
  } | null>(null);
  useEffect(() => {
    const now = indiaToday();
    setToday(now);
    const date = new Date(now + 'T12:00:00');
    setMonth(new Date(date.getFullYear(), date.getMonth(), 1));
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('source') !== 'pricing') return;
    const project = (params.get('project') || '').trim().slice(0, 100);
    const estimate = Number(params.get('estimate'));
    if (!project || !Number.isFinite(estimate) || estimate < 0 || estimate > 10000000) {
      return;
    }
    setPricingHandoff({
      project,
      estimate: `₹${Math.round(estimate).toLocaleString('en-IN')}`,
    });
  }, []);
  const lowerBound = today ? new Date(today + 'T12:00:00') : null;
  const upperBound = lowerBound
    ? new Date(
        lowerBound.getFullYear(),
        lowerBound.getMonth(),
        lowerBound.getDate() + 60,
      )
    : null;
  const maxDate = upperBound ? dateKey(upperBound) : '';
  const timeZoneLabel =
    timeZones.find(({ value }) => value === timeZone)?.label ?? timeZones[0].label;
  const selectedLabel = chosen
    ? new Date(chosen + 'T12:00:00').toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';
  function isPastSlot(value: string) {
    return (
      !chosen || new Date(`${chosen}T${value}:00+05:30`).getTime() <= Date.now()
    );
  }
  function clearBookingFeedback() {
    if (bookingState !== 'idle') {
      setBookingState('idle');
      setBookingMessage('');
    }
  }
  function validateBooking() {
    const errors: BookingErrors = {};
    if (name.trim().length < 2) errors.name = 'Please enter your name.';
    if (!/^\+?[\d\s()-]{7,24}$/.test(phone.trim())) {
      errors.phone = 'Enter a valid phone number, including the country code.';
    }
    if (!chosen) errors.date = 'Choose a preferred date.';
    if (!slot || isPastSlot(slot)) errors.time = 'Choose a future time.';
    setBookingErrors(errors);
    return Object.keys(errors).length === 0;
  }
  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (bookingState === 'loading' || bookingState === 'success') return;
    if (!validateBooking()) {
      setBookingState('error');
      setBookingMessage('Please complete the highlighted details before sending your request.');
      return;
    }

    submissionId.current ||= crypto.randomUUID();
    setBookingState('loading');
    setBookingMessage('');
    const scheduleContext = `CALL REQUEST\nPreferred date: ${selectedLabel}\nPreferred time: ${slotLabel(slot, chosen, timeZone)} · ${timeZoneLabel}\nDuration: 30 minutes\nSubject to confirmation. No booking has been made.`;
    const context = [
      pricingHandoff
        ? `PRICING HANDOFF\nProject: ${pricingHandoff.project}\nIndicative estimate: ${pricingHandoff.estimate}`
        : '',
      scheduleContext,
    ]
      .filter(Boolean)
      .join('\n\n');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: submissionId.current,
          kind: 'call_request',
          name: name.trim(),
          phone: phone.trim(),
          projectType: '30-minute project call',
          projectGoal: 'I would like to discuss this project in a 30-minute call.',
          context,
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        errors?: Record<string, string>;
      };
      if (!response.ok || !result.ok) {
        setBookingErrors({
          name: result.errors?.name,
          phone: result.errors?.phone || result.errors?.whatsapp || result.errors?.contact,
          date: result.errors?.form,
        });
        setBookingState('error');
        setBookingMessage(result.message || 'We could not send this right now. Please try again.');
        return;
      }
      setBookingErrors({});
      setBookingState('success');
      setBookingMessage('Your call request is with the team. We’ll confirm your preferred time shortly.');
    } catch {
      setBookingState('error');
      setBookingMessage('We could not send this right now. Please try again.');
    }
  }
  return (
    <>
      <StudioNav />
      <main className="studio-page schedule-page">
        <section className="schedule-intro studio-width">
          <h1>
            Let’s find a time
            <br /><span>for your project.</span>
          </h1>
          <p>Choose a time that works for you. We’ll confirm your call once we’ve checked the team’s availability.</p>
        </section>
        <section className="schedule-card studio-width">
          <aside className="call-intro">
            <div className="call-monogram" aria-hidden="true">
              <Image
                src="/assets/brand/webstell-retro-mac.png"
                alt=""
                width={42}
                height={42}
                sizes="42px"
                unoptimized
              />
            </div>
            <span className="studio-eyebrow">A CONVERSATION WITH WEBSTELL</span>
            <h2>Start with what you know.</h2>
            <p>
              Walk us through the goal or the problem. We will use the call to
              clarify the scope and agree on a sensible next step.
            </p>
            {pricingHandoff && (
              <div className="call-pricing-context">
                <Sparkles size={16} />
                <span>
                  From your pricing estimate
                  <strong>
                    {pricingHandoff.project} · {pricingHandoff.estimate}
                  </strong>
                </span>
              </div>
            )}
            <div className="call-note">
              Bring your questions.
              <br />
              We’ll help you find the clearest next step.
            </div>
          </aside>
          <div className="calendar-panel">
            <div className="calendar-heading">
              <h2>Plan your call.</h2>
              <span>01 / YOUR DETAILS & TIME</span>
            </div>
            <p className="section-subtitle">
              Start with your name and number, then choose a preferred date and time.
            </p>
            <form className="schedule-booking-form" onSubmit={submitBooking} noValidate>
              <div className="schedule-contact-fields">
                <label>
                  Your name
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="What should we call you?"
                    value={name}
                    maxLength={100}
                    aria-invalid={Boolean(bookingErrors.name)}
                    aria-describedby={bookingErrors.name ? 'schedule-name-error' : undefined}
                    onChange={(event) => {
                      clearBookingFeedback();
                      setName(event.target.value);
                      setBookingErrors((current) => ({ ...current, name: undefined }));
                    }}
                  />
                  {bookingErrors.name && <span className="schedule-field-error" id="schedule-name-error">{bookingErrors.name}</span>}
                </label>
                <label>
                  Phone number
                  <input
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    maxLength={30}
                    aria-invalid={Boolean(bookingErrors.phone)}
                    aria-describedby={bookingErrors.phone ? 'schedule-phone-error' : undefined}
                    onChange={(event) => {
                      clearBookingFeedback();
                      setPhone(event.target.value);
                      setBookingErrors((current) => ({ ...current, phone: undefined }));
                    }}
                  />
                  {bookingErrors.phone && <span className="schedule-field-error" id="schedule-phone-error">{bookingErrors.phone}</span>}
                </label>
              </div>
              {month && lowerBound && upperBound && (
                <>
                  <div className="calendar-month">
                    <strong>
                      {month.toLocaleDateString('en-IN', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </strong>
                    <div>
                      <button
                        type="button"
                        aria-label="Previous month"
                        disabled={
                          month.getFullYear() === lowerBound.getFullYear() &&
                          month.getMonth() === lowerBound.getMonth()
                        }
                        onClick={() =>
                          setMonth(
                            new Date(
                              month.getFullYear(),
                              month.getMonth() - 1,
                              1,
                            ),
                          )
                        }
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        type="button"
                        className="calendar-next"
                        aria-label="Next month"
                        disabled={
                          month.getFullYear() === upperBound.getFullYear() &&
                          month.getMonth() === upperBound.getMonth()
                        }
                        onClick={() =>
                          setMonth(
                            new Date(
                              month.getFullYear(),
                              month.getMonth() + 1,
                              1,
                            ),
                          )
                        }
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                  <div
                    className="calendar-grid"
                    role="group"
                    aria-label="Choose a date"
                  >
                    {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(
                      (day) => (
                        <span className="calendar-weekday" key={day}>
                          {day}
                        </span>
                      ),
                    )}
                    {Array.from(
                      { length: (month.getDay() + 6) % 7 },
                      (_, index) => (
                        <span key={'empty-' + index} />
                      ),
                    )}
                    {Array.from(
                      {
                        length: new Date(
                          month.getFullYear(),
                          month.getMonth() + 1,
                          0,
                        ).getDate(),
                      },
                      (_, index) => {
                        const date = new Date(
                          month.getFullYear(),
                          month.getMonth(),
                          index + 1,
                        );
                        const key = dateKey(date);
                        const disabled =
                          key < today || key > maxDate || date.getDay() === 0;
                        return (
                          <button
                            key={key}
                            disabled={disabled}
                            type="button"
                            aria-label={date.toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                            aria-pressed={chosen === key}
                            className={
                              (chosen === key ? 'chosen-day ' : '') +
                              (key === today ? 'today' : '')
                            }
                            onClick={() => {
                              clearBookingFeedback();
                              setBookingErrors((current) => ({ ...current, date: undefined, time: undefined }));
                              setChosen(key);
                              if (chosen !== key) setSlot('');
                            }}
                          >
                            {index + 1}
                          </button>
                        );
                      },
                    )}
                  </div>
                  {bookingErrors.date && <p className="schedule-selection-error" role="alert">{bookingErrors.date}</p>}
                  <div className="time-heading">
                    <h3>
                      {chosen ? 'Now choose a time.' : 'Choose a date to see times.'}
                    </h3>
                    <label className="time-zone-picker">
                      <span>Time zone</span>
                      <select
                        aria-label="Choose your time zone"
                        value={timeZone}
                        onChange={(event) => {
                          clearBookingFeedback();
                          setTimeZone(event.target.value);
                        }}
                      >
                        {timeZones.map(({ value, label }) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div
                    className="time-slots"
                    role="group"
                    aria-label="Preferred time"
                  >
                    {slots.map((time) => (
                      <button
                        type="button"
                        key={time}
                        disabled={!chosen || isPastSlot(time)}
                        aria-pressed={slot === time}
                        onClick={() => {
                          clearBookingFeedback();
                          setBookingErrors((current) => ({ ...current, time: undefined }));
                          setSlot((current) => current === time ? '' : time);
                        }}
                      >
                        {slotLabel(time, chosen || today, timeZone)}
                      </button>
                    ))}
                    <button
                      className="custom-time-trigger"
                      type="button"
                      disabled={!chosen}
                      aria-expanded={customTimeOpen}
                      aria-controls="custom-time-picker"
                      aria-pressed={Boolean(slot) && !slots.includes(slot)}
                      onClick={() => setCustomTimeOpen((open) => !open)}
                    >
                      {slot && !slots.includes(slot)
                        ? slotLabel(slot, chosen || today, timeZone)
                        : 'Custom time'}
                    </button>
                    {customTimeOpen && (
                      <label className="custom-time-picker" id="custom-time-picker">
                        <span>Choose any time</span>
                        <select
                          autoFocus
                          aria-label="Choose a custom time"
                          value={!slots.includes(slot) ? slot : ''}
                          onChange={(event) => {
                            clearBookingFeedback();
                            setBookingErrors((current) => ({ ...current, time: undefined }));
                            setSlot(event.target.value);
                            if (event.target.value) setCustomTimeOpen(false);
                          }}
                        >
                          <option value="">Select a time</option>
                          {customSlots.map((time) => (
                            <option key={time} value={time} disabled={isPastSlot(time)}>
                              {slotLabel(time, chosen || today, timeZone)}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}
                  </div>
                  {bookingErrors.time && <p className="schedule-selection-error" role="alert">{bookingErrors.time}</p>}
                  <p className="calendar-note">
                    We’ll check the team’s availability, then confirm your call by phone.
                  </p>
                  <button
                    className={`schedule-submit ${bookingState === 'loading' ? 'is-loading' : ''}`}
                    type="submit"
                    disabled={bookingState === 'loading' || bookingState === 'success'}
                  >
                    <span>{bookingState === 'loading' ? 'Sending your request…' : bookingState === 'success' ? 'Call requested' : 'Request your call'}</span>
                    {bookingState === 'loading' ? <LoaderCircle className="schedule-submit-spinner" size={19} /> : bookingState === 'success' ? <Check size={19} /> : <ArrowUpRight size={19} />}
                  </button>
                  {bookingState === 'error' && <p className="schedule-submit-message is-error" role="alert">{bookingMessage}</p>}
                  {bookingState === 'success' && <p className="schedule-submit-message is-success" aria-live="polite"><Check size={17} /> {bookingMessage}</p>}
                </>
              )}
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
