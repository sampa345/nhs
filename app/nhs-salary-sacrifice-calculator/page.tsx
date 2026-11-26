import { CalculatorPageTemplate } from '@/components/calculators/CalculatorPageTemplate';
import { createCalculatorMetadata, requireCalculator } from '@/lib/seo/pageHelpers';

export const metadata = createCalculatorMetadata('nhs-salary-sacrifice-calculator');

export default function Page() {
  return <CalculatorPageTemplate calc={requireCalculator('nhs-salary-sacrifice-calculator')} />;
}
