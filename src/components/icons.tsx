
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
  Twitter, 
  Instagram, 
  Music, 
  Menu, 
  X, 
  Heart,
  CalendarDays,
  Youtube
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
  | 'X'
  | 'Heart'
  | 'CalendarDays'
  | 'Youtube';

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
  Heart,
  CalendarDays,
  Youtube,
};

interface IconProps extends LucideProps {
  name: IconName;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const LucideIconComponent = iconMap[name];
  if (!LucideIconComponent) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }
  return <LucideIconComponent {...props} />;
};
