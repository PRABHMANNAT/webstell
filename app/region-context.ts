import { createContext, useContext } from 'react';
import type { Currency } from '../lib/region';

// Keep the context identity in a shared module outside the RSC client boundary.
// Provider and consumers must import this same instance in Vinext's client build.
export const RegionContext = createContext<{
  currency: Currency;
  country: string | null;
  ready: boolean;
  chooseCurrency: (currency: Currency) => void;
}>({ currency: 'USD', country: null, ready: false, chooseCurrency: () => {} });

export const useRegion = () => useContext(RegionContext);
