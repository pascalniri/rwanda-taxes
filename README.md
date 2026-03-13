# Global Taxes Data Provider

A comprehensive and reliable npm package for fetching and rendering tax information from around the world. Originally started with a focus on Rwanda, this package has expanded to become a universal data provider for tax rates, authorities, and essential fiscal information.

## Features

- **Global Coverage**: Fetch tax details for Rwanda, Kenya, USA, UK, South Africa, and more.
- **Dynamic Updates**: Remote-fetching architecture ensures you always have the latest rates without updating the package.
- **Richer Data**: Detailed information including tax authorities, fiscal years, and filing deadlines.
- **Developer First**: Fully typed API designed for building tax-aware applications and APIs.
- **CLI Resource**: Instant tax information directly in your terminal.

## Installation

```bash
npm install rwanda-taxes
```

## CLI Usage

View tax details for any supported country directly from your terminal:

```bash
# List all supported countries
npx rwanda-taxes --list

# View details for a specific country (default is RW)
npx rwanda-taxes --country=US
npx rwanda-taxes --country=KE
```

## API Usage

### 1. Fetching Global Data

```typescript
import { fetchLatestTaxConfig, getCountryTaxes, getSupportedCountries } from 'rwanda-taxes';

async function main() {
  // Fetch the latest global configuration
  const config = await fetchLatestTaxConfig();

  // List all available countries
  const countries = getSupportedCountries(config);

  // Get specific tax details for Kenya
  const kenya = getCountryTaxes(config, 'KE');
  
  if (kenya) {
    console.log(`VAT in Kenya: ${kenya.taxes.find(t => t.type === 'VAT')?.rate}%`);
  }
}
```

### 2. Building a Tax Information API

Perfect for creating a centralized data provider for your microservices or frontend:

```typescript
import { fetchLatestTaxConfig, getCountryTaxes } from 'rwanda-taxes';

export default async function handler(req, res) {
  const { countryCode } = req.query;
  const config = await fetchLatestTaxConfig();
  const data = getCountryTaxes(config, countryCode || 'RW');
  
  if (!data) return res.status(404).json({ error: 'Country not found' });
  
  res.status(200).json({
    status: 'success',
    data: data,
    meta: {
        lastUpdated: config.meta.lastUpdated,
        version: config.meta.version
    }
  });
}
```

## Supported Countries
Currently including Rwanda, Kenya, Uganda, South Africa, UK, USA, and more added regularly via remote updates.

## Author
**Pascal Niri**
- GitHub: [@pascalniri](https://github.com/pascalniri)

## License
MIT
