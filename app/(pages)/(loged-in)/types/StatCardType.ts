import type { ReactNode } from "react";

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
  icon: ReactNode;
  variant: StatCardVariant;
};
