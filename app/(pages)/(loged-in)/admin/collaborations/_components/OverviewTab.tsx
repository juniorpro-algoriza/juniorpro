"use client";

import React from "react";
import { Carousel, RoleCard, InfoSection } from "@components";
import { Briefcase, Hammer } from "lucide-react";
import { useGetCollaborationRoles } from "../../tanstack/collaborations";
import { components } from "../../../../../../api-schema";

type GetCollaborationDetailsModel =
  components["schemas"]["Sawiha.Services.DTO.AdminCollaborationModels.GetById.GetCollaborationDetailsModel"];

type GetAllCollaborationRoleModel =
  components["schemas"]["Sawiha.Services.DTO.CollaborationRoleModels.GetAll.GetAllCollaborationRoleModel"];

interface OverviewTabProps {
  collaboration?: GetCollaborationDetailsModel;
}

export function OverviewTab({ collaboration }: OverviewTabProps) {
  const collaborationId = collaboration?.collaborationDetails?.id;
  const { data: rolesResponse, isLoading: rolesLoading } =
    useGetCollaborationRoles(collaborationId || 0);

  const goals = collaboration?.goals || [];
  const roles = rolesResponse?.data || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-6">
      {/* What We're Building */}
      <InfoSection
        title="What We're Building"
        description="Project goals and key features"
        icon={<Hammer className="size-6" />}
        type="numbered"
        items={goals.map(
          (goal, index) => goal.description || `Goal ${index + 1}`
        )}
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

        {rolesLoading ? (
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        ) : roles && roles.length > 0 ? (
          <Carousel className="mt-4">
            {roles.map((role: GetAllCollaborationRoleModel) => (
              <RoleCard
                key={role.id}
                title={role.description || "Role"}
                description="Role description"
                statusLabel={`${role.juniorsJoined || 0}/${role.teamCapacity || 0} Filled`}
                statusState={
                  (role.juniorsJoined || 0) >= (role.teamCapacity || 0)
                    ? "full"
                    : (role.juniorsJoined || 0) > 0
                      ? "filled"
                      : "open"
                }
                tools={
                  role.tools?.map((t) => t.nameEn || "").filter(Boolean) || []
                }
                mentor={{
                  name: role.mentorName || "Mentor Name",
                  role: "Mentor Role",
                  initials: role.mentorName
                    ? role.mentorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "MN",
                }}
                responsibilities={
                  role.responsibilities
                    ?.map((r) => r.description)
                    .filter((desc): desc is string => Boolean(desc)) || []
                }
              />
            ))}
          </Carousel>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No roles available for this collaboration yet.
          </div>
        )}
      </div>
    </div>
  );
}
