import { Mail } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SocialLinks } from "@/components/social-links";
import { Profile } from "@/types/profile";

interface ProfileHeaderProps {
  profile: Profile;
}

function getInitials(name: string) {
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
      className="flex flex-col items-center px-4 pt-8 pb-6 text-center md:pt-14 md:pb-10 animate-in fade-in slide-in-from-bottom-3 duration-700 fill-mode-both motion-reduce:animate-none"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="rounded-full bg-border p-[3px]">
        <Avatar className="h-24 w-24 border-4 border-background md:h-28 md:w-28">
          <AvatarImage
            src={profile.image}
            alt={`${profile.name} - Interior design creator and product reviewer`}
            className="object-cover"
            itemProp="image"
          />
          <AvatarFallback className="bg-secondary font-serif text-3xl">
            {getInitials(profile.name)}
          </AvatarFallback>
        </Avatar>
      </div>

      <h1
        className="mt-5 text-4xl leading-none tracking-tight md:text-5xl"
        itemProp="name"
      >
        {profile.name}
      </h1>

      <div className="mt-6 flex flex-col items-center gap-5">
        <SocialLinks links={profile.socialLinks} name={profile.name} />

        {profile.email && (
          <div className="flex flex-col items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            itemProp="email"
            aria-label={`Business inquiries: email ${profile.email}`}
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Business inquiries
          </a>
          <span className="select-all text-xs text-muted-foreground">
            {profile.email}
          </span>
          </div>
        )}
      </div>
    </div>
  );
}
