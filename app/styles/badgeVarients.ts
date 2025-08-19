export const badgeVariants = {
  green: {
    bg: "bg-[var(--color-success-50)]",
    text: "text-[var(--color-success-400)]",
  },
  orange: {
    bg: "bg-[var(--color-orange-50)]",
    text: "text-[var(--color-orange-400)]",
  },
  red: {
    bg: "bg-[var(--color-rejected-100)]",
    text: "text-[var(--color-rejected-700)]",
  },
  blue: {
    bg: "bg-[var(--color-violet-light)]",
    text: "text-[var(--color-violet-normal)]",
  },
  gray: {
    bg: "bg-[var(--color-gray-badge-50)]",
    text: "text-[var(--color-gray-badge-400)]",
  },
  purple: {
    bg: "bg-[var(--color-purple-50)]",
    text: "text-[var(--color-purple-400)]",
  },
} as const;

export type BadgeVariant = keyof typeof badgeVariants;
