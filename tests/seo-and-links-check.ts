import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { ALL_CALCULATORS } from '../data/calculators';
import { CATEGORIES } from '../data/categories';
import { BLOG_ARTICLES } from '../data/articles';
import { HEADER_NAV_LINKS, HEADER_PRIMARY_CTA, FOOTER_COLUMNS } from '../data/navigation/links';
import sitemap from '../app/sitemap';
import { CANONICAL_ROUTE_PATHS, getSitemapRouteEntries, isValidW3cDate } from '../lib/seo/routes';

const EXPECTED_CALCULATOR_SLUGS = [
  'nhs-pay-calculator',
  'nhs-salary-calculator',
  'nhs-band-calculator',
  'nhs-pension-calculator',
  'nhs-pension-contribution-calculator',
  'nhs-overtime-calculator',
  'nhs-unsocial-hours-calculator',
  'nhs-bank-holiday-pay-calculator',
  'nhs-annual-leave-calculator',
  'nhs-sick-pay-calculator',
  'nhs-maternity-pay-calculator',
  'nhs-paternity-pay-calculator',
  'nhs-redundancy-pay-calculator',
  'nhs-tax-calculator',
  'nhs-national-insurance-calculator',
  'nhs-salary-sacrifice-calculator',
  'nhs-student-loan-calculator',
];

assert.equal(ALL_CALCULATORS.length, 17, 'Expected 17 calculators');
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

const validPaths = CANONICAL_ROUTE_PATHS;

for (const link of [
  ...HEADER_NAV_LINKS,
  HEADER_PRIMARY_CTA,
  ...FOOTER_COLUMNS.flatMap((c) => c.links.map((l) => ({ label: l.label, href: l.href }))),
]) {
  assert.ok(validPaths.has(link.href), `Broken navigation link: ${link.href}`);
}

for (const calc of ALL_CALCULATORS) {
  assert.ok(
    calc.metaTitle.length >= 30 && calc.metaTitle.length <= 60,
    `Calculator ${calc.slug} metaTitle length must be 30–60 chars (got ${calc.metaTitle.length}: "${calc.metaTitle}")`
  );
  assert.ok(
    calc.metaDescription.length >= 120 && calc.metaDescription.length <= 160,
    `Calculator ${calc.slug} metaDescription length must be 120–160 chars (got ${calc.metaDescription.length})`
  );
  assert.ok(
    calc.faqs.length >= 3,
    `Calculator ${calc.slug} must have at least 3 FAQs (got ${calc.faqs.length})`
  );
  assert.ok(
    calc.howItWorks.length >= 2,
    `Calculator ${calc.slug} must have at least 2 howItWorks paragraphs (got ${calc.howItWorks.length})`
  );
  assert.ok(
    calc.referenceTable && calc.referenceTable.rows.length >= 2,
    `Calculator ${calc.slug} must include a 2026/27 referenceTable`
  );
  for (const rel of calc.relatedCalculators) {
    assert.ok(validPaths.has(`/${rel}/`), `Broken related calculator link on ${calc.slug}: ${rel}`);
  }
  for (const guide of calc.relatedGuides) {
    assert.ok(validPaths.has(`/blog/${guide}/`), `Broken related guide on ${calc.slug}: ${guide}`);
  }
}

import {
  buildBlogNode,
  buildBlogPostingNode,
  buildBreadcrumbNode,
  buildFaqNode,
  buildItemListNode,
  buildJsonLdGraph,
  buildOrganizationNode,
  buildWebApplicationNode,
  buildWebPageNode,
  buildWebsiteNode,
  canonicalUrl,
  SCHEMA_IDS,
  SITE_CONFIG,
} from '../lib/seo/config';
import type { SchemaNode } from '../lib/seo/schema';

for (const article of BLOG_ARTICLES) {
  assert.ok(validPaths.has(`/${article.relatedCategory}/`), `Broken category on ${article.slug}`);
  for (const calc of article.relatedCalculators) {
    assert.ok(validPaths.has(`/${calc}/`), `Broken calculator link on ${article.slug}: ${calc}`);
  }
  for (const rel of article.relatedArticles) {
    assert.ok(validPaths.has(`/blog/${rel}/`), `Broken article link on ${article.slug}: ${rel}`);
  }
}

function assertValidGraph(label: string, graph: { '@context': string; '@graph': SchemaNode[] }, expectedTypes: string[]) {
  assert.equal(graph['@context'], 'https://schema.org', `${label}: invalid @context`);
  const ids = new Set<string>();
  const types = new Set<string>();
  const serialized = JSON.stringify(graph);

  assert.ok(!serialized.includes('SearchAction'), `${label}: unexpected deprecated SearchAction`);
  assert.ok(!serialized.includes('AggregateRating'), `${label}: unexpected AggregateRating`);
  assert.ok(!serialized.includes('"Review"'), `${label}: unexpected fake Review`);

  for (const node of graph['@graph']) {
    const id = node['@id'];
    const type = node['@type'];
    assert.equal(typeof id, 'string', `${label}: node missing string @id`);
    assert.ok((id as string).startsWith(SITE_CONFIG.domain), `${label}: @id must use canonical domain: ${id}`);
    assert.ok(!ids.has(id as string), `${label}: duplicate @id detected: ${id}`);
    ids.add(id as string);
    if (typeof type === 'string') types.add(type);
  }

  for (const t of expectedTypes) {
    assert.ok(types.has(t), `${label}: missing expected @type "${t}"`);
  }
}

// 1. Root Organization + WebSite
const rootGraph = buildJsonLdGraph(buildOrganizationNode(), buildWebsiteNode());
assertValidGraph('RootLayout', rootGraph, ['Organization', 'WebSite']);
assert.equal(rootGraph['@graph'][0]['@id'], SCHEMA_IDS.organization);
assert.equal(rootGraph['@graph'][1]['@id'], SCHEMA_IDS.website);

// 2. Category Hubs
for (const cat of CATEGORIES) {
  const catCalcs = ALL_CALCULATORS.filter((c) => c.category === cat.slug);
  const p = `/${cat.slug}/`;
  const url = canonicalUrl(p);
  const catGraph = buildJsonLdGraph(
    buildWebPageNode({
      path: p,
      title: cat.metaTitle,
      description: cat.metaDescription,
      pageType: 'CollectionPage',
      breadcrumbId: `${url}#breadcrumb`,
      mainEntityId: `${url}#itemlist`,
      aboutId: SCHEMA_IDS.organization,
    }),
    buildBreadcrumbNode(
      [
        { label: 'Home', href: '/' },
        { label: cat.title, href: p },
      ],
      p
    ),
    buildItemListNode({
      path: p,
      name: cat.title,
      items: catCalcs.map((c) => ({ name: c.shortTitle, path: `/${c.slug}/`, description: c.shortDescription })),
    }),
    buildFaqNode(cat.faqs, p)
  );
  assertValidGraph(`Category:${cat.slug}`, catGraph, ['CollectionPage', 'BreadcrumbList', 'ItemList', 'FAQPage']);
}

// 3. Individual Calculators
for (const calc of ALL_CALCULATORS) {
  const p = `/${calc.slug}/`;
  const url = canonicalUrl(p);
  const calcGraph = buildJsonLdGraph(
    buildWebPageNode({
      path: p,
      title: calc.metaTitle,
      description: calc.metaDescription,
      pageType: 'WebPage',
      dateModified: calc.lastUpdated,
      breadcrumbId: `${url}#breadcrumb`,
      mainEntityId: `${url}#webapp`,
    }),
    buildBreadcrumbNode(
      [
        { label: 'Home', href: '/' },
        { label: calc.category, href: `/${calc.category}/` },
        { label: calc.shortTitle, href: p },
      ],
      p
    ),
    buildWebApplicationNode({
      path: p,
      name: calc.title,
      description: calc.metaDescription,
      dateModified: calc.lastUpdated,
    }),
    buildFaqNode(calc.faqs, p)
  );
  assertValidGraph(`Calculator:${calc.slug}`, calcGraph, ['WebPage', 'BreadcrumbList', 'WebApplication', 'FAQPage']);
}

// 4. Blog Index + Blog Articles
const blogGraph = buildJsonLdGraph(
  buildWebPageNode({
    path: '/blog/',
    title: 'NHS Pay, Pension & Shift Guides (2026/2027) | NHS Staff Calculator',
    description: 'Guides',
    pageType: 'CollectionPage',
    breadcrumbId: `${canonicalUrl('/blog/')}#breadcrumb`,
    mainEntityId: `${canonicalUrl('/blog/')}#blog`,
  }),
  buildBlogNode({
    path: '/blog/',
    name: 'NHS Staff Calculator Blog',
    description: 'Guides',
    posts: BLOG_ARTICLES.map((a) => ({
      title: a.title,
      path: `/blog/${a.slug}/`,
      publishedDate: a.publishedDate,
      lastUpdated: a.lastUpdated,
      image: { url: a.featuredImage.src, width: a.featuredImage.width, height: a.featuredImage.height },
    })),
  }),
  buildBreadcrumbNode(
    [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog/' },
    ],
    '/blog/'
  )
);
assertValidGraph('BlogIndex', blogGraph, ['CollectionPage', 'Blog', 'BreadcrumbList']);

for (const article of BLOG_ARTICLES) {
  const p = `/blog/${article.slug}/`;
  const url = canonicalUrl(p);
  const postGraph = buildJsonLdGraph(
    buildWebPageNode({
      path: p,
      title: article.metaTitle,
      description: article.metaDescription,
      pageType: 'WebPage',
      dateModified: article.lastUpdated,
      breadcrumbId: `${url}#breadcrumb`,
      mainEntityId: `${url}#blogposting`,
    }),
    buildBlogPostingNode({
      path: p,
      title: article.title,
      description: article.metaDescription,
      publishedDate: article.publishedDate,
      lastUpdated: article.lastUpdated,
      categoryLabel: article.categoryLabel,
      image: {
        url: article.featuredImage.src,
        width: article.featuredImage.width,
        height: article.featuredImage.height,
        caption: article.featuredImage.caption,
      },
    }),
    buildBreadcrumbNode(
      [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog/' },
        { label: article.title, href: p },
      ],
      p
    )
  );
  assertValidGraph(`BlogPost:${article.slug}`, postGraph, ['WebPage', 'BlogPosting', 'BreadcrumbList']);
}

// 5. Important Governance Pages
for (const page of [
  { path: '/about/', type: 'AboutPage' as const },
  { path: '/contact/', type: 'ContactPage' as const },
  { path: '/privacy-policy/', type: 'WebPage' as const },
  { path: '/terms-and-conditions/', type: 'WebPage' as const },
  { path: '/disclaimer/', type: 'WebPage' as const },
  { path: '/editorial-policy/', type: 'WebPage' as const },
]) {
  const graph = buildJsonLdGraph(
    buildWebPageNode({
      path: page.path,
      title: page.path,
      description: 'Governance page',
      pageType: page.type,
      breadcrumbId: `${canonicalUrl(page.path)}#breadcrumb`,
    }),
    buildBreadcrumbNode(
      [
        { label: 'Home', href: '/' },
        { label: page.path, href: page.path },
      ],
      page.path
    )
  );
  assertValidGraph(`Governance:${page.path}`, graph, [page.type, 'BreadcrumbList']);
}

// 6. Centralized Route Registry & XML Sitemap Validation
assert.equal(SITE_CONFIG.domain, 'https://nhsstaffcalculator.co.uk', 'SITE_CONFIG.domain must be lowercase');
const routeEntries = getSitemapRouteEntries();
const sitemapEntries = sitemap();

assert.equal(routeEntries.length, 34, `Expected 34 canonical routes, got ${routeEntries.length}`);
assert.equal(sitemapEntries.length, 34, `Expected 34 sitemap URLs, got ${sitemapEntries.length}`);

const seenUrls = new Set<string>();
for (const entry of sitemapEntries) {
  assert.ok(!seenUrls.has(entry.url), `Duplicate sitemap URL: ${entry.url}`);
  seenUrls.add(entry.url);

  const parsed = new URL(entry.url);
  assert.equal(parsed.protocol, 'https:', `Sitemap URL must use HTTPS: ${entry.url}`);
  assert.equal(parsed.hostname, 'nhsstaffcalculator.co.uk', `Sitemap URL must use lowercase domain: ${entry.url}`);
  assert.ok(parsed.pathname.endsWith('/'), `Sitemap URL must preserve trailing slash: ${entry.url}`);
  assert.ok(validPaths.has(parsed.pathname), `Sitemap URL path missing from centralized registry: ${parsed.pathname}`);

  if (!parsed.pathname.startsWith('/blog/') || parsed.pathname === '/blog/') {
    const pageFile =
      parsed.pathname === '/'
        ? path.join(process.cwd(), 'app', 'page.tsx')
        : path.join(process.cwd(), 'app', parsed.pathname.replace(/^\/|\/$/g, ''), 'page.tsx');
    assert.ok(fs.existsSync(pageFile), `Missing App Router page file for sitemap route: ${pageFile}`);
  } else {
    const slug = parsed.pathname.replace(/^\/blog\/|\/$/g, '');
    assert.ok(BLOG_ARTICLES.some((a) => a.slug === slug), `Missing blog article data for sitemap route: ${slug}`);
  }

  if (entry.lastModified !== undefined) {
    const lastModStr =
      entry.lastModified instanceof Date ? entry.lastModified.toISOString() : String(entry.lastModified);
    assert.ok(isValidW3cDate(lastModStr), `Invalid W3C lastModified date on ${entry.url}: ${lastModStr}`);
  }

  assert.ok(
    ['daily', 'weekly', 'monthly', 'yearly'].includes(String(entry.changeFrequency)),
    `Unexpected changeFrequency on ${entry.url}: ${entry.changeFrequency}`
  );
  assert.ok(
    typeof entry.priority === 'number' && entry.priority >= 0 && entry.priority <= 1,
    `Invalid priority on ${entry.url}: ${entry.priority}`
  );
}

assert.ok(!seenUrls.has(`${SITE_CONFIG.domain}/not-found/`), 'Error page must not be included in sitemap');
for (const removedSlug of [
  'nhs-salary-after-tax-calculator',
  'nhs-hourly-pay-calculator',
  'nhs-take-home-pay-calculator',
  'nhs-part-time-pay-calculator',
  'nhs-pension-tax-relief-calculator',
  'nhs-pension-take-home-pay-calculator',
  'nhs-night-shift-pay-calculator',
  'nhs-weekend-pay-calculator',
  'nhs-holiday-entitlement-calculator',
]) {
  assert.ok(
    !seenUrls.has(`${SITE_CONFIG.domain}/${removedSlug}/`),
    `Removed calculator must not be included in sitemap: ${removedSlug}`
  );
}

console.log(
  `SEO, Internal Link, Sitemap & JSON-LD Schema Integrity Passed: ${validPaths.size} canonical routes verified.`
);
