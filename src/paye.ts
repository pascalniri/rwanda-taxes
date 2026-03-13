import { TaxBands } from './types';

/**
 * Calculates PAYE (Pay As You Earn) based on taxable income and provided bands.
 * @param taxableIncome The income subject to tax (Gross - Social Security)
 * @param bands The tax bands to apply
 * @returns The calculated PAYE amount
 */
export function calculatePAYE(taxableIncome: number, bands: TaxBands[]): number {
  let tax = 0;

  for (const band of bands) {
    if (taxableIncome > band.min) {
      const taxableInThisBand = band.max 
        ? Math.min(taxableIncome, band.max) - band.min 
        : taxableIncome - band.min;
      
      tax += taxableInThisBand * band.rate;
    }
  }

  return Math.round(tax);
}

/**
 * Calculates PAYE for casual laborers.
 * Casual laborers are exempt up to 60,000, then taxed at 15%.
 * @param income The income of the casual laborer
 * @returns The calculated PAYE
 */
export function calculateCasualPAYE(income: number): number {
  if (income <= 60000) return 0;
  return Math.round((income - 60000) * 0.15);
}
