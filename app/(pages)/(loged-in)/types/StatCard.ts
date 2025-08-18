export type StatCardVariant =
  | "blue"
  | "red"
  | "green"
  | "orange"
  | "gray"
  | "base";

export type StatCard = {
  value: number;
  label: string;
  icon: React.ReactNode;
  variant: StatCardVariant;
};
