'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { HEADER_NAV_LINKS, HEADER_PRIMARY_CTA } from '@/data/navigation/links';

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 bg-[#149777] text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:gap-5 sm:px-6 lg:gap-8">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 sm:text-xl"
          onClick={() => setMobileOpen(false)}
        >
          NHS Staff Calculator
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center md:gap-4 lg:gap-6 text-sm font-medium text-white/95"
        >
          {HEADER_NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex min-h-[44px] items-center whitespace-nowrap shrink-0 transition-colors hover:text-[#FFC800] ${
                  isActive ? 'text-[#FFC800] font-semibold underline underline-offset-8 decoration-2' : ''
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href={HEADER_PRIMARY_CTA.href}
            className="hidden md:inline-flex min-h-[40px] items-center justify-center rounded bg-[#FFC800] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#2F3432] transition-colors hover:bg-[#f2be00] whitespace-nowrap shrink-0"
          >
            {HEADER_PRIMARY_CTA.label}
          </Link>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-panel"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/25 text-white hover:bg-white/10 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation-panel"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/15 bg-[#108266] px-4 py-4 md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {HEADER_NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium transition-colors hover:bg-white/10 ${
                    isActive ? 'bg-white/10 text-[#FFC800] font-semibold' : 'text-white'
                  }`}
                >
                  {item.label} Calculators
                </Link>
              );
            })}
            <Link
              href={HEADER_PRIMARY_CTA.href}
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded bg-[#FFC800] px-4 text-sm font-bold text-[#2F3432]"
            >
              {HEADER_PRIMARY_CTA.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
