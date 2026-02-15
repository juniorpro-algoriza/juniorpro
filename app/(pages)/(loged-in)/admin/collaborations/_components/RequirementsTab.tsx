"use client";

import React from "react";
import { InfoSection } from "@components";
import { BookOpenCheck, ListTodo } from "lucide-react";
import { components } from "../../../../../../api-schema";

type GetCollaborationDetailsModel =
  components["schemas"]["Sawiha.Services.DTO.AdminCollaborationModels.GetById.GetCollaborationDetailsModel"];

interface RequirementsTabProps {
  collaboration?: GetCollaborationDetailsModel;
}

export function RequirementsTab({ collaboration }: RequirementsTabProps) {
  const requirements = collaboration?.requirements || [];
  const goals = collaboration?.goals || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-6">
      <InfoSection
        title="Requirements"
        description="Things your project must have"
        icon={<ListTodo className="size-6" />}
        watermark={<ListTodo className="size-48" />}
        type="checked"
        items={requirements.map(
          (req, index) => req.description || `Requirement ${index + 1}`
        )}
      />
      <InfoSection
        title="Project Goals"
        description="Key objectives and deliverables"
        icon={<BookOpenCheck className="size-6" />}
        watermark={<BookOpenCheck className="size-48" />}
        type="bullet"
        items={goals.map(
          (goal, index) => goal.description || `Goal ${index + 1}`
        )}
      />
    </div>
  );
}
