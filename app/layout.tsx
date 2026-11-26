import type { Metadata } from 'next';
import { DM_Sans, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  buildJsonLdGraph,
  buildOrganizationNode,
  buildWebsiteNode,
  DEFAULT_OG_IMAGE,
  SITE_CONFIG,
} from '@/lib/seo/config';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: 'NHS Staff Calculator | Free UK NHS Pay, Pension & Tax Calculators',
    template: '%s | NHS Staff Calculator',
  },
  description:
    'Free UK NHS salary, take-home pay, pension, overtime, shift enhancement, leave, and tax calculators updated for the 2026/2027 tax year.',
  openGraph: {
    title: 'NHS Staff Calculator | Free UK NHS Pay, Pension & Tax Calculators',
    description:
      'Free UK NHS salary, take-home pay, pension, overtime, shift enhancement, leave, and tax calculators updated for the 2026/2027 tax year.',
    url: `${SITE_CONFIG.domain}/`,
    siteName: SITE_CONFIG.name,
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: `${SITE_CONFIG.domain}${DEFAULT_OG_IMAGE.url}`,
        alt: DEFAULT_OG_IMAGE.alt,
        width: DEFAULT_OG_IMAGE.width,
        height: DEFAULT_OG_IMAGE.height,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NHS Staff Calculator | Free UK NHS Pay, Pension & Tax Calculators',
    description:
      'Calculate your NHS take-home pay, pension contributions, overtime, shift payments, and employment entitlements for 2026/2027.',
    images: [`${SITE_CONFIG.domain}${DEFAULT_OG_IMAGE.url}`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${plusJakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[#2F3432]" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#FFC800] focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-[#2F3432] focus:shadow-lg"
        >
          Skip to main content
        </a>
        <JsonLd data={buildJsonLdGraph(buildOrganizationNode(), buildWebsiteNode())} />
        <SiteHeader />
        <main id="main-content" className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
