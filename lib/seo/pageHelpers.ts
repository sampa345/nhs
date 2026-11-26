import { notFound } from 'next/navigation';
import { getCalculatorBySlug } from '@/data/calculators';
import { getCategoryBySlug } from '@/data/categories';
import { buildPageMetadata } from '@/lib/seo/config';
import type { CalculatorSlug, CategorySlug } from '@/types/calculator';

export function createCategoryMetadata(slug: CategorySlug) {
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  return buildPageMetadata({
    title: cat.metaTitle,
    description: cat.metaDescription,
    path: `/${cat.slug}/`,
  });
}

export function requireCategory(slug: CategorySlug) {
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();
  return cat;
}

export function createCalculatorMetadata(slug: CalculatorSlug) {
  const calc = getCalculatorBySlug(slug);
  if (!calc) return {};
  return buildPageMetadata({
    title: calc.metaTitle,
    description: calc.metaDescription,
    path: `/${calc.slug}/`,
  });
}

export function requireCalculator(slug: CalculatorSlug) {
  const calc = getCalculatorBySlug(slug);
  if (!calc) notFound();
  return calc;
}
