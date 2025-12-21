import { MainCard, REASOUCES_TYPE } from "@components";
import { ExternalLink } from "lucide-react";
import React from "react";
import { components } from "../../../../../../api-schema/schema";
import Link from "next/link";

export const LearningResources = ({
  learningResources,
}: {
  learningResources?:
    | components["schemas"]["Sawiha.Services.DTO.MissionsModels.LearningResourcesModel"][]
    | null;
}) => {
  return (
    <div className="space-y-3">
      {learningResources?.map((resource) => (
        <Link href={resource.url || "#"} target="_blank" key={resource.id}>
          <MainCard classname="bg-[#F9FAFB]  flex items-center gap-3 justify-between">
            <div className="flex items-center gap-3">
              <div className="size-12 flex items-center justify-center rounded-2xl bg-white border border-gray-200 text-gray-600">
                {React.createElement(REASOUCES_TYPE[resource.type || 1].icon)}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold">
                  {resource.titleEn || resource.titleAr}
                </h3>
                {resource.duration ? (
                  <p className="text-gray-600 text-sm">
                    {resource.duration} min
                  </p>
                ) : null}
              </div>
            </div>
            <ExternalLink className="text-gray-300 size-5" />
          </MainCard>
        </Link>
      ))}
    </div>
  );
};