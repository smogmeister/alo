import profile from "@/data/profile.json";
import { getCards } from "@/lib/cards";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site";

// Plain-text summary for AI assistants (llmstxt.org), built from the same data
// as the page so it never goes stale. Optional; Google Search ignores it.
export const dynamic = "force-static";

const PLATFORM_NAMES: Record<string, string> = {
  youtube: "YouTube",
  instagram: "Instagram",
  tiktok: "TikTok",
};

export function GET() {
  const products = getCards().filter((card) => card.links.usa);
  const lines = [
    `# ${siteTitle}`,
    "",
    `> ${siteDescription}`,
    "",
    `Website: ${siteUrl}`,
    "",
    "## Products",
    "",
    ...products.map((card) => `- [${card.title.trim()}](${card.links.usa})`),
    "",
    "As an Amazon Associate, Smog earns from qualifying purchases.",
    "",
    "## Profiles",
    "",
    ...profile.socialLinks.map(
      (link) => `- [${PLATFORM_NAMES[link.platform] ?? link.platform}](${link.url})`
    ),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
