import { GlobalTaxConfig } from './types';
const REMOTE_RATES_URL = 'https://raw.githubusercontent.com/pascalniri/rwanda-taxes/main/rates.json';

/**
 * Fetches the latest global tax configurations from the central repository.
 * @returns The global tax configuration
 */
export async function fetchLatestTaxConfig(): Promise<GlobalTaxConfig> {
  try {
    const response = await fetch(REMOTE_RATES_URL);
    if (!response.ok) throw new Error('Failed to fetch remote rates');
    return await response.json();
  } catch (error) {
    console.warn('Global-Taxes: Error fetching remote rates. Using local data if available.');
    throw error;
  }
}
