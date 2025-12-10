"use client";
import { Button, MainCard, ModalLink } from "@components";
import { PathTimeline } from "@components/client";
import { PanelsTopLeft, Plus } from "lucide-react";
import React, { Suspense, useEffect, useState } from "react";
import { getMissions } from "../../server/missions/getMissions";

export const LearningJourneyCard = ({ pathId }: { pathId: string }) => {
  const [missionCount, setMissionCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const missions = await getMissions({ SearchText: "" });
        setMissionCount(missions?.data?.length || 0);
      } catch (error) {
        console.error("Failed to fetch missions:", error);
        setMissionCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMissions();
  }, []);
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
      {missionCount ? (
        <PathTimeline pathId={pathId} module="admin" />
      ) : (
        <MainCard classname=" bg-[#F9FAFB80] place-items-center space-y-2">
          <div className="flex items-center justify-center border border-gray-200 text-gray-600 p-3 rounded-full w-fit">
            <PanelsTopLeft />
          </div>
          <p className="font-bold text-lg text-gray-600">Your path is empty</p>
          <p className="text-sm text-gray-600">
            Add your first mission to get started
          </p>
        </MainCard>
      )}
    </MainCard>
  );
};
