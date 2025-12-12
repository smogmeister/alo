"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface BannerProps {
  logo?: string;
  text?: string;
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
}

export function Banner({
  logo = "/beautified_logo.png",
  text = "Visualize your data beautifully.",
  buttonText = "Try for free",
  buttonHref = "https://beautified.app",
  onButtonClick,
}: BannerProps) {
  return (
    <div className="relative overflow-hidden rounded-lg md:rounded-xl py-2 px-4 mt-6 md:mt-8">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--gradientstart)] to-[var(--gradientend)] opacity-30 border border-[var(--border)]" />
      
      {/* Content */}
      <div className="relative flex items-center gap-4 md:gap-6 flex-wrap">
        {/* Logo */}
        <div className="flex-shrink-0">
            <Image
              src={logo}
              alt="Logo"
              width={48}
              height={48}
              className="object-contain p-2"
            />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm md:text-base font-medium text-foreground">
            {text}
          </p>
        </div>

        {/* Button */}
        <div className="flex-shrink-0">
          {buttonHref ? (
            <Button asChild variant="default" size="default" className="whitespace-nowrap">
              <a href={buttonHref}>{buttonText}</a>
            </Button>
          ) : (
            <Button onClick={onButtonClick} variant="default" size="default" className="whitespace-nowrap">
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

