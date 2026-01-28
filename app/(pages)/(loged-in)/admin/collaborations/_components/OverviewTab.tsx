"use client";

import React from "react";
import { Carousel, RoleCard, InfoSection } from "@components";
import { Briefcase, Hammer } from "lucide-react";

export function OverviewTab() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-6">
      {/* What We're Building */}
      <InfoSection
        title="What We're Building"
        description="Project goals and key features"
        icon={<Hammer className="size-6" />}
        type="numbered"
        items={[
          "Develop React components and pages",
          "Develop React components and pages",
          "Develop React components and pages",
        ]}
      />

      {/* Roles & Mentors */}
      <div>
        <div className="flex items-start gap-4 mb-6 px-2">
          <div className="p-3 bg-dark-blue-main/10 text-dark-blue-main rounded-xl">
            <Briefcase className="size-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Roles & Mentors</h3>
            <p className="text-gray-500 text-sm mt-1">
              The team building the project and the mentors who help you
            </p>
          </div>
        </div>

        <Carousel className="mt-4">
          <RoleCard
            title="Frontend Developer"
            description="Lead the UI Implementation"
            statusLabel="2/2 Full"
            statusState="full"
            tools={["HTML", "CSS", "JavaScript", "React"]}
            mentor={{
              name: "Sarah Chen",
              role: "Technical Lead",
              initials: "SA",
            }}
            responsibilities={[
              "Setup project structure",
              "Create Board component",
              "Implement Drag and Drop",
            ]}
          />
          <RoleCard
            title="Frontend Developer"
            description="Lead the UI Implementation"
            statusLabel="2/2 Full"
            statusState="full"
            tools={["HTML", "CSS", "JavaScript", "React"]}
            mentor={{
              name: "Sarah Chen",
              role: "Technical Lead",
              initials: "SA",
            }}
            responsibilities={[
              "Setup project structure",
              "Create Board component",
              "Implement Drag and Drop",
            ]}
          />
          <RoleCard
            title="Backend Developer"
            description="API & Database Management"
            statusLabel="1/2 Filled"
            statusState="filled"
            tools={["Node.js", "Express", "MongoDB"]}
            mentor={{
              name: "Mike Ross",
              role: "Backend Lead",
              initials: "MR",
            }}
            responsibilities={[
              "Setup database schema",
              "Create API endpoints",
              "Integrate Authentication",
            ]}
          />
          <RoleCard
            title="UI/UX Designer"
            description="Design the user interface"
            statusLabel="0/1 Open"
            statusState="open"
            tools={["Figma", "Adobe XD"]}
            mentor={{
              name: "Janice Doe",
              role: "Design Lead",
              initials: "JD",
            }}
            responsibilities={[
              "Design user flows",
              "Create high-fidelity mockups",
              "Conduct user testing",
            ]}
          />
        </Carousel>
      </div>
    </div>
  );
}
