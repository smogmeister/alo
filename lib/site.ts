// Single source for the site's public address. Vercel serves the site on
// www (the bare domain redirects there), so canonical, sitemap, robots and
// structured data must all use the www address.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.smogmeister.com"
).replace(/\/$/, "");

export const siteName = "Smog";
export const siteTitle = "Smog: Stuff I Actually Use";
export const siteDescription =
  "The products Smog actually uses, from cleaning gear and gadgets to PC parts, with direct Amazon links. Follow Smog on YouTube, Instagram and TikTok.";
