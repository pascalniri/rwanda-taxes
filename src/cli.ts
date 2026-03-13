#!/usr/bin/env node
import { getSupportedCountries, getCountryTaxes, fetchLatestTaxConfig } from './index';

async function run() {
  const args = process.argv.slice(2);
  const countryArg = args.find(a => a.startsWith('--country='))?.split('=')[1];
  const listMode = args.includes('--list');

  try {
    const config = await fetchLatestTaxConfig();

    if (listMode) {
      console.log('--- Supported Countries ---');
      getSupportedCountries(config).forEach(c => console.log(`- ${c.name} (${c.code})`));
      return;
    }

    const code = countryArg || 'RW';
    const country = getCountryTaxes(config, code);

    if (!country) {
      console.error(`Error: Country code "${code}" not found.`);
      console.log('Use --list to see all supported countries.');
      return;
    }

    console.log(`\n--- ${country.name} (${country.code}) Tax Details ---`);
    console.log(`Currency: ${country.currency}`);
    console.log(`Continent: ${country.continent}`);
    console.log(`Authority: ${country.essentialInfo.taxAuthority}`);
    console.log(`Fiscal Year: ${country.essentialInfo.fiscalYear}`);
    console.log(`Deadline: ${country.essentialInfo.filingDeadline}`);
    
    console.log('\n--- Taxes ---');
    country.taxes.forEach(tax => {
      console.log(`[${tax.type}] ${tax.name}`);
      console.log(`  Rate: ${tax.rate}${tax.unit === 'percent' ? '%' : ''}`);
      if (tax.description) console.log(`  Description: ${tax.description}`);
      if (tax.bands) {
        console.log('  Bands:');
        tax.bands.forEach(b => {
          const maxStr = b.max ? ` to ${b.max.toLocaleString()}` : '+';
          console.log(`    - ${b.min.toLocaleString()}${maxStr}: ${b.rate * 100}%`);
        });
      }
      console.log('');
    });
    console.log('---------------------------------');

  } catch (error) {
    console.error('Error: Could not fetch tax data. Please check your internet connection.');
  }
}

run();
