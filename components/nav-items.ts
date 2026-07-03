import {
  LayoutDashboard,
  Search,
  FolderKanban,
  Clapperboard,
  Plane,
  ChefHat,
  Dumbbell,
  ShoppingBag,
  TrendingUp,
  Users,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/search", label: "AI Saved Search", icon: Search },
  { href: "/collections", label: "Smart Collections", icon: FolderKanban },
  { href: "/reels", label: "Reel Summarizer", icon: Clapperboard },
  { href: "/travel", label: "Travel Planner", icon: Plane },
  { href: "/recipes", label: "Recipe Extractor", icon: ChefHat },
  { href: "/workouts", label: "Workout Planner", icon: Dumbbell },
  { href: "/shopping", label: "Shopping Assistant", icon: ShoppingBag },
  { href: "/trends", label: "Trend Detector", icon: TrendingUp },
  { href: "/crm", label: "Creator CRM", icon: Users },
  { href: "/digest", label: "Weekly Digest", icon: Sparkles },
];
