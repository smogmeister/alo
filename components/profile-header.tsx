import { Mail } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SocialLinks } from "@/components/social-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { Profile } from "@/types/profile";

interface ProfileHeaderProps {
  profile: Profile;
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div
      id="profile"
      className="flex flex-col items-center pt-16 pb-8 text-center md:pt-24 md:pb-12"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Hairline ring with a background-colored mat, like a mounted print */}
      <div className="rounded-full ring-1 ring-border ring-offset-2 ring-offset-background">
        <Avatar className="h-[88px] w-[88px]">
          <AvatarImage
            src={profile.image}
            alt={`${profile.name} - Interior design creator and product reviewer`}
            className="object-cover"
            itemProp="image"
          />
          <AvatarFallback className="text-2xl font-medium text-muted-foreground">
            {getInitials(profile.name)}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Toggle sits beside the name without pulling it off-center */}
      <div className="relative mt-6">
        <h1
          className="text-[32px] font-medium leading-none tracking-[-0.01em]"
          itemProp="name"
        >
          {profile.name}
        </h1>
        <ThemeToggle className="absolute top-1/2 left-full ml-1 -translate-y-1/2" />
      </div>

      {profile.tagline && (
        <p
          className="mt-3 text-[15px] text-balance text-muted-foreground"
          itemProp="description"
        >
          {profile.tagline}
        </p>
      )}

      <div className="mt-5 flex items-center gap-3">
        <SocialLinks links={profile.socialLinks} name={profile.name} />

        {profile.email && (
          <>
            <span className="h-4 w-px bg-border" aria-hidden="true" />
            <a
              href={`mailto:${profile.email}`}
              itemProp="email"
              title={profile.email}
              aria-label={`Business inquiries: email ${profile.email}`}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-sm px-1 text-sm text-muted-foreground transition-colors duration-150 ease-quiet hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <Mail className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
              Business inquiries
            </a>
          </>
        )}
      </div>
    </div>
  );
}
