export type SocialPlatform = "youtube" | "instagram" | "tiktok";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface Profile {
  name: string;
  description: string;
  /** Business contact; rendered as a mailto button */
  email?: string;
  image: string;
  socialLinks: SocialLink[];
}














