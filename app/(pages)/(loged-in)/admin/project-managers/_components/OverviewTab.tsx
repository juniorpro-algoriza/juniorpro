"use client";

import React from "react";
import { MainCard } from "@components";
import { Briefcase, Users, Calendar } from "lucide-react";
import { components } from "../../../../../../api-schema";

type ProjectManagerDetail =
  components["schemas"]["Sawiha.Services.DTO.ProjectMangerModels.ProjectMangerDetailModel"];

interface OverviewTabProps {
  projectManager: ProjectManagerDetail;
}

export function OverviewTab({ projectManager }: OverviewTabProps) {
  const stats = [
    {
      label: "Enablers",
      value: projectManager.enablersCount ?? 0,
      icon: <Users className="size-5" />,
      color: "bg-purple-main/10 text-purple-main",
    },
    {
      label: "Status",
      value: projectManager.status || "Active",
      icon: <Briefcase className="size-5" />,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Joined",
      value: projectManager.joiningDate
        ? new Date(projectManager.joiningDate).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        : "—",
      icon: <Calendar className="size-5" />,
      color: "bg-blue-main/10 text-blue-main",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <MainCard key={stat.label} classname="flex items-center gap-4 p-5">
            <div className={`p-3 rounded-xl ${stat.color}`}>{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </MainCard>
        ))}
      </div>

      {/* Details */}
      <MainCard classname="p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900">Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-gray-500 font-medium">Email</p>
            <p className="text-base font-semibold text-gray-900">
              {projectManager.email || "—"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500 font-medium">Status</p>
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                projectManager.status === "Active"
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {projectManager.status || "—"}
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500 font-medium">Joining Date</p>
            <div className="flex items-center gap-2 text-base font-semibold text-gray-900">
              <Calendar className="size-4 text-gray-400" />
              {projectManager.joiningDate
                ? new Date(projectManager.joiningDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )
                : "—"}
            </div>
          </div>
        </div>
      </MainCard>
    </div>
  );
}
