import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";
import { jetBrainsMono } from "./fonts";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;

export const metadata: Metadata = {
  title: "Junior Pro",
  description: "Junior Pro - Your Path to Junior Developer Success",
};
