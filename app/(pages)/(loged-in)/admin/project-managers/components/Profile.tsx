"use client";

import { Users, Briefcase, BookOpen, Mail, UserIcon } from "lucide-react";
import { Button, Badge, ModalLink } from "@components";
import { ReactNode } from "react";

type ManagerProfile = {
  id: number;
  name: string;
  email: string;
  status: string | ReactNode;
  juniorsCount: number;
  projects?: number;
  practiceContent?: number;
};

type Props = {
  manager: ManagerProfile;
};

export const ProjectManagerProfile = ({ manager }: Props) => {
  return (
    <div className="border border-[#F1F3F9] shadow-sm rounded-xl p-5 bg-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Avatar + Info */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo-500 text-white text-base font-semibold shadow ring-2 ring-indigo-100">
            {manager.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900 capitalize">
                {manager.name}
              </h2>
              <Badge
                label={manager.status}
                variant={manager.status === "active" ? "green" : "orange"}
              />
            </div>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Mail className="h-3.5 w-3.5 text-gray-400" />
              {manager.email}
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <UserIcon className="h-4 w-4 text-gray-400" />
              ID: {manager.id}
            </p>
          </div>
        </div>
        <ModalLink
          name="EditProjectManagerProfile"
          query={{ managerId: manager.id }}
        >
          <Button
            intent="primary"
            size="small"
            className="rounded-lg px-4 py-2 text-sm font-medium"
          >
            Edit Profile
          </Button>
        </ModalLink>
      </div>

      {/* Divider */}
      <div className="border-t border-[#F1F3F9] my-4"></div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <StatInline
          icon={
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Users className="h-4 w-4" />
            </div>
          }
          value={manager.juniorsCount ?? 0}
          label="Team Members"
        />
        <StatInline
          icon={
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
              <BookOpen className="h-4 w-4" />
            </div>
          }
          value={manager.practiceContent ?? 0}
          label="Practice Content"
        />
        <StatInline
          icon={
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
              <Briefcase className="h-4 w-4" />
            </div>
          }
          value={manager.projects ?? 0}
          label="Active Projects"
        />
      </div>
    </div>
  );
};

function StatInline({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 p-2 rounded-xlborder border-gray-100 border rounded-lg ">
      {icon}
      <div className="text-center">
        <div className="text-xl font-bold text-gray-900 mb-0.5">{value}</div>
        <div className="text-sm font-medium text-gray-600">{label}</div>
      </div>
    </div>
  );
}
