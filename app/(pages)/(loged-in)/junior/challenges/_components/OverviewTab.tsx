"use client";

import React from "react";
import Image from "next/image";
import { InfoSection, MainCard } from "@components";
import { Hammer, Trophy } from "lucide-react";
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
        <div>
          <div className="flex items-start gap-4 mb-6 px-2">
            <div className="p-3 bg-dark-blue-main/10 text-dark-blue-main rounded-xl">
              <Trophy className="size-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Prize Distribution
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Rewards for top performers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {prizes.map((prize, index) => (
              <MainCard key={index} classname="flex items-center gap-4 p-4">
                <div className="relative size-12 flex-shrink-0">
                  {index < 3 ? (
                    <Image
                      src={MEDALS[index]}
                      alt={`${index + 1} place medal`}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-lg text-dark-blue-main border border-gray-200">
                      {index + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="font-semibold text-gray-900">
                    {prize.titleEn ||
                      `${index + 1}${index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"} Place`}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="font-medium">
                      {prize.points || 0} Points
                    </span>
                    <span className="font-medium">{prize.xp || 0} XP</span>
                  </div>
                </div>
              </MainCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
