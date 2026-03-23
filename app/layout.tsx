import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://smogmeister.com";
const siteName = "Smog";
const siteDescription =
  "Discover Smog's favorite cleaning products, Amazon recommendations, and exclusive deals. Follow Smog on YouTube, Instagram, TikTok, and Pinterest for cleaning tips and home organization hacks.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Smog: Interior Design and Cleaning Recommendations",
    template: "%s | Smog",
  },
  description: siteDescription,
  keywords: [
    "Smog",
    "smogmeister",
    "cleaning tips",
    "cleaning products",
    "Amazon recommendations",
    "home cleaning",
    "cleaning hacks",
    "link in bio",
    "cleaning influencer",
    "home organization",
    "cleaning supplies",
    "Pink Stuff",
    "vacuum cleaner",
    "steam cleaner",
    "interior design",
    "interior design tips",
    "home decor",
    "home decor ideas",
    "home styling",
    "home aesthetic",
    "home inspiration",
    "house cleaning",
    "deep cleaning",
    "cleaning routine",
    "cleaning motivation",
    "tidy home",
    "organized home",
    "home makeover",
    "room decor",
    "living room decor",
    "bedroom decor",
    "bathroom cleaning",
    "kitchen cleaning",
    "home essentials",
    "home must haves",
    "cozy home",
    "minimalist home",
    "modern home",
    "home improvement",
    "declutter",
    "decluttering tips",
  ],
  authors: [{ name: "Smog", url: siteUrl }],
  creator: "Smog",
  publisher: "Smog",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: "Smog: Interior Design and Cleaning Recommendations",
    description: siteDescription,
    images: [
      {
        url: "https://storage.googleapis.com/storage_images_public/smog_profile.JPG",
        width: 400,
        height: 400,
        alt: "Smog: Interior Design and Cleaning Recommendations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smog: Interior Design and Cleaning Recommendations",
    description: siteDescription,
    images: ["https://storage.googleapis.com/storage_images_public/smog_profile.JPG"],
    creator: "@smogmeister",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "lifestyle",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Smog",
      alternateName: "smogmeister",
      description: "Smog: Interior Design and Cleaning Recommendations",
      url: siteUrl,
      image: "https://storage.googleapis.com/storage_images_public/smog_profile.JPG",
      sameAs: [
        "https://www.youtube.com/@smogmeister1",
        "https://www.instagram.com/smogmeister1",
        "https://www.tiktok.com/@smogmeister",
        "https://pinterest.com/smogmeister/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Smog: Interior Design and Cleaning Recommendations",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#person`,
      },
      description: siteDescription,
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: "Smog's Link in Bio",
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RY7BWXYRMZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RY7BWXYRMZ');
          `}
        </Script>
        <link
          href="https://api.fontshare.com/v2/css?f[]=plus-jakarta-sans@400&f[]=zodiak@700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
