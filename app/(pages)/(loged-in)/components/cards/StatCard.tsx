import { statCardStyles } from "../../../../styles/cardVarients";
import { StatCard as StatCardType } from "../../types/StatCard";

export function StatCard({
  value,
  label,
  icon,
  variant = "base",
}: StatCardType) {
  const styles = statCardStyles[variant];

  return (
    <div
      className={`flex items-start justify-between p-4 rounded-lg shadow ${styles.bg} ${styles.border}`}
    >
      <div>
        <p
          className={`${styles.valueSize} ${styles.valueWeight} ${styles.valueColor}`}
        >
          {value}
        </p>
        <p
          className={`${styles.labelSize} ${styles.labelWeight} ${styles.labelColor}`}
        >
          {label}
        </p>
      </div>
      <div
        className={`${styles.iconBg} ${styles.iconBgSize} ${styles.iconRadius} flex items-center justify-center`}
      >
        <span className={`${styles.iconColor} ${styles.iconSize}`}>{icon}</span>
      </div>
    </div>
  );
}
