import React from "react";
import { SocialIconsProps } from "@/types";
import { cn } from "@/utils/cn";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { siteConfig } from "@/constants/data";

export const SocialIcons: React.FC<SocialIconsProps> = ({
  links,
  className,
  iconClassName,
}) => {
  const activeLinks = links || siteConfig.socials;

  const renderIcon = (platform: string): React.ReactNode => {
    const size = 18;
    switch (platform) {
      case "facebook":
        return <Facebook size={size} />;
      case "twitter":
        return <Twitter size={size} />;
      case "instagram":
        return <Instagram size={size} />;
      case "linkedin":
        return <Linkedin size={size} />;
      case "youtube":
        return <Youtube size={size} />;
      default:
        return null;
    }
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {activeLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "p-2.5 rounded-full bg-forest/10 text-forest hover:bg-forest hover:text-cream transition-all duration-255 cursor-pointer",
            iconClassName
          )}
          aria-label={`Visit our ${link.platform} page`}
        >
          {renderIcon(link.platform)}
        </a>
      ))}
    </div>
  );
};
