import { CategoryHubTemplate } from '@/components/categories/CategoryHubTemplate';
import { createCategoryMetadata, requireCategory } from '@/lib/seo/pageHelpers';

export const metadata = createCategoryMetadata('nhs-pension-calculators');

export default function NhsPensionCalculatorsPage() {
  return <CategoryHubTemplate category={requireCategory('nhs-pension-calculators')} />;
}
