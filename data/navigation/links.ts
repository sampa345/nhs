export interface NavItem {
  label: string;
  href: string;
}

export const HEADER_NAV_LINKS: NavItem[] = [
  { label: 'Pay', href: '/nhs-pay-calculators/' },
  { label: 'Pensions', href: '/nhs-pension-calculators/' },
  { label: 'Shifts', href: '/nhs-shift-calculators/' },
  { label: 'Employment', href: '/nhs-employment-calculators/' },
  { label: 'Tax', href: '/nhs-tax-calculators/' },
];

export const HEADER_PRIMARY_CTA: NavItem = {
  label: 'Blog',
  href: '/blog/',
};

export const FOOTER_COLUMNS = [
  {
    heading: 'NHS Pay & Tax',
    links: [
      { label: 'NHS Pay Calculator', href: '/nhs-pay-calculator/' },
      { label: 'NHS Band Calculator', href: '/nhs-band-calculator/' },
      { label: 'NHS Salary Calculator', href: '/nhs-salary-calculator/' },
      { label: 'NHS Tax Calculator', href: '/nhs-tax-calculator/' },
      { label: 'National Insurance', href: '/nhs-national-insurance-calculator/' },
      { label: 'Salary Sacrifice', href: '/nhs-salary-sacrifice-calculator/' },
    ],
  },
  {
    heading: 'Pensions & Shifts',
    links: [
      { label: 'NHS Pension Calculator', href: '/nhs-pension-calculator/' },
      { label: 'Pension Contributions', href: '/nhs-pension-contribution-calculator/' },
      { label: 'NHS Overtime Calculator', href: '/nhs-overtime-calculator/' },
      { label: 'Unsocial Hours Pay', href: '/nhs-unsocial-hours-calculator/' },
      { label: 'Bank Holiday Pay', href: '/nhs-bank-holiday-pay-calculator/' },
      { label: 'Student Loan Calculator', href: '/nhs-student-loan-calculator/' },
    ],
  },
  {
    heading: 'Leave & Guides',
    links: [
      { label: 'NHS Annual Leave', href: '/nhs-annual-leave-calculator/' },
      { label: 'NHS Sick Pay', href: '/nhs-sick-pay-calculator/' },
      { label: 'NHS Maternity Pay', href: '/nhs-maternity-pay-calculator/' },
      { label: 'NHS Redundancy Pay', href: '/nhs-redundancy-pay-calculator/' },
      { label: 'NHS Pay Bands Guide', href: '/blog/nhs-pay-bands-explained/' },
      { label: 'Blog', href: '/blog/' },
    ],
  },
  {
    heading: 'Trust & Governance',
    links: [
      { label: 'About Us', href: '/about/' },
      { label: 'Editorial Policy', href: '/editorial-policy/' },
      { label: 'Disclaimer', href: '/disclaimer/' },
      { label: 'Privacy Policy', href: '/privacy-policy/' },
      { label: 'Terms & Conditions', href: '/terms-and-conditions/' },
      { label: 'Contact Us', href: '/contact/' },
    ],
  },
] as const;
