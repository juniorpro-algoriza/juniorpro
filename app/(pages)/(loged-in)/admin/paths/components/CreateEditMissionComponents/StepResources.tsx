import { Button, Input, MainCard, Select } from "@components";
import { Plus, XIcon } from "lucide-react";
import { Resource } from "./types";
import { durationOptions } from "./data";

interface StepResourcesProps {
  resources: Resource[];
  addResource: () => void;
  updateResource: <K extends keyof Resource>(
    id: string,
    key: K,
    value: Resource[K]
  ) => void;
  removeResource: (id: string) => void;
}

export const StepResources = ({
  resources,
  addResource,
  updateResource,
  removeResource,
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
              name={`resources[${index}][title]`}
              value={resource.title}
              onChange={(e) =>
                updateResource(resource.id, "title", e.target.value)
              }
              placeholder="e.g. Create the file"
            />
            <Input
              label="Resource Type"
              name={`resources[${index}][type]`}
              value={resource.type}
              onChange={(e) =>
                updateResource(resource.id, "type", e.target.value)
              }
              placeholder="eg: Video "
            />

            <Input
              label="URL"
              name={`resources[${index}][url]`}
              value={resource.url}
              onChange={(e) =>
                updateResource(resource.id, "url", e.target.value)
              }
              placeholder="e.g. https://www.youtube.com/watch?v=..."
            />
            <Select
              label={
                <p>
                  Duration{" "}
                  <span className="text-gray-400 text-xs">Optional</span>
                </p>
              }
              options={durationOptions}
              value={resource.duration}
              onChange={(value: string | number) =>
                updateResource(
                  resource.id,
                  "duration",
                  value ? String(value) : null
                )
              }
              placeholder="Select duration"
            />
          </div>
        </MainCard>
      ))}
    </div>
  </div>
);
