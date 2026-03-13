# Rwanda Taxes

A comprehensive and reliable npm package for calculating taxes in Rwanda according to the latest RRA (Rwanda Revenue Authority) and RSSB (Rwanda Social Security Board) regulations (2024).

## Features

- **PAYE (Pay As You Earn)**: Accurate calculation based on monthly bands.
- **RSSB Contributions**: Pension (3% employee, 3% employer) and Maternity Leave Fund (0.3% employee, 0.3% employer).
- **Casual Laborer Tax**: Specific rules for casual labor.
- **VAT**: Helper functions for calculating and extracting VAT (18%).
- **Salary Breakdown**: Full gross-to-net salary breakdown.
- **TypeScript Support**: Fully typed API for excellent developer experience.

## Installation

```bash
npm install rwanda-taxes
```

## Usage

### Salary Calculation

```typescript
import { calculateSalary } from 'rwanda-taxes';

const breakdown = calculateSalary(500000);

console.log(breakdown);
/*
{
  grossSalary: 500000,
  rssbEmployee: 15000,
  rssbEmployer: 15000,
  maternityEmployee: 1500,
  maternityEmployer: 1500,
  taxableIncome: 483500,
  paye: 109050,
  netSalary: 374450,
  totalEmployerCost: 516500
}
*/
```

### VAT Calculations

```typescript
import { calculateVAT, extractVAT } from 'rwanda-taxes';

// Adding VAT to a net amount
const vat = calculateVAT(1000); // 180

// Extracting VAT from a gross amount
const vatIncluded = extractVAT(1180); // 180
```

### Withholding Tax (WHT)

```typescript
import { calculateWHT, applyWHT, WHT_RATES } from 'rwanda-taxes';

// Standard 15% WHT
const wht = calculateWHT(100000); // 15000

// 3% WHT for Public Tenders
const tenderWht = calculateWHT(100000, WHT_RATES.PUBLIC_TENDER); // 3000
```

### Casual Laborer PAYE

```typescript
import { calculateCasualPAYE } from 'rwanda-taxes';

const tax = calculateCasualPAYE(100000); // Tax on income above 60k at 15%
```

## Tax Bands (2024)

| Band (Monthly Rwf) | Rate |
| --- | --- |
| 0 - 60,000 | 0% |
| 60,001 - 100,000 | 10% |
| 100,001 - 200,000 | 20% |
| Above 200,000 | 30% |

## Author

**Pascal Niri**
- GitHub: [@pascalniri](https://github.com/pascalniri)

## License

MIT
