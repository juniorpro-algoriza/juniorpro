import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { ibmPlexSansArabic } from './fonts';
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang='en'>
      <body className={bodyStyle}>{children}</body>
    </html>
  );
};

export default RootLayout;

const bodyStyle = twMerge('antialiased', ibmPlexSansArabic.className);

export const metadata: Metadata = {
  title: 'Junior Pro',
  description: 'Junior Pro - Your Path to Junior Developer Success',
};
