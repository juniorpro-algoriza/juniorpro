"use client";
import { Button, MainCard, ModalLink, Skeleton } from "@components";
import { PathTimeline } from "@components/client";
import { PanelsTopLeft, Plus } from "lucide-react";
import React, { Suspense, useEffect, useState } from "react";
import { getMissions } from "../../server";
import { useSearchParams } from "next/navigation";
type MissionsType = {
  id: number | undefined;
  status: string;
  title: string | null | undefined;
  level: string | null | undefined;
  description: string | null | undefined;
  duration: string | null | undefined;
  xp: number | undefined;
  diamonds: number | undefined;
  requires?: string | null;
};
export const LearningJourneyCard = ({ pathId }: { pathId: string }) => {
  const searchParams = useSearchParams();
  const [missionCount, setMissionCount] = useState(0);
  const [missions, setMissions] = useState<MissionsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMissions = async () => {
    try {
      setIsLoading(true);
      const missions = await getMissions({
        SearchText: "",
        Id: parseInt(pathId),
      });
      const pathTimeLineData = missions?.data
        ?.map((item) => {
          return {
            id: item.id,
            status: "current",
            title: item.nameEn,
            level: item.levelNameEn,
            description: item.description,
            duration: item.durationNameEn,
            xp: item.xp,
            diamonds: item.points,
          };
        })
        .sort((a, b) => (a.id || 0) - (b.id || 0));
      setMissions(pathTimeLineData || []);
      setMissionCount(missions?.data?.length || 0);
    } catch (error) {
      console.error("Failed to fetch missions:", error);
      setMissionCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  // Refetch missions when modal closes (modal param is removed from URL)
  useEffect(() => {
    const modal = searchParams.get("modal");
    if (!modal) {
      fetchMissions();
    }
  }, [searchParams]);
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
        <Suspense fallback={null}>
          <ModalLink name="CreateEditMission">
            <Button intent="main" size="mainDefault">
              <Plus className="size-4" />
              Add Mission
            </Button>
          </ModalLink>
        </Suspense>
      </div>
      {missionCount > 0 ? (
        <PathTimeline pathId={pathId} module="admin" missions={missions} onMissionDeleted={fetchMissions} />
      ) : (
        <>
          {isLoading ? (
            <Skeleton className="w-full h-[156px]" />
          ) : (
            <MainCard classname=" bg-[#F9FAFB80] place-items-center space-y-2">
              <div className="flex items-center justify-center border border-gray-200 text-gray-600 p-3 rounded-full w-fit">
                <PanelsTopLeft />
              </div>
              <p className="font-bold text-lg text-gray-600">
                Your path is empty
              </p>
              <p className="text-sm text-gray-600">
                Add your first mission to get started
              </p>
            </MainCard>
          )}
        </>
      )}
    </MainCard>
  );
};
