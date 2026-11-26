import { CategoryHubTemplate } from '@/components/categories/CategoryHubTemplate';
import { createCategoryMetadata, requireCategory } from '@/lib/seo/pageHelpers';

export const metadata = createCategoryMetadata('nhs-shift-calculators');

export default function NhsShiftCalculatorsPage() {
  return <CategoryHubTemplate category={requireCategory('nhs-shift-calculators')} />;
}
