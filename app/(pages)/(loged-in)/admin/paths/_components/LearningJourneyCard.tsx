"use client";
import { Button, MainCard, ModalLink, Skeleton } from "@components";
import { EmptyData, PathTimeline } from "@components/client";
import { Plus } from "lucide-react";
import React, { Suspense } from "react";
import { useMissions } from "../../tanstack/missions/useMissions";
import { PATH_STATUS } from "../../../../../configs";
export const LearningJourneyCard = ({
  pathId,
  status = PATH_STATUS.Completed,
}: {
  pathId: string;
  status?: number;
}) => {
  const { data: missionsResponse, isLoading } = useMissions({
    SearchText: "",
    Id: parseInt(pathId),
  });

  const missions = React.useMemo(() => {
    return (missionsResponse?.data || [])
      .map((item) => ({
        id: item.id,
        status: "InProgress",
        title: item.nameEn,
        level: item.levelNameEn,
        description: item.description,
        duration: item.durationNameEn,
        xp: item.xp,
        diamonds: item.points,
      }))
      .sort((a, b) => (a.id || 0) - (b.id || 0));
  }, [missionsResponse]);

  const missionCount = missionsResponse?.data?.length || 0;
  return (
    <MainCard classname=" space-y-5">
      <div className="flex justify-between items-center gap-3 flex-wrap">
        <p className="text-sm font-medium text-gray-600">
          Mission in this path
          <span className="px-2 py-1 rounded-lg text-13 bg-blue-main/15 text-blue-main ms-3">
            {isLoading
              ? "Loading..."
              : `${missionCount} ${missionCount === 1 ? "Mission" : "Missions"}`}
          </span>
        </p>
        {status !== PATH_STATUS.Completed && (
          <Suspense fallback={null}>
            <ModalLink name="CreateEditMission">
              <Button intent="main" size="mainDefault">
                <Plus className="size-4" />
                Add Mission
              </Button>
            </ModalLink>
          </Suspense>
        )}
      </div>
      {missionCount > 0 ? (
        <PathTimeline module="admin" missions={missions} />
      ) : (
        <>
          {isLoading ? (
            <Skeleton className="w-full h-[156px]" />
          ) : (
            <EmptyData
              title="Your path is empty"
              description="Add your first mission to get started"
            />
          )}
        </>
      )}
    </MainCard>
  );
};
