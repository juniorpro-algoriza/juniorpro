"use client";

import React from "react";
import { InfoSection } from "@components";
import { BookOpenCheck, ListTodo } from "lucide-react";

export function RequirementsTab() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-6">
      <InfoSection
        title="Requirements"
        description="Things your project must have"
        icon={<ListTodo className="size-6" />}
        watermark={<ListTodo className="size-48" />}
        type="checked"
        items={[
          "Develop React components and pages",
          "Develop React components and pages",
          "Develop React components and pages",
        ]}
      />
      <InfoSection
        title="Important Guidelines"
        description="Important rules to follow"
        icon={<BookOpenCheck className="size-6" />}
        watermark={<BookOpenCheck className="size-48" />}
        type="bullet"
        items={[
          "Develop React components and pages",
          "Develop React components and pages",
          "Develop React components and pages",
        ]}
      />
    </div>
  );
}
