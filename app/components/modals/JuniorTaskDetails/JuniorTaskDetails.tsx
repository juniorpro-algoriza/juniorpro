"use client";

import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Textarea, Skeleton } from "@components";
import { FileUpload } from "../../FileUpload";
import {
  User,
  Calendar,
  Download,
  Link as LinkIcon,
  FileText,
  Clock,
  Zap,
} from "lucide-react";
import { cx } from "@lib";
import {
  useJuniorRoleTaskDetails,
  useSubmitJuniorTask,
  useChangeJuniorTaskStatus,
} from "../../../(pages)/(loged-in)/junior/tanstack/collaborations";
import {
  TASK_STATUS_LABELS,
  TASK_PRIORITY_LABELS,
  TASK_STATUS,
} from "../../../configs/constants";
import {
  PRIORITY_STYLES,
  PRIORITY_ICON_COLORS,
  STATUS_DOT_COLORS,
} from "../../../(pages)/(loged-in)/admin/collaborations/_components/task-details-modal/constants";
import { InfoCard } from "../../../(pages)/(loged-in)/admin/collaborations/_components/task-details-modal/InfoCard";
import { SelectableInfoCard } from "../../../(pages)/(loged-in)/admin/collaborations/_components/task-details-modal/SelectableInfoCard";
import { toast } from "sonner";
import { z } from "zod";

const submitSchema = z
  .object({
    projectLink: z
      .string()
      .trim()
      .transform((val) =>
        val ? (val.startsWith("http") ? val : `https://${val}`) : ""
      )
      .pipe(
        z.union([
          z.literal(""),
          z.string().url("Please enter a valid project link"),
        ])
      ),
    additionalNotes: z.string().optional(),
    hasFile: z.boolean(),
    hasExistingFile: z.boolean(),
  })
  .refine((data) => data.projectLink || data.hasFile || data.hasExistingFile, {
    message: "Please provide a project link or attach a file",
    path: ["projectLink"],
  });

interface JuniorTaskDetailsProps {
  taskId?: string;
}

export const JuniorTaskDetails = ({ taskId }: JuniorTaskDetailsProps) => {
  const {
    data: task,
    isLoading: loading,
    refetch,
  } = useJuniorRoleTaskDetails(Number(taskId));

  const submitTask = useSubmitJuniorTask();
  const changeStatus = useChangeJuniorTaskStatus();

  const [projectLink, setProjectLink] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [initialized, setInitialized] = useState(false);

  const taskStatus = task?.status || 0;

  // Pre-fill inputs with existing task data (e.g. for resubmission after rejection)
  useEffect(() => {
    if (!initialized && task) {
      setProjectLink(task.projectLink || "");
      setAdditionalNotes(task.additionalNotes || "");
      setInitialized(true);
    }
  }, [initialized, task, taskStatus]);

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
    TASK_PRIORITY_LABELS[task.priority as keyof typeof TASK_PRIORITY_LABELS] ||
    "Medium";
  const currentStatusLabel =
    TASK_STATUS_LABELS[task.status as keyof typeof TASK_STATUS_LABELS] ||
    "Not Started";
  const currentAssigneeName = task.juniorName || null;

  const hasRequestedChanges = !!task.actionReason;
  const isAssigned = !!task.roleJuniorId;

  const isSubmittable =
    isAssigned &&
    (taskStatus === TASK_STATUS.NOT_STARTED ||
      taskStatus === TASK_STATUS.IN_PROGRESS ||
      taskStatus === TASK_STATUS.REJECTED);
  const isNotStarted = isAssigned && taskStatus === TASK_STATUS.NOT_STARTED;
  const isInProgress = isAssigned && taskStatus === TASK_STATUS.IN_PROGRESS;
  const canChangeStatus = isNotStarted || isInProgress;
  const isUnderReview = taskStatus === TASK_STATUS.UNDER_REVIEW;
  const isCompleted = taskStatus === TASK_STATUS.COMPLETED;

  const handleChangeStatus = async (status: 1 | 2 | 3 | 4 | 5) => {
    if (!taskId) return;
    try {
      await changeStatus.mutateAsync({ id: Number(taskId), status });
      toast.success("Task status updated");
      refetch();
    } catch {
      toast.error("Failed to update task status");
    }
  };

  const handleSubmit = async () => {
    if (!taskId) return;

    const result = submitSchema.safeParse({
      projectLink: projectLink || "",
      additionalNotes,
      hasFile: !!file,
      hasExistingFile: !!task?.submitedFile,
    });
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    try {
      await submitTask.mutateAsync({
        id: Number(taskId),
        projectLink: result.data.projectLink || undefined,
        additionalNotes: result.data.additionalNotes || undefined,
        file: file || undefined,
      });
      toast.success("Task submitted successfully");
      refetch();
    } catch {
      toast.error("Failed to submit task");
    }
  };

  return (
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

          <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
            {task.title}
          </h2>
        </div>
      </div>
      <hr className="my-3 border-gray-50 w-[95%] mx-auto" />

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5 custom-scrollbar">
        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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

          {canChangeStatus ? (
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
              value={taskStatus}
              options={[
                { label: "Not Started", value: TASK_STATUS.NOT_STARTED },
                { label: "In Progress", value: TASK_STATUS.IN_PROGRESS },
              ]}
              onChange={(val) => handleChangeStatus(val as 1 | 2)}
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
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 tracking-widest uppercase ml-1">
            Description
          </label>
          <div className="p-4 bg-white border border-gray-100 rounded-xl text-gray-600 text-sm leading-relaxed">
            {task.description || "No description provided."}
          </div>
        </div>

        {/* Requested Changes (shown for rejected tasks) */}
        {hasRequestedChanges && taskStatus === TASK_STATUS.REJECTED && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 tracking-widest uppercase ml-1">
              Requested Changes
            </label>
            <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-xl">
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {task.actionReason}
              </p>
            </div>
          </div>
        )}

        {/* Submitted Work (shown for under review / completed) */}
        {(isUnderReview || isCompleted) && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 tracking-widest uppercase ml-1">
              Submitted Work
            </label>
            <div className="border border-gray-100 rounded-2xl bg-white">
              <div className="flex items-start justify-between gap-3 p-4">
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
                      {task.submissionDate
                        ? new Date(task.submissionDate).toLocaleDateString(
                            "en-CA"
                          )
                        : "N/A"}
                    </p>
                    {task.additionalNotes && (
                      <p className="text-xs text-gray-500 pt-1 max-w-sm">
                        <span className="font-bold text-gray-600">
                          Additional Notes:
                        </span>{" "}
                        {task.additionalNotes}
                      </p>
                    )}
                    <div className="flex items-center gap-3 pt-1">
                      {task.projectLink && (
                        <a
                          href={
                            task.projectLink.startsWith("http")
                              ? task.projectLink
                              : `https://${task.projectLink}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-blue-main text-xs font-bold hover:underline"
                        >
                          <LinkIcon size={12} />
                          View Project
                        </a>
                      )}
                      {task.submitedFile && (
                        <a
                          href={
                            task.submitedFile.startsWith("http")
                              ? task.submitedFile
                              : `https://${task.submitedFile}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-blue-main text-xs font-bold hover:underline"
                        >
                          <Download size={12} />
                          Download File
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {isCompleted && (
                  <div className="size-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                    <svg
                      className="size-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Submission Form (shown for submittable states) */}
        {isSubmittable && (
          <div className="space-y-4">
            <label className="text-xs font-bold text-gray-500 tracking-widest uppercase ml-1">
              Submission
            </label>

            <div className="space-y-4">
              <Input
                label="PROJECT LINK"
                placeholder="https://github.com/username/project"
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
              />

              <Textarea
                label="ADDITIONAL NOTES"
                placeholder="Describe your solution, challenges you faced, or anything else you'd like to share..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="resize-none min-h-[100px]"
              />

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 tracking-widest uppercase ml-1">
                  Attachment
                </label>
                {task.submitedFile && !file && (
                  <div className="flex items-center gap-3 p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                    <FileText className="size-4 text-blue-main shrink-0" />
                    <p className="text-xs text-gray-600 flex-1 truncate">
                      {task.submitedFile.split(/[/\\]/).pop()}
                    </p>
                    <a
                      href={
                        task.submitedFile.startsWith("http")
                          ? task.submitedFile
                          : `https://${task.submitedFile}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-main text-xs font-bold hover:underline shrink-0"
                    >
                      <Download size={12} />
                      Download
                    </a>
                  </div>
                )}
                <FileUpload onFileSelect={setFile} maxSizeMB={10} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {isSubmittable && (
        <div className="p-6 border-t border-gray-50 flex items-center justify-end gap-3 shrink-0">
          <Button
            intent="main"
            size="mainDefault"
            className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-500 font-bold px-8 rounded-2xl"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            intent="main2"
            size="mainDefault"
            className="px-8 rounded-2xl shadow-lg shadow-blue-main/20 font-bold"
            onClick={handleSubmit}
            isLoading={submitTask.isPending}
          >
            Submit Task
          </Button>
        </div>
      )}
    </Modal>
  );
};
