'use client';

import type { CalculatorSlug, CategorySlug } from '@/types/calculator';
import { PayCalculatorsWidget } from './widgets/PayCalculatorsWidget';
import { PensionCalculatorsWidget } from './widgets/PensionCalculatorsWidget';
import { ShiftCalculatorsWidget } from './widgets/ShiftCalculatorsWidget';
import { EmploymentCalculatorsWidget } from './widgets/EmploymentCalculatorsWidget';
import { TaxCalculatorsWidget } from './widgets/TaxCalculatorsWidget';

export function CalculatorWidgetDispatcher({
  slug,
  category,
}: {
  slug: CalculatorSlug;
  category: CategorySlug;
}) {
  switch (category) {
    case 'nhs-pay-calculators':
      return <PayCalculatorsWidget slug={slug} />;
    case 'nhs-pension-calculators':
      return <PensionCalculatorsWidget slug={slug} />;
    case 'nhs-shift-calculators':
      return <ShiftCalculatorsWidget slug={slug} />;
    case 'nhs-employment-calculators':
      return <EmploymentCalculatorsWidget slug={slug} />;
    case 'nhs-tax-calculators':
      return <TaxCalculatorsWidget slug={slug} />;
  }
}
