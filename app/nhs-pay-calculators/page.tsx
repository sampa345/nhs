import { CategoryHubTemplate } from '@/components/categories/CategoryHubTemplate';
import { createCategoryMetadata, requireCategory } from '@/lib/seo/pageHelpers';

export const metadata = createCategoryMetadata('nhs-pay-calculators');

export default function NhsPayCalculatorsPage() {
  return <CategoryHubTemplate category={requireCategory('nhs-pay-calculators')} />;
}
