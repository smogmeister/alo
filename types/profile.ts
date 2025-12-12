export type SocialPlatform = "youtube" | "instagram" | "tiktok" | "pinterest";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface Profile {
  name: string;
  description: string;
  image: string;
  socialLinks: SocialLink[];
}












