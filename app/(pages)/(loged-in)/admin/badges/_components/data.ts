import { BookOpen, Flame, Swords, Users, type LucideIcon } from "lucide-react";

export type BadgeTypeId = 1 | 2 | 3 | 4;

export interface BadgeTypeOption {
  id: BadgeTypeId;
  label: string;
  shortLabel: string;
  pluralLabel: string;
  countLabel: string;
  helper: string;
  defaultCount: number;
  icon: LucideIcon;
  tone: {
    text: string;
    bg: string;
    border: string;
    selectedBg: string;
    selectedBorder: string;
    ring: string;
  };
}

export const BADGE_TYPES: BadgeTypeOption[] = [
  {
    id: 1,
    label: "Learning Paths",
    shortLabel: "Learning Path",
    pluralLabel: "learning paths",
    countLabel: "learning paths",
    helper:
      "Set how many learning paths need to be completed to earn this badge",
    defaultCount: 2,
    icon: BookOpen,
    tone: {
      text: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      selectedBg: "bg-emerald-50",
      selectedBorder: "border-emerald-500",
      ring: "ring-emerald-100",
    },
  },
  {
    id: 2,
    label: "Challenges",
    shortLabel: "Challenge",
    pluralLabel: "challenges",
    countLabel: "weekly challenges",
    helper: "Set how many challenges need to be completed to earn this badge",
    defaultCount: 12,
    icon: Swords,
    tone: {
      text: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-200",
      selectedBg: "bg-rose-50",
      selectedBorder: "border-rose-500",
      ring: "ring-rose-100",
    },
  },
  {
    id: 3,
    label: "Collaboration Tasks",
    shortLabel: "Collaboration",
    pluralLabel: "collaborations",
    countLabel: "team projects",
    helper:
      "Set how many collaborations need to be completed to earn this badge",
    defaultCount: 1,
    icon: Users,
    tone: {
      text: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      selectedBg: "bg-indigo-50",
      selectedBorder: "border-indigo-500",
      ring: "ring-indigo-100",
    },
  },
  {
    id: 4,
    label: "Streaks",
    shortLabel: "Streaks",
    pluralLabel: "days streak",
    countLabel: "streaks",
    helper: "Set how many streaks need to be completed to earn this badge",
    defaultCount: 30,
    icon: Flame,
    tone: {
      text: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      selectedBg: "bg-amber-50",
      selectedBorder: "border-amber-400",
      ring: "ring-amber-100",
    },
  },
];

export const getBadgeType = (type?: number) =>
  BADGE_TYPES.find((badgeType) => badgeType.id === type) ?? BADGE_TYPES[0];

export const getBadgeCondition = (count: number, type?: number) => {
  const badgeType = getBadgeType(type);

  if (badgeType.id === 3) {
    return `Complete ${count} Team ${count === 1 ? "Project" : "Projects"}`;
  }

  return `Complete ${count} ${badgeType.countLabel}`;
};
