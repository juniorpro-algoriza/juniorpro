// TODO: let's move all colors to globals.css
export const badgeVariants = {
  green: {
    bg: "bg-[#ECFAF2]",
    text: "text-[#41C980]",
  },
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
  },
  orange: {
    bg: "bg-[#FCF4E8]",
    text: "text-[#DF972A]",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-700",
  },
  blue: {
    bg: "bg-[#EEF2FF]",
    text: "text-[#5879DC]",
  },
  gray: {
    bg: "bg-[#EEF0F3]",
    text: "text-[#7E8CA0]",
  },
  purple: {
    bg: "bg-[#EDE9FF]",
    text: "text-[#664BDE]",
  },
} as const;

export type BadgeVariant = keyof typeof badgeVariants;
