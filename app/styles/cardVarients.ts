import { cva } from "@lib";

export const statCard = cva({
  base: [
    "flex",
    "items-start",
    "justify-between",
    "p-4",
    "rounded-lg",
    "shadow",
    "border",
    "border-border-secondary",
  ],
  variants: {
    variant: {
      blue: "bg-violet-light",
      red: "bg-[#FDEEEE]",
      green: "bg-light-green",
      orange: "bg-orange-50",
      gray: "bg-storm-50",
      base: "bg-white",
    },
  },
  defaultVariants: {
    variant: "base",
  },
});

export const statCardValue = cva({
  base: ["text-[32px]", "font-medium"],
  variants: {
    variant: {
      blue: "text-violet-normal",
      red: "text-danger-400",
      green: "text-success-500",
      orange: "text-dark-orange",
      gray: "text-gray-900",
      base: "text-black",
    },
  },
  defaultVariants: {
    variant: "base",
  },
});

export const statCardLabel = cva({
  base: ["font-medium", "text-dark-electric-blue"],
  variants: {
    variant: {
      blue: "text-xl",
      red: "text-xl",
      green: "text-xl",
      orange: "text-xl",
      gray: "text-xl",
      base: "text-[16px] text-black",
    },
  },
  defaultVariants: {
    variant: "base",
  },
});

export const statCardIconContainer = cva({
  base: [
    "w-10",
    "h-10",
    "rounded-[8px]",
    "flex",
    "items-center",
    "justify-center",
  ],
  variants: {
    variant: {
      blue: "bg-carolina-blue-opacity",
      red: "bg-[#FCE6E6]",
      green: "bg-success-100",
      orange: "bg-light-orange",
      gray: "bg-storm-100",
      base: "bg-carolina-blue-opacity",
    },
  },
  defaultVariants: {
    variant: "base",
  },
});

export const statCardIcon = cva({
  base: ["w-6", "h-6"],
  variants: {
    variant: {
      blue: "text-violet-normal",
      red: "text-[#D44E4E]",
      green: "text-success-400",
      orange: "text-dark-orange",
      gray: "text-storm-600",
      base: "text-violet-normal",
    },
  },
  defaultVariants: {
    variant: "base",
  },
});
