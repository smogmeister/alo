import { MetadataRoute } from "next";
import { siteDescription, siteTitle } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteTitle,
    short_name: "Smog",
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf8",
    theme_color: "#fafaf8",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon.png", sizes: "256x256", type: "image/png" },
    ],
  };
}
