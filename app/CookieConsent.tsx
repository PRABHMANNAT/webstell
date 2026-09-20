'use client';

import { useEffect, useRef, useState } from 'react';
import {
  OPEN_COOKIE_SETTINGS_EVENT,
  type ConsentChoice,
  readConsentChoice,
  storeConsentChoice,
  updateGoogleConsent,
} from '../lib/consent';

export default function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const panelRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const focusOnOpenRef = useRef(false);

  useEffect(() => {
    const storedChoice = readConsentChoice();
    setChoice(storedChoice);
    setOpen(storedChoice === null);
    setReady(true);
  }, []);

  useEffect(() => {
    function handleOpenSettings() {
      returnFocusRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      focusOnOpenRef.current = true;
      setOpen(true);
    }

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpenSettings);
    return () =>
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpenSettings);
  }, []);

  useEffect(() => {
    if (!open || !focusOnOpenRef.current) return;
    focusOnOpenRef.current = false;
    const frame = window.requestAnimationFrame(() => panelRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open || choice === null) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      setOpen(false);
      window.requestAnimationFrame(() => returnFocusRef.current?.focus());
    }

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [choice, open]);

  function saveChoice(nextChoice: ConsentChoice) {
    storeConsentChoice(nextChoice);
    updateGoogleConsent(nextChoice);
    setChoice(nextChoice);
    setOpen(false);
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  }

  function closeSettings() {
    setOpen(false);
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  }

  if (!ready || !open) return null;

  return (
    <section
      className="cookie-consent"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      ref={panelRef}
      tabIndex={-1}
    >
      <div className="cookie-consent-copy">
        <p className="cookie-consent-label">Privacy choices</p>
        <h2 id="cookie-consent-title">Your privacy, your choice.</h2>
        <p id="cookie-consent-description">
          We use essential cookies to operate this site and optional analytics
          cookies to understand how visitors use Webstell. You can accept or
          reject analytics cookies.
        </p>
        <p className="cookie-consent-links">
          <a href="/cookies">Cookie policy</a>
          <a href="/privacy">Privacy policy</a>
        </p>
      </div>
      <div className="cookie-consent-actions">
        <button
          type="button"
          className="cookie-consent-accept"
          aria-pressed={choice === 'accepted'}
          onClick={() => saveChoice('accepted')}
        >
          Accept analytics
        </button>
        <button
          type="button"
          className="cookie-consent-reject"
          aria-pressed={choice === 'rejected'}
          onClick={() => saveChoice('rejected')}
        >
          Reject non-essential
        </button>
      </div>
      {choice !== null ? (
        <button
          type="button"
          className="cookie-consent-close"
          aria-label="Close cookie settings"
          onClick={closeSettings}
        >
          ×
        </button>
      ) : null}
    </section>
  );
}
