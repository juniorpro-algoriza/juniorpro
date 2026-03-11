import React from "react";
import { Carousel, RoleCard, InfoSection } from "@components";
import { Briefcase, Hammer } from "lucide-react";
import { components } from "../../../../../../api-schema";

type GoalModel =
  components["schemas"]["Sawiha.Services.DTO.AdminCollaborationModels.Add.CollaborationGoalModel"];
type RoleModel =
  components["schemas"]["Sawiha.Services.DTO.JuniorCollaborationModels.RolesModels.GetAll.GetJuniorCollaborationRoleModel"];

interface OverviewTabProps {
  goals: GoalModel[];
  roles: RoleModel[];
}

const getRoleStatusState = (role: RoleModel): "full" | "filled" | "open" => {
  const joined = role.juniorsJoined || 0;
  const capacity = role.teamCapacity || 0;
  if (capacity > 0 && joined >= capacity) return "full";
  if (joined > 0) return "filled";
  return "open";
};

const getRoleStatusLabel = (role: RoleModel): string => {
  const joined = role.juniorsJoined || 0;
  const capacity = role.teamCapacity || 0;
  if (capacity > 0 && joined >= capacity) return `${joined}/${capacity} Full`;
  return `${joined}/${capacity} Filled`;
};

export function OverviewTab({ goals, roles }: OverviewTabProps) {
  const goalItems = goals.map((g) => g.description).filter(Boolean) as string[];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-6">
      {/* What We're Building */}
      {goalItems.length > 0 && (
        <InfoSection
          title="What We're Building"
          description="Project goals and key features"
          icon={<Hammer className="size-6" />}
          type="numbered"
          items={goalItems}
        />
      )}

      {/* Roles & Mentors */}
      {roles.length > 0 && (
        <div>
          <div className="flex items-start gap-4 mb-6 px-2">
            <div className="p-3 bg-dark-blue-main/10 text-dark-blue-main rounded-xl">
              <Briefcase className="size-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Roles & Mentors
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                The team building the project and the mentors who help you
              </p>
            </div>
          </div>

          <Carousel className="mt-4">
            {roles.map((role) => {
              const mentorName = role.mentorName || "Mentor";
              const initials = mentorName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase();

              return (
                <RoleCard
                  key={role.id}
                  title={role.categoryNameEn || role.categoryNameAr || "Role"}
                  description={role.description || ""}
                  statusLabel={getRoleStatusLabel(role)}
                  statusState={getRoleStatusState(role)}
                  tools={
                    (role.tools
                      ?.map((t) => t.nameEn || t.nameAr || "")
                      .filter(Boolean) as string[]) || []
                  }
                  mentor={{
                    name: mentorName,
                    role: "Mentor",
                    initials,
                  }}
                  responsibilities={
                    (role.responsibilities
                      ?.map((r) => r.description)
                      .filter(Boolean) as string[]) || []
                  }
                />
              );
            })}
          </Carousel>
        </div>
      )}
    </div>
  );
}
