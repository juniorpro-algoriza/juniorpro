"use client";

import React, { useState } from "react";
import {
  Modal,
  Button,
  Input,
  Textarea,
  MainCard,
  FileUpload,
} from "@components";
import {
  User,
  Calendar,
  Circle,
  Trash2,
  Download,
  Link as LinkIcon,
  X,
  FileText,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { JUNIOR_COLLABORATIONS } from "@data/juniorCollaborations";
import { cx } from "@lib";

interface TaskDetailsProps {
  taskId?: string;
  collabId?: string;
}

const PRIORITY_STYLES = {
  High: "bg-red-50 text-red-600 border-red-100",
  Medium: "bg-orange-50 text-orange-600 border-orange-100",
  Low: "bg-blue-50 text-blue-600 border-blue-100",
};

const STATUS_ICONS = {
  "Not Started": <Circle className="size-5 text-gray-400" />,
  "In Progress": (
    <Circle className="size-5 text-orange-500 fill-orange-500/20" />
  ),
  Submitted: <CheckCircle2 className="size-5 text-green-500" />,
};

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
}: DeleteConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <Modal
      panelClassName="w-[95%] max-w-lg bg-white rounded-2xl sm:rounded-[32px] shadow-2xl p-6 sm:p-8"
      onClose={onClose}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900">Are you sure?</h3>
          <p className="text-gray-500 text-sm">
            This action cannot be undone. This will permanently delete the task
            <span className="font-bold text-gray-900"> "{taskTitle}" </span>
            and remove it from the project.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button
            intent="main"
            size="mainDefault"
            className="w-full sm:w-auto"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            intent="dangerMain"
            size="mainDefault"
            className="w-full sm:w-auto"
            onClick={onConfirm}
          >
            Delete Task
          </Button>
        </div>
      </div>
    </Modal>
  );
}; // Added missing component definition

export const TaskDetails = ({ taskId, collabId }: TaskDetailsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  // Find the task in mock data
  const collaboration = JUNIOR_COLLABORATIONS.find(
    (c) => c.id === Number(collabId)
  );
  const task = collaboration?.tasks.find((t) => t.id === Number(taskId));

  // Initialize status when task is loaded
  React.useEffect(() => {
    if (task) {
      setSelectedStatus(task.status);
    }
  }, [task]);

  if (!task) return null;

  const isSubmitted = task.status === "Submitted";

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      console.log(isSubmitting);
    }, 1500);
  };

  return (
    <>
      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          setShowDeleteConfirm(false);
          // Add delete logic here
        }}
        taskTitle={task.title}
      />

      <Modal panelClassName="w-[95%] max-w-4xl bg-white rounded-2xl sm:rounded-[32px] shadow-2xl overflow-hidden p-0 flex flex-col max-h-[90dvh] space-y-0">
        {/* Header - Fixed */}
        <div className="p-6 sm:p-10 pb-4 shrink-0">
          <div className="space-y-4">
            <div
              className={cx(
                "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border",
                PRIORITY_STYLES[task.priority]
              )}
            >
              {task.priority} Priority
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              {task.title}
            </h2>
          </div>
        </div>

        {/* Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 sm:pt-0 space-y-6 custom-scrollbar">
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoCard
              icon={<User className="size-5 text-gray-400" />}
              label="ASSIGNEE"
              value={task.assignee?.name || "Unassigned"}
            />
            <SelectableInfoCard
              icon={STATUS_ICONS[selectedStatus as keyof typeof STATUS_ICONS]}
              label="STATUS"
              value={selectedStatus}
              options={[
                { label: "Not Started", value: "Not Started" },
                { label: "In Progress", value: "In Progress" },
                { label: "Submitted", value: "Submitted" },
              ]}
              onChange={(val) => setSelectedStatus(val as string)}
            />
            <InfoCard
              icon={<Calendar className="size-5 text-gray-400" />}
              label="DEADLINE"
              value={task.dueDate}
            />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 tracking-widest uppercase ml-1">
              Description
            </label>
            <div className="p-5 bg-white border border-gray-100 rounded-2xl text-gray-600 text-sm leading-relaxed">
              {task.description}
            </div>
          </div>

          {/* Dynamic Content: Submission Form or Success or Submitted Work */}
          {isSuccess ? (
            <div className="space-y-6">
              <div className="p-6 sm:p-10 bg-blue-50/30 border border-blue-100 rounded-[32px] flex flex-col items-center text-center space-y-4">
                <div className="size-16 bg-blue-main rounded-3xl flex items-center justify-center shadow-lg shadow-blue-main/20">
                  <Clock className="size-8 text-white" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-gray-900">
                    Submission Received
                  </h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    Your work is in good hands! Our mentors are reviewing your
                    submission.
                  </p>
                </div>
              </div>
            </div>
          ) : isSubmitted ? (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 tracking-widest uppercase ml-1">
                  Submitted Work
                </label>
                <div className="p-4 border border-gray-100 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:border-blue-main/30 transition-colors">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="size-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-main">
                      <FileText className="size-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-sm text-gray-900">
                        Home Screen Page
                      </p>
                      <p className="text-xs text-gray-400">13 Jan 2024 14:20</p>
                      <button className="flex items-center gap-1.5 text-blue-main text-xs font-bold hover:underline mt-1">
                        <LinkIcon size={12} />
                        View project link
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:justify-start">
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="size-10 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                    <button className="size-10 rounded-xl hover:bg-blue-50 text-gray-400 hover:text-blue-main flex items-center justify-center transition-colors">
                      <Download size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 tracking-widest uppercase ml-1">
                  Submission
                </label>
                <MainCard classname=" border-gray-100 space-y-2 relative overflow-hidden">
                  <div className="space-y-2 relative z-10">
                    <Input
                      label={"Project Link"}
                      placeholder="https://github.com/username/project"
                      className="bg-white border-gray-100 italic text-sm"
                    />
                    <Textarea
                      label={"Additional Notes"}
                      placeholder="Describe your solution, challenges you faced, or anything else you'd like to share..."
                      className="bg-white border-gray-100 min-h-[120px] text-sm"
                    />

                    <FileUpload
                      label="Attachment"
                      onFileSelect={(file: File | null) =>
                        console.log("Selected file:", file)
                      }
                    />
                  </div>
                </MainCard>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions - Fixed (only show if not success and not submitted) */}
        {!isSuccess && !isSubmitted && (
          <div className="p-6 sm:p-8 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 shrink-0">
            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-8 sm:px-10 py-3 text-gray-600 font-bold hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <Button
              intent="main2"
              size="mainDefault"
              className="w-full sm:w-auto px-8 sm:px-10 rounded-2xl shadow-lg shadow-blue-main/20 font-bold"
              onClick={handleSubmit}
            >
              Submit Task
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoCard = ({ icon, label, value }: InfoCardProps) => (
  <div className="p-4 border border-gray-100 rounded-[20px] bg-white flex items-center gap-4 group hover:border-blue-main/10 transition-colors">
    <div className="size-10 bg-gray-50 flex items-center justify-center rounded-xl text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-main transition-colors">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-bold text-gray-300 tracking-wider uppercase">
        {label}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-gray-900 truncate uppercase mt-0.5">
          {value}
        </p>
      </div>
    </div>
  </div>
);

interface SelectableInfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  options: { label: string; value: string | number }[];
  onChange: (value: string | number) => void;
}

const SelectableInfoCard = ({
  icon,
  label,
  value,
  options,
  onChange,
}: SelectableInfoCardProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 border border-gray-100 rounded-[20px] bg-white flex items-center gap-4 group hover:border-blue-main/10 transition-colors cursor-pointer"
      >
        <div className="size-10 bg-gray-50 flex items-center justify-center rounded-xl text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-main transition-colors">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-gray-300 tracking-wider uppercase">
            {label}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-gray-900 truncate uppercase mt-0.5">
              {selectedOption?.label || value}
            </p>
            <X
              className={cx(
                "size-4 text-gray-300 rotate-45 transition-transform duration-300",
                isOpen && "rotate-0"
              )}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-2xl shadow-lg border border-gray-100 py-1 max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cx(
                "w-full text-left px-4 py-2.5 text-sm font-medium transition-colors",
                option.value === value
                  ? "bg-blue-50 text-blue-main"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
