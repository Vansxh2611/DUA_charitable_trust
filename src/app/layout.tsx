import type { Metadata } from "next";
import { Playfair_Display, Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import MainLayout from "@/layouts/MainLayout";
import AppProviders from "@/components/providers/AppProviders";
import { siteName, siteTagline, siteDescription, siteUrl } from "@/constants/site";
import Script from "next/script";

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
  title: {
    default: `${siteName} - ${siteTagline}`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: `${siteName} - ${siteTagline}`,
    description: siteDescription,
    siteName: siteName,
  },
  twitter: {
    title: `${siteName} - ${siteTagline}`,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${playfair.variable} ${inter.variable} ${dmSerif.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-cream text-charcoal font-body antialiased selection:bg-forest selection:text-cream">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('dua-theme');
                  var theme = 'light';
                  if (stored === 'light' || stored === 'dark') {
                    theme = stored;
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    theme = 'dark';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.style.colorScheme = theme;
                } catch (e) {}
              })();
            `,
          }}
        />
        <AppProviders>
          <MainLayout>{children}</MainLayout>
        </AppProviders>
      </body>
    </html>
  );
}
