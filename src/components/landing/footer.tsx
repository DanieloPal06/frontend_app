import { Icon, IconName } from "@/components/icons";
import Link from "next/link";

interface SocialLink {
  name: string;
  url: string;
  iconName: IconName;
  ariaLabel: string;
}
interface FooterProps {
  content: {
    copyright: string;
    message: string;
    socialLinks: SocialLink[];
  };
}

export default function Footer({ content }: FooterProps) {
  return (
    <footer className="py-8 border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          {content.socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.ariaLabel}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon name={social.iconName} className="h-6 w-6" />
            </Link>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{content.copyright}</p>
        <p className="mt-1 text-sm text-muted-foreground">{content.message}</p>
      </div>
    </footer>
  );
}
