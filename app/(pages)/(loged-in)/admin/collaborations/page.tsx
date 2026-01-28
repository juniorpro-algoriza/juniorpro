"use client";
import React, { useState } from "react";
import Link from "next/link";

import { Calendar, DollarSign, Plus, Settings, Users } from "lucide-react";
import { Breadcrumb, Button, MainCard, Progress } from "@components";
import { PATH_ICON } from "../../../../configs/constants";
import Image from "next/image";

/**
 * Mock Data for the collaborations
 * Creating 2 cards as seen in the screenshot
 */
const COLLABORATIONS = [
  {
    id: 1,
    title: "Web Development Basics",
    description: "Learn HTML, CSS, and build your first websites",
    progress: 60,
    price: 100,
    currency: "SAR",
    membersCurrent: 2,
    membersTotal: 4,
    dateStart: "Oct 15",
    dateEnd: "Nov 25",
  },
  {
    id: 2,
    title: "Web Development Basics",
    description: "Learn HTML, CSS, and build your first websites",
    progress: 60,
    price: 100,
    currency: "SAR",
    membersCurrent: 2,
    membersTotal: 4,
    dateStart: "Oct 15",
    dateEnd: "Nov 25",
  },
];

const TABS = [
  { label: "All Projects", count: 2 },
  { label: "Active Projects", count: 0 },
  { label: "Completed Projects", count: null },
];

const Collaborations = () => {
  const [activeTab, setActiveTab] = useState("All Projects");

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Collaborations", href: "/admin/collaborations" },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Team Collaborations</h1>
          <p className="text-gray-500">
            Manage and track student team projects
          </p>
        </div>
        <Link href="/admin/collaborations/create">
          <Button intent="main2" size="mainDefault" icon={<Plus size={18} />}>
            New Collaboration
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 bg-[#F5F7F9] p-2 rounded-full max-w-full w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`
              px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors
              ${
                activeTab === tab.label
                  ? "bg-white text-black shadow-sm"
                  : "bg-transparent text-gray-500 hover:bg-gray-100"
              }
            `}
          >
            {tab.label} {tab.count !== null && `(${tab.count})`}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COLLABORATIONS.map((collab, idx) => (
          <Link
            key={idx}
            href={`/admin/collaborations/${collab.id}`}
            className="block h-full transition-transform hover:scale-[1.01]"
          >
            <MainCard classname="relative flex flex-col h-full border-blue-main/30 shadow-main rounded-3xl cursor-pointer hover:shadow-lg transition-shadow">
              {/* Icon & Settings */}
              <div className="mb-4">
                <div className="relative inline-block">
                  <div className="w-14 h-14 bg-blue-main/10 rounded-xl flex items-center justify-center text-blue-main">
                    <Image
                      src={
                        PATH_ICON[
                          collab.id.toString() as keyof typeof PATH_ICON
                        ] || PATH_ICON["1"]
                      }
                      width={50}
                      height={50}
                      alt="icon"
                    />
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {collab.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium">
                  {collab.description}
                </p>
              </div>

              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    Progress
                  </span>
                  <span className="text-sm font-bold text-blue-main">
                    {collab.progress}%
                  </span>
                </div>
                <Progress
                  width={collab.progress}
                  height="10px"
                  className="bg-blue-main rounded-full"
                />
              </div>

              {/* Footer Metas */}
              <div className="mt-auto flex flex-wrap items-center gap-3">
                {/* Price Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-2xl text-xs font-extrabold border border-green-200">
                  <DollarSign size={14} />
                  {collab.price} {collab.currency}
                </div>

                {/* Members Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50/50 text-gray-600 rounded-2xl text-xs font-medium border border-gray-100">
                  <Users size={14} />
                  <span>
                    {collab.membersCurrent}/{collab.membersTotal} (
                    {collab.membersTotal - collab.membersCurrent} open)
                  </span>
                </div>

                {/* Date Badge */}
                <div className="inline-flex items-center gap-1.5 px-1 py-1 text-gray-500 text-xs font-medium">
                  <Calendar size={14} className="text-blue-main" />
                  {collab.dateStart} - {collab.dateEnd}
                </div>
              </div>
            </MainCard>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Collaborations;
