'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { ALL_CALCULATORS } from '@/data/calculators';
import { BLOG_ARTICLES } from '@/data/articles';
import { DynamicIcon } from './IconMap';

export function CalculatorSearch({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const matchedCalcs = ALL_CALCULATORS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q) ||
        c.slug.replace(/-/g, ' ').includes(q)
    ).map((c) => ({
      kind: 'Calculator' as const,
      title: c.shortTitle,
      description: c.shortDescription,
      href: `/${c.slug}/`,
      iconName: c.iconName,
    }));

    const matchedGuides = BLOG_ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q)
    ).map((a) => ({
      kind: 'Guide' as const,
      title: a.title,
      description: a.excerpt,
      href: `/blog/${a.slug}/`,
      iconName: 'FileSpreadsheet',
    }));

    return [...matchedCalcs, ...matchedGuides].slice(0, 8);
  }, [query]);

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <label htmlFor="nhs-calculator-search" className="sr-only">
        Search NHS calculators and guides
      </label>
      <div className="relative flex items-center rounded-full bg-white p-1.5 shadow-sm">
        <input
          id="nhs-calculator-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What NHS calculator are you looking for? (e.g. Band 5, pension, night shift)"
          className="h-11 w-full rounded-full bg-transparent pl-5 pr-14 text-sm text-[#2F3432] placeholder:text-slate-400 focus:outline-none sm:text-base"
        />
        <span
          aria-hidden="true"
          className="absolute right-1.5 flex h-11 w-11 items-center justify-center rounded-full bg-[#FFC800] text-[#2F3432]"
        >
          <Search className="h-5 w-5" />
        </span>
      </div>

      {query.trim().length > 0 && (
        <div
          role="region"
          aria-label="Search results"
          className="absolute left-0 right-0 z-30 mt-2 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white text-left shadow-xl"
        >
          {results.length === 0 ? (
            <div className="p-4 text-sm text-slate-600">
              No calculators matched &ldquo;{query}&rdquo;. Try searching &ldquo;pay&rdquo;, &ldquo;pension&rdquo;, &ldquo;overtime&rdquo;, &ldquo;leave&rdquo;, or &ldquo;tax&rdquo;.
            </div>
          ) : (
            results.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-slate-50"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#149777]/10 text-[#149777]">
                    <DynamicIcon name={item.iconName} className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold text-[#2F3432]">
                        {item.title}
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="shrink-0 text-xs text-slate-500">{item.kind}</span>
                    </div>
                    <p className="truncate text-xs text-slate-500">{item.description}</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
