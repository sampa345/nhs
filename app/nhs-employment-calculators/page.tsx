import { CategoryHubTemplate } from '@/components/categories/CategoryHubTemplate';
import { createCategoryMetadata, requireCategory } from '@/lib/seo/pageHelpers';

export const metadata = createCategoryMetadata('nhs-employment-calculators');

export default function NhsEmploymentCalculatorsPage() {
  return <CategoryHubTemplate category={requireCategory('nhs-employment-calculators')} />;
}
