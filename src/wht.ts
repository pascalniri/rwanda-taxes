import { VAT_RATE_RW, calculateVAT, extractVAT } from './index';

/**
 * Common Withholding Tax (WHT) rates in Rwanda.
 */
export const WHT_RATES = {
  STANDARD: 0.15,
  PROFESSIONAL_FEES: 0.15,
  MANAGEMENT_FEES: 0.15,
  PUBLIC_TENDER: 0.03, // 3% on public tenders
  IMPORT: 0.05, // 5% on imports
};

/**
 * Calculates Withholding Tax (WHT) for a given amount.
 * @param amount The amount to apply WHT on
 * @param rate The WHT rate (default 15%)
 * @returns The WHT amount
 */
export function calculateWHT(amount: number, rate: number = WHT_RATES.STANDARD): number {
  return Math.round(amount * rate);
}

/**
 * Calculates the net amount after deducting Withholding Tax (WHT).
 * @param amount The gross amount
 * @param rate The WHT rate (default 15%)
 * @returns The net amount after tax
 */
export function applyWHT(amount: number, rate: number = WHT_RATES.STANDARD): number {
  return amount - calculateWHT(amount, rate);
}
