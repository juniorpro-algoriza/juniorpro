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
import {
  useGetCollaborationRoles,
  useGetRoleAssignedJuniors,
} from "../../../(pages)/(loged-in)/admin/tanstack/collaborations";
import { components } from "../../../../api-schema";
import { Plus } from "lucide-react";
import { getTaskPriorityOptions } from "../../../configs/constants";

type EnablerLookupModel =
  components["schemas"]["Sawiha.Services.DTO.Enablers.EnablerLookupModel"];

interface CreateTaskProps {
  collaborationId?: string;
  [key: string]: string | null | undefined;
}

export const CreateTask = (props: CreateTaskProps) => {
  const collaborationId = props.collaborationId || "";
  const collabId = parseInt(collaborationId);
  const { formData, setFormData, fieldErrors, isSubmitting, handleSubmit } =
    useCreateTask(collabId);

  const { data: rolesResponse, isLoading: rolesLoading } =
    useGetCollaborationRoles(collabId);
  const roles = rolesResponse?.data || [];

  const { data: assigneeResponse, isLoading: assigneeLoading } =
    useGetRoleAssignedJuniors({
      collaborationId: collabId,
      roleId: parseInt(formData.roleId) || undefined,
    });

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

  const assigneeOptions =
    assigneeResponse?.map((item: EnablerLookupModel) => ({
      label: item.nameEn || item.nameAr || `Junior ${item.id}`,
      value: item.id!.toString(),
    })) || [];

  const priorityOptions = getTaskPriorityOptions();

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
        <div className="space-y-4 h-[400px] overflow-y-scroll px-1">
          <Input
            label="TASK TITLE *"
            placeholder="e.g., Design Homepage"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            error={fieldErrors.title}
          />

          <Select
            label="ROLE *"
            placeholder="Select role"
            options={roleOptions}
            value={formData.roleId}
            onChange={(val) =>
              setFormData({
                ...formData,
                roleId: val.toString(),
                juniorId: null,
              })
            }
            error={fieldErrors.roleId}
            loading={rolesLoading}
          />

          <Select
            label="ASSIGNEE (Optional)"
            placeholder={
              !formData.roleId
                ? "Select role first"
                : assigneeLoading
                  ? "Getting assignees..."
                  : assigneeOptions.length === 0
                    ? "No assignees available for this role"
                    : "Select team member"
            }
            options={assigneeOptions}
            value={formData.juniorId || ""}
            onChange={(val) =>
              setFormData({ ...formData, juniorId: val.toString() })
            }
            error={fieldErrors.juniorId}
            disabled={!formData.roleId || assigneeOptions.length === 0}
            loading={assigneeLoading}
          />

          <Select
            label="PRIORITY *"
            placeholder="Select priority"
            options={priorityOptions}
            value={formData.priority}
            onChange={(val) =>
              setFormData({ ...formData, priority: val.toString() })
            }
            error={fieldErrors.priority}
          />

          <DatePicker
            label="DUE DATE *"
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
        </div>

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
