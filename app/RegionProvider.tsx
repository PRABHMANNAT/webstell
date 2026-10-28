'use client';
import SiteLink from './SiteLink';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  currencies,
  currencyCookie,
  isCurrency,
  readCookie,
  type Currency,
} from '../lib/region';

import { RegionContext, useRegion } from './region-context';
export { useRegion } from './region-context';

export default function RegionProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [country, setCountry] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const manualChoice = useRef(false);
  useEffect(() => {
    const controller = new AbortController();
    const saved = readCookie(document.cookie, currencyCookie);
    const frame = requestAnimationFrame(() => {
      if (!manualChoice.current && isCurrency(saved)) {
        setCurrency(saved);
        setReady(true);
      }
    });
    const timeout = setTimeout(() => controller.abort(), 4000);
    fetch('/api/region', {
      credentials: 'same-origin',
      cache: 'no-store',
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error('Region unavailable');
        return response.json();
      })
      .then((data) => {
        if (!data || typeof data !== 'object') return;
        if (!('country' in data) || !('currency' in data)) return;
        if (typeof data.country === 'string') setCountry(data.country);
        if (!manualChoice.current && isCurrency(data.currency))
          setCurrency(data.currency);
      })
      .catch(() => {
        /* USD remains the safe fallback; a saved manual preference wins. */
      })
      .finally(() => {
        clearTimeout(timeout);
        setReady(true);
      });
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);
  function chooseCurrency(next: Currency) {
    if (!isCurrency(next)) return;
    manualChoice.current = true;
    setCurrency(next);
    setReady(true);
    document.cookie = `${currencyCookie}=${next}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
  }
  return (
    <RegionContext.Provider
      value={{ currency, country, ready, chooseCurrency }}
    >
      {children}
    </RegionContext.Provider>
  );
}

export function CurrencySwitcher() {
  const { currency, chooseCurrency } = useRegion();
  return (
    <label className="currency-switcher">
      <span>Quote currency</span>
      <select
        aria-label="Quote currency"
        value={currency}
        onChange={(event) => chooseCurrency(event.target.value as Currency)}
      >
        {currencies.map((value) => (
          <option key={value} value={value}>
            {value === 'INR'
              ? '₹ INR · India'
              : value === 'AUD'
                ? 'A$ AUD · Australia'
                : '$ USD · International'}
          </option>
        ))}
      </select>
    </label>
  );
}

export function RegionLinks() {
  function choose(region: string) {
    document.cookie = `webstell_region=${region}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
  }
  return (
    <div className="region-links">
      <span>Explore Webstell</span>
      <SiteLink href="/au" onClick={() => choose('au')}>
        Australia
      </SiteLink>
      <SiteLink href="/" onClick={() => choose('global')}>
        India & international
      </SiteLink>
    </div>
  );
}
