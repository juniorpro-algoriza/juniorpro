import React from "react";
import { InfoSection } from "@components";
import { ListTodo } from "lucide-react";
import { components } from "../../../../../../api-schema";

type RequirementModel =
  components["schemas"]["Sawiha.Services.DTO.AdminCollaborationModels.Add.CollaborationRequirementModel"];

interface RequirementsTabProps {
  requirements: RequirementModel[];
}

export function RequirementsTab({ requirements }: RequirementsTabProps) {
  const requirementItems = requirements
    .map((r) => r.description)
    .filter(Boolean) as string[];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-6">
      {requirementItems.length > 0 ? (
        <InfoSection
          title="Requirements"
          description="Things your project must have"
          icon={<ListTodo className="size-6" />}
          watermark={<ListTodo className="size-48" />}
          type="checked"
          items={requirementItems}
        />
      ) : (
        <div className="py-10 text-center text-gray-500 font-medium">
          No requirements specified yet.
        </div>
      )}
    </div>
  );
}
