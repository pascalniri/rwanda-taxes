import { DEFAULT_TAX_CONFIG_2024, TaxConfig, TaxBands } from './types';
import { VAT_RATE_RW } from './index';

export interface TaxInfoSummary {
  year: number;
  payeBands: string[];
  rssb: {
    pension: string;
    maternity: string;
  };
  vat: string;
}

/**
 * Returns a human-readable summary of the tax rates and bands.
 * @param config Optional tax configuration
 * @returns A structured summary of tax rules
 */
export function getTaxSummary(config: TaxConfig = DEFAULT_TAX_CONFIG_2024): TaxInfoSummary {
  return {
    year: 2024,
    payeBands: config.payeBands.map((band: TaxBands) => {
      const maxStr = band.max ? ` to ${band.max.toLocaleString()} Rwf` : ' and above';
      return `${band.min.toLocaleString()}${maxStr}: ${band.rate * 100}%`;
    }),
    rssb: {
      pension: `${config.rssbRate * 100}% (Employee) + ${config.rssbRate * 100}% (Employer)`,
      maternity: `${config.maternityRate * 100}% (Employee) + ${config.maternityRate * 100}% (Employer)`,
    },
    vat: `${VAT_RATE_RW * 100}%`,
  };
}
