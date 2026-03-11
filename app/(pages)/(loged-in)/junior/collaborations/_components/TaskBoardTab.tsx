"use client";

import React from "react";
import {
  MainCard,
  EnhancedTable,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Select,
  Input,
  Skeleton,
} from "@components";
import { Calendar, SearchIcon } from "lucide-react";
import { cx } from "@lib";
import { useRouter } from "next/navigation";
import { useDebounceValue } from "usehooks-ts";
import { useJuniorCollaborationRoleTasks } from "../../tanstack";
import {
  TASK_STATUS_LABELS,
  TASK_PRIORITY_LABELS,
  TASK_STATUS,
} from "../../../../../configs/constants";

const STATUS_STYLING: Record<string, string> = {
  "Not Started": "bg-gray-100 text-gray-600 border-gray-200",
  "In Progress": "bg-orange-50 text-orange-600 border-orange-100",
  "Under Review": "bg-blue-50 text-blue-600 border-blue-100",
  Rejected: "bg-red-50 text-red-600 border-red-100",
  Completed: "bg-green-50 text-green-600 border-green-100",
};

const PRIORITY_STYLING: Record<string, string> = {
  High: "bg-red-50 text-red-600 border-red-100",
  Medium: "bg-orange-50 text-orange-600 border-orange-100",
  Low: "bg-blue-50 text-blue-600 border-blue-100",
};

interface TaskBoardTabProps {
  collaborationId: number;
}

export function TaskBoardTab({ collaborationId }: TaskBoardTabProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = React.useState("");
  const [debouncedSearch] = useDebounceValue(searchValue, 500);

  const [statusFilter, setStatusFilter] = React.useState<string | number>(
    "all"
  );

  const statusValue = statusFilter !== "all" ? Number(statusFilter) : undefined;

  const { data: tasks, isLoading } = useJuniorCollaborationRoleTasks({
    collaborationId,
    pageNumber: 1,
    pageSize: 100,
    searchText: debouncedSearch || undefined,
    status: statusValue as
      | typeof TASK_STATUS.NOT_STARTED
      | typeof TASK_STATUS.IN_PROGRESS
      | typeof TASK_STATUS.UNDER_REVIEW
      | typeof TASK_STATUS.REJECTED
      | typeof TASK_STATUS.COMPLETED
      | undefined,
  });

  return (
    <div className="py-4 space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center sm:gap-3 gap-1">
          <div className="min-w-[240px] flex-1">
            <Input
              type="text"
              placeholder="Search tasks..."
              className="bg-white rounded-2xl border-gray-200"
              leftIcon={<SearchIcon />}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="flex items-center sm:gap-3 gap-1 flex-1 w-full flex-wrap">
            <div className="max-sm:min-w-44 sm:w-44 flex-1">
              <Select
                options={[
                  { label: "All Status", value: "all" },
                  {
                    label: "Not Started",
                    value: TASK_STATUS.NOT_STARTED.toString(),
                  },
                  {
                    label: "In Progress",
                    value: TASK_STATUS.IN_PROGRESS.toString(),
                  },
                  {
                    label: "Under Review",
                    value: TASK_STATUS.UNDER_REVIEW.toString(),
                  },
                  {
                    label: "Rejected",
                    value: TASK_STATUS.REJECTED.toString(),
                  },
                  {
                    label: "Completed",
                    value: TASK_STATUS.COMPLETED.toString(),
                  },
                ]}
                value={statusFilter}
                onChange={setStatusFilter}
              />
            </div>
          </div>
        </div>
      </div>

      {/* List Content */}
      {isLoading ? (
        <MainCard classname="p-0 border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50">
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="space-y-4 p-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        </MainCard>
      ) : !tasks || tasks.length === 0 ? (
        <div className="py-10 text-center space-y-3">
          <p className="text-gray-500 font-medium">
            No tasks assigned to this project yet.
          </p>
          <p className="text-sm text-gray-400">
            Keep an eye out for updates from your team lead!
          </p>
        </div>
      ) : (
        <MainCard classname="p-0 border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-gray-900">Total Tasks</h3>
              <span className="flex items-center justify-center px-2 py-0.5 bg-blue-main/10 text-blue-main text-xs font-bold rounded-full border border-blue-main/10">
                {tasks.length}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <EnhancedTable>
              <TableHeader>
                <TableRow className="bg-gray-50/50 text-gray-500 border-y border-gray-100">
                  <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                    Task Details
                  </TableHead>
                  <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-center">
                    Status
                  </TableHead>
                  <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-center">
                    Priority
                  </TableHead>
                  <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                    Assignee
                  </TableHead>
                  <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                    Due Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => {
                  const statusLabel =
                    TASK_STATUS_LABELS[
                      task.status as keyof typeof TASK_STATUS_LABELS
                    ] || "Not Started";
                  const priorityLabel =
                    TASK_PRIORITY_LABELS[
                      task.priority as keyof typeof TASK_PRIORITY_LABELS
                    ] || "Medium";
                  const assigneeName = task.juniorName || null;
                  const assigneeInitials = assigneeName
                    ? assigneeName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : null;

                  return (
                    <TableRow
                      key={task.id}
                      onClick={() =>
                        router.push(
                          `?modal=JuniorTaskDetails&taskId=${task.id}`
                        )
                      }
                      className="group hover:bg-gray-50/30 transition-colors border-gray-200 cursor-pointer"
                    >
                      <TableCell className="py-5 px-6 min-w-[300px]">
                        <div className="space-y-1">
                          <p className="font-bold text-gray-900 group-hover:text-blue-main transition-colors text-base">
                            {task.title}
                          </p>
                          <p className="text-sm text-gray-400 font-medium line-clamp-1">
                            {task.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 px-6 text-center">
                        <span
                          className={cx(
                            "px-3 py-1.5 rounded-full text-xs font-bold border",
                            STATUS_STYLING[statusLabel] ||
                              STATUS_STYLING["Not Started"]
                          )}
                        >
                          {statusLabel}
                        </span>
                      </TableCell>
                      <TableCell className="py-5 px-6 text-center">
                        <span
                          className={cx(
                            "px-3 py-1.5 rounded-full text-xs font-bold border",
                            PRIORITY_STYLING[priorityLabel] ||
                              PRIORITY_STYLING["Medium"]
                          )}
                        >
                          {priorityLabel}
                        </span>
                      </TableCell>
                      <TableCell className="py-5 px-6">
                        {assigneeName ? (
                          <div className="flex items-center gap-3">
                            <div className="size-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 border border-gray-200">
                              {assigneeInitials}
                            </div>
                            <span className="text-base font-bold text-gray-700">
                              {assigneeName}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm font-medium text-gray-300 italic">
                            Unassigned
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="py-5 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
                          <Calendar size={16} className="text-gray-400" />
                          {task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString(
                                "en-US",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )
                            : "No deadline"}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </EnhancedTable>
          </div>
        </MainCard>
      )}
    </div>
  );
}
