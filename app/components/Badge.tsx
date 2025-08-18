import { ReactNode } from "react";
import { badgeVariants, BadgeVariant } from "../styles/badgeVarients";

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
  icon?: ReactNode;
};

export function Badge({ label, variant = "gray", icon }: BadgeProps) {
  // TODO: use cva
  // check file://./Button.tsx
  const styles = badgeVariants[variant] || badgeVariants.gray;

  return (
    <span
      className={`inline-flex items-center gap-1 px-4 py-1 rounded-full text-sm font-medium capitalize ${styles.bg} ${styles.text} `}
    >
      {icon && <span className="text-base">{icon}</span>}
      {label}
    </span>
  );
}
