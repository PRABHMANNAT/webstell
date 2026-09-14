'use client';

import { useEffect, useState } from 'react';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Globe2,
  Sparkles,
  Video,
} from 'lucide-react';
import StudioNav, { StudioFooter } from '../StudioNav';
import BriefForm from '../BriefForm';

const slots = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
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
function slotLabel(slot: string) {
  const hour = Number(slot.split(':')[0]);
  return `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
}

export default function ScheduleExperience() {
  const [today, setToday] = useState('');
  const [month, setMonth] = useState<Date | null>(null);
  const [chosen, setChosen] = useState('');
  const [slot, setSlot] = useState('');
  const [error, setError] = useState('');
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
  function validate() {
    if (!chosen || !slot || chosen > maxDate || isPastSlot(slot)) {
      setError(
        'Please choose a future date and time before preparing your request.',
      );
      return false;
    }
    setError('');
    return true;
  }
  return (
    <>
      <StudioNav />
      <main className="studio-page schedule-page">
        <section className="schedule-intro studio-width">
          <span className="studio-eyebrow">
            LESS BACK-AND-FORTH. MORE GETTING STARTED.
          </span>
          <h1>
            Let’s put a little time
            <br />
            <span>behind your idea.</span>
          </h1>
        </section>
        <section className="schedule-card studio-width">
          <aside className="call-intro">
            <div className="call-monogram">
              W<span>↗</span>
            </div>
            <span className="studio-eyebrow">A CONVERSATION WITH WEBSTELL</span>
            <h2>First, we listen.</h2>
            <p>
              Walk us through your idea. We’ll talk about what’s possible, what
              it might take, and the next sensible step.
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
            <ul>
              <li>
                <Clock3 size={18} />
                30 minutes
              </li>
              <li>
                <Video size={18} />
                Video call · link after confirmation
              </li>
              <li>
                <Globe2 size={18} />
                India Standard Time (UTC+05:30)
              </li>
            </ul>
            <div className="call-note">
              Bring your questions.
              <br />
              Leave with a little more clarity.
            </div>
          </aside>
          <div className="calendar-panel">
            <div className="calendar-heading">
              <h2>Pick your preferred day.</h2>
              <span>01 / DATE & TIME</span>
            </div>
            <p className="section-subtitle">
              Select a date and a time that works for you.
            </p>
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
                            setChosen(key);
                            setSlot('');
                            setError('');
                          }}
                        >
                          {index + 1}
                        </button>
                      );
                    },
                  )}
                </div>
                <div className="time-heading">
                  <h3>
                    {chosen ? 'And a time?' : 'Choose a date to see times.'}
                  </h3>
                  <span>IST · UTC+05:30</span>
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
                        setSlot(time);
                        setError('');
                      }}
                    >
                      {slotLabel(time)}
                    </button>
                  ))}
                </div>
                <p className="calendar-note">
                  These are preferred times, subject to team availability.
                </p>
              </>
            )}
          </div>
        </section>
        <section className="enquiry-layout schedule-details studio-width">
          <div>
            <span className="studio-eyebrow">02 / A LITTLE ABOUT YOU</span>
            <h2>
              Who’s joining
              <br />
              <span>the conversation?</span>
            </h2>
            <p>
              Your idea doesn’t need to be fully formed. A little context helps
              us make the call useful.
            </p>
            <div className="selected-call" aria-live="polite">
              <CalendarDays size={23} />
              <div>
                <strong>
                  {chosen ? selectedLabel : 'Your preferred date'}
                </strong>
                <span>
                  {slot
                    ? `${slotLabel(slot)} · 30 minutes · IST`
                    : 'Choose a date and time above'}
                </span>
              </div>
            </div>
            {error && (
              <p className="schedule-error" role="alert">
                {error}
              </p>
            )}
          </div>
          <BriefForm
            compact
            booking
            context={
              [
                pricingHandoff
                  ? `PRICING HANDOFF\nProject: ${pricingHandoff.project}\nIndicative estimate: ${pricingHandoff.estimate}`
                  : '',
                chosen && slot
                  ? `CALL REQUEST\nPreferred date: ${selectedLabel}\nPreferred time: ${slotLabel(slot)} IST (UTC+05:30)\nDuration: 30 minutes\nSubject to confirmation. No booking has been made.`
                  : '',
              ]
                .filter(Boolean)
                .join('\n\n')
            }
            onValidate={validate}
          />
        </section>
      </main>
      <StudioFooter />
    </>
  );
}
