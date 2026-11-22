import {
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import type { SocialLink, SocialPlatform } from "@/types/profile";

const PLATFORMS: Record<SocialPlatform, { label: string; icon: IconDefinition }> = {
  youtube: { label: "YouTube", icon: faYoutube },
  instagram: { label: "Instagram", icon: faInstagram },
  tiktok: { label: "TikTok", icon: faTiktok },
};

/** Renders a FontAwesome icon definition as inline SVG (no runtime/CSS needed). */
function BrandIcon({ icon, className }: { icon: IconDefinition; className?: string }) {
  const [width, height, , , path] = icon.icon;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {(Array.isArray(path) ? path : [path]).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

export function SocialLinks({ links, name }: { links: SocialLink[]; name: string }) {
  if (links.length === 0) return null;

  return (
    <ul className="flex items-center justify-center gap-2.5" aria-label="Social media">
      {links.map(({ platform, url }) => {
        const meta = PLATFORMS[platform];
        if (!meta) return null;
        return (
          <li key={platform}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer me"
              itemProp="sameAs"
              aria-label={`${name} on ${meta.label}`}
              title={meta.label}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-card text-foreground ring-1 ring-border transition-all duration-200 hover:-translate-y-0.5 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <BrandIcon icon={meta.icon} className="h-[18px] w-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
