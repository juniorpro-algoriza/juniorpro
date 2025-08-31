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
  variants: {
    variant: {
      green: ["bg-success-50", "text-success-400"],
      orange: ["bg-orange-50", "text-orange-400"],
      red: ["bg-rejected-100", "text-rejected-700"],
      blue: ["bg-violet-light", "text-violet-normal"],
      gray: ["bg-gray-badge-50", "text-gray-badge-400"],
      purple: ["bg-purple-50", "text-purple-400"],
    },
  },
  defaultVariants: {
    variant: "gray",
  },
});
