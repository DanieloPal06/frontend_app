import {
  Target,
  BarChart3,
  Settings2,
  GraduationCap,
  Users,
  Building,
  Newspaper,
  Goal,
  Rocket,
  Gem,
  UserCheck,
  BookOpen,
  Icon as LucideIcon,
  Languages,
  Twitter, // Added for X
  Instagram, // Added for Instagram
  Music, // Added as a placeholder for TikTok
  Menu, // Added for mobile menu
  X // Added for close icon
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';

export type IconName =
  | 'Target'
  | 'BarChart3'
  | 'Settings2'
  | 'GraduationCap'
  | 'Users'
  | 'Building'
  | 'Newspaper'
  | 'Goal'
  | 'Rocket'
  | 'Gem'
  | 'UserCheck'
  | 'BookOpen'
  | 'Languages'
  | 'Twitter'
  | 'Instagram'
  | 'Music'
  | 'Menu'
  | 'X';

const iconMap: Record<IconName, LucideIcon> = {
  Target,
  BarChart3,
  Settings2,
  GraduationCap,
  Users,
  Building,
  Newspaper,
  Goal,
  Rocket,
  Gem,
  UserCheck,
  BookOpen,
  Languages,
  Twitter,
  Instagram,
  Music,
  Menu,
  X,
};

interface IconProps extends LucideProps {
  name: IconName;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const LucideIconComponent = iconMap[name];
  if (!LucideIconComponent) {
    // Fallback or error handling
    console.warn(`Icon "${name}" not found.`);
    return null;
  }
  return <LucideIconComponent {...props} />;
};
