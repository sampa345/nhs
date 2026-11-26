import { CalculatorPageTemplate } from '@/components/calculators/CalculatorPageTemplate';
import { createCalculatorMetadata, requireCalculator } from '@/lib/seo/pageHelpers';

export const metadata = createCalculatorMetadata('nhs-unsocial-hours-calculator');

export default function Page() {
  return <CalculatorPageTemplate calc={requireCalculator('nhs-unsocial-hours-calculator')} />;
}
