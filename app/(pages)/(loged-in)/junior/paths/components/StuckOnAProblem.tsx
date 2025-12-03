import { Button, MainCard } from "@components";
import { ArrowRight, CircleQuestionMark } from "lucide-react";
import React from "react";

export const StuckOnAProblem = () => {
  return (
    <div className="mt-10 xl:max-w-4/5">
      <MainCard classname=" flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-5">
          <div className="min-w-14 size-14 bg-gray-50 flex items-center justify-center rounded-full">
            <CircleQuestionMark />
          </div>
          <div>
            <h3 className="font-bold md:text-lg text-base">
              Stuck on a problem?
            </h3>
            <p className="text-gray-600 md:text-base text-xs">
              Our mentor team and community are here to help you debug and
              learn.
            </p>
          </div>
        </div>
        <Button intent="main" size="mainDefault">
          Ask a Question
          <ArrowRight className="size-5" />
        </Button>
      </MainCard>
    </div>
  );
};
