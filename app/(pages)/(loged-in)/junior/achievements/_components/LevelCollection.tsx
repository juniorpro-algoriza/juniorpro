import { cx } from "@lib";
import { Lock } from "lucide-react";
import Image from "next/image";
import FlagImage from "@public/images/achievements/flag.png";
import NoRecentImage from "@public/images/achievements/No_recent_achievements.png";
import type { LevelAchievement } from "./achievementTypes";
import {
  COMPLETED_STATUS,
  formatDate,
  getProgress,
  IN_PROGRESS_STATUS,
} from "./achievementData";
import {
  BlueShieldIcon,
  EmptyState,
  GreyShieldIcon,
  LoadingRows,
  ProgressPill,
  Section,
} from "./AchievementShared";

const fakeLevels: LevelAchievement[] = Array.from({ length: 15 }).map(
  (_, index) =>
    ({
      id: index + 1,
      levelNumber: index + 1,
      xpRequired: (index + 1) * 2000,
      currentLevelXP: index === 0 ? 1250 : index === 1 ? 1300 : null,
      imageUrl: null,
      status:
        index === 0 ? COMPLETED_STATUS : index === 1 ? IN_PROGRESS_STATUS : 1,
      achievedDate: index === 0 ? "2026-04-01T09:15:00Z" : "",
    }) as LevelAchievement
);

export const LevelCollection = ({
  demoMode = false,
  levels,
  isLoading,
}: {
  demoMode?: boolean;
  levels: LevelAchievement[];
  isLoading: boolean;
}) => {
  const displayLevels = demoMode && levels.length === 0 ? fakeLevels : levels;

  const completed = displayLevels.filter(
    (level) => level.status === COMPLETED_STATUS
  ).length;

  return (
    <Section
      title="Level Collection"
      end={
        <span className="text-sm font-semibold text-gray-500">
          <span className="text-dark-blue-main">{completed}</span>/
          {displayLevels.length} levels earned
        </span>
      }
    >
      {isLoading ? (
        <LoadingRows rows={4} />
      ) : displayLevels.length === 0 ? (
        <EmptyState
          image={NoRecentImage}
          title="No levels earned yet"
          description="Keep learning and earning XP to unlock your level collection."
        />
      ) : (
        <div className="relative flex gap-8 overflow-x-auto pb-4 pt-8 px-4 scrollbar-hide">
          {/* Dashed connector line passing behind the shields */}

          {displayLevels.map((level, index) => {
            const completedLevel = level.status === COMPLETED_STATUS;
            const inProgress = level.status === IN_PROGRESS_STATUS;
            const progress = getProgress(
              level.currentLevelXP,
              level.xpRequired
            );

            return (
              <div
                key={level.id ?? index}
                className="relative z-10 flex flex-col items-center min-w-[120px] text-center"
              >
                <div
                  className={cx(
                    "absolute left-14 first:right-0 top-8 h-0.5 border-t-2 border-dashed  z-0 w-full",
                    index === displayLevels.length - 1 && "hidden",
                    completedLevel ? "border-blue-main" : "border-gray-300"
                  )}
                />
                {/* Opaque container to mask the connecting line */}
                <div className="relative flex size-16 items-center justify-center rounded-full bg-white z-10 mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                  {/* Dashed outer ring for in progress */}
                  {inProgress && (
                    <Image
                      src={FlagImage}
                      alt=""
                      width={18}
                      height={24}
                      className="absolute -top-8 left-1/2 z-30 h-8 w-auto -translate-x-1/2 object-contain"
                    />
                  )}

                  {level.imageUrl ? (
                    <Image
                      src={level.imageUrl}
                      alt={`Level ${level.levelNumber ?? index + 1}`}
                      width={80}
                      height={80}
                      className={cx(
                        "h-20 w-20 object-contain z-10",
                        !completedLevel && !inProgress && "grayscale",
                        inProgress && "scale-110"
                      )}
                      unoptimized
                    />
                  ) : completedLevel || inProgress ? (
                    <div className={inProgress ? "scale-130" : ""}>
                      <BlueShieldIcon num={level.levelNumber ?? index + 1} />
                    </div>
                  ) : (
                    <div>
                      <GreyShieldIcon num={level.levelNumber ?? index + 1} />
                    </div>
                  )}

                  {/* Top-right green checkmark circle badge */}
                  {completedLevel && (
                    <div className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-[#12B76A] text-white shadow-sm z-20">
                      <svg
                        className="size-3 stroke-white fill-none stroke-[3.5]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>
                  )}

                  {!completedLevel && !inProgress && (
                    <div className="absolute -bottom-1 -right-1 z-20 flex size-6 items-center justify-center rounded-full bg-white text-semi-blue shadow-[0_3px_8px_rgba(32,38,55,0.18)]">
                      <Lock className="size-3.5  stroke-semi-blue" />
                    </div>
                  )}
                </div>

                <p className="text-sm font-bold text-yankees-blue">
                  Level {level.levelNumber}
                </p>

                {completedLevel && (
                  <p className="mt-1 text-xs font-semibold text-semi-blue">
                    {level.achievedDate
                      ? formatDate(level.achievedDate).split(" - ")[0]
                      : "Apr 1, 2026"}
                  </p>
                )}

                {inProgress && (
                  <div className="mt-1.5 w-full px-2">
                    <p className="text-[11px] font-semibold text-gray-500">
                      <span className="text-gray-800">
                        {level.currentLevelXP ?? 0}
                      </span>
                      /{level.xpRequired ?? 1500} XP
                    </p>
                    <div className="mt-1">
                      <ProgressPill progress={progress} />
                    </div>
                  </div>
                )}

                {!completedLevel && !inProgress && (
                  <p className="mt-1 text-xs font-semibold text-semi-blue opacity-85">
                    {level.xpRequired ?? 0} XP required
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
};
