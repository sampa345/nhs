export type CategorySlug =
  | 'nhs-pay-calculators'
  | 'nhs-pension-calculators'
  | 'nhs-shift-calculators'
  | 'nhs-employment-calculators'
  | 'nhs-tax-calculators';

export type CalculatorSlug =
  | 'nhs-pay-calculator'
  | 'nhs-salary-calculator'
  | 'nhs-band-calculator'
  | 'nhs-pension-calculator'
  | 'nhs-pension-contribution-calculator'
  | 'nhs-overtime-calculator'
  | 'nhs-unsocial-hours-calculator'
  | 'nhs-bank-holiday-pay-calculator'
  | 'nhs-annual-leave-calculator'
  | 'nhs-sick-pay-calculator'
  | 'nhs-maternity-pay-calculator'
  | 'nhs-paternity-pay-calculator'
  | 'nhs-redundancy-pay-calculator'
  | 'nhs-tax-calculator'
  | 'nhs-national-insurance-calculator'
  | 'nhs-salary-sacrifice-calculator'
  | 'nhs-student-loan-calculator';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SourceReference {
  title: string;
  publisher: string;
  url: string;
  description: string;
}

export interface ExampleCalculation {
  scenarioTitle: string;
  inputsSummary: string[];
  outputsSummary: { label: string; value: string }[];
  explanation: string;
}

export interface CalculatorDefinition {
  slug: CalculatorSlug;
  title: string;
  shortTitle: string;
  category: CategorySlug;
  iconName: string;
  metaTitle: string;
  metaDescription: string;
  shortDescription: string;
  intro: string;
  isPopular?: boolean;
  isFeatured?: boolean;
  calculatorSectionHeading?: string;
  calculatorSectionDescription?: string;
  howToUseHeading?: string;
  howToUse: string[];
  howItWorksHeading?: string;
  howItWorks: string[];
  payrollContext: string;
  referenceTableHeading?: string;
  referenceTableIntro?: string[];
  referenceTableLink?: { label: string; href: string };
  referenceTable?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
  takeHomeSectionHeading?: string;
  takeHomeParagraphs?: string[];
  payRiseSection?: {
    heading: string;
    paragraphs: string[];
  };
  example: ExampleCalculation;
  assumptions: string[];
  limitations: string[];
  faqHeading?: string;
  faqs: FaqItem[];
  relatedCalculators: CalculatorSlug[];
  relatedGuides: string[];
  officialSources: SourceReference[];
  lastUpdated: string;
}

export interface CategoryDefinition {
  slug: CategorySlug;
  title: string;
  metaTitle: string;
  metaDescription: string;
  shortDescription: string;
  intro: string;
  explanationTitle: string;
  explanationParagraphs: string[];
  keyHighlights: { label: string; detail: string }[];
  faqs: FaqItem[];
  relatedCategories: CategorySlug[];
  relatedGuides: string[];
  iconName: string;
}
