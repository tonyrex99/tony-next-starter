import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { AppProviders } from "@/providers";
import { siteConfig } from "@/config/site";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sourceSans.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased font-sans">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
