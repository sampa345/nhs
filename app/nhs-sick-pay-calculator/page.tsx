import { CalculatorPageTemplate } from '@/components/calculators/CalculatorPageTemplate';
import { createCalculatorMetadata, requireCalculator } from '@/lib/seo/pageHelpers';

export const metadata = createCalculatorMetadata('nhs-sick-pay-calculator');

export default function Page() {
  return <CalculatorPageTemplate calc={requireCalculator('nhs-sick-pay-calculator')} />;
}
