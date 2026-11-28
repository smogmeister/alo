export type SocialPlatform = "youtube" | "instagram" | "tiktok";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface Profile {
  name: string;
  /** Optional one-line subtitle under the name */
  tagline?: string;
  /** Business contact; rendered as a mailto button */
  email?: string;
  image: string;
  socialLinks: SocialLink[];
}














