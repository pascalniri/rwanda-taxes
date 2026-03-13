export interface TaxRateUnit {
  type: 'percent' | 'base_amount' | 'custom';
  value: string | number;
}

export interface TaxDefinition {
  name: string;
  type: string;
  rate: string | number;
  unit: 'percent' | 'amount' | 'variable';
  description?: string;
  authority?: string;
  bands?: {
    min: number;
    max: number | null;
    rate: number;
    label?: string;
  }[];
}

export interface CountryInfo {
  name: string;
  code: string;
  currency: string;
  continent: string;
  essentialInfo: {
    fiscalYear: string;
    taxAuthority: string;
    filingDeadline: string;
  };
  taxes: TaxDefinition[];
}

export interface GlobalTaxConfig {
  countries: CountryInfo[];
  meta: {
    lastUpdated: string;
    version: string;
  };
}

// Compatibility Types for v1.x
export interface TaxInfoSummary {
  year: number;
  payeBands: string[];
  rssb: {
    pension: string;
    maternity: string;
  };
  wht: {
    standard: string;
    publicTender: string;
    import: string;
  };
  casualPAYE: string;
  vat: string;
}

// Keep legacy types for backward compatibility where possible
export interface TaxBands {
  min: number;
  max: number | null;
  rate: number;
}

export interface TaxConfig {
  payeBands: TaxBands[];
  rssbRate: number;
  maternityRate: number;
}

export const DEFAULT_TAX_CONFIG_2024: TaxConfig = {
  payeBands: [
    { min: 0, max: 60000, rate: 0 },
    { min: 60000, max: 100000, rate: 0.1 },
    { min: 100000, max: 200000, rate: 0.2 },
    { min: 200000, max: null, rate: 0.3 },
  ],
  rssbRate: 0.03,
  maternityRate: 0.003,
};
