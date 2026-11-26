import type { CalculatorDefinition, CalculatorSlug, CategorySlug } from '@/types/calculator';
import { PAY_CALCULATORS } from './payCalculators';
import { PENSION_CALCULATORS } from './pensionCalculators';
import { SHIFT_CALCULATORS } from './shiftCalculators';
import { EMPLOYMENT_CALCULATORS } from './employmentCalculators';
import { TAX_CALCULATORS } from './taxCalculators';

export const ALL_CALCULATORS: CalculatorDefinition[] = [
  ...PAY_CALCULATORS,
  ...PENSION_CALCULATORS,
  ...SHIFT_CALCULATORS,
  ...EMPLOYMENT_CALCULATORS,
  ...TAX_CALCULATORS,
];

export function getCalculatorBySlug(slug: string): CalculatorDefinition | undefined {
  return ALL_CALCULATORS.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(category: CategorySlug): CalculatorDefinition[] {
  return ALL_CALCULATORS.filter((c) => c.category === category);
}

export function getPopularCalculators(): CalculatorDefinition[] {
  return ALL_CALCULATORS.filter((c) => c.isPopular);
}

export function getFeaturedCalculators(): CalculatorDefinition[] {
  return ALL_CALCULATORS.filter((c) => c.isFeatured);
}

export function getRelatedCalculators(slugs: CalculatorSlug[]): CalculatorDefinition[] {
  return slugs
    .map((s) => ALL_CALCULATORS.find((c) => c.slug === s))
    .filter((c): c is CalculatorDefinition => Boolean(c));
}
