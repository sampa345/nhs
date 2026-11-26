'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function ExpandableAboutSection({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section aria-labelledby="about-platform-heading" className="mt-10 border-t border-slate-100 pt-8">
      <h2 id="about-platform-heading" className="font-display text-lg font-bold text-[#2F3432]">
        About NHS Staff Calculator, UK Payroll &amp; Pension Reference Tools
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        NHS Staff Calculator is a free, independent online platform helping UK NHS employees estimate Agenda for Change salaries, take-home pay, pension contributions, shift enhancements, annual leave, and tax deductions for the 2026/2027 tax year across England, Wales, Scotland, and Northern Ireland.
      </p>

      <div id="about-platform-details" className={expanded ? 'mt-8 block space-y-8' : 'hidden'} aria-hidden={!expanded}>
        {children}
      </div>

      <button
        type="button"
        aria-expanded={expanded}
        aria-controls="about-platform-details"
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-2 inline-flex min-h-[44px] items-center gap-1.5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-[#149777]"
      >
        <span>{expanded ? 'Show less' : 'Show more'}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-150 ${expanded ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
    </section>
  );
}
