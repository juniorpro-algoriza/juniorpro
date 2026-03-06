"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import { Modal, Button, Skeleton, Textarea } from "@components";
import {
  User,
  Calendar,
  Download,
  Link as LinkIcon,
  X,
  FileText,
  Clock,
  Check,
  Edit2,
  Zap,
  Trash2,
} from "lucide-react";
import { cx } from "@lib";
import {
  useGetCollaborationRoleTaskById,
  useGetRoleAssignedJuniors,
  useAcceptRoleTask,
  useRejectRoleTask,
  useUpdateCollaborationRoleTask,
  useDeleteCollaborationRoleTask,
} from "../../../tanstack/collaborations";
import {
  TASK_STATUS_LABELS,
  TASK_PRIORITY_LABELS,
  TASK_STATUS,
  TASK_PRIORITY,
} from "../../../../../../configs/constants";
import { toast } from "sonner";
import { components } from "../../../../../../../api-schema";
import {
  PRIORITY_STYLES,
  PRIORITY_ICON_COLORS,
  STATUS_DOT_COLORS,
} from "./constants";
import { InfoCard } from "./InfoCard";
import { SelectableInfoCard } from "./SelectableInfoCard";
import { SelectableDateCard } from "./SelectableDateCard";

type EnablerLookupModel =
  components["schemas"]["Sawiha.Services.DTO.Enablers.EnablerLookupModel"];

interface TaskDetailsProps {
  taskId?: string;
}

type ViewMode = "view" | "edit" | "requestChanges";

export const TaskDetails = ({ taskId }: TaskDetailsProps) => {
  const params = useParams();
  const collabId = params.id as string;
  const [mode, setMode] = useState<ViewMode>("view");
  const [rejectionReason, setRejectionReason] = useState("");

  // Data Fetching
  const {
    data: task,
    isLoading: loading,
    refetch,
  } = useGetCollaborationRoleTaskById(Number(taskId));

  // Mutations
  const updateTask = useUpdateCollaborationRoleTask();
  const acceptTask = useAcceptRoleTask();
  const rejectTask = useRejectRoleTask();
  const deleteTask = useDeleteCollaborationRoleTask();

  const [editData, setEditData] = useState({
    status: 0,
    assignee: null as number | null,
    priority: 0,
    description: "",
    dueDate: null as string | null,
  });

  useEffect(() => {
    if (task) {
      setEditData({
        status: task.status || 1,
        assignee: task.roleJuniorId || null,
        priority: task.priority || 2,
        description: task.description || "",
        dueDate: task.dueDate || null,
      });
      if (task.additionalNotes) {
        setRejectionReason(task.additionalNotes);
      }
    }
  }, [task]);

  // Fetch Assignees
  const { data: assignees } = useGetRoleAssignedJuniors({
    collaborationId: Number(collabId),
    roleId: task?.collaborationRoleId || undefined,
  });

  const assigneeOptions = useMemo(() => {
    if (!assignees) return [];
    return assignees.map((j: EnablerLookupModel) => ({
      label: j.nameEn || j.nameAr || `Junior ${j.id}`,
      value: j.id || 0,
    }));
  }, [assignees]);

  const statusOptions = [
    { label: "Not Started", value: TASK_STATUS.NOT_STARTED },
    { label: "In Progress", value: TASK_STATUS.IN_PROGRESS },
  ];

  const priorityOptions = [
    { label: "Low", value: TASK_PRIORITY.LOW },
    { label: "Medium", value: TASK_PRIORITY.MEDIUM },
    { label: "High", value: TASK_PRIORITY.HIGH },
  ];

  const handleSaveChanges = async () => {
    if (!task) return;

    try {
      await updateTask.mutateAsync({
        id: task.id!,
        title: task.title!,
        description: editData.description,
        priority: editData.priority as
          | typeof TASK_PRIORITY.LOW
          | typeof TASK_PRIORITY.MEDIUM
          | typeof TASK_PRIORITY.HIGH,
        status: editData.status as
          | typeof TASK_STATUS.NOT_STARTED
          | typeof TASK_STATUS.IN_PROGRESS
          | typeof TASK_STATUS.UNDER_REVIEW
          | typeof TASK_STATUS.REJECTED
          | typeof TASK_STATUS.COMPLETED,
        collaborationRoleId: task.collaborationRoleId!,
        roleJuniorId: editData.assignee,
        dueDate: editData.dueDate || task.dueDate,
      });
      toast.success("Task updated successfully");
      setMode("view");
      refetch();
    } catch {
      toast.error("Failed to update task");
    }
  };

  const handleApprove = async () => {
    if (!taskId) return;
    try {
      await acceptTask.mutateAsync({ id: Number(taskId) });
      toast.success("Task approved successfully");
      refetch();
    } catch {
      toast.error("Failed to approve task");
    }
  };

  const handleReject = async () => {
    if (!taskId || !rejectionReason.trim()) return;
    try {
      await rejectTask.mutateAsync({
        id: Number(taskId),
        actionReason: rejectionReason,
      });
      toast.success("Changes requested successfully");
      setMode("view");
      refetch();
    } catch {
      toast.error("Failed to request changes");
    }
  };

  const handleDeleteRequest = async () => {
    if (!taskId) return;
    try {
      await rejectTask.mutateAsync({ id: Number(taskId), actionReason: "" });
      setRejectionReason("");
      toast.success("Request deleted");
      refetch();
    } catch {
      toast.error("Failed to delete request");
    }
  };

  const handleDeleteTask = async () => {
    if (!taskId) return;
    try {
      await deleteTask.mutateAsync(Number(taskId));
      toast.success("Task deleted successfully");
      onClose();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const onClose = () => window.history.back();

  if (loading) {
    return (
      <Modal
        panelClassName="w-[95%] rounded-2xl max-w-4xl p-10"
        onClose={onClose}
      >
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-10 w-2/3" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Skeleton className="h-20 rounded-2xl" />
            <Skeleton className="h-20 rounded-2xl" />
            <Skeleton className="h-20 rounded-2xl" />
            <Skeleton className="h-20 rounded-2xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </Modal>
    );
  }

  if (!task) return null;

  const currentPriorityLabel =
    mode === "edit"
      ? TASK_PRIORITY_LABELS[
          editData.priority as keyof typeof TASK_PRIORITY_LABELS
        ] || "Medium"
      : TASK_PRIORITY_LABELS[
          task.priority as keyof typeof TASK_PRIORITY_LABELS
        ] || "Medium";
  const currentStatusLabel =
    mode === "edit"
      ? TASK_STATUS_LABELS[
          editData.status as keyof typeof TASK_STATUS_LABELS
        ] || "Not Started"
      : TASK_STATUS_LABELS[task.status as keyof typeof TASK_STATUS_LABELS] ||
        "Not Started";
  const currentAssigneeId =
    mode === "edit" ? editData.assignee : task.roleJuniorId;
  const currentAssigneeName =
    assigneeOptions.find((a) => a.value === currentAssigneeId)?.label ||
    task.juniorName ||
    null;

  const hasSubmittedFile = !!task.submitedFile;
  const hasRequestedChanges = !!task.additionalNotes;
  const isSubmitted = (task.status || 0) === TASK_STATUS.UNDER_REVIEW;
  const canEdit =
    task.status === TASK_STATUS.NOT_STARTED ||
    task.status === TASK_STATUS.IN_PROGRESS;

  return (
    <>
      <Modal
        panelClassName="w-[95%] max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden p-0 flex flex-col max-h-[90dvh] space-y-0"
        onClose={onClose}
      >
        {/* Header */}
        <div className="p-6 pb-0 shrink-0">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className={cx(
                  "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border",
                  PRIORITY_STYLES[
                    currentPriorityLabel as keyof typeof PRIORITY_STYLES
                  ]
                )}
              >
                {currentPriorityLabel} Priority
              </div>
              <div className="h-4 w-px bg-gray-200"></div>
              <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                Challenge Task
              </p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                {task.title}
              </h2>

              {mode === "view" && canEdit && (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleDeleteTask}
                    intent="dangerMain"
                    size="mainDefault"
                    isLoading={deleteTask.isPending}
                    icon={<Trash2 size={14} />}
                    iconPosition="left"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => setMode("edit")}
                    intent="main"
                    size="mainDefault"
                    icon={<Edit2 size={14} />}
                    iconPosition="left"
                  >
                    Edit Task
                  </Button>
                </div>
              )}

              {mode === "edit" && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setMode("view");
                      if (task) {
                        setEditData({
                          status: task.status || 1,
                          assignee: task.roleJuniorId || null,
                          priority: task.priority || 2,
                          description: task.description || "",
                          dueDate: task.dueDate || null,
                        });
                      }
                    }}
                    className="px-4 py-2 text-gray-500 font-bold text-sm hover:text-gray-700 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <Button
                    intent="successMain"
                    size="custom"
                    className="px-5 py-2 rounded-xl text-sm font-bold"
                    onClick={handleSaveChanges}
                    isLoading={updateTask.isPending}
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <hr className="my-3 border-gray-50 w-[95%] mx-auto" />

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5 custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {mode === "edit" ? (
              <SelectableInfoCard
                icon={
                  editData.assignee ? (
                    <div className="size-full flex items-center justify-center text-[10px] font-bold text-violet-600">
                      {assigneeOptions
                        .find((a) => a.value === editData.assignee)
                        ?.label.split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase() || "UN"}
                    </div>
                  ) : (
                    <User className="size-4 text-violet-400" />
                  )
                }
                label="ASSIGNEE"
                value={editData.assignee}
                options={assigneeOptions}
                onChange={(val) =>
                  setEditData((prev) => ({ ...prev, assignee: val as number }))
                }
                placeholder="Unassigned"
                iconBg="bg-[#ECEBFF]"
              />
            ) : (
              <InfoCard
                icon={
                  currentAssigneeName ? (
                    <div className="size-full flex items-center justify-center text-[10px] font-bold text-violet-600">
                      {currentAssigneeName
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                  ) : (
                    <User className="size-4 text-violet-400" />
                  )
                }
                label="ASSIGNEE"
                value={currentAssigneeName || "Unassigned"}
                iconBg="bg-[#ECEBFF]"
              />
            )}

            {mode === "edit" ? (
              <SelectableInfoCard
                icon={
                  <div
                    className={cx(
                      "size-3 rounded-full border-2 border-white shadow-sm",
                      STATUS_DOT_COLORS[
                        currentStatusLabel as keyof typeof STATUS_DOT_COLORS
                      ] || "bg-gray-400"
                    )}
                  />
                }
                label="STATUS"
                value={editData.status}
                options={statusOptions}
                onChange={(val) =>
                  setEditData((prev) => ({ ...prev, status: val as number }))
                }
                iconBg="bg-gray-50"
              />
            ) : (
              <InfoCard
                icon={
                  <div
                    className={cx(
                      "size-3 rounded-full border-2 border-white shadow-sm",
                      STATUS_DOT_COLORS[
                        currentStatusLabel as keyof typeof STATUS_DOT_COLORS
                      ] || "bg-gray-400"
                    )}
                  />
                }
                label="STATUS"
                value={currentStatusLabel}
                iconBg="bg-gray-50"
              />
            )}

            {mode === "edit" ? (
              <SelectableDateCard
                icon={<Calendar className="size-4 text-orange-500" />}
                label="DEADLINE"
                value={editData.dueDate}
                onChange={(val) =>
                  setEditData((prev) => ({ ...prev, dueDate: val }))
                }
                iconBg="bg-orange-50"
              />
            ) : (
              <InfoCard
                icon={<Calendar className="size-4 text-orange-500" />}
                label="DEADLINE"
                value={
                  task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "No deadline"
                }
                iconBg="bg-orange-50"
              />
            )}

            {mode === "edit" ? (
              <SelectableInfoCard
                icon={
                  <Zap
                    className={cx(
                      "size-4",
                      PRIORITY_ICON_COLORS[currentPriorityLabel] ||
                        "text-orange-500"
                    )}
                  />
                }
                label="PRIORITY"
                value={editData.priority}
                options={priorityOptions}
                onChange={(val) =>
                  setEditData((prev) => ({ ...prev, priority: val as number }))
                }
                iconBg={
                  currentPriorityLabel === "High"
                    ? "bg-red-50"
                    : currentPriorityLabel === "Low"
                      ? "bg-blue-50"
                      : "bg-orange-50"
                }
              />
            ) : (
              <InfoCard
                icon={
                  <Zap
                    className={cx(
                      "size-4",
                      PRIORITY_ICON_COLORS[currentPriorityLabel] ||
                        "text-orange-500"
                    )}
                  />
                }
                label="PRIORITY"
                value={currentPriorityLabel}
                iconBg={
                  currentPriorityLabel === "High"
                    ? "bg-red-50"
                    : currentPriorityLabel === "Low"
                      ? "bg-blue-50"
                      : "bg-orange-50"
                }
              />
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 tracking-widest uppercase ml-1">
              Description
            </label>
            {mode === "edit" ? (
              <Textarea
                value={editData.description}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="bg-white border-gray-100 min-h-[120px]"
                placeholder="Describe the task..."
              />
            ) : (
              <div className="p-4 bg-white border border-gray-100 rounded-xl text-gray-600 text-sm leading-relaxed">
                {task.description || "No description provided."}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-500 tracking-widest uppercase ml-1">
                Submitted Work
              </label>
            </div>

            {hasSubmittedFile ? (
              <div className="space-y-4">
                <div className=" border border-gray-100 rounded-2xl bg-orange-50/30">
                  <div className="flex items-start justify-between gap-3 p-4 bg-white border-b border-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="size-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-main shrink-0">
                        <FileText className="size-5" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-bold text-sm text-gray-900">
                          Project Submission
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock size={11} />
                          Submitted on{" "}
                          {task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString("en-CA")
                            : "N/A"}
                        </p>
                        <div className="flex items-center gap-3 pt-1">
                          {task.projectLink && (
                            <a
                              href={task.projectLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-blue-main text-xs font-bold hover:underline"
                            >
                              <LinkIcon size={12} />
                              View
                            </a>
                          )}
                          {task.submitedFile && (
                            <a
                              href={task.submitedFile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-blue-main text-xs font-bold hover:underline"
                            >
                              <Download size={12} />
                              Download
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {mode === "view" && isSubmitted && !hasRequestedChanges && (
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="relative group">
                          <Button
                            onClick={() => setMode("requestChanges")}
                            intent="warningMain"
                            size="custom"
                            className=" size-12 rounded-2xl"
                          >
                            <X size={18} />
                          </Button>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-orange-500 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                              <div className="border-4 border-transparent border-t-orange-500"></div>
                            </div>
                            Request changes to submitted work
                          </div>
                        </div>
                        <div className="relative group">
                          <Button
                            onClick={handleApprove}
                            disabled={acceptTask.isPending}
                            intent="successMain"
                            size="custom"
                            className=" size-12 rounded-2xl"
                            isLoading={acceptTask.isPending}
                          >
                            <Check size={18} />
                          </Button>
                          <div className="absolute bottom-full -right-3 mb-2 px-3 py-2 bg-green-500 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                              <div className="border-4 border-transparent border-t-green-500"></div>
                            </div>
                            Approve submitted work
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {mode === "requestChanges" && (
                    <div className="space-y-3 p-4">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-gray-900">
                          Request Changes
                        </p>
                        <p className="text-xs text-gray-400">
                          Describe what needs to be fixed or improved
                        </p>
                      </div>
                      <textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="1. Fix the color contrast...&#10;2. Check mobile responsiveness..."
                        className="w-full min-h-[100px] p-4 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue-main focus:ring-1 focus:ring-blue-main/20 transition-all text-sm outline-none resize-none"
                      />
                      <div className="flex items-center gap-3">
                        <Button
                          onClick={handleReject}
                          isLoading={rejectTask.isPending}
                          disabled={!rejectionReason.trim()}
                          intent="warningMain"
                          size="custom"
                          className="px-5 py-2 rounded-xl text-sm font-bold"
                        >
                          Send Request
                        </Button>
                        <button
                          onClick={() => {
                            setMode("view");
                            setRejectionReason(task.additionalNotes || "");
                          }}
                          className="px-4 py-2 text-gray-500 font-bold text-sm hover:text-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {hasRequestedChanges && mode !== "requestChanges" && (
                    <div className="space-y-4 p-4">
                      <p className="text-sm font-bold text-gray-900">
                        Requested Changes
                      </p>
                      <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-xl">
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                          {task.additionalNotes}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => {
                            setRejectionReason(task.additionalNotes || "");
                            setMode("requestChanges");
                          }}
                          className="flex items-center gap-1.5 text-blue-main text-xs font-bold hover:underline"
                        >
                          <Edit2 size={12} />
                          Edit Request
                        </button>
                        <button
                          onClick={handleDeleteRequest}
                          className="flex items-center gap-1.5 text-red-500 text-xs font-bold hover:underline"
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 border border-dashed border-gray-200 rounded-2xl flex flex-col items-center text-center space-y-2 bg-gray-50/50">
                <Clock className="size-7 text-gray-300" />
                <div>
                  <p className="font-bold text-gray-800 text-sm">
                    No Deliverable Submitted Yet
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Once Juniors submit their tasks it will show here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
