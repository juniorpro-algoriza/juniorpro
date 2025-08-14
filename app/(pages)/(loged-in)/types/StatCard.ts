export type StatCardVariant = "info" | "danger" | "success" | "gray" | "base";

export type StatCard = {
  value: number;
  label: string;
  icon: React.ReactNode;
  variant: StatCardVariant;
};
