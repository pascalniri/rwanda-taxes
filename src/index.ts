export * from './types';
export * from './paye';
export * from './salary';
export * from './wht';

// VAT Helpers
export const VAT_RATE_RW = 0.18;

/**
 * Calculates VAT from a net amount.
 * @param amountNet The amount without VAT
 * @param rate The VAT rate (default 18%)
 * @returns The VAT amount
 */
export function calculateVAT(amountNet: number, rate: number = VAT_RATE_RW): number {
  return Math.round(amountNet * rate);
}

/**
 * Calculates VAT from a gross amount (inclusive of VAT).
 * @param amountGross The total amount including VAT
 * @param rate The VAT rate (default 18%)
 * @returns The VAT amount included in the gross
 */
export function extractVAT(amountGross: number, rate: number = VAT_RATE_RW): number {
  return Math.round(amountGross - amountGross / (1 + rate));
}
