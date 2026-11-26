import Link from 'next/link';
import type { BreadcrumbItem } from '@/types/seo';

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.href} className="inline-flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {isLast ? (
              <span aria-current="page" className="font-medium text-[#2F3432]">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="transition-colors hover:text-[#149777]">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
