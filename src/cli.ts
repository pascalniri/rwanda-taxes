#!/usr/bin/env node
import { getTaxSummary } from './index';

const summary = getTaxSummary();

console.log('--- Rwanda Tax Details (2024) ---');
console.log(`VAT: ${summary.vat}`);
console.log(`RSSB Pension: ${summary.rssb.pension}`);
console.log(`Maternity Fund: ${summary.rssb.maternity}`);
console.log('\n--- PAYE Brackets (Monthly) ---');
summary.payeBands.forEach((band) => console.log(`- ${band}`));
console.log('---------------------------------');
