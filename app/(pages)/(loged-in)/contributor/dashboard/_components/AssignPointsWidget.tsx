"use client";

import { useState } from "react";
import { MainCard, Skeleton, Button, Input, Select } from "@components";
import { Gift, Zap, ChevronRight } from "lucide-react";
import { useJuniorsData, useAssignPoints } from "../../tanstack";
import { components } from "../../../../../../api-schema";

type JuniorModel =
  components["schemas"]["Sawiha.Services.DTO.JuniorModels.JuniorOfEnablerModel"];

export const AssignPointsWidget = () => {
  const { data: juniorsResponse, isLoading } = useJuniorsData();
  const assignPoints = useAssignPoints();

  const [selectedJuniorId, setSelectedJuniorId] = useState<number | "">("");
  const [points, setPoints] = useState<number | "">("");

  const handleAssign = async () => {
    if (!selectedJuniorId || !points) return;
    try {
      await assignPoints.mutateAsync({
        juniorId: Number(selectedJuniorId),
        points: Number(points),
      });
      setPoints("");
      setSelectedJuniorId("");
    } catch {
      // Error handled in hook
    }
  };

  if (isLoading) {
    return (
      <MainCard classname="h-full">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="size-10 rounded-xl" />
          <Skeleton className="h-5 w-32 rounded" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg mt-2" />
        </div>
      </MainCard>
    );
  }

  const juniors = juniorsResponse?.data || [];

  return (
    <MainCard classname="h-fit flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="size-10 sm:size-12 rounded-xl border-b-4 border-amber-500 bg-amber-400 flex items-center justify-center shadow-amber-100 shrink-0">
              <Gift className="size-5 sm:size-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">Reward Juniors</h3>
              <p className="text-xs text-gray-500 font-medium">
                Assign points directly
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Select
            label="Select Junior"
            placeholder="Choose a junior..."
            value={selectedJuniorId}
            onChange={(val) => setSelectedJuniorId(val as number)}
            options={[
              ...juniors.map((junior: JuniorModel) => ({
                label: `${junior.name} (${junior.points} Points)`,
                value: junior.id as number,
              })),
            ]}
          />

          <Input
            label="Points Amount"
            type="number"
            placeholder="Enter points (e.g. 500)"
            value={points === "" ? "" : points}
            onChange={(e) =>
              setPoints(e.target.value ? Number(e.target.value) : "")
            }
            min={1}
            leftIcon={<Zap className="size-4 text-amber-500" />}
          />
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <Button
          intent="warningMain"
          size="mainDefault"
          className="w-full"
          disabled={!selectedJuniorId || !points || assignPoints.isPending}
          onClick={handleAssign}
          isLoading={assignPoints.isPending}
        >
          Assign Points
          <ChevronRight className="size-4 ml-1" />
        </Button>
      </div>
    </MainCard>
  );
};
