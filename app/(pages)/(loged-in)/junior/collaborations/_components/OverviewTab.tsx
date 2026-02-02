import React from "react";
import { Carousel, RoleCard, InfoSection } from "@components";
import { Briefcase, Hammer } from "lucide-react";
import { Role } from "@data/juniorCollaborations";

interface OverviewTabProps {
  features: string[];
  roles: Role[];
}

export function OverviewTab({ features, roles }: OverviewTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-6">
      {/* What We're Building */}
      <InfoSection
        title="What We're Building"
        description="Project goals and key features"
        icon={<Hammer className="size-6" />}
        type="numbered"
        items={features}
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
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              title={role.title}
              description={role.description}
              statusLabel={role.statusLabel}
              statusState={role.statusState}
              tools={role.tools}
              mentor={role.mentor}
              responsibilities={role.responsibilities}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
