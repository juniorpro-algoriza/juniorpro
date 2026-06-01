"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { FileText, Link as LinkIcon, Medal } from "lucide-react";
import { MainCard, Skeleton } from "@components";
import LeaderboardBg from "@public/images/leaderboard-bg.png";
import FirstMedal from "@public/images/medal1.png";
import FirstBadge from "@public/images/1stBadge.png";
import SecondMedal from "@public/images/medal2.png";
import ThirdMedal from "@public/images/medal3.png";
import MaleAvatar from "@public/images/male-avatar.png";
import FemaleAvatar from "@public/images/female-avatar.png";
import { cx } from "@lib";
import { components } from "../../../../../../api-schema";
import { useJuniorChallengeLeaderboard } from "../../tanstack/challenges";

type LeaderboardItem =
  components["schemas"]["Sawiha.Services.DTO.JuniorChallengeModels.GetChallengeLeaderboard.GetJuniorChallengeLeaderboardModel"];

type PrizeDistribution =
  components["schemas"]["Sawiha.Services.DTO.AdminChallengeModels.Add.ChallengePrizeDistributionModel"];

const rankStyles: Record<
  number,
  {
    medal: StaticImageData;
    border: string;
    shadow: string;
    bar: string;
    offset: string;
  }
> = {
  1: {
    medal: FirstMedal,
    border: "border-[#F6C15B]",
    shadow: "shadow-[0_18px_35px_-20px_rgba(245,158,11,0.7)]",
    bar: "bg-[#F8C873]",
    offset: "",
  },
  2: {
    medal: SecondMedal,
    border: "border-[#C6D2FF]",
    shadow: "shadow-[0_18px_35px_-20px_rgba(79,57,246,0.75)]",
    bar: "bg-[#8E63DD]",
    offset: "",
  },
  3: {
    medal: ThirdMedal,
    border: "border-[#E7B2A6]",
    shadow: "shadow-[0_18px_35px_-20px_rgba(185,104,83,0.75)]",
    bar: "bg-[#D47D66]",
    offset: "",
  },
};

const fallbackStyle = rankStyles[3];
const WINNERS_VISUAL_ORDER = [2, 1, 3];

const getPrizeText = (
  rank: number,
  prizeDistributions?: PrizeDistribution[] | null
) => {
  const prize = prizeDistributions?.find((item) => Number(item.rank) === rank);

  if (!prize) return "No prize";

  const rewards = [
    prize.points ? `${prize.points} Points` : null,
    prize.xp ? `${prize.xp} XP` : null,
  ].filter(Boolean);

  return rewards.length > 0 ? rewards.join(" + ") : prize.titleEn || "Prize";
};

const LeaderboardCard = ({
  entry,
  prizeDistributions,
  index,
}: {
  entry: LeaderboardItem;
  prizeDistributions?: PrizeDistribution[] | null;
  index: number;
}) => {
  const rank = entry.rank || index + 1;
  const style = rankStyles[rank] || fallbackStyle;
  const score = entry.score ?? 0;
  const avatar = index % 2 === 0 ? FemaleAvatar : MaleAvatar;
  const metrics = [
    { label: "Research", value: score },
    { label: "Design", value: score },
    { label: "Development", value: score },
  ];

  return (
    <div
      className={cx(
        "relative flex min-h-[430px] flex-col justify-center rounded-3xl border bg-white/88 px-7 py-9 backdrop-blur-sm",
        style.border,
        style.shadow,
        rank === 1 ? "lg:min-h-[520px]" : "",
        style.offset,
        entry.isMyRank && "ring-2 ring-[#4F39F6]/30"
      )}
    >
      <Image
        src={style.medal}
        alt={`${rank} place medal`}
        width={76}
        height={76}
        className={cx(
          "absolute -top-12 z-10 object-contain",
          rank === 1 ? "left-1/2 -translate-x-1/2" : "-left-4"
        )}
      />

      {entry.isMyRank && (
        <span className="absolute right-5 top-5 rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-bold text-[#4F39F6]">
          Your rank
        </span>
      )}

      <div className="mb-5 flex flex-col items-center text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-gray-100 p-1 ring-4 ring-gray-100/80">
          <Image
            src={avatar}
            alt={entry.juniorName || "Participant"}
            width={56}
            height={56}
            className="size-14 rounded-full object-cover"
          />
        </div>
        <h3 className="text-xl font-bold leading-tight text-gray-900">
          {entry.juniorName || "Unnamed Junior"}
        </h3>
        <p className="text-sm font-semibold text-slate-400">
          {entry.careerNameEn || entry.careerNameAr || "Participant"}
        </p>
      </div>

      <div className="mb-7 flex items-center justify-center gap-3">
        <div className="rounded-2xl border border-[#C6D2FF] bg-[#EEF2FF] px-4 py-2 text-sm font-bold text-[#4F39F6]">
          {score}/ <span className="font-medium text-slate-500">100</span>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-gray-800">
          {rank === 1 ? (
            <Image
              src={FirstBadge}
              alt="Winner badge"
              width={20}
              height={20}
              className="size-5 object-contain"
            />
          ) : (
            <Medal className="size-4 text-orange-500" />
          )}
          {getPrizeText(rank, prizeDistributions)}
        </div>
      </div>

      <div className="space-y-6">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="grid grid-cols-[88px_1fr_42px] items-center gap-4 text-sm"
          >
            <span className="font-semibold text-slate-500">{metric.label}</span>
            <div className="h-2 rounded-full bg-gray-100">
              <div
                className={cx("h-full rounded-full", style.bar)}
                style={{ width: `${Math.min(metric.value, 100)}%` }}
              />
            </div>
            <span className="font-medium text-gray-700">{metric.value}%</span>
          </div>
        ))}
      </div>

      <div className="pt-7">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm"
        >
          <span className="flex items-center gap-2">
            <FileText className="size-4 text-slate-500" />
            Project Submission
          </span>
          <span className="flex items-center gap-2 font-semibold text-[#2563FF]">
            <LinkIcon className="size-3" />
            View
          </span>
        </button>
      </div>
    </div>
  );
};

export function LeaderboardTab({
  challengeId,
  prizeDistributions,
}: {
  challengeId: number;
  prizeDistributions?: PrizeDistribution[] | null;
}) {
  const { data, isLoading, error } = useJuniorChallengeLeaderboard({
    id: challengeId,
    pageNumber: 1,
    pageSize: 3,
  });

  const leaderboard = [...(data?.data || [])].sort(
    (a, b) => (a.rank || 999) - (b.rank || 999)
  );
  const topWinnersByRank = new Map(
    leaderboard
      .slice(0, 3)
      .map((entry, index) => [entry.rank || index + 1, entry])
  );
  const orderedTopWinners = WINNERS_VISUAL_ORDER.map((rank) =>
    topWinnersByRank.get(rank)
  ).filter(Boolean) as LeaderboardItem[];

  if (isLoading) {
    return (
      <div className="grid gap-6 py-6 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <Skeleton key={item} className="h-[380px] rounded-3xl" />
        ))}
      </div>
    );
  }

  if (error || leaderboard.length === 0) {
    return (
      <div className="py-6">
        <MainCard classname="p-10 text-center">
          <p className="text-lg font-bold text-gray-900">
            No leaderboard data yet
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Participants will appear here once they receive scores.
          </p>
        </MainCard>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div
        className="relative overflow-hidden rounded-[28px] bg-[#F7EAFF] px-6 py-14 md:px-14 md:py-16"
        style={{
          backgroundImage: `url(${LeaderboardBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-white/10" />
        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-3">
          {orderedTopWinners.map((entry, index) => (
            <LeaderboardCard
              key={entry.id || `${entry.juniorName}-${index}`}
              entry={entry}
              index={index}
              prizeDistributions={prizeDistributions}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
