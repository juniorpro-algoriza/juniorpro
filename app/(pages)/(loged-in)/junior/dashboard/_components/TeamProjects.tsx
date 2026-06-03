"use client";

import { MainCard, Skeleton } from "@components";
import {
  Users,
  ArrowRight,
  CheckCircle2,
  Circle,
  RefreshCcw,
  AlarmClock,
} from "lucide-react";
import Link from "next/link";
import { useJuniorCurrentCollaborationDetails } from "../../tanstack";
import { components } from "../../../../../../api-schema";
import {
  TASK_STATUS,
  TASK_PRIORITY,
  TASK_PRIORITY_LABELS,
} from "../../../../../configs/constants";
import { cx } from "@lib";

type CollaborationData =
  components["schemas"]["Sawiha.Services.DTO.JuniorDashboard.CurrentCollaborationDetails.CurrentCollaborationDetailResponse"];

const PRIORITY_CONFIG: Record<number, { label: string; colorClass: string }> = {
  [TASK_PRIORITY.LOW]: {
    label: TASK_PRIORITY_LABELS[TASK_PRIORITY.LOW],
    colorClass: "bg-blue-50 text-blue-600 border-blue-100",
  },
  [TASK_PRIORITY.MEDIUM]: {
    label: TASK_PRIORITY_LABELS[TASK_PRIORITY.MEDIUM],
    colorClass: "bg-orange-50 text-orange-600 border-orange-100",
  },
  [TASK_PRIORITY.HIGH]: {
    label: TASK_PRIORITY_LABELS[TASK_PRIORITY.HIGH],
    colorClass: "bg-red-50 text-red-600 border-red-100",
  },
};

export const TeamProjects = () => {
  const {
    data: collaborationData,
    isLoading,
    error,
  } = useJuniorCurrentCollaborationDetails();

  if (isLoading) {
    return (
      <MainCard classname="h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="size-14 rounded-2xl" />
          <Skeleton className="h-5 w-36 rounded" />
        </div>
        <div className="flex-1 space-y-3 py-4">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </MainCard>
    );
  }

  // Empty state — no active collaboration
  if (error || !collaborationData?.id) {
    return (
      <MainCard classname="h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-14 rounded-2xl rotate-3 border-b-4 border-dark-blue-main shadow-[0px_8px_0px_0px_#4338CA] bg-[#615FFF] flex items-center justify-center shadow-md shadow-indigo-200">
            <Users className="size-7 text-white -rotate-3" />
          </div>
          <h3 className="font-bold text-lg">Team Projects</h3>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
          <div className="size-14 rounded-2xl bg-dark-blue-main/10 flex items-center justify-center mb-4">
            <Users className="size-7 text-dark-blue-main" />
          </div>
          <h3 className="font-bold text-lg sm:text-base md:text-sm mb-2">
            Ready to Join a Real Project?
          </h3>
          <p className="text-sm sm:text-xs text-gray-500 max-w-xs mb-6">
            Join team projects to build together, share skills, and create
            amazing work.
          </p>
          <Link
            href="/junior/collaborations"
            className="flex items-center gap-2 text-sm sm:text-xs font-bold text-dark-blue-main border border-dark-blue-main/10 shadow-md hover:bg-dark-blue-main/10 px-4 py-3 rounded-2xl transition-colors duration-200 group"
          >
            JOIN A TEAM
            <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </MainCard>
    );
  }

  const collaboration = collaborationData as CollaborationData;
  const projectName = collaboration.nameAr || "Active Project";
  const juniorsCount = collaboration.juniors?.length ?? 0;
  const tasks = collaboration.tasks ?? [];

  return (
    <MainCard classname="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="size-12 sm:size-14 rounded-2xl rotate-3 border-b-4 border-dark-blue-main bg-[#615FFF] flex items-center justify-center shadow-indigo-200 shrink-0">
          <Users className="size-6 sm:size-7 text-white -rotate-3" />
        </div>
        <div>
          <h3 className="font-bold text-base sm:text-lg">Team Projects</h3>
        </div>
      </div>

      {/* Project Content */}
      <div className="flex-1 flex flex-col gap-5">
        {/* Project Meta Info */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-dark-blue-main/10 text-dark-blue-main">
              Current Project
            </span>
            {collaboration.startDate && (
              <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-[#FFEDD4] text-[#F54900] flex items-center gap-1">
                <AlarmClock className="size-3" />{" "}
                {new Date(collaboration.startDate).toLocaleDateString()}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <h4 className="font-bold text-lg sm:text-xl capitalize line-clamp-1">
              {projectName}
            </h4>
            <div className="flex -space-x-2">
              {collaboration.juniors?.slice(0, 3).map((junior, idx) => (
                <div
                  key={idx}
                  className="size-8 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-[10px] font-extrabold text-gray-400 shadow-sm hover:scale-110 transition-transform cursor-pointer hover:shadow-md hover:bg-dark-blue-main hover:text-white"
                  title={junior}
                >
                  {junior.slice(0, 1).toUpperCase()}
                </div>
              ))}
              {juniorsCount > 3 && (
                <div className="size-8 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-[10px] font-extrabold text-gray-400 shadow-sm hover:scale-110 transition-transform cursor-pointer hover:shadow-md hover:bg-dark-blue-main hover:text-white">
                  +{juniorsCount - 3}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Task Board */}
        {tasks.length > 0 && (
          <div className="flex-1 min-h-0">
            {/* Using a horizontal scroll container on very small screens, or grid stacking */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* TO DO Column */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      TO DO
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-gray-100 px-2 py-0.5 rounded-full text-gray-400">
                    {
                      tasks.filter((t) => t.status === TASK_STATUS.NOT_STARTED)
                        .length
                    }
                  </span>
                </div>
                <div className="space-y-2">
                  {tasks.filter((t) => t.status === TASK_STATUS.NOT_STARTED)
                    .length > 0 ? (
                    tasks
                      .filter((t) => t.status === TASK_STATUS.NOT_STARTED)
                      .slice(0, 2)
                      .map((task) => {
                        const priority =
                          PRIORITY_CONFIG[task.priority as number] ||
                          PRIORITY_CONFIG[TASK_PRIORITY.MEDIUM];
                        const daysLeft = task.dueDate
                          ? Math.ceil(
                              (new Date(task.dueDate).getTime() -
                                new Date().getTime()) /
                                (1000 * 60 * 60 * 24)
                            )
                          : null;

                        return (
                          <div
                            key={task.id}
                            className="bg-white p-3 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all cursor-pointer group shadow-sm hover:shadow-md"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span
                                className={cx(
                                  "text-[9px] font-bold px-2 py-0.5 rounded-full border",
                                  priority.colorClass
                                )}
                              >
                                {priority.label}
                              </span>
                              {daysLeft !== null && (
                                <span className="text-[9px] font-medium text-gray-400">
                                  {daysLeft > 0
                                    ? `${daysLeft}d left`
                                    : daysLeft === 0
                                      ? "Today"
                                      : "Overdue"}
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-semibold capitalize text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                              {task.title}
                            </p>
                          </div>
                        );
                      })
                  ) : (
                    <div className="py-4 border-2 border-dashed border-gray-50 rounded-2xl flex flex-col items-center justify-center gap-2">
                      <Circle className="size-4 text-gray-200" />
                      <p className="text-[11px] text-gray-300 font-medium">
                        No tasks
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* IN PROGRESS Column */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">
                      In Progress
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-indigo-50 px-2 py-0.5 rounded-full text-indigo-500">
                    {
                      tasks.filter(
                        (t) =>
                          t.status === TASK_STATUS.IN_PROGRESS ||
                          t.status === TASK_STATUS.UNDER_REVIEW
                      ).length
                    }
                  </span>
                </div>
                <div className="space-y-2">
                  {tasks.filter(
                    (t) =>
                      t.status === TASK_STATUS.IN_PROGRESS ||
                      t.status === TASK_STATUS.UNDER_REVIEW
                  ).length > 0 ? (
                    tasks
                      .filter(
                        (t) =>
                          t.status === TASK_STATUS.IN_PROGRESS ||
                          t.status === TASK_STATUS.UNDER_REVIEW
                      )
                      .slice(0, 2)
                      .map((task) => {
                        const priority =
                          PRIORITY_CONFIG[task.priority as number] ||
                          PRIORITY_CONFIG[TASK_PRIORITY.MEDIUM];
                        const daysLeft = task.dueDate
                          ? Math.ceil(
                              (new Date(task.dueDate).getTime() -
                                new Date().getTime()) /
                                (1000 * 60 * 60 * 24)
                            )
                          : null;

                        return (
                          <div
                            key={task.id}
                            className="bg-white p-3 rounded-2xl border border-indigo-100/50 hover:border-indigo-300 transition-all cursor-pointer group shadow-sm hover:shadow-md"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span
                                className={cx(
                                  "text-[9px] font-bold px-2 py-0.5 rounded-full border",
                                  priority.colorClass
                                )}
                              >
                                {priority.label}
                              </span>
                              {daysLeft !== null && (
                                <span className="text-[9px] font-medium text-gray-400">
                                  {daysLeft > 0
                                    ? `${daysLeft}d left`
                                    : daysLeft === 0
                                      ? "Today"
                                      : "Overdue"}
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-semibold capitalize text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                              {task.title}
                            </p>
                          </div>
                        );
                      })
                  ) : (
                    <div className="py-4 border-2 border-dashed border-gray-50 rounded-2xl flex flex-col items-center justify-center gap-2">
                      <RefreshCcw className="size-4 text-gray-200" />
                      <p className="text-[11px] text-gray-300 font-medium">
                        No tasks
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* DONE Column */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                      DONE
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-50 px-2 py-0.5 rounded-full text-emerald-600">
                    {
                      tasks.filter((t) => t.status === TASK_STATUS.COMPLETED)
                        .length
                    }
                  </span>
                </div>
                <div className="space-y-2">
                  {tasks.filter((t) => t.status === TASK_STATUS.COMPLETED)
                    .length > 0 ? (
                    tasks
                      .filter((t) => t.status === TASK_STATUS.COMPLETED)
                      .slice(0, 2)
                      .map((task) => {
                        const priority =
                          PRIORITY_CONFIG[task.priority as number] ||
                          PRIORITY_CONFIG[TASK_PRIORITY.MEDIUM];

                        return (
                          <div
                            key={task.id}
                            className="bg-emerald-50/30 p-3 rounded-2xl border border-emerald-100 hover:border-emerald-200 transition-all cursor-pointer group shadow-sm opacity-80 hover:opacity-100"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span
                                className={cx(
                                  "text-[9px] font-bold px-2 py-0.5 rounded-full border",
                                  priority.colorClass
                                )}
                              >
                                {priority.label}
                              </span>
                              <CheckCircle2 className="size-3 text-emerald-500" />
                            </div>
                            <p className="text-sm font-semibold capitalize text-gray-800 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                              {task.title}
                            </p>
                          </div>
                        );
                      })
                  ) : (
                    <div className="py-4 border-2 border-dashed border-gray-50 rounded-2xl flex flex-col items-center justify-center gap-2">
                      <CheckCircle2 className="size-4 text-gray-200" />
                      <p className="text-[11px] text-gray-300 font-medium">
                        No tasks
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainCard>
  );
};
