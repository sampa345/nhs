import Link from 'next/link';
import { FOOTER_COLUMNS } from '@/data/navigation/links';
import { SITE_CONFIG } from '@/lib/seo/config';

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-[#F3F4F6] text-slate-600">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h2 className="text-sm font-bold text-[#2F3432]">{col.heading}</h2>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-[#149777]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-1">
            <h2 className="text-sm font-bold text-[#2F3432]">UK Payroll Dataset</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Configured for the {SITE_CONFIG.taxYearLabel} UK tax year across England, Wales, Scotland, and Northern Ireland.
            </p>
            <p className="mt-3 text-xs text-slate-500">
              All calculations run locally in your browser. No personal or payslip data is stored.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs leading-relaxed text-slate-600">
            {SITE_CONFIG.disclaimerText}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-slate-300 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} NHSStaffCalculator.co.uk. Independent UK payroll &amp; employment reference tool.
          </p>
          <Link
            href="/"
            className="font-display text-base font-bold tracking-tight text-[#2F3432]"
          >
            NHS Staff Calculator
          </Link>
        </div>
      </div>
    </footer>
  );
}
