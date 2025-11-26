import { inter } from "@lib";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { twMerge } from "tailwind-merge";
import "./globals.css";

export const metadata: Metadata = {
  title: "Junior Pro",
  description: "Junior Pro - Your Path to Junior Developer Success",
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
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
