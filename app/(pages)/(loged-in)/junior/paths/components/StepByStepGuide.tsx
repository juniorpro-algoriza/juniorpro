"use client";
import { MainCard } from "@components";
import { cx } from "@lib";
import { ChevronDown, CircleCheck } from "lucide-react";
import React from "react";
import LambImage from "@public/images/lamb.png";
import ExperimentImage from "@public/images/experiment.png";
import HandRisingImage from "@public/images/hand-rising.png";
import Image from "next/image";
import { components } from "../../../../../../api-schema/schema";
export const StepByStepGuide = ({ steps, successCriterias }: { 
  steps?: components["schemas"]["Sawiha.Services.DTO.MissionsModels.MissionGuideModel"][] | null;
  successCriterias?: components["schemas"]["Sawiha.Services.DTO.MissionsModels.MissionCriteriaModel"][] | null;
}) => {
  const [open, setOpen] = React.useState(0);

  return (
    <div className="space-y-4">
      {steps?.map((item, index) => (
        <MainCard key={item.id} classname=" p-0" isAnimated>
          {/* Header */}
          <div
            className="flex items-center justify-between gap-3 p-5 cursor-pointer"
            onClick={() =>
              setOpen((prev) => (prev === item.id ? 0 : item.id || 0))
            }
          >
            <div className="flex items-center gap-4">
              <div className="size-8  min-w-8 rounded-full bg-[#E0E7FF] border border-[#C6D2FF] flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <div>
                <h3 className="md:text-lg text-base font-bold">{item.titleEn || item.titleAr}</h3>
                <p className="md:text-sm text-xs text-gray-500">{item.subTitle}</p>
              </div>
            </div>

            <ChevronDown
              className={cx(
                "min-w-5 size-5 text-gray-600 transition-all duration-300",
                open === item.id ? "rotate-180" : ""
              )}
            />
          </div>

          {/* Body */}
          {open === (item.id || 0) && (
            <div className="p-5 border-t border-gray-100 space-y-5">
              <p className="text-sm text-gray-600">{item.description}</p>

              {item.codeReference && (
                <pre className="text-sm p-5 rounded-2xl  bg-gray-50 overflow-x-auto border border-gray-200">
                  {item.codeReference}
                </pre>
              )}
            </div>
          )}
        </MainCard>
      ))}

      {/* Success Criteria */}
      <MainCard>
        <h2 className="text-lg font-bold">Success Criteria</h2>
        <div className="grid md:grid-cols-2 gap-3 mt-5">
          {successCriterias?.map((item) => (
            <div key={item.id} className="text-gray-600 flex items-center gap-2">
              <CircleCheck
                fill="#009966"
                className=" shrink-0 size-6 text-white"
              />
              {item.description}
            </div>
          ))}
        </div>
      </MainCard>

      {/* Tips From Your Mentor */}
      <MainCard>
        <h2 className="text-lg font-bold">Tips From Your Mentor</h2>
        {tips.map((item, i) => (
          <div key={i} className="flex items-center gap-5 mt-5">
            <Image src={item.image} alt={item.title} width={24} height={24} />
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </MainCard>
    </div>
  );
};
const tips = [
  {
    image: LambImage.src,
    title: "Take Your Time",
    desc: "There's no rush! Pause videos, rewind, and rewatch as many times as you need. Learning is a journey, not a race.",
  },
  {
    image: ExperimentImage.src,
    title: "Experiment and Break Things",
    desc: "The best way to learn is by trying! Don't be afraid to experiment with the code and see what happens.",
  },
  {
    image: HandRisingImage.src,
    title: "Ask for Help Anytime",
    desc: 'Stuck on something? Use the "Get Help" tab to ask a mentor. We\'re here to support you every step of the way!',
  },
];
