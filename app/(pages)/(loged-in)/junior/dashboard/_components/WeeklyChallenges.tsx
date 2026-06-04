"use client";

import { MainCard, Skeleton } from "@components";
import { Swords, ArrowRight, Trophy, AlarmClock } from "lucide-react";
import Link from "next/link";
import { useJuniorCurrentChallengeDetails } from "../../tanstack";
import { components } from "../../../../../../api-schema";

type ChallengeData =
  components["schemas"]["Sawiha.Services.DTO.JuniorDashboard.CurrentChallenge.CurrentChallengeResponse"];

// const FAKE_CHALLENGE: ChallengeData = {
//   id: 1,
//   nameEn: "The UI/UX Masterpiece Challenge",
//   nameAr: "تحدي التحفة الفنية لواجهة المستخدم",
//   startDate: new Date().toISOString(),
//   prizes: [1500, 1000, 500],
//   juniors: ["Alice", "Bob", "Charlie", "David", "Eve"],
//   description: "Complete the UI/UX design challenge to win amazing prizes!",
// };

export const WeeklyChallenges = () => {
  const {
    data: apiData,
    isLoading,
    error,
  } = useJuniorCurrentChallengeDetails();

  // For now, use fake data if API has nothing
  const challengeData = apiData;

  if (isLoading) {
    return (
      <MainCard classname="h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="size-14 rounded-2xl" />
          <Skeleton className="h-5 w-40 rounded" />
        </div>
        <div className="flex-1 space-y-3 py-4">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-6 w-48 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </MainCard>
    );
  }

  // Empty state — no active challenge
  if (error || !challengeData?.id) {
    return (
      <MainCard classname="h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-14 rounded-2xl rotate-3 bg-[#FF2056] border-b-4 border-[#C70036] flex items-center justify-center shrink-0">
            <Swords className="size-7 text-white -rotate-3" />
          </div>
          <h3 className="font-bold text-lg text-gray-900">Weekly Challenges</h3>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
          <div className="size-14 rounded-2xl bg-rose-50 flex items-center justify-center mb-4">
            <Swords className="size-7 text-rose-500" />
          </div>
          <h3 className="font-bold text-lg sm:text-base md:text-sm text-gray-900 mb-2">
            Ready to Compete?
          </h3>
          <p className="text-sm sm:text-xs text-gray-500 max-w-xs mb-6">
            Join weekly challenges to compete with others and earn bonus XP
            rewards.
          </p>
          <Link
            href="/junior/challenges"
            className="flex items-center gap-2 text-sm sm:text-xs font-bold text-rose-600 border border-rose-100 shadow-md hover:bg-rose-50 px-4 py-3 rounded-2xl transition-colors duration-200 group"
          >
            BROWSE CHALLENGES
            <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </MainCard>
    );
  }

  const challenge = challengeData as ChallengeData;
  const challengeName =
    challenge?.nameEn || challenge?.nameAr || "Active Challenge";
  const juniorsCount = challenge?.juniors?.length ?? 0;

  return (
    <MainCard classname="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="size-12 sm:size-14 rounded-2xl rotate-3 bg-[#FF2056] border-b-4 border-[#C70036] flex items-center justify-center shrink-0">
          <Swords className="size-6 sm:size-7 text-white -rotate-3" />
        </div>
        <div>
          <h3 className="font-bold text-base sm:text-lg">Weekly Challenges</h3>
        </div>
      </div>

      {/* Challenge Content */}
      <div className="flex-1 flex flex-col gap-5">
        {/* Challenge Meta Info */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-dark-blue-main/10 text-dark-blue-main ">
              Current Challenge
            </span>
            {challenge?.startDate && (
              <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-[#FFF7ED] text-[#F54900] flex items-center gap-1">
                <AlarmClock className="size-3" />{" "}
                {new Date(challenge.startDate).toLocaleDateString()}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <h4 className="font-bold text-lg sm:text-xl capitalize line-clamp-1">
              {challengeName}
            </h4>
            <div className="flex -space-x-2">
              {challenge?.juniors?.slice(0, 3).map((junior, idx) => (
                <div
                  key={idx}
                  className="size-8 rounded-full border-2 border-white bg-rose-50 flex items-center justify-center text-[10px] font-extrabold text-rose-400 shadow-sm hover:scale-110 transition-transform cursor-pointer hover:shadow-md hover:bg-rose-500 hover:text-white"
                  title={junior}
                >
                  {junior.slice(0, 1).toUpperCase()}
                </div>
              ))}
              {juniorsCount > 3 && (
                <div className="size-8 rounded-full border-2 border-white bg-rose-50 flex items-center justify-center text-[10px] font-extrabold text-rose-400 shadow-sm hover:scale-110 transition-transform cursor-pointer hover:shadow-md hover:bg-rose-500 hover:text-white">
                  +{juniorsCount - 3}
                </div>
              )}
            </div>
          </div>
        </div>
        {challenge?.description && (
          <p className=" text-gray-600 mt-2 line-clamp-2">
            {challenge.description}
          </p>
        )}
        {/* Prize Pool Section - Dynamic Podium */}
        {challenge?.prizes && challenge.prizes.length > 0 && (
          <div className="mt-6 mb-2">
            <div className="flex items-end justify-center gap-2 sm:gap-3">
              {/* Rank 2 (Left) - Only if 2 or more prizes */}
              {challenge.prizes.length >= 2 && (
                <div className=" flex flex-col items-center">
                  <div className="relative w-full max-w-[90px] aspect-[5/6] rounded-[20px] bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col items-center justify-center p-3">
                    <div className="absolute -top-4 size-9 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                      <Trophy className="size-4 text-slate-400" />
                    </div>
                    <div className="mt-1 text-center">
                      <span className="text-[11px] font-black text-slate-400">
                        {challenge.prizes[1]?.toLocaleString()} XP
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Rank 1 (Center) - Always shown if prizes > 0 */}
              <div className=" flex flex-col items-center -translate-y-3">
                <div className="relative max-w-[105px] aspect-[5/6] rounded-[24px] bg-white border border-indigo-50 shadow-[0_12px_30px_rgba(99,102,241,0.06)] flex flex-col items-center justify-center p-3">
                  <div className="absolute -top-6 size-12 rounded-full bg-white border border-indigo-50 shadow-md flex items-center justify-center">
                    <Trophy className="size-6 text-amber-500" />
                  </div>
                  <div className="mt-3 bg-indigo-50/50 px-3 py-1 rounded-full">
                    <span className="text-[12px] font-black text-indigo-600">
                      {challenge.prizes[0]?.toLocaleString()} XP
                    </span>
                  </div>
                </div>
              </div>

              {/* Rank 3 (Right) - Only if 3 or more prizes */}
              {challenge.prizes.length >= 3 && (
                <div className=" flex flex-col items-center">
                  <div className="relative w-full max-w-[90px] aspect-[5/6] rounded-[20px] bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col items-center justify-center p-3">
                    <div className="absolute -top-4 size-9 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                      <Trophy className="size-4 text-orange-500" />
                    </div>
                    <div className="mt-1 text-center">
                      <span className="text-[11px] font-black text-orange-600/80">
                        {challenge.prizes[2]?.toLocaleString()} XP
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Fillers for 2-prize case to keep Rank 1 centered */}
              {challenge.prizes.length === 2 && (
                <div className=" hidden sm:block" />
              )}
              {challenge.prizes.length === 1 && (
                <>
                  <div className=" hidden sm:block" />
                  <div className=" hidden sm:block" />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </MainCard>
  );
};
