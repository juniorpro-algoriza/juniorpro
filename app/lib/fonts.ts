import { IBM_Plex_Sans_Arabic, JetBrains_Mono } from "next/font/google";

export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["latin"],
  display: "swap",
  weight: ["500"], // Add the required weight property
});
