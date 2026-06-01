"use client";
import { Button, MainCard, Progress } from "@components";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useJoinLearningPath } from "../../tanstack/paths/useJuniorsPaths";
import GraduationImage from "@public/images/graduation.png";
import LightningImage from "@public/images/lightning-icon.png";
import DiamondImage from "@public/images/diamond-icon-2.png";

const formatDueDate = (date?: string | null) => {
  if (!date) return null;

  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const PathHeader = ({
  image,
  title,
  description,
  progress,
  pathId,
  xp,
  points,
  dueDate,
}: {
  image: string;
  title: string;
  description: string;
  progress?: number;
  pathId?: number;
  xp?: number;
  points?: number;
  dueDate?: string | null;
}) => {
  const router = useRouter();
  const joinMutation = useJoinLearningPath();
  const isJoining = joinMutation.isPending;
  const formattedDueDate = formatDueDate(dueDate);
  const hasRewards =
    xp !== undefined || points !== undefined || formattedDueDate !== null;

  const handleJoin = useCallback(async () => {
    if (!pathId) return;

    try {
      const res = await joinMutation.mutateAsync({ id: pathId });
      console.log("res", res);
      toast.success("Successfully joined learning path!");
      router.push(`/junior/paths/${res}/current/`);
    } catch (error) {
      console.error("Failed to join path:", error);
      toast.error("Failed to join learning path");
    }
  }, [pathId, router, joinMutation]);

  return (
    <MainCard classname="relative">
      <div className="space-y-4">
        <div className="flex max-sm:flex-col sm:items-center gap-3">
          <Image src={image} alt={title} width={70} height={70} />
          <div className=" space-y-1">
            <div className="flex items-center justify-between gap-5">
              <h2 className="sm:text-2xl text-xl font-bold">{title}</h2>

              {pathId && (
                <Button
                  intent="main2"
                  size="mainDefault"
                  onClick={handleJoin}
                  disabled={isJoining}
                  className="cursor-pointer max-sm:hidden  z-20"
                >
                  {isJoining ? "Joining..." : "Join Path"}{" "}
                  <ArrowRight className="size-4" />
                </Button>
              )}
            </div>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>

        {progress !== null && progress !== undefined && (
          <div className="border-t border-dashed border-gray-200 pt-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Progress
              </p>
              <p className="rounded-full border border-blue-main/10 bg-blue-main/10 px-3 py-1 text-xs font-bold text-blue-main">
                {progress}%
              </p>
            </div>
            <Progress
              width={progress || 0}
              height="12px"
              className="[background:_linear-gradient(90deg,_#615FFF_0%,_#5DA1E8_100%)]"
            />
          </div>
        )}

        {hasRewards && (
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-bold text-gray-600">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-500">
              Rewards:
            </span>
            {xp !== undefined && (
              <div className="flex items-center gap-2">
                <Image
                  src={LightningImage}
                  alt="XP"
                  width={24}
                  height={24}
                  className="size-6 object-contain"
                />
                <span>{xp} XP</span>
              </div>
            )}
            {points !== undefined && (
              <div className="flex items-center gap-2">
                <Image
                  src={DiamondImage}
                  alt="Points"
                  width={24}
                  height={24}
                  className="size-6 object-contain"
                />
                <span>{points} Points</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Image
                src={GraduationImage}
                alt="Completion Certificate"
                width={24}
                height={24}
                className="size-6 object-contain"
              />
              <span>Completion Certificate</span>
            </div>
            {formattedDueDate && (
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-gray-500" />
                <span>
                  Due:{" "}
                  <span className="font-extrabold text-gray-800">
                    {formattedDueDate}
                  </span>
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {pathId && (
        <Button
          intent="main2"
          size="mainDefault"
          onClick={handleJoin}
          disabled={isJoining}
          className="cursor-pointer hidden max-sm:flex w-full mt-3"
        >
          {isJoining ? "Joining..." : "Join Path"}{" "}
          <ArrowRight className="size-4" />
        </Button>
      )}
    </MainCard>
  );
};
