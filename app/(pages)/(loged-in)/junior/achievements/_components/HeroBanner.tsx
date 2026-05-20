import { Skeleton } from "@components";
import Image from "next/image";
import MakingProgressImage from "@public/images/achievements/making_awesome_progress.png";
import StarsWaitingImage from "@public/images/achievements/stars_are_waiting.png";

export const HeroBanner = ({
  demoMode = false,
  hasAchievements,
  firstName,
  nameLoading,
}: {
  demoMode?: boolean;
  hasAchievements: boolean;
  firstName: string;
  nameLoading: boolean;
}) => {
  const showProgressState = demoMode || hasAchievements;

  return (
    <div className="relative overflow-visible rounded-2xl border border-violet-light bg-white/95 px-5 py-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-sm sm:py-5 sm:pr-72">
      <div className="relative z-10 flex min-w-0 items-center gap-4">
        <Image
          src={showProgressState ? MakingProgressImage : StarsWaitingImage}
          alt=""
          width={58}
          height={58}
          className="h-16 w-16 object-contain"
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1 text-lg font-extrabold text-dark-blue-main sm:text-xl leading-tight">
            <span>
              {showProgressState
                ? "You're making awesome progress ,"
                : "Your stars are waiting for you,"}
            </span>
            {nameLoading ? (
              <Skeleton className="h-6 w-24 rounded-full" />
            ) : (
              <span>{firstName}</span>
            )}
          </div>
          <p className="mt-1.5 text-sm font-semibold text-semi-blue leading-normal">
            {showProgressState
              ? "Every lesson brings you closer to becoming your best self!"
              : "Jump into your first lesson and watch your progress skyrocket!"}
          </p>
        </div>
      </div>
    </div>
  );
};
