import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <p className="font-mono text-sm font-bold text-[#149777]">404 · Page Not Found</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#2F3432] sm:text-4xl">
        We couldn&apos;t find that calculator or guide
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
        The page may have moved or the URL may be mistyped. Use the links below to jump back into our 2026/2027 NHS calculators.
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#FFC800] px-6 py-2.5 text-sm font-bold text-[#2F3432] hover:bg-[#f2be00]"
        >
          <span>Return Home</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link
          href="/nhs-pay-calculator/"
          className="inline-flex min-h-[44px] items-center rounded-full bg-[#0074BA] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#00619c]"
        >
          NHS Pay Calculator
        </Link>
      </div>
    </div>
  );
}
