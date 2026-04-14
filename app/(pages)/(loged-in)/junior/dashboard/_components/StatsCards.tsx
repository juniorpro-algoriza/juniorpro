"use client";

import { MainCard } from "@components";
import { cx } from "@lib";
import {
  CheckCircle,
  Zap,
  Swords,
  Users,
  TrendingUp,
  Lock,
} from "lucide-react";

interface StatCard {
  label: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  iconBg: string;
  isLocked?: boolean;
}

const statsData: StatCard[] = [
  {
    label: "MISSIONS COMPLETED",
    value: "24",
    subtext: "total this week",
    icon: <CheckCircle className="size-5 text-white" />,
    iconBg: "bg-emerald-500",
  },
  {
    label: "TOTAL XP",
    value: "4,200",
    subtext: "XP",
    icon: <Zap className="size-5 text-white" />,
    iconBg: "bg-amber-500",
  },
  {
    label: "WEEKLY CHALLENGES",
    value: "0",
    subtext: "not joined yet",
    icon: <Swords className="size-5 text-white" />,
    iconBg: "bg-rose-500",
  },
  {
    label: "TEAM PROJECTS",
    value: "0",
    subtext: "1 active",
    icon: <Users className="size-5 text-white" />,
    iconBg: "bg-indigo-500",
  },
];

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((card, index) => (
        <MainCard key={index} classname="relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={cx(
                "size-10 rounded-xl flex items-center justify-center shadow-lg",
                card.iconBg
              )}
            >
              {card.icon}
            </div>
            <p className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
              {card.label}
            </p>
          </div>
          {card.isLocked ? (
            <div className="flex items-center gap-2 text-gray-400">
              <Lock className="size-5" />
              <span className="font-semibold text-lg">Locked</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              {index === 0 && (
                <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <TrendingUp className="size-3" />
                  +5
                </span>
              )}
            </div>
          )}
          <p className="text-sm text-gray-500 mt-0.5">
            {card.isLocked ? card.subtext : card.subtext}
          </p>

          {/* Decorative gradient circle */}
          <div
            className={cx(
              "absolute -top-6 -right-6 size-24 rounded-full opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-300",
              card.iconBg
            )}
          />
        </MainCard>
      ))}
    </div>
  );
};
