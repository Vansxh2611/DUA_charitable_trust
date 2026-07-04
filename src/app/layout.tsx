import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/layouts/MainLayout";
import AppProviders from "@/components/providers/AppProviders";
import { siteName, siteTagline, siteDescription, siteUrl } from "@/constants/site";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: `${siteName} - ${siteTagline}`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/web-app-manifest-192x192.png",
    apple: "/web-app-manifest-192x192.png",
  },
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
      className="antialiased"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Albert+Sans:ital,wght@0,100..900;1,100..900&display=swap" 
          rel="stylesheet" 
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              "name": "Dua Charitable Trust",
              "url": "https://duacharitabletrust.org",
              "logo": "https://duacharitabletrust.org/Dua Charitable Trust_LOGO_2026.jpg (3).jpeg",
              "description": "Dua Charitable Trust is a multi-domain NGO dedicated to sustainable community development through interactive STEM education, sustainable agricultural farming, creative art therapy, and holistic well-being mentorship.",
              "sameAs": [
                "https://facebook.com/duatrust",
                "https://twitter.com/duatrust",
                "https://instagram.com/duatrust",
                "https://linkedin.com/company/duatrust"
              ]
            })
          }}
        />
      </head>
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
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.style.colorScheme = theme;
                } catch (e) {}

                // Suppress Next.js 16 internal OuterLayoutRouter BF-cache key warning.
                // OuterLayoutRouter returns an unkeyed array for back/forward cache support.
                // This is a framework bug, not application code. Remove when Next.js fixes it.
                var origErr = console.error;
                console.error = function() {
                  if (
                    typeof arguments[0] === 'string' &&
                    arguments[0].indexOf('unique') !== -1 &&
                    arguments[0].indexOf('key') !== -1
                  ) {
                    for (var i = 0; i < arguments.length; i++) {
                      if (typeof arguments[i] === 'string' && arguments[i].indexOf('OuterLayoutRouter') !== -1) {
                        return;
                      }
                    }
                  }
                  return origErr.apply(console, arguments);
                };
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
