import { Check, Hourglass } from "lucide-react";
import Image from "next/image";
import DaysStreakImage from "@public/images/achievements/Days_Streak.png";
import LongestStreakImage from "@public/images/achievements/Longest_Streak.png";
import StartStreakImage from "@public/images/achievements/Start_your_streak_today.png";
import type { StreakStat } from "./achievementTypes";
import { formatDate, getProgress } from "./achievementData";
import {
  EmptyState,
  LoadingRows,
  ProgressPill,
  Section,
} from "./AchievementShared";

export const Streaks = ({
  demoMode = false,
  stats,
  isLoading,
}: {
  demoMode?: boolean;
  stats?: StreakStat;
  isLoading: boolean;
}) => {
  const currentStreak = stats?.currentStreakDays ?? (demoMode ? 12 : 0);
  const longestStreak = stats?.longestStreakDays ?? (demoMode ? 12 : 0);
  const target = stats?.nextBadgeTargetDays ?? (demoMode ? 15 : 0);
  const progressDays = stats?.progressDays ?? (demoMode ? 12 : 0);
  const progress = getProgress(progressDays, target);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const isDayChecked = (index: number) => index < 4;

  return (
    <Section title="My Streaks">
      {isLoading ? (
        <LoadingRows rows={2} />
      ) : currentStreak === 0 && longestStreak === 0 ? (
        <EmptyState
          image={StartStreakImage}
          title="Start your streak today"
          description="Stay consistent and complete activities daily to build your streak."
        />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(250px,1fr)_minmax(190px,0.7fr)]">
          <div className="relative flex min-h-[250px] flex-col justify-between rounded-2xl border border-[#FF8A00] bg-[linear-gradient(105.98deg,#F8F7FE_1.29%,#FFF9F0_96.16%)] px-7 py-6 shadow-[0_8px_24px_rgba(18,24,40,0.02)] transition duration-200 hover:shadow-md">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <Image
                src={DaysStreakImage}
                alt=""
                width={112}
                height={112}
                className="h-24 w-24 object-contain sm:h-28 sm:w-28"
              />
              <div className="space-y-3">
                <span className="inline-flex rounded-full bg-[#009966] px-4 py-2 text-xs font-bold text-white">
                  Current Streak
                </span>
                <p className="text-5xl font-bold leading-none text-[#FF5A00]">
                  {currentStreak}
                </p>
                <p className="text-base font-bold text-[#1E2535]">
                  Days Streak
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[#E8ECF4] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(18,24,40,0.03)]">
              <div className="grid grid-cols-7 gap-3">
                {days.map((day, index) => {
                  const checked = isDayChecked(index);
                  return (
                    <div key={day} className="flex flex-col items-center gap-3">
                      <span className="text-xs font-bold text-black">
                        {day}
                      </span>
                      {checked ? (
                        <div className="flex size-7 items-center justify-center rounded-full bg-[#34A853] text-white">
                          <Check className="size-4 stroke-[3.5]" />
                        </div>
                      ) : (
                        <div className="size-7 rounded-full border border-[#D8E1EE] bg-white" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative flex min-h-[250px] flex-col justify-between rounded-2xl border border-[#BAC7FF] bg-[linear-gradient(105.98deg,#F8F7FE_1.29%,#EDEBFB_96.16%)] px-6 py-5 transition duration-200 hover:shadow-md">
            <span className="w-max rounded-full bg-[#5B5CF6] px-4 py-2 text-xs font-bold text-white">
              Longest Streak
            </span>
            <div className="flex items-center gap-5">
              <Image
                src={LongestStreakImage}
                alt=""
                width={112}
                height={112}
                className="h-28 w-28 object-contain"
              />
              <div>
                <p className="text-5xl font-bold leading-none text-[#4F46F8]">
                  {longestStreak}
                </p>
                <p className="mt-3 text-base font-bold text-[#1E2535]">
                  Days Streak
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-base font-semibold text-[#637590]">
              <div className="flex size-5 items-center justify-center rounded-full bg-[#34A853] text-white">
                <Check className="size-3.5 stroke-[3.5]" />
              </div>
              <span>Achieved</span>
              <span className="text-[#8CA0BD]">
                {stats?.longestStreakAchievedDate
                  ? formatDate(stats.longestStreakAchievedDate).split(" - ")[0]
                  : demoMode
                    ? "April 28, 2026"
                    : ""}
              </span>
            </div>
          </div>

          <div className="relative flex min-h-[250px] flex-col items-center justify-between rounded-2xl border border-[#E0F1E5] bg-white px-6 py-5 text-center transition duration-200 hover:shadow-md">
            <span className="rounded-full bg-[#FF8A00] px-4 py-2 text-xs font-bold text-white">
              Next Streak Badge
            </span>
            <div className="relative">
              <Image
                src={stats?.nextBadgeImageUrl || DaysStreakImage}
                alt="Next streak badge"
                width={118}
                height={118}
                className="h-28 w-28 object-contain"
                unoptimized
              />
              <div className="absolute -right-2 bottom-2 flex size-10 items-center justify-center rounded-full border border-[#FFB13B] bg-white text-[#FF8A00]">
                <Hourglass className="size-5" />
              </div>
            </div>
            <div className="w-full">
              <p className="mb-3 text-base font-bold text-[#637590]">
                <span className="text-[#4E6078]">{progressDays}</span>/{target}{" "}
                days
              </p>
              <ProgressPill progress={progress} />
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};
