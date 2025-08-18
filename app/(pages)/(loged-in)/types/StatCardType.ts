export type StatCardVariant =
  | "blue"
  | "red"
  | "green"
  | "orange"
  | "gray"
  | "base";

export type StatCardType = {
  value: number;
  label: string;
  icon: React.ReactNode;
  variant: StatCardVariant;
};
