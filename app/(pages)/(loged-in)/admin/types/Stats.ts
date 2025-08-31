import type { ReactNode } from "react";

export type Stats = {
  label: string;
  value: number;
};

export type CardConfig = {
  [key: string]: {
    icon: ReactNode;
    variant: "green" | "red" | "blue" | "gray" | "orange" | "base";
  };
};

export interface StatsProps {
  stats: { label: string; value: number }[];
  cardConfig: CardConfig;
}
