import { SalaryBreakdown, TaxConfig, DEFAULT_TAX_CONFIG_2024 } from './types';
import { calculatePAYE } from './paye';

/**
 * Calculates the complete salary breakdown for a given gross salary.
 * @param grossSalary The monthly gross salary in Rwf
 * @param config Optional tax configuration (defaults to 2024 rules)
 * @returns A breakdown of taxes and net salary
 */
export function calculateSalary(
  grossSalary: number,
  config: TaxConfig = DEFAULT_TAX_CONFIG_2024
): SalaryBreakdown {
  // RSSB Pension (Employee 3%, Employer 3%)
  const rssbEmployee = Math.round(grossSalary * config.rssbRate);
  const rssbEmployer = Math.round(grossSalary * config.rssbRate);

  // Maternity Fund (Employee 0.3%, Employer 0.3%)
  const maternityEmployee = Math.round(grossSalary * config.maternityRate);
  const maternityEmployer = Math.round(grossSalary * config.maternityRate);

  // Taxable Income = Gross - (RSSB Employee + Maternity Employee)
  // Note: RRA usually considers employee social contributions as deductible for PAYE.
  const taxableIncome = grossSalary - rssbEmployee - maternityEmployee;

  // PAYE
  const paye = calculatePAYE(taxableIncome, config.payeBands);

  // Net Salary
  const netSalary = grossSalary - rssbEmployee - maternityEmployee - paye;

  // Total Employer Cost
  const totalEmployerCost = grossSalary + rssbEmployer + maternityEmployer;

  return {
    grossSalary,
    rssbEmployee,
    rssbEmployer,
    maternityEmployee,
    maternityEmployer,
    taxableIncome,
    paye,
    netSalary,
    totalEmployerCost,
  };
}
