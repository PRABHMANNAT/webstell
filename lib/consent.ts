export const CONSENT_STORAGE_KEY = 'webstell_analytics_consent';
export const OPEN_COOKIE_SETTINGS_EVENT = 'webstell:open-cookie-settings';

export type ConsentChoice = 'accepted' | 'rejected';

let memoryChoice: ConsentChoice | null = null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function readConsentChoice(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;

  try {
    const choice = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (choice === 'accepted' || choice === 'rejected') {
      memoryChoice = choice;
      return choice;
    }
    return memoryChoice;
  } catch {
    return memoryChoice;
  }
}

export function storeConsentChoice(choice: ConsentChoice) {
  memoryChoice = choice;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Consent still applies to the current page if storage is unavailable.
  }
}

export function hasAnalyticsConsent() {
  return readConsentChoice() === 'accepted';
}

export function updateGoogleConsent(choice: ConsentChoice) {
  if (typeof window === 'undefined') return;

  try {
    window.dataLayer ||= [];
    window.gtag ||= (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
    window.gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: choice === 'accepted' ? 'granted' : 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
      personalization_storage: 'denied',
    });
  } catch {
    // Consent controls must never interrupt the website.
  }
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}
