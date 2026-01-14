import { Button, Input, MainCard, Select } from "@components";
import { Plus, XIcon } from "lucide-react";
import { Resource } from "./types";
import { REASOUCES_TYPE } from "../../../../../../configs";

interface StepResourcesProps {
  resources: Resource[];
  addResource: () => void;
  updateResource: <K extends keyof Resource>(
    id: string,
    key: K,
    value: Resource[K]
  ) => void;
  removeResource: (id: string) => void;
  fieldErrors?: Record<string, string>;
}

export const StepResources = ({
  resources,
  addResource,
  updateResource,
  removeResource,
  fieldErrors = {},
}: StepResourcesProps) => (
  <div className="space-y-2 max-h-[550px] overflow-y-auto">
    <div className="flex items-center justify-between flex-wrap gap-3">
      <h3 className="font-semibold text-lg">Resources</h3>
      <Button
        intent="main"
        size="mainDefault"
        type="button"
        onClick={addResource}
      >
        <Plus /> Add Resource
      </Button>
    </div>

    <div className="space-y-4">
      {resources.map((resource, index) => (
        <MainCard key={resource.id} classname="p-0 ">
          <div className="px-5 py-3 border-b border-gray-100 text-gray-600 flex items-center justify-between gap-3 bg-[#F9FAFB80]">
            <p className="text-sm">Resource {index + 1}</p>
            <XIcon
              className="size-4 cursor-pointer hover:text-red-500 transition-colors"
              onClick={() => removeResource(resource.id)}
            />
          </div>

          <div className="p-5 space-y-2 grid sm:grid-cols-2 sm:gap-3">
            <Input
              label="Resource Title"
              name={`learningResources[${index}][titleEn]`}
              value={resource.titleEn}
              onChange={(e) =>
                updateResource(resource.id, "titleEn", e.target.value)
              }
              placeholder="e.g. Create the file"
              error={fieldErrors[`learningResources.${index}.titleEn`]}
            />
            <Select
              label="Resource Type"
              options={Object.entries(REASOUCES_TYPE).map(([key, value]) => ({
                label: value.title,
                value: Number(key),
              }))}
              value={resource.type}
              onChange={(value: string | number) =>
                updateResource(
                  resource.id,
                  "type",
                  Number(value) as 1 | 2 | 3 | 4
                )
              }
              placeholder="Select type"
              error={fieldErrors[`learningResources.${index}.type`]}
            />

            <Input
              label="URL"
              name={`learningResources[${index}][url]`}
              value={resource.url}
              onChange={(e) =>
                updateResource(resource.id, "url", e.target.value)
              }
              placeholder="e.g. https://www.youtube.com/watch?v=..."
              error={fieldErrors[`learningResources.${index}.url`]}
            />
            <Input
              label={
                <p>
                  Duration{" "}
                  <span className="text-gray-400 text-xs">Optional</span>
                </p>
              }
              name={`learningResources[${index}][duration]`}
              type="number"
              value={resource.duration || ""}
              onChange={(e) =>
                updateResource(
                  resource.id,
                  "duration",
                  e.target.value ? Number(e.target.value) : null
                )
              }
              placeholder={
                resource.type === 4
                  ? "Enter number of exercises"
                  : "Enter duration in minutes"
              }
              min="0"
            />
          </div>
        </MainCard>
      ))}
    </div>
  </div>
);
