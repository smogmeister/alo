"use client";

import * as React from "react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Profile } from "@/types/profile";
import { Mail } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faInstagram,
  faTiktok,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { trackEvent } from "@/lib/analytics";
import { useRegionOptional } from "@/components/region-client-wrapper";

const SOCIAL_ICONS = {
  youtube: faYoutube,
  instagram: faInstagram,
  tiktok: faTiktok,
  pinterest: faPinterest,
} as const;

interface ProfileHeaderProps {
  profile: Profile;
  region?: string;
}

export function ProfileHeader({ profile, region }: ProfileHeaderProps) {
  const regionContext = useRegionOptional();
  const currentRegion = regionContext?.currentRegion ?? region;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex justify-center pb-4 md:pb-8 pt-2 px-4 content-center items-center">
      <div className="flex flex-col gap-6 w-full max-w-xl items-center">
        {/* Top row: image + name/description inline */}
        <div className="flex items-center gap-4 md:gap-6">
          <Avatar className="h-16 w-16 md:h-20 md:w-20 border border-3 border-border shadow-sm flex-shrink-0">
            <AvatarImage
              src={profile.image}
              alt={profile.name}
              className="object-cover"
            />
            <AvatarFallback className="text-2xl">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start text-left gap-1">
            <h1 className="text-xl md:text-2xl font-bold">{profile.name}</h1>
            <p className="text-muted-foreground text-xs md:text-sm max-w-[172px] md:max-w-[278px]">
              {profile.description}
            </p>
          </div>
        </div>

        {/* Bottom row: icons below the inline group */}
        <div className="flex gap-3 flex-wrap justify-center">
          {profile.socialLinks.map((link) => {
            const iconDef = SOCIAL_ICONS[link.platform];
            if (!iconDef) return null;

            return (
              <Button
                key={link.platform}
                variant="outline"
                size="icon"
                asChild
                className="h-10 w-10"
              >
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent({
                      action: "social_click",
                      category: "engagement",
                      label: link.platform,
                      platform: link.platform,
                      url: link.url,
                      region: currentRegion,
                    })
                  }
                >
                  <FontAwesomeIcon icon={iconDef} className="h-5 w-5 text-primary" />
                  <span className="sr-only">{link.platform}</span>
                </Link>
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="icon"
            asChild
            className="h-10 w-10"
          >
            <Link href="mailto:jan@cradon.com">
              <Mail className="h-5 w-5 text-primary" />
              <span className="sr-only">email</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

