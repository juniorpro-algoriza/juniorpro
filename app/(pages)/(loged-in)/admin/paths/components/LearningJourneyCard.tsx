import { Button, MainCard, ModalLink } from "@components";
import { PanelsTopLeft, Plus } from "lucide-react";
import React, { Suspense } from "react";

export const LearningJourneyCard = () => {
    // { pathId }: { pathId: string }
  return (
    <MainCard classname=" space-y-5">
      <div className="flex justify-between items-center gap-3 flex-wrap">
        <p className="text-sm text-midnight">
          Learning Journey
          <span className="px-2 py-1 rounded-lg text-13 bg-blue-main/15 text-blue-main ms-3">
            0 Missions
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
      <MainCard classname=" bg-[#F9FAFB80] place-items-center space-y-2">
        <div className="flex items-center justify-center border border-gray-200 text-gray-600 p-3 rounded-full w-fit">
          <PanelsTopLeft />
        </div>
        <p className="font-bold text-lg text-gray-600">Your path is empty</p>
        <p className="text-sm text-gray-600">
          Add your first mission to get started 
        </p>
      </MainCard>
    </MainCard>
  );
};
