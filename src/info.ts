import { CountryInfo, GlobalTaxConfig, TaxDefinition, TaxInfoSummary } from './types';

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

/**
 * Compatibility helper to return Rwanda tax summary in the old format.
 * @param config The global tax configuration
 * @returns A structured summary of Rwanda tax rules
 */
export function getTaxSummary(config: GlobalTaxConfig): TaxInfoSummary {
  const rw = getCountryTaxes(config, 'RW');
  if (!rw) throw new Error('Rwanda configuration not found in global config');

  const findTax = (type: string) => rw.taxes.find(t => t.type === type);
  const vat = findTax('VAT');
  const paye = findTax('PAYE');
  const pension = findTax('RSSB');
  const maternity = findTax('RSSB_MATERNITY');
  const wht = findTax('WHT');

  return {
    year: 2024,
    payeBands: paye?.bands?.map(band => {
      const maxStr = band.max ? ` to ${band.max.toLocaleString()} Rwf` : ' and above';
      return `${band.min.toLocaleString()}${maxStr}: ${band.rate * 100}%`;
    }) || [],
    rssb: {
      pension: `${(pension?.rate as number || 0) * 1}% (Employee) + ${(pension?.rate as number || 0) * 1}% (Employer)`,
      maternity: `${(maternity?.rate as number || 0) * 1}% (Employee) + ${(maternity?.rate as number || 0) * 1}% (Employer)`,
    },
    wht: {
      standard: '15%',
      publicTender: '3%',
      import: '5%',
    },
    casualPAYE: '0% up to 60,000 Rwf, then 15% flat rate',
    vat: `${vat?.rate}%`,
  };
}
