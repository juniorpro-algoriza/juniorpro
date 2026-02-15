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
import { components } from "../../../../api-schema";
import { Plus } from "lucide-react";

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
    <Modal panelClassName="w-full max-w-2xl p-6 bg-white rounded-2xl shadow-xl ">
      <div className="flex items-center gap-2  font-bold text-xl">
        <Plus size={24} className="text-blue-main" />
        <h2>Create New Task</h2>
      </div>
      <p className="text-gray-600 ">
        Define the task details and assign it to a team member
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="TASK TITLE"
          placeholder="e.g., Design Homepage"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={fieldErrors.title}
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

        <Textarea
          label="DESCRIPTION *"
          placeholder="e.g., Build and maintain the frontend UI, ensure responsive design..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          error={fieldErrors.description}
          className="min-h-[120px]"
        />

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            intent="main"
            size="mainDefault"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button
            intent="main2"
            size="mainDefault"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
