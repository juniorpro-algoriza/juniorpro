"use client";

import React, { useState, useMemo, useEffect } from "react";
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

type GetAdminCollaborationRoleJuniorsModel =
  components["schemas"]["Sawiha.Services.DTO.AdminCollaborationModels.GetRoleJuniorRequests.GetAdminCollaborationRoleJuniorsModel"];

interface TaskDetailsProps {
  taskId?: string;
  collabId?: string;
}

type ViewMode = "view" | "edit" | "requestChanges";

export const TaskDetails = ({ taskId, collabId }: TaskDetailsProps) => {
  const [mode, setMode] = useState<ViewMode>("view");
  const [rejectionReason, setRejectionReason] = useState("");

  // Data Fetching
  const {
    data: apiTask,
    isLoading: apiLoading,
    refetch,
  } = useGetCollaborationRoleTaskById(Number(taskId));

  // Mutations
  const updateTask = useUpdateCollaborationRoleTask();
  const acceptTask = useAcceptRoleTask();
  const rejectTask = useRejectRoleTask();

  const [editData, setEditData] = useState({
    status: 0,
    assignee: null as number | null,
    priority: 0,
    description: "",
    dueDate: null as string | null,
  });

  useEffect(() => {
    if (apiTask) {
      setEditData({
        status: apiTask.status || 1,
        assignee: apiTask.roleJuniorId || null,
        priority: apiTask.priority || 2,
        description: apiTask.description || "",
        dueDate: apiTask.dueDate || null,
      });
      if (apiTask.additionalNotes) {
        setRejectionReason(apiTask.additionalNotes);
      }
    }
  }, [apiTask]);

  // Fetch Assignees
  const { data: assignees } = useGetRoleAssignedJuniors({
    collaborationId: Number(collabId),
    roleId: apiTask?.collaborationRoleId || undefined,
  });

  const assigneeOptions = useMemo(() => {
    if (!assignees) return [];
    return assignees.map((j: GetAdminCollaborationRoleJuniorsModel) => ({
      label: j.juniorName || `Junior ${j.id}`,
      value: j.id || 0,
    }));
  }, [assignees]);

  const statusOptions = [
    { label: "Not Started", value: TASK_STATUS.NOT_STARTED },
    { label: "In Progress", value: TASK_STATUS.IN_PROGRESS },
    { label: "Submitted", value: TASK_STATUS.SUBMITTED },
  ];

  const priorityOptions = [
    { label: "Low", value: TASK_PRIORITY.LOW },
    { label: "Medium", value: TASK_PRIORITY.MEDIUM },
    { label: "High", value: TASK_PRIORITY.HIGH },
  ];

  const handleSaveChanges = async () => {
    if (!apiTask) return;

    try {
      await updateTask.mutateAsync({
        id: apiTask.id!,
        title: apiTask.title!,
        description: editData.description,
        priority: editData.priority as
          | typeof TASK_PRIORITY.LOW
          | typeof TASK_PRIORITY.MEDIUM
          | typeof TASK_PRIORITY.HIGH,
        status: editData.status as
          | typeof TASK_STATUS.NOT_STARTED
          | typeof TASK_STATUS.IN_PROGRESS
          | typeof TASK_STATUS.SUBMITTED,
        collaborationRoleId: apiTask.collaborationRoleId!,
        roleJuniorId: editData.assignee,
        dueDate: editData.dueDate || apiTask.dueDate,
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

  const onClose = () => window.history.back();

  if (apiLoading) {
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

  if (!apiTask) return null;

  const currentPriorityLabel =
    mode === "edit"
      ? TASK_PRIORITY_LABELS[
          editData.priority as keyof typeof TASK_PRIORITY_LABELS
        ] || "Medium"
      : TASK_PRIORITY_LABELS[
          apiTask.priority as keyof typeof TASK_PRIORITY_LABELS
        ] || "Medium";
  const currentStatusLabel =
    mode === "edit"
      ? TASK_STATUS_LABELS[
          editData.status as keyof typeof TASK_STATUS_LABELS
        ] || "Not Started"
      : TASK_STATUS_LABELS[apiTask.status as keyof typeof TASK_STATUS_LABELS] ||
        "Not Started";
  const currentAssigneeId =
    mode === "edit" ? editData.assignee : apiTask.roleJuniorId;
  const currentAssigneeName =
    assigneeOptions.find((a) => a.value === currentAssigneeId)?.label ||
    apiTask.juniorName ||
    null;

  const hasSubmittedFile = !!apiTask.submitedFile;
  const hasRequestedChanges = !!apiTask.additionalNotes;
  const isSubmitted = (apiTask.status || 0) === TASK_STATUS.SUBMITTED;

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
                {apiTask.title}
              </h2>

              {mode === "view" && (
                <Button
                  onClick={() => setMode("edit")}
                  intent="main"
                  size="mainDefault"
                  className="flex items-center gap-2"
                >
                  <Edit2 size={14} />
                  Edit Task
                </Button>
              )}

              {mode === "edit" && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setMode("view");
                      if (apiTask) {
                        setEditData({
                          status: apiTask.status || 1,
                          assignee: apiTask.roleJuniorId || null,
                          priority: apiTask.priority || 2,
                          description: apiTask.description || "",
                          dueDate: apiTask.dueDate || null,
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
                  apiTask.dueDate
                    ? new Date(apiTask.dueDate).toLocaleDateString("en-US", {
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
                {apiTask.description || "No description provided."}
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
                <div className="p-4 border border-gray-100 rounded-2xl bg-white">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-main shrink-0">
                        <FileText className="size-5" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-bold text-sm text-gray-900">
                          Project Submission
                        </p>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock size={11} />
                          Submitted on{" "}
                          {apiTask.dueDate
                            ? new Date(apiTask.dueDate).toLocaleDateString(
                                "en-CA"
                              )
                            : "N/A"}
                        </p>
                        <div className="flex items-center gap-3 pt-1">
                          {apiTask.projectLink && (
                            <a
                              href={apiTask.projectLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-blue-main text-xs font-bold hover:underline"
                            >
                              <LinkIcon size={12} />
                              View
                            </a>
                          )}
                          {apiTask.submitedFile && (
                            <a
                              href={apiTask.submitedFile}
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
                        <button
                          onClick={() => setMode("requestChanges")}
                          className="size-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors"
                          title="Request Changes"
                        >
                          <X size={18} />
                        </button>
                        <button
                          onClick={handleApprove}
                          disabled={acceptTask.isPending}
                          className="size-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors disabled:opacity-60"
                          title="Approve"
                        >
                          {acceptTask.isPending ? (
                            <span className="animate-spin">
                              <svg className="size-4" viewBox="0 0 24 24">
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                            </span>
                          ) : (
                            <Check size={18} />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {mode === "requestChanges" && (
                  <div className="space-y-3">
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
                        intent="dangerMain"
                        size="custom"
                        className="px-5 py-2 rounded-xl text-sm font-bold"
                      >
                        Send Request
                      </Button>
                      <button
                        onClick={() => {
                          setMode("view");
                          setRejectionReason(apiTask.additionalNotes || "");
                        }}
                        className="px-4 py-2 text-gray-500 font-bold text-sm hover:text-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {hasRequestedChanges && mode !== "requestChanges" && (
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-gray-900">
                      Requested Changes
                    </p>
                    <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-xl">
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                        {apiTask.additionalNotes}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          setRejectionReason(apiTask.additionalNotes || "");
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
