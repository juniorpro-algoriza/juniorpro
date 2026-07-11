"use client";

import { MainCard, Skeleton } from "@components";
import { Users } from "lucide-react";
import { usePointsAllocation } from "../../tanstack";
import Image from "next/image";
import Diamond2 from "@public/images/diamond-icon-2.png";
import { components } from "../../../../../../api-schema";

type AllocationJuniorModel =
  components["schemas"]["Sawiha.Services.DTO.EnablerDashboard.PointAllocationJuniorModel"];

export const JuniorsPointsAllocation = () => {
  const { data: statsData, isLoading, error } = usePointsAllocation();

  if (isLoading) {
    return (
      <MainCard classname="h-full">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="size-10 rounded-xl" />
          <Skeleton className="h-5 w-32 rounded" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex justify-between items-center py-2 border-b border-gray-50"
            >
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-4 w-12 rounded" />
            </div>
          ))}
        </div>
      </MainCard>
    );
  }

  if (error) {
    return (
      <MainCard classname="h-full flex items-center justify-center py-8">
        <p className="text-red-500 font-medium text-sm">
          Failed to load allocation data
        </p>
      </MainCard>
    );
  }

  const juniors = statsData?.juniors || [];

  return (
    <MainCard classname="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="size-10 sm:size-12 rounded-xl rotate-3 border-b-4 border-indigo-500 bg-indigo-400 flex items-center justify-center shadow-indigo-100 shrink-0">
            <Users className="size-5 sm:size-6 text-white -rotate-3" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg">
              Juniors Points Allocation
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Points distributed to your juniors
            </p>
          </div>
        </div>
        <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
          {juniors.length} Juniors
        </div>
      </div>

      <div className="flex-1 overflow-auto mt-2 pr-1">
        {juniors.length > 0 ? (
          <div className="flex flex-col gap-3">
            {juniors.map((junior: AllocationJuniorModel) => (
              <div
                key={junior.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-indigo-100 hover:bg-white hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-extrabold text-indigo-500 shadow-sm">
                    {junior.name?.slice(0, 1).toUpperCase()}
                  </div>
                  <span className="font-semibold text-sm text-gray-800">
                    {junior.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full">
                  <Image
                    src={Diamond2}
                    alt="diamond"
                    width={14}
                    height={14}
                    className="size-3.5"
                  />
                  <span className="text-xs font-bold text-secondary">
                    {junior.points} points
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-8 text-center text-gray-500">
            <Users className="size-12 text-gray-200 mb-3" />
            <p className="text-sm font-semibold text-gray-700 mb-1">
              No Juniors Found
            </p>
            <p className="text-xs">
              You haven't allocated points to any juniors yet.
            </p>
          </div>
        )}
      </div>
    </MainCard>
  );
};
