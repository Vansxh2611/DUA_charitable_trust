import type { Metadata } from "next";
import { Playfair_Display, Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import MainLayout from "@/layouts/MainLayout";
import AppProviders from "@/components/providers/AppProviders";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "CogniBloom Collective - Nurturing Joyful Wisdom",
  description: "An educational NGO dedicated to transforming community learning into an inspiring, inclusive, and deeply joyful adventure.",
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${dmSerif.variable} antialiased`}>
      <body className="bg-cream text-charcoal font-body antialiased selection:bg-forest selection:text-cream">
        <AppProviders>
          <MainLayout>{children}</MainLayout>
        </AppProviders>
      </body>
    </html>
  );
}
