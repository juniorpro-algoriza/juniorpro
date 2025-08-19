import { StatCardVariant } from "../(pages)/(loged-in)/types/StatCardType";

export const statCardStyles: Record<
  StatCardVariant,
  {
    border: string;
    bg: string;
    valueColor: string;
    labelColor: string;
    labelSize: string;
    valueSize: string;
    valueWeight: string;
    labelWeight: string;
    iconBg: string;
    iconColor: string;
    iconBgSize: string;
    iconSize: string;
    iconRadius: string;
  }
> = {
  blue: {
    border: "border border-[var(--color-border-secondary)]",
    bg: "bg-[var(--color-violet-light)]",
    valueColor: "text-[var(--color-violet-normal)]",
    labelColor: "text-[var(--color-dark-electric-blue)]",
    labelSize: "text-xl",
    valueSize: "text-[32px]",
    valueWeight: "font-medium",
    labelWeight: "font-medium",
    iconBg: "bg-[var(--color-carolina-blue-opacity)]",
    iconColor: "text-[var(--color-violet-normal)]",
    iconBgSize: "w-10 h-10",
    iconSize: "w-6 h-6",
    iconRadius: "rounded-[8px]",
  },
  red: {
    border: "border border-[var(--color-border-secondary)]",
    bg: "bg-[#FDEEEE]",
    valueColor: "text-[var(--color-danger-400)]",
    labelColor: "text-[var(--color-dark-electric-blue)]",
    labelSize: "text-xl",
    valueSize: "text-[32px]",
    valueWeight: "font-medium",
    labelWeight: "font-medium",
    iconBg: "bg-[#FCE6E6]",
    iconColor: "text-[#D44E4E]",
    iconBgSize: "w-10 h-10",
    iconSize: "w-6 h-6",
    iconRadius: "rounded-[8px]",
  },
  green: {
    border: "border border-[var(--color-border-secondary)]",
    bg: "bg-[var(--color-light-green)]",
    valueColor: "text-[var(--color-success-500)]",
    labelColor: "text-[var(--color-dark-electric-blue)]",
    labelSize: "text-xl",
    valueSize: "text-[32px]",
    valueWeight: "font-medium",
    labelWeight: "font-medium",
    iconBg: "bg-[var(--color-success-100)]",
    iconColor: "text-[var(--color-success-400)]",
    iconBgSize: "w-10 h-10",
    iconSize: "w-6 h-6",
    iconRadius: "rounded-[8px]",
  },
  orange: {
    border: "border border-[var(--color-border-secondary)]",
    bg: "bg-[var(--color-orange-50)]",
    valueColor: "text-[var(--color-dark-orange)]",
    labelColor: "text-[var(--color-dark-electric-blue)]",
    labelSize: "text-xl",
    valueSize: "text-[32px]",
    valueWeight: "font-medium",
    labelWeight: "font-medium",
    iconBg: "bg-[var(--color-light-orange)]",
    iconColor: "text-[var(--color-dark-orange)]",
    iconBgSize: "w-10 h-10",
    iconSize: "w-6 h-6",
    iconRadius: "rounded-[8px]",
  },
  gray: {
    border: "border border-[var(--color-border-secondary)]",
    bg: "bg-[var(--color-storm-50)]",
    valueColor: "text-[var(--color-gray-900)]",
    labelColor: "text-[var(--color-dark-electric-blue)]",
    labelSize: "text-xl",
    valueSize: "text-[32px]",
    valueWeight: "font-medium",
    labelWeight: "font-medium",
    iconBg: "bg-[var(--color-storm-100)]",
    iconColor: "text-[var(--color-storm-600)]",
    iconBgSize: "w-10 h-10",
    iconSize: "w-6 h-6",
    iconRadius: "rounded-[8px]",
  },
  base: {
    border: "border border-[var(--color-border-secondary)]",
    bg: "bg-white",
    valueColor: "text-black",
    labelColor: "text-black",
    labelSize: "text-[16px]",
    valueSize: "text-[32px]",
    valueWeight: "font-medium",
    labelWeight: "font-medium",
    iconBg: "bg-[var(--color-carolina-blue-opacity)]",
    iconColor: "text-[var(--color-violet-normal)]",
    iconBgSize: "w-10 h-10",
    iconSize: "w-6 h-6",
    iconRadius: "rounded-[8px]",
  },
};
