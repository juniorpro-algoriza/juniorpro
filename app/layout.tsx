import { inter, QueryProvider } from "@lib";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { twMerge } from "tailwind-merge";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sawiha",
  description: "Sawiha - Your Path to Junior Developer Success",
};

const bodyStyle = twMerge("antialiased", inter.className);

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = async ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang="en">
      <body className={bodyStyle}>
        <Toaster richColors position="top-center" />
        <NextTopLoader />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
