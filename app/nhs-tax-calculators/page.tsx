import { CategoryHubTemplate } from '@/components/categories/CategoryHubTemplate';
import { createCategoryMetadata, requireCategory } from '@/lib/seo/pageHelpers';

export const metadata = createCategoryMetadata('nhs-tax-calculators');

export default function NhsTaxCalculatorsPage() {
  return <CategoryHubTemplate category={requireCategory('nhs-tax-calculators')} />;
}
