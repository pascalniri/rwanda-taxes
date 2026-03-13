import { describe, it, expect } from 'vitest';
import { getCountryTaxes, getSupportedCountries } from '../src';

describe('Global Taxes Data Provider', () => {
  const mockConfig: any = {
    countries: [
      {
        name: 'Testland',
        code: 'TL',
        currency: 'TLD',
        continent: 'Testia',
        essentialInfo: {
          fiscalYear: 'Jan-Dec',
          taxAuthority: 'Test Authority',
          filingDeadline: 'April 1'
        },
        taxes: [
          { name: 'Test VAT', type: 'VAT', rate: 10, unit: 'percent' }
        ]
      }
    ]
  };

  it('should list supported countries', () => {
    const countries = getSupportedCountries(mockConfig);
    expect(countries).toContainEqual({ name: 'Testland', code: 'TL' });
  });

  it('should fetch taxes for a specific country code', () => {
    const country = getCountryTaxes(mockConfig, 'TL');
    expect(country?.name).toBe('Testland');
    expect(country?.taxes[0].rate).toBe(10);
  });

  it('should be case-insensitive for country codes', () => {
    const country = getCountryTaxes(mockConfig, 'tl');
    expect(country?.name).toBe('Testland');
  });

  it('should return undefined for unknown codes', () => {
    const country = getCountryTaxes(mockConfig, 'XX');
    expect(country).toBeUndefined();
  });
});
