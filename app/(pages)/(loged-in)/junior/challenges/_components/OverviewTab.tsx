"use client";

import React from "react";
import Image from "next/image";
import { InfoSection, MainCard } from "@components";
import { CircleDollarSign, Hammer, Medal, Trophy } from "lucide-react";
import { components } from "../../../../../../api-schema";

type ChallengeGoalModel =
  components["schemas"]["Sawiha.Services.DTO.AdminChallengeModels.Add.ChallengeGoalModel"];
type ChallengeGuideModel =
  components["schemas"]["Sawiha.Services.DTO.AdminChallengeModels.Add.ChallengeGuideModel"];
type ChallengePrizeDistributionModel =
  components["schemas"]["Sawiha.Services.DTO.AdminChallengeModels.Add.ChallengePrizeDistributionModel"];

const MEDALS = [
  "/images/1st-medal.png",
  "/images/2nd-medal.png",
  "/images/3rd-medal.png",
];

const PLACE_LABELS = ["1st Place", "2nd Place", "3rd Place"];

const getPlaceLabel = (index: number) =>
  PLACE_LABELS[index] || `${index + 1}th Place`;

interface OverviewTabProps {
  goals: ChallengeGoalModel[];
  guideSteps: ChallengeGuideModel[];
  prizes: ChallengePrizeDistributionModel[];
}

export function OverviewTab({ goals, guideSteps, prizes }: OverviewTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-6">
      {/* What We're Building */}
      {goals.length > 0 && (
        <InfoSection
          title="What We're Building"
          description="Project goals and key features"
          icon={<Hammer className="size-6" />}
          type="numbered"
          items={goals.map(
            (goal, index) => goal.description || `Goal ${index + 1}`
          )}
        />
      )}

      {/* How to Complete */}
      {guideSteps.length > 0 && (
        <InfoSection
          title="How to Complete"
          description="Step-by-step instructions"
          icon={<Hammer className="size-6" />}
          type="numbered"
          items={guideSteps.map(
            (step, index) => step.description || `Step ${index + 1}`
          )}
        />
      )}

      {/* Prize Distribution */}
      {prizes.length > 0 && (
        <MainCard classname="relative overflow-hidden p-5 sm:p-6">
          <Trophy className="pointer-events-none absolute right-16 top-0 size-40 -translate-y-8 rotate-12 text-gray-100/80" />
          <div className="relative z-10 flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEF4FF]">
              <Trophy className="size-6 text-dark-blue-main" />
            </div>
            <div className="pt-1">
              <h3 className="text-lg font-bold text-gray-900">
                Prizes Distribution
              </h3>
              <p className="mt-2 text-base font-medium text-gray-500">
                What winners will get
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-7 flex max-w-[720px] flex-col gap-4">
            {prizes.map((prize, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white/95 px-4 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="relative size-10 shrink-0">
                    {index < 3 ? (
                      <Image
                        src={MEDALS[index]}
                        alt={`${getPlaceLabel(index)} medal`}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <div className="flex size-10 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-base font-bold text-dark-blue-main">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <h4 className="truncate text-base font-bold text-gray-900">
                    {getPlaceLabel(index)}
                  </h4>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <span className="inline-flex h-9 items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 text-sm font-bold text-emerald-700">
                    <CircleDollarSign className="size-4" />
                    {prize.points || 0} SAR
                  </span>
                  <span className="inline-flex h-9 items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 text-sm font-bold text-cyan-700">
                    <Trophy className="size-4" />
                    {prize.xp || 0} XP
                  </span>
                  <span className="inline-flex h-9 items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 text-sm font-bold text-purple-700">
                    <Medal className="size-4" />
                    {prize.titleEn || "Challenge Champion"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </MainCard>
      )}
    </div>
  );
}
