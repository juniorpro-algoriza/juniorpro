import {
  BookOpen,
  Flame,
  Swords,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { StaticImageData } from "next/image";
import NoBadgesImage from "@public/images/achievements/No_badges_earned_yet.png";
import type {
  BadgeAchievement,
  BadgeStatusFilter,
  BadgeType,
  MilestoneTab,
  RecentAchievement,
} from "./achievementTypes";

export const COMPLETED_STATUS = 3;
export const IN_PROGRESS_STATUS = 2;

export const badgeTabs: { id?: BadgeType; label: string; countKey?: string }[] =
  [
    { id: undefined, label: "All", countKey: "totalBadges" },
    { id: 1, label: "Learning Paths", countKey: "learningPathBadges" },
    { id: 2, label: "Challenges", countKey: "collaborationsBadges" },
    { id: 3, label: "Collaboration", countKey: "challengeBadges" },
    { id: 4, label: "Streaks", countKey: "streakBadges" },
  ];

export const badgeMeta: Record<
  number,
  {
    label: string;
    icon: LucideIcon;
    tone: string;
    bg: string;
    unit: string;
  }
> = {
  1: {
    label: "Path Explorer",
    icon: BookOpen,
    tone: "text-emerald-600",
    bg: "bg-emerald-50",
    unit: "learning paths",
  },
  2: {
    label: "Challenge Ace",
    icon: Swords,
    tone: "text-rose-600",
    bg: "bg-rose-50",
    unit: "challenges",
  },
  3: {
    label: "Team Builder",
    icon: Users,
    tone: "text-indigo-600",
    bg: "bg-indigo-50",
    unit: "collaborations",
  },
  4: {
    label: "Streak Keeper",
    icon: Flame,
    tone: "text-amber-600",
    bg: "bg-amber-50",
    unit: "days",
  },
  5: {
    label: "Achievement",
    icon: Trophy,
    tone: "text-violet-600",
    bg: "bg-violet-light",
    unit: "goals",
  },
};

export const milestoneTabs: {
  id: MilestoneTab;
  label: string;
  icon: typeof BookOpen;
}[] = [
  { id: "learning", label: "Learning Paths", icon: BookOpen },
  { id: "collaboration", label: "Collaboration", icon: Users },
  { id: "challenge", label: "Challenges", icon: Swords },
];

export const getImageSrc = (
  src?: string | null,
  fallback?: StaticImageData
) => {
  if (src) return src;
  return fallback ?? NoBadgesImage;
};

export const formatDate = (date?: string | null) => {
  if (!date) return "";

  const d = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);

  const formattedTime = d.toLocaleTimeString("en", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${formattedDate} - ${formattedTime}`;
};

export const getProgress = (value?: number | null, total?: number | null) => {
  if (!total) return 0;
  return Math.min(100, Math.max(0, Math.round(((value ?? 0) / total) * 100)));
};

export const getBadgeTitle = (
  achievement: BadgeAchievement | RecentAchievement
) => {
  if ("titleEn" in achievement && achievement.titleEn)
    return achievement.titleEn;

  const meta = badgeMeta[achievement.type ?? 5];
  return meta?.label ?? "Achievement";
};

export const getBadgeDescription = (badge: BadgeAchievement) => {
  const type = badge.type ?? 1;
  const total = badge.totalCount ?? 3;
  if (type === 1) {
    return `Completed ${total} learning path${total > 1 ? "s" : ""}`;
  } else if (type === 2) {
    return `Completed ${total} challenge${total > 1 ? "s" : ""}`;
  } else if (type === 3) {
    return `Completed ${total} collaboration${total > 1 ? "s" : ""}`;
  } else if (type === 4) {
    return `Maintained ${total} day streak`;
  }
  return "Unlocked premium achievement";
};

export const getRecentAchievementSub = (achievement: RecentAchievement) => {
  const title = (achievement.titleEn ?? "").toLowerCase();
  if (title.includes("level")) {
    return "Level Unlocked";
  } else if (title.includes("streak") || achievement.type === 4) {
    return "Badge Earned";
  } else if (
    title.includes("milestone") ||
    title.includes("challenge") ||
    title.includes("project") ||
    title.includes("done")
  ) {
    return "Milestone Achieved";
  }
  if (achievement.type === 5) {
    return "Milestone Achieved";
  }
  return "Badge Earned";
};

export const filterBadgesByStatus = (
  badges: BadgeAchievement[],
  filter: BadgeStatusFilter
) => {
  if (filter === "all") return badges;
  if (filter === "completed") {
    return badges.filter((badge) => badge.status === COMPLETED_STATUS);
  }
  if (filter === "in-progress") {
    return badges.filter((badge) => badge.status === IN_PROGRESS_STATUS);
  }

  return badges.filter(
    (badge) =>
      badge.status !== COMPLETED_STATUS && badge.status !== IN_PROGRESS_STATUS
  );
};
