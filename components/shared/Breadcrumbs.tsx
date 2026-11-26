import Link from 'next/link';
import type { BreadcrumbItem } from '@/types/seo';

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.href} className="inline-flex min-w-0 items-center gap-2">
            {index > 0 && <span aria-hidden="true" className="shrink-0">/</span>}
            {isLast ? (
              <span aria-current="page" className="font-medium text-[#2F3432]">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="inline-flex min-h-[32px] items-center transition-colors hover:text-[#149777] sm:min-h-0">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
