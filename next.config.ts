import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Only the hosts the site really uses, so nobody else can bill our optimizer.
    remotePatterns: [
      { protocol: "https", hostname: "m.media-amazon.com", pathname: "/images/**" },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/storage_images_public/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  devIndicators: false,

  trailingSlash: false,

  poweredByHeader: false,

  compress: true,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/favicon.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Browsers and crawlers request /favicon.ico by default; serve the PNG icon.
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/favicon-32.png" }];
  },

  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
