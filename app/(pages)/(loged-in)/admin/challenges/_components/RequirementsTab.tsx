"use client";

import React from "react";
import { InfoSection } from "@components";
import { ListTodo, BookOpenCheck } from "lucide-react";
import { components } from "../../../../../../api-schema";

type GetChallengeDetailsModel =
  components["schemas"]["Sawiha.Services.DTO.AdminChallengeModels.GetById.GetChallengeDetailsResponse"];

interface RequirementsTabProps {
  challenge?: GetChallengeDetailsModel;
}

export function RequirementsTab({ challenge }: RequirementsTabProps) {
  const requirements = challenge?.requirements || [];
  const evaluations = challenge?.evaluations || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-6">
      <InfoSection
        title="Requirements"
        description="Things participants need before starting"
        icon={<ListTodo className="size-6" />}
        watermark={<ListTodo className="size-48" />}
        type="checked"
        items={requirements.map(
          (req, index) => req.description || `Requirement ${index + 1}`
        )}
      />

      {evaluations.length > 0 && (
        <InfoSection
          title="Evaluation Guidelines"
          description="How submissions will be judged"
          icon={<BookOpenCheck className="size-6" />}
          watermark={<BookOpenCheck className="size-48" />}
          type="bullet"
          items={evaluations.map(
            (evalItem) =>
              `${evalItem.titleEn || "Criteria"} — ${evalItem.percentage || 0}%`
          )}
        />
      )}
    </div>
  );
}
