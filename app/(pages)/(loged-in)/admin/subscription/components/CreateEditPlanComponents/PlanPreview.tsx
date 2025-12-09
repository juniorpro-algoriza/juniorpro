"use client";

import { CircleCheck, Eye, InfinityIcon } from "lucide-react";
import { Feature, PlanFormData } from "./types";
import { useMemo } from "react";

interface PlanPreviewProps {
  formData: PlanFormData;
  features: Feature[];
}

export const PlanPreview = ({ formData, features }: PlanPreviewProps) => {
  const selectedFeatures = useMemo(() => {
    return formData.features
      .map((f) => {
        const featureDetails = features.find((fd) => fd.id === f.featureId);
        return {
          ...f,
          name: featureDetails?.nameEn || "Unknown Feature",
          description: featureDetails?.description,
        };
      })
      .filter((f) => f.name !== "Unknown Feature");
  }, [formData.features, features]);

  // const tabs = [
  //   {
  //     name: "Monthly",
  //     content: (
  //       <div className="flex flex-col items-center mt-3">
  //         <div className="text-4xl font-bold text-midnight">
  //           ${formData.monthlyPrice || 0}
  //         </div>
  //         <div className="text-gray-600 text-sm mt-1">per month</div>
  //       </div>
  //     ),
  //   },
  //   {
  //     name: "Yearly",
  //     content: (
  //       <div className="flex flex-col items-center mt-3">
  //         <div className="text-4xl font-bold text-midnight">
  //           ${formData.yearlyPrice || 0}
  //         </div>
  //         <div className="text-gray-600 text-sm mt-1">per year</div>
  //       </div>
  //     ),
  //   },
  // ];

  return (
    <div className="w-[340px] rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-white max-lg:hidden">
      <div className="bg-dark-blue-main p-4 flex items-center gap-2 text-white">
        <Eye className="size-5" />
        <span className="font-semibold">Live Preview</span>
      </div>

      <div className="p-6 flex flex-col items-center">
        <h3 className="text-2xl font-bold text-center">
          {formData.planName || "Plan Name"}
        </h3>
        <p className="text-gray-600 text-center mt-2 mb-6 text-sm">
          {formData.description || "Plan description will appear here..."}
        </p>

        <div className="mx-auto mb-6">
          {/* <Tabs tabs={tabs} tabListClassName="" /> */}
          <div className="flex flex-col items-center mt-3">
            <div className="text-4xl font-bold text-midnight">
              ${formData.price || 0}
            </div>
            <div className="text-gray-600 text-sm mt-1">
              per{" "}
              {formData.durationType === 1
                ? "day"
                : formData.durationType === 2
                  ? "week"
                  : formData.durationType === 3
                    ? "month"
                    : "year"}
            </div>
          </div>
        </div>

        <div className="w-full space-y-4">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
            Included features
          </p>
          <div className="space-y-1">
            {selectedFeatures.length > 0 ? (
              selectedFeatures.slice(0, 4).map((feature, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CircleCheck className="size-5 text-blue-600 fill-blue-600/10" />
                    <span className="text-midnight font-medium text-sm">
                      {feature.name}
                    </span>
                  </div>
                  <div className="bg-blue-50 px-2 py-1 rounded text-blue-600">
                    {feature.limitCount === 0 || feature.limitCount === null ? (
                      <InfinityIcon className="size-4" />
                    ) : (
                      <span className="text-xs font-bold">
                        {feature.limitCount}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 italic">
                No features selected
              </p>
            )}
            {selectedFeatures.length > 4 && (
              <p className="text-sm text-gray-400 italic">
                +{selectedFeatures.length - 4} more features
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
