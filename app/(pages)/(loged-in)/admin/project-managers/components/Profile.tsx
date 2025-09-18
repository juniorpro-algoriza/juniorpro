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

// Reusable Stat Card component for a clean, card-based layout
function StatCard({
  icon,
  value,
  label,
  bgColor,
  textColor,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  bgColor: string;
  textColor: string;
}) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className={`p-2 rounded-full ${bgColor} ${textColor}`}>{icon}</div>
      <div>
        <div className="text-xl font-bold text-gray-900">{value}</div>
        <div className="text-md text-gray-600">{label}</div>
      </div>
    </div>
  );
}

export const ProjectManagerProfile = ({ manager }: Props) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Avatar + Info Group */}
        <div className="flex items-center gap-6">
          <div className="h-16 w-16 flex-shrink-0 flex items-center justify-center rounded-full bg-indigo-50 text-[#043b88] text-lg font-bold">
            {manager.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold text-gray-900 capitalize">
                {manager.name}
              </h2>
              {/* <Badge
                label={manager.status}
                variant={manager.status === "active" ? "green" : "orange"}
              /> */}
            </div>
            <div className="flex gap-5">
              <p className="text-md text-gray-600 flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-400" />
                {manager.email}
              </p>
              <p className="text-md text-gray-500 flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-gray-400" />
                ID: {manager.id}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <ModalLink
          name="EditProjectManagerProfile"
          query={{ managerId: manager.id }}
        >
          <Button
            intent="primary"
            className="rounded-xl px-6 py-3 text-sm font-semibold"
          >
            Edit Profile
          </Button>
        </ModalLink>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Users className="h-6 w-6" />}
          value={manager.juniorsCount ?? 0}
          label="Assigned Juniors"
          bgColor="bg-blue-50"
          textColor="text-blue-600"
        />
        <StatCard
          icon={<BookOpen className="h-6 w-6" />}
          value={manager.practiceContent ?? 0}
          label="Practice Content"
          bgColor="bg-orange-50"
          textColor="text-orange-600"
        />
        <StatCard
          icon={<Briefcase className="h-6 w-6" />}
          value={manager.projects ?? 0}
          label="Active Projects"
          bgColor="bg-emerald-50"
          textColor="text-emerald-600"
        />
      </div>
    </div>
  );
};
