import { Info } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/seo/config';

export function DisclaimerBanner({ compact = false }: { compact?: boolean }) {
  return (
    <div
      role="note"
      className={`flex items-start gap-3 rounded-xl border border-slate-200 bg-white ${
        compact ? 'p-3.5' : 'p-4 sm:p-5'
      }`}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#0074BA]" aria-hidden="true" />
      <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
        {SITE_CONFIG.disclaimerText} Always verify exact figures against your ESR/Trust payslip, NHSBSA pension statement, or HMRC tax code.
      </p>
    </div>
  );
}
