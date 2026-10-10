import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Geist_Mono } from 'next/font/google';
import './globals.css';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://devfoundry.shop'),
  title: {
    default: 'Dev Foundry · AI engineering for funded startups',
    template: '%s · Dev Foundry',
  },
  description:
    'Agent harnesses, evaluation pipelines and cost-efficient inference for newly funded startups. Engineers from KPMG AI, HCLSoftware, Oracle and SLB.',
  openGraph: {
    title: 'Dev Foundry · AI engineering for funded startups',
    description:
      'Agent harnesses, evaluation pipelines and cost-efficient inference for newly funded startups.',
    url: 'https://devfoundry.shop',
    siteName: 'Dev Foundry',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#061410',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        {children}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
