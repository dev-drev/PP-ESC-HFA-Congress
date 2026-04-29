/**
 * Market configuration – editable by markets for numerical values,
 * character ethnicity, and design elements. Replace public/market-config.json
 * per deployment or edit this default for build-time values.
 */

export interface MarketNumericalOverrides {
  /** Override patient ages by patient id (e.g. "1" => 65) */
  patientAges?: Record<string, number>;
  /** Override metrics by patient id and metric key (e.g. "1": { bloodPressure: "140/90" }) */
  patientMetrics?: Record<string, Partial<{
    bloodPressure: string;
    heartRate: number;
    lvef: number | string;
    ntProBNP: number;
    egfr: number;
    uacr: string;
    bmi: number;
    hba1c: number;
  }>>;
  /** Override timeline/year values (e.g. baseYear, endYear) */
  timeline?: { baseYear?: number; endYear?: number };
}

export interface MarketDesign {
  /** Primary brand color (buttons, headers) */
  primary?: string;
  /** Accent/highlight color */
  accent?: string;
  /** Secondary/dark teal */
  secondary?: string;
  /** Border/neutral dark */
  border?: string;
  /** Optional font family override */
  fontFamily?: string;
}

/** Character ethnicity id per patient id. Asset paths use this (e.g. /characters/05/{ethnicity}.png). */
export interface MarketCharacterEthnicity {
  /** Patient id -> ethnicity id. Use "default" or leave unset for default assets. */
  [patientId: string]: string;
}

export interface MarketConfig {
  numerical?: MarketNumericalOverrides;
  design?: MarketDesign;
  /** Character ethnicity per patient (e.g. { "5": "ethnicity2" } for Erik) */
  characterEthnicity?: MarketCharacterEthnicity;
}

const defaultDesign: MarketDesign = {
  primary: '#095960',
  accent: '#FFBF00',
  secondary: '#056368',
  border: '#044449',
};

export const defaultMarketConfig: MarketConfig = {
  numerical: {
    patientAges: {},
    patientMetrics: {},
    timeline: { baseYear: 2025, endYear: 2040 },
  },
  design: defaultDesign,
  characterEthnicity: {},
};

/**
 * Resolve character/overlay/step image path with optional ethnicity.
 * If config has characterEthnicity[patientId], path becomes e.g. /characters/05/ethnicity2.png
 * instead of /characters/05.png. Fallback to base path when ethnicity asset is missing.
 */
export function getAssetPathForEthnicity(
  basePath: string,
  patientId: string,
  ethnicity?: string
): string {
  if (!ethnicity || ethnicity === 'default') return basePath;
  // If basePath is /characters/05.png, try /characters/05/{ethnicity}.png
  const match = basePath.match(/^(\/.+)\/([^/]+)(\.[a-z]+)$/i);
  if (!match) return basePath;
  const [, dir, baseName, ext] = match;
  return `${dir}/${baseName.replace(/\.[^.]+$/, '')}/${ethnicity}${ext}`;
}
