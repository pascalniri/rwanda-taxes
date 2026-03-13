import { describe, it, expect } from 'vitest';
import { 
  calculateSalary, 
  calculateVAT, 
  extractVAT, 
  calculateCasualPAYE,
  calculateWHT,
  applyWHT,
  WHT_RATES
} from '../src';

describe('Rwanda Tax Calculations', () => {
  describe('Salary Calculations (2024)', () => {
    it('should be exempt for salary up to 60,000', () => {
      const breakdown = calculateSalary(50000);
      expect(breakdown.paye).toBe(0);
      expect(breakdown.rssbEmployee).toBe(1500); // 3%
      expect(breakdown.maternityEmployee).toBe(150); // 0.3%
      expect(breakdown.netSalary).toBe(50000 - 1500 - 150);
    });

    it('should calculate PAYE correctly for 100,000 gross', () => {
      // Gross: 100,000
      // RSSB Employee: 3000
      // Maternity: 300
      // Taxable: 96,700
      // 0-60k: 0
      // 60k-96.7k: 36,700 * 0.1 = 3670
      const breakdown = calculateSalary(100000);
      expect(breakdown.paye).toBe(3670);
    });

    it('should calculate PAYE correctly for 150,000 gross', () => {
      // Gross: 150,000
      // RSSB: 4500
      // Maternity: 450
      // Taxable: 145,050
      // 0-60k: 0
      // 60k-100k: 40k * 0.1 = 4000
      // 100k-145,050: 45,050 * 0.2 = 9010
      // Total PAYE: 13010
      const breakdown = calculateSalary(150000);
      expect(breakdown.paye).toBe(13010);
    });

    it('should calculate PAYE correctly for 500,000 gross', () => {
      // Gross: 500,000
      // RSSB: 15,000
      // Maternity: 1500
      // Taxable: 483,500
      // 0-60k: 0
      // 60k-100k: 4000
      // 100k-200k: 100k * 0.2 = 20,000
      // 200k-483,500: 283,500 * 0.3 = 85,050
      // Total PAYE: 109,050
      const breakdown = calculateSalary(500000);
      expect(breakdown.paye).toBe(109050);
    });
  });

  describe('Casual Laborer PAYE', () => {
    it('should be 0 for <= 60,000', () => {
      expect(calculateCasualPAYE(60000)).toBe(0);
    });
    it('should be 15% for > 60,000', () => {
      expect(calculateCasualPAYE(100000)).toBe(Math.round(40000 * 0.15));
    });
  });

  describe('VAT Calculations', () => {
    it('should calculate VAT at 18%', () => {
      expect(calculateVAT(100)).toBe(18);
    });
    it('should extract VAT from gross', () => {
      // 118 gross should have 18 VAT
      expect(extractVAT(118)).toBe(18);
    });
  });

  describe('WHT Calculations', () => {
    it('should calculate WHT at 15%', () => {
      expect(calculateWHT(1000)).toBe(150);
      expect(applyWHT(1000)).toBe(850);
    });

    it('should calculate 3% WHT for public tenders', () => {
      expect(calculateWHT(1000, WHT_RATES.PUBLIC_TENDER)).toBe(30);
    });
  });
});
