import { CountryInfo, GlobalTaxConfig, TaxDefinition } from './types';

/**
 * Returns a list of all supported countries.
 * @param config The global tax configuration
 * @returns An array of country basic info
 */
export function getSupportedCountries(config: GlobalTaxConfig): { name: string; code: string }[] {
  return config.countries.map(c => ({ name: c.name, code: c.code }));
}

/**
 * Returns the full tax details for a specific country.
 * @param config The global tax configuration
 * @param countryCode The ISO country code (e.g., 'RW', 'US')
 * @returns The country info or undefined if not found
 */
export function getCountryTaxes(config: GlobalTaxConfig, countryCode: string): CountryInfo | undefined {
  return config.countries.find(c => c.code.toUpperCase() === countryCode.toUpperCase());
}

/**
 * Search for specific tax types across all countries.
 * @param config The global tax configuration
 * @param taxType The type of tax (e.g., 'VAT')
 * @returns An array of tax definitions with country info
 */
export function searchTaxType(config: GlobalTaxConfig, taxType: string): { country: string; tax: TaxDefinition }[] {
  const results: { country: string; tax: TaxDefinition }[] = [];
  config.countries.forEach(country => {
    country.taxes.forEach(tax => {
      if (tax.type.toUpperCase() === taxType.toUpperCase()) {
        results.push({ country: country.name, tax });
      }
    });
  });
  return results;
}
