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
   Languages
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
  | 'Languages';

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
  Languages
};

interface IconProps extends LucideProps {
  name: IconName;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const LucideIconComponent = iconMap[name];
  if (!LucideIconComponent) {
    // Fallback or error handling
    return null; 
  }
  return <LucideIconComponent {...props} />;
};
