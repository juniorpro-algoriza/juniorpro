"use client";

import React from "react";
import {
  Modal,
  Button,
  Input,
  Textarea,
  Select,
  DatePicker,
} from "@components";
import { useCreateTask } from "../../../(pages)/(loged-in)/admin/collaborations/_hooks/useCreateTask";
import { useGetCollaborationRoles } from "../../../(pages)/(loged-in)/admin/tanstack/collaborations";
import { Plus, X } from "lucide-react";
import { components } from "../../../../api-schema";

interface CreateTaskProps {
  collaborationId: string;
}

export const CreateTask = ({ collaborationId }: CreateTaskProps) => {
  const collabId = parseInt(collaborationId);
  const { formData, setFormData, fieldErrors, isSubmitting, handleSubmit } =
    useCreateTask(collabId);

  const { data: rolesResponse, isLoading: rolesLoading } =
    useGetCollaborationRoles(collabId);
  const roles = rolesResponse?.data || [];

  const roleOptions = roles
    .filter((role) => role.id !== undefined)
    .map(
      (
        role: components["schemas"]["Sawiha.Services.DTO.CollaborationRoleModels.GetAll.GetAllCollaborationRoleModel"]
      ) => ({
        label: role.description || `Role ${role.id}`,
        value: role.id!.toString(),
      })
    );

  // Assignee options should ideally be filtered by role, but since we don't have the list,
  // we'll use a placeholder or check if any role has juniorsJoined info we can use.
  // For now, let's keep it simple as per image.
  const assigneeOptions = [
    { label: "Select team member", value: "" },
    // This would be populated from an API normally
  ];

  const priorityOptions = [
    { label: "Low", value: "1" },
    { label: "Medium", value: "2" },
    { label: "High", value: "3" },
  ];

  return (
    <Modal panelClassName="w-[95%] max-w-2xl bg-white rounded-[32px] shadow-2xl p-0 overflow-hidden">
      {/* Header */}
      <div className="p-8 pb-4 flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-main font-bold text-xl">
            <Plus size={24} />
            <h2>Create New Task</h2>
          </div>
          <p className="text-gray-500 text-sm">
            Define the task details and assign it to a team member
          </p>
        </div>
        <button
          onClick={() => window.history.back()}
          className="p-2 hover:bg-gray-50 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-400" />
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-8 pt-4 space-y-6 max-h-[70dvh] overflow-y-auto custom-scrollbar"
      >
        <Input
          label="TASK TITLE"
          placeholder="e.g., Design Homepage"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={fieldErrors.title}
          className="bg-white border-gray-200 rounded-2xl"
        />

        <Select
          label="ROLE"
          placeholder="Select role"
          options={roleOptions}
          value={formData.roleId}
          onChange={(val) =>
            setFormData({ ...formData, roleId: val.toString() })
          }
          error={fieldErrors.roleId}
          loading={rolesLoading}
        />

        <Select
          label="ASSIGNEE"
          placeholder="Select team member"
          options={assigneeOptions}
          value={formData.juniorId || ""}
          onChange={(val) =>
            setFormData({ ...formData, juniorId: val.toString() })
          }
          error={fieldErrors.juniorId}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="PRIORITY"
            placeholder="Select priority"
            options={priorityOptions}
            value={formData.priority}
            onChange={(val) =>
              setFormData({ ...formData, priority: val.toString() })
            }
            error={fieldErrors.priority}
          />

          <DatePicker
            label="DUE DATE"
            value={formData.dueDate || undefined}
            onChange={(date) =>
              setFormData({ ...formData, dueDate: date || null })
            }
            error={fieldErrors.dueDate}
          />
        </div>

        <Textarea
          label="DESCRIPTION *"
          placeholder="e.g., Build and maintain the frontend UI, ensure responsive design..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          error={fieldErrors.description}
          className="bg-white border-gray-200 rounded-2xl min-h-[120px]"
        />
      </form>

      {/* Footer */}
      <div className="p-8 border-t border-gray-50 flex items-center justify-end gap-4">
        <Button
          intent="main"
          size="mainDefault"
          onClick={() => window.history.back()}
          className="px-8 border-gray-200 text-gray-600 hover:text-gray-900"
        >
          Cancel
        </Button>
        <Button
          intent="main2"
          size="mainDefault"
          onClick={handleSubmit}
          className="px-8 rounded-full shadow-lg shadow-blue-main/20"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Task"}
        </Button>
      </div>
    </Modal>
  );
};
