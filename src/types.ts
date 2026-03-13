export interface TaxBands {
  min: number;
  max: number | null;
  rate: number;
}

export interface SalaryBreakdown {
  grossSalary: number;
  rssbEmployee: number;
  rssbEmployer: number;
  maternityEmployee: number;
  maternityEmployer: number;
  taxableIncome: number;
  paye: number;
  netSalary: number;
  totalEmployerCost: number;
}

export interface TaxConfig {
  payeBands: TaxBands[];
  rssbRate: number; // 0.03 for 3%
  maternityRate: number; // 0.003 for 0.3%
}

export const DEFAULT_TAX_CONFIG_2024: TaxConfig = {
  payeBands: [
    { min: 0, max: 60000, rate: 0 },
    { min: 60000, max: 100000, rate: 0.1 },
    { min: 100000, max: 200000, rate: 0.2 },
    { min: 200000, max: null, rate: 0.3 },
  ],
  rssbRate: 0.03,
  maternityRate: 0.003,
};
