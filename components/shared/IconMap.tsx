import {
  Baby,
  BadgePercent,
  Briefcase,
  Calculator,
  CalendarCheck,
  CalendarDays,
  CalendarRange,
  Car,
  Clock,
  FileSpreadsheet,
  GraduationCap,
  HeartPulse,
  Landmark,
  Layers,
  Moon,
  Percent,
  PieChart,
  PoundSterling,
  Receipt,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  SunMoon,
  Timer,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Baby,
  BadgePercent,
  Briefcase,
  Calculator,
  CalendarCheck,
  CalendarDays,
  CalendarRange,
  Car,
  Clock,
  FileSpreadsheet,
  GraduationCap,
  HeartPulse,
  Landmark,
  Layers,
  Moon,
  Percent,
  PieChart,
  PoundSterling,
  Receipt,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  SunMoon,
  Timer,
  TrendingUp,
  Users,
  Wallet,
};

export function DynamicIcon({
  name,
  className = 'w-5 h-5',
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICON_MAP[name] ?? Calculator;
  return <Icon className={className} aria-hidden="true" />;
}
