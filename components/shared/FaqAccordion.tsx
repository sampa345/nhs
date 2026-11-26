'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/types/calculator';

export function FaqAccordion({
  faqs,
  heading = 'Frequently Asked Questions',
}: {
  faqs: FaqItem[];
  heading?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section aria-labelledby="faq-heading" className="space-y-4">
      <h2 id="faq-heading" className="font-display text-2xl font-bold tracking-tight text-[#2F3432]">
        {heading}
      </h2>
      <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={faq.question}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-[#2F3432] transition-colors hover:bg-slate-50 sm:text-base"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-150 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-sm leading-relaxed text-slate-600">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
