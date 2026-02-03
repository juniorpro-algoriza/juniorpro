import React from "react";
import { InfoSection } from "@components";
import { BookOpenCheck, ListTodo } from "lucide-react";

interface RequirementsTabProps {
  requirements: string[];
  guidelines: string[];
}

export function RequirementsTab({
  requirements,
  guidelines,
}: RequirementsTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-6">
      <InfoSection
        title="Requirements"
        description="Things your project must have"
        icon={<ListTodo className="size-6" />}
        watermark={<ListTodo className="size-48" />}
        type="checked"
        items={requirements}
      />
      <InfoSection
        title="Important Guidelines"
        description="Important rules to follow"
        icon={<BookOpenCheck className="size-6" />}
        watermark={<BookOpenCheck className="size-48" />}
        type="bullet"
        items={guidelines}
      />
    </div>
  );
}
