import { cva, cx } from "@lib";
import type { VariantProps } from "cva";
import type { ReactNode } from "react";

export interface BadgeProps extends VariantProps<typeof badge> {
  label: string | ReactNode;
  variant?: "green" | "orange" | "red" | "blue" | "gray" | "purple";
  icon?: ReactNode;
  className?: string;
}

export const Badge = ({
  label,
  variant = "gray",
  icon,
  className,
  ...props
}: BadgeProps) => {
  return (
    <span className={cx(badge({ variant }), className)} {...props}>
      {icon && <span className="text-base">{icon}</span>}
      {label}
    </span>
  );
};

export type BadgeVariant =
  | "green"
  | "orange"
  | "red"
  | "blue"
  | "gray"
  | "purple";

const badge = cva({
  base: [
    "inline-flex",
    "items-center",
    "gap-1",
    "px-4",
    "py-1",
    "rounded-full",
    "text-sm",
    "font-medium",
    "capitalize",
  ],
  // TODO: Lina, pls change the colors here to use the design system colors
  variants: {
    variant: {
      green: [
        // "bg-[var(--color-success-50)]",
        "bg-success-50",
        "text-[var(--color-success-400)]",
      ],
      orange: ["bg-[var(--color-orange-50)]", "text-[var(--color-orange-400)]"],
      red: [
        "bg-[var(--color-rejected-100)]",
        "text-[var(--color-rejected-700)]",
      ],
      blue: [
        "bg-[var(--color-violet-light)]",
        "text-[var(--color-violet-normal)]",
      ],
      gray: [
        "bg-[var(--color-gray-badge-50)]",
        "text-[var(--color-gray-badge-400)]",
      ],
      purple: ["bg-[var(--color-purple-50)]", "text-[var(--color-purple-400)]"],
    },
  },
  defaultVariants: {
    variant: "gray",
  },
});
