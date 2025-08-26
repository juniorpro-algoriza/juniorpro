import type { ReactNode } from "react";
import { BadgeVariant, badgeVariants } from "../styles/badgeVarients";

type BadgeProps = {
  label: string | ReactNode;
  variant?: BadgeVariant;
  icon?: ReactNode;
};

export function Badge({ label, variant = "gray", icon }: BadgeProps) {
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
