import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { ALL_CALCULATORS } from '../data/calculators';
import { CATEGORIES } from '../data/categories';
import { BLOG_ARTICLES } from '../data/articles';
import { HEADER_NAV_LINKS, HEADER_PRIMARY_CTA, FOOTER_COLUMNS } from '../data/navigation/links';

const EXPECTED_CALCULATOR_SLUGS = [
  'nhs-pay-calculator',
  'nhs-take-home-pay-calculator',
  'nhs-salary-calculator',
  'nhs-salary-after-tax-calculator',
  'nhs-band-calculator',
  'nhs-hourly-pay-calculator',
  'nhs-part-time-pay-calculator',
  'nhs-pension-calculator',
  'nhs-pension-contribution-calculator',
  'nhs-pension-tax-relief-calculator',
  'nhs-pension-take-home-pay-calculator',
  'nhs-overtime-calculator',
  'nhs-night-shift-pay-calculator',
  'nhs-weekend-pay-calculator',
  'nhs-unsocial-hours-calculator',
  'nhs-bank-holiday-pay-calculator',
  'nhs-annual-leave-calculator',
  'nhs-holiday-entitlement-calculator',
  'nhs-sick-pay-calculator',
  'nhs-maternity-pay-calculator',
  'nhs-paternity-pay-calculator',
  'nhs-redundancy-pay-calculator',
  'nhs-tax-calculator',
  'nhs-national-insurance-calculator',
  'nhs-salary-sacrifice-calculator',
  'nhs-student-loan-calculator',
];

assert.equal(ALL_CALCULATORS.length, 26, 'Expected 26 calculators');
for (const slug of EXPECTED_CALCULATOR_SLUGS) {
  assert.ok(ALL_CALCULATORS.some((c) => c.slug === slug), `Missing calculator data: ${slug}`);
  assert.ok(
    fs.existsSync(path.join(process.cwd(), 'app', slug, 'page.tsx')),
    `Missing route file: app/${slug}/page.tsx`
  );
}

for (const cat of CATEGORIES) {
  assert.ok(
    fs.existsSync(path.join(process.cwd(), 'app', cat.slug, 'page.tsx')),
    `Missing category route: app/${cat.slug}/page.tsx`
  );
}

const validPaths = new Set<string>([
  '/',
  '/blog/',
  '/about/',
  '/contact/',
  '/privacy-policy/',
  '/terms-and-conditions/',
  '/disclaimer/',
  '/editorial-policy/',
  ...CATEGORIES.map((c) => `/${c.slug}/`),
  ...ALL_CALCULATORS.map((c) => `/${c.slug}/`),
  ...BLOG_ARTICLES.map((a) => `/blog/${a.slug}/`),
]);

for (const link of [
  ...HEADER_NAV_LINKS,
  HEADER_PRIMARY_CTA,
  ...FOOTER_COLUMNS.flatMap((c) => c.links.map((l) => ({ label: l.label, href: l.href }))),
]) {
  assert.ok(validPaths.has(link.href), `Broken navigation link: ${link.href}`);
}

for (const calc of ALL_CALCULATORS) {
  for (const rel of calc.relatedCalculators) {
    assert.ok(validPaths.has(`/${rel}/`), `Broken related calculator link on ${calc.slug}: ${rel}`);
  }
  for (const guide of calc.relatedGuides) {
    assert.ok(validPaths.has(`/blog/${guide}/`), `Broken related guide on ${calc.slug}: ${guide}`);
  }
}

for (const article of BLOG_ARTICLES) {
  assert.ok(validPaths.has(`/${article.relatedCategory}/`), `Broken category on ${article.slug}`);
  for (const calc of article.relatedCalculators) {
    assert.ok(validPaths.has(`/${calc}/`), `Broken calculator link on ${article.slug}: ${calc}`);
  }
  for (const rel of article.relatedArticles) {
    assert.ok(validPaths.has(`/blog/${rel}/`), `Broken article link on ${article.slug}: ${rel}`);
  }
}

console.log(`SEO & Internal Link Integrity Passed: ${validPaths.size} canonical routes verified.`);
