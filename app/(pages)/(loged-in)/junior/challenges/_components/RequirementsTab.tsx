"use client";

import React from "react";
import { InfoSection } from "@components";
import { ListTodo } from "lucide-react";
import { components } from "../../../../../../api-schema";

type ChallengeRequirementModel =
  components["schemas"]["Sawiha.Services.DTO.AdminChallengeModels.Add.ChallengeRequirementModel"];

interface RequirementsTabProps {
  requirements: ChallengeRequirementModel[];
}

export function RequirementsTab({ requirements }: RequirementsTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-6">
      <InfoSection
        title="Requirements"
        description="Things you need before starting"
        icon={<ListTodo className="size-6" />}
        watermark={<ListTodo className="size-48" />}
        type="checked"
        items={requirements.map(
          (req, index) => req.description || `Requirement ${index + 1}`
        )}
      />
    </div>
  );
}
