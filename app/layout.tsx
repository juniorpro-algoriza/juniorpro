import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";
import { jetBrainsMono } from "./fonts";
import { twMerge } from "tailwind-merge";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang="en">
      <body className={bodyStyle}>{children}</body>
    </html>
  );
};

export default RootLayout;

const bodyStyle = twMerge("antialiased px-7", jetBrainsMono.variable);

export const metadata: Metadata = {
  title: "Junior Pro",
  description: "Junior Pro - Your Path to Junior Developer Success",
};
