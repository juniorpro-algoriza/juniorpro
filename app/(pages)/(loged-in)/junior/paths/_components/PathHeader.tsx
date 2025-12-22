"use client";
import { Button, MainCard, Progress } from "@components";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useJoinLearningPath } from "../../tanstack/paths/useJuniorsPaths";

export const PathHeader = ({
  image,
  title,
  description,
  progress,
  pathId,
}: {
  image: string;
  title: string;
  description: string;
  progress?: number;
  pathId?: number;
}) => {
  const router = useRouter();
  const joinMutation = useJoinLearningPath();
  const isJoining = joinMutation.isPending;

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
        <div className="flex items-center gap-3">
          <Image src={image} alt={title} width={70} height={70} />
          <div className=" space-y-1">
            <h2 className="sm:text-2xl text-xl font-bold">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        {progress !== null && progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between items-center gap-3">
              <p className="text-13 font-medium text-gray-600">Progress</p>
              <p className="text-dark-blue-main font-bold text-13">
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
      </div>

      {pathId && (
        <Button
          intent="main2"
          size="mainDefault"
          onClick={handleJoin}
          disabled={isJoining}
          className="cursor-pointer absolute top-5 right-5 z-20"
        >
          {isJoining ? "Joining..." : "Join Path"}{" "}
          <ArrowRight className="size-4" />
        </Button>
      )}
    </MainCard>
  );
};
