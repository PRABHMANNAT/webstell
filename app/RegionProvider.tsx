'use client';
import { Select } from '@base-ui/react/select';
import { Check, ChevronDown } from 'lucide-react';
import './currency-switcher.css';
import { useId, useEffect, useRef, useState, type ReactNode } from 'react';
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

const currencyItems = currencies.map((value) => ({
  value,
  label:
    value === 'INR'
      ? '₹ INR · India'
      : value === 'AUD'
        ? 'A$ AUD · Australia'
        : '$ USD · International',
}));
export function CurrencySwitcher({
  value,
  onChange,
}: { value?: Currency; onChange?: (currency: Currency) => void } = {}) {
  const region = useRegion();
  const id = useId();
  return (
    <div className="currency-switcher">
      <label id={id} htmlFor={`${id}-control`}>Quote currency</label>
      <Select.Root
        items={currencyItems}
        value={value ?? region.currency}
        onValueChange={(next) => {
          if (isCurrency(next)) (onChange ?? region.chooseCurrency)(next);
        }}
      >
        <Select.Trigger aria-labelledby={id} className="currency-trigger">
          <Select.Value />
          <Select.Icon>
            <ChevronDown size={18} aria-hidden="true" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner
            sideOffset={8}
            align="start"
            alignItemWithTrigger={false}
            className="currency-positioner"
          >
            <Select.Popup className="currency-popup">
              <Select.List>
                {currencyItems.map((item) => (
                  <Select.Item
                    key={item.value}
                    value={item.value}
                    className="currency-option"
                  >
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator>
                      <Check size={17} aria-hidden="true" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
