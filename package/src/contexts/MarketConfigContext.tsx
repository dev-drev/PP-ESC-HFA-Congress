'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  type MarketConfig,
  defaultMarketConfig,
  getAssetPathForEthnicity,
} from '@/config/market.config';

interface MarketConfigContextValue extends MarketConfig {
  /** Resolve asset path for a patient (uses characterEthnicity from config) */
  getAssetPath: (basePath: string, patientId: string) => string;
  /** Apply numerical overrides to a value (e.g. age, metric) */
  getNumericalOverride: <K extends keyof NonNullable<MarketConfig['numerical']>>(
    key: K,
    subKey?: string
  ) => unknown;
}

const MarketConfigContext = createContext<MarketConfigContextValue | null>(null);

const CONFIG_URL = '/market-config.json';

export function MarketConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<MarketConfig>(defaultMarketConfig);

  useEffect(() => {
    fetch(CONFIG_URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: MarketConfig | null) => {
        if (data && typeof data === 'object') {
          setConfig({
            numerical: { ...defaultMarketConfig.numerical, ...data.numerical },
            design: { ...defaultMarketConfig.design, ...data.design },
            characterEthnicity: { ...defaultMarketConfig.characterEthnicity, ...data.characterEthnicity },
          });
        }
      })
      .catch(() => {});
  }, []);

  // Apply design tokens as CSS variables
  useEffect(() => {
    const d = config.design;
    if (!d) return;
    const root = document.documentElement.style;
    if (d.primary) root.setProperty('--market-primary', d.primary);
    if (d.accent) root.setProperty('--market-accent', d.accent);
    if (d.secondary) root.setProperty('--market-secondary', d.secondary);
    if (d.border) root.setProperty('--market-border', d.border);
    if (d.fontFamily) root.setProperty('--market-font-family', d.fontFamily);
  }, [config.design]);

  const getAssetPath = (basePath: string, patientId: string): string => {
    const ethnicity = config.characterEthnicity?.[patientId];
    return getAssetPathForEthnicity(basePath, patientId, ethnicity);
  };

  const getNumericalOverride = <K extends keyof NonNullable<MarketConfig['numerical']>>(
    key: K,
    subKey?: string
  ): unknown => {
    const section = config.numerical?.[key];
    if (section && subKey && typeof section === 'object' && subKey in section) {
      return (section as Record<string, unknown>)[subKey];
    }
    return section;
  };

  const value: MarketConfigContextValue = {
    ...config,
    getAssetPath,
    getNumericalOverride,
  };

  return (
    <MarketConfigContext.Provider value={value}>
      {children}
    </MarketConfigContext.Provider>
  );
}

export function useMarketConfig(): MarketConfigContextValue {
  const ctx = useContext(MarketConfigContext);
  if (!ctx) {
    return {
      ...defaultMarketConfig,
      getAssetPath: (basePath: string) => basePath,
      getNumericalOverride: () => undefined,
    };
  }
  return ctx;
}
