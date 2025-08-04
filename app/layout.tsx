import { ibmPlexSansArabic } from '@lib';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { twMerge } from 'tailwind-merge';
import './globals.css';

export const metadata: Metadata = {
  title: 'Junior Pro',
  description: 'Junior Pro - Your Path to Junior Developer Success',
};

const bodyStyle = twMerge('antialiased', ibmPlexSansArabic.className);

interface RootLayoutProps {
  children: ReactNode;
  modalSlot: ReactNode;
}

const RootLayout = async ({
  children,
  modalSlot,
}: Readonly<RootLayoutProps>) => {
  return (
    <html lang='en'>
      <body className={bodyStyle}>
        <Toaster richColors position='top-center' />
        <NextTopLoader />
        {modalSlot}
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
