"use client";

import React from "react";
import {
  Button,
  MainCard,
  EnhancedTable,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Select,
  SearchInput,
} from "@components";
import { Calendar, Plus } from "lucide-react";
import { cx } from "@lib";
import { Skeleton } from "@components";
import { useGetCollaborationRoleTasks } from "../../tanstack/collaborations";
import { useRouter } from "next/navigation";
import { components } from "../../../../../../api-schema";
import {
  getTaskStatusOptions,
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
} from "../../../../../constants/collaborationEnums";

type GetAllCollaborationRoleTaskModel =
  components["schemas"]["Sawiha.Services.DTO.CollaborationRoleTaskModels.GetAll.GetAllCollaborationRoleTaskModel"];

interface TaskBoardTabProps {
  collaborationId: number;
}

export function TaskBoardTab({ collaborationId }: TaskBoardTabProps) {
  const router = useRouter();
  const { data: tasks, isLoading } = useGetCollaborationRoleTasks({
    collaborationId,
    pageNumber: 1,
    pageSize: 100,
  });

  const taskList = tasks || [];

  const getStatusColor = (
    status?:
      | components["schemas"]["Sawiha.CrossCutting.Model.Entities.CollaborationsFeatures.CollaborationRoleTaskStatus"]
      | null
  ) => {
    switch (status) {
      case 1: // NotStarted
        return "bg-gray-100 text-gray-800";
      case 2: // InProgress
        return "bg-blue-100 text-blue-800";
      case 3: // Submitted
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (
    status?:
      | components["schemas"]["Sawiha.CrossCutting.Model.Entities.CollaborationsFeatures.CollaborationRoleTaskStatus"]
      | null
  ) => {
    switch (status) {
      case 1:
        return TASK_STATUS_LABELS[1]; // Not Started
      case 2:
        return TASK_STATUS_LABELS[2]; // In Progress
      case 3:
        return TASK_STATUS_LABELS[3]; // Submitted
      default:
        return "Unknown";
    }
  };

  const getPriorityColor = (
    priority?:
      | components["schemas"]["Sawiha.CrossCutting.Model.Entities.CollaborationsFeatures.TaskPrority"]
      | null
  ) => {
    switch (priority) {
      case 1: // Low
        return "bg-gray-100 text-gray-800";
      case 2: // Medium
        return "bg-yellow-100 text-yellow-800";
      case 3: // High
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityText = (
    priority?:
      | components["schemas"]["Sawiha.CrossCutting.Model.Entities.CollaborationsFeatures.TaskPrority"]
      | null
  ) => {
    switch (priority) {
      case 1:
        return TASK_PRIORITY_LABELS[1]; // Low
      case 2:
        return TASK_PRIORITY_LABELS[2]; // Medium
      case 3:
        return TASK_PRIORITY_LABELS[3]; // High
      default:
        return "Unknown";
    }
  };

  if (isLoading) {
    return (
      <div className="py-4 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Task Board</h2>
            <p className="text-sm text-gray-500">
              Manage and track collaboration tasks
            </p>
          </div>
          <div className="flex items-center gap-3">
            <SearchInput placeholder="Search tasks..." className="w-64" />
            <Button>
              <Plus className="size-4" />
              Add Task
            </Button>
          </div>
        </div>

        {/* List Content */}
        <MainCard classname="p-0 border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-gray-900">Total Tasks</h3>
              <span className="flex items-center justify-center px-2 py-0.5 bg-blue-main/10 text-blue-main text-xs font-bold rounded-full border border-blue-main/10">
                Loading...
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
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="py-5 px-6">
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                    <TableCell className="py-5 px-6 text-center">
                      <Skeleton className="h-6 w-16 mx-auto" />
                    </TableCell>
                    <TableCell className="py-5 px-6 text-center">
                      <Skeleton className="h-6 w-16 mx-auto" />
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <Skeleton className="h-6 w-24" />
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <Skeleton className="h-6 w-20" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </EnhancedTable>
          </div>
        </MainCard>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center sm:gap-3 gap-1">
          {/* Search */}
          <div className="min-w-[240px] flex-1">
            <SearchInput
              placeholder="Search tasks..."
              className="bg-white rounded-2xl border-gray-200"
            />
          </div>

          {/* Select Filters */}
          <div className="flex items-center sm:gap-3 gap-1 flex-1 w-full flex-wrap">
            <div className="max-sm:min-w-44 sm:w-44 flex-1">
              <Select
                options={getTaskStatusOptions()}
                value="all"
                onChange={() => {}}
              />
            </div>
            <div className="max-sm:min-w-44 sm:w-44 flex-1">
              <Select
                options={[
                  { label: "All Members", value: "all" },
                  { label: "Sarah Ahmed", value: "sarah" },
                ]}
                value="all"
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
        <Button
          intent="main2"
          size="mainDefault"
          icon={<Plus size={18} />}
          className="lg:w-auto w-full"
          onClick={() =>
            router.push(`?modal=CreateTask&collaborationId=${collaborationId}`)
          }
        >
          New Task
        </Button>
      </div>

      {/* List Content */}
      <MainCard classname="p-0 border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-gray-900">Total Tasks</h3>
            <span className="flex items-center justify-center px-2 py-0.5 bg-blue-main/10 text-blue-main text-xs font-bold rounded-full border border-blue-main/10">
              {taskList.length}
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
              {taskList.map((task: GetAllCollaborationRoleTaskModel) => (
                <TableRow
                  key={task.id}
                  className="group hover:bg-gray-50/30 transition-colors border-gray-200 cursor-pointer"
                  onClick={() =>
                    router.push(
                      `?modal=TaskDetails&taskId=${task.id}&collabId=${collaborationId}`
                    )
                  }
                >
                  <TableCell className="py-5 px-6 min-w-[300px]">
                    <div className="space-y-1">
                      <p className="font-bold text-gray-900 group-hover:text-blue-main transition-colors text-base">
                        {task.title || "Untitled Task"}
                      </p>
                      <p className="text-sm text-gray-400 font-medium line-clamp-1">
                        {task.description || "No description"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 px-6 text-center">
                    <span
                      className={cx(
                        "px-3 py-1.5 rounded-full text-xs font-bold border",
                        getStatusColor(task.status)
                      )}
                    >
                      {getStatusText(task.status)}
                    </span>
                  </TableCell>
                  <TableCell className="py-5 px-6 text-center">
                    <span
                      className={cx(
                        "px-3 py-1.5 rounded-full text-xs font-bold border",
                        getPriorityColor(task.priority)
                      )}
                    >
                      {getPriorityText(task.priority)}
                    </span>
                  </TableCell>
                  <TableCell className="py-5 px-6">
                    {task.juniorName ? (
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 border border-gray-200">
                          {task.juniorName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                        <span className="text-base font-bold text-gray-700">
                          {task.juniorName}
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
                        ? new Date(task.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "No due date"}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </EnhancedTable>
        </div>
      </MainCard>
    </div>
  );
}
