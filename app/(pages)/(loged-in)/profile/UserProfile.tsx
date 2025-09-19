/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, ModalLink } from "@components";
import { userConfigs, type UserType } from "../../../config/userConfig";
import {
  Users,
  Briefcase,
  BookOpen,
  Mail,
  User as UserIcon,
} from "lucide-react";

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

export const UserProfile = ({
  userType,
  user,
}: {
  userType: UserType;
  user: any;
}) => {
  const config = userConfigs[userType];

  return (
    <>
      <h1 className="text-xl font-semibold text-gray-800 m-5">
        {config.entity} Profile
      </h1>

      <div className="bg-white border border-[#F1F3F9] rounded-2xl shadow-sm p-6 space-y-6 m-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Avatar + Info */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 flex-shrink-0 flex items-center justify-center rounded-full bg-indigo-50 text-[#043b88] text-lg font-bold">
              {user.name
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-gray-900 capitalize">
                {user.name}
              </h2>
              <div className="flex gap-5 flex-wrap">
                <p className="text-md text-gray-600 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-gray-400" />
                  {user.email}
                </p>
                <p className="text-md text-gray-500 flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                  ID: <span className="font-medium">#{user.id}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <ModalLink name={config.modals.edit} query={{ id: user.id }}>
            <Button
              intent="primary"
              className="rounded-xl px-6 py-3 text-sm font-semibold"
            >
              Edit Profile
            </Button>
          </ModalLink>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            icon={<Users className="h-6 w-6" />}
            value={user.juniorsCount ?? 0}
            label="Assigned Juniors"
            bgColor="bg-blue-50"
            textColor="text-blue-600"
          />
          <StatCard
            icon={<BookOpen className="h-6 w-6" />}
            value={user.practiceContent ?? 0}
            label="Practice Content"
            bgColor="bg-orange-50"
            textColor="text-orange-600"
          />
          <StatCard
            icon={<Briefcase className="h-6 w-6" />}
            value={user.projects ?? 0}
            label="Active Projects"
            bgColor="bg-emerald-50"
            textColor="text-emerald-600"
          />
        </div>
      </div>
    </>
  );
};
