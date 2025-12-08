import { Button, MainCard, Progress } from "@components";
import { ArrowRight, Users } from "lucide-react";
import React from "react";

export const CurrentPlan = () => {
  return (
    <MainCard classname="space-y-2">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-dark-blue-main font-bold">Current Plan</p>
        <Button intent="main" size="mainDefault">
          Manage Plan <ArrowRight className="ml-2" />
        </Button>
      </div>
      <div className="space-y-2 w-fit">
        <p className="text-lg font-semibold">
          Starter Plan{" "}
          <span className="text-green-700 ml-2 text-sm bg-green-100 px-2 py-1 rounded-full">
            Active
          </span>
        </p>
        <div className="flex items-center gap-2 font-bold">
          <span className="text-nowrap">49 SAR </span>
          <span className="text-gray-400 text-sm font-medium">/monthly</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600 text-sm font-medium">
            Renews 15/01/2026
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center gap-2">
            <p className="font-bold flex items-center gap-3">
              <Users className="size-5 text-dark-blue-main" />
              <span>Seats Used</span>
            </p>
            <p className="font-bold">
              1 <span className="text-gray-400 font-medium"> / 5</span>
            </p>
          </div>
          <Progress width={50} />
          <p className="text-gray-400 font-medium">3 seats available</p>
        </div>
      </div>
    </MainCard>
  );
};
