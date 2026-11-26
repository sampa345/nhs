import { notFound } from 'next/navigation';
import { getCalculatorBySlug } from '@/data/calculators';
import { getCategoryBySlug } from '@/data/categories';
import { getBlogArticleBySlug } from '@/data/articles';
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
  const primaryGuide = calc.relatedGuides[0] ? getBlogArticleBySlug(calc.relatedGuides[0]) : undefined;
  return buildPageMetadata({
    title: calc.metaTitle,
    description: calc.metaDescription,
    path: `/${calc.slug}/`,
    absoluteTitle: true,
    ...(primaryGuide
      ? {
          image: {
            url: primaryGuide.featuredImage.src,
            alt: calc.metaTitle,
            width: primaryGuide.featuredImage.width,
            height: primaryGuide.featuredImage.height,
          },
        }
      : {}),
  });
}

export function requireCalculator(slug: CalculatorSlug) {
  const calc = getCalculatorBySlug(slug);
  if (!calc) notFound();
  return calc;
}
