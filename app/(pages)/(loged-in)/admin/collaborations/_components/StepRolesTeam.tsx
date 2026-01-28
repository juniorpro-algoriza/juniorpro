"use client";

import { Input, Textarea, Select, Button } from "@components";
import { CollaborationFormData, Role, Task } from "./types";
import { Dispatch, SetStateAction, useState } from "react";
import { Plus, Trash2, X, ChevronDown, ChevronUp } from "lucide-react";

interface StepRolesTeamProps {
  formData: CollaborationFormData;
  setFormData: Dispatch<SetStateAction<CollaborationFormData>>;
  fieldErrors?: Record<string, string>;
}

const TOOL_OPTIONS = [
  { label: "VS Code", value: "VS Code" },
  { label: "Figma", value: "Figma" },
  { label: "Git", value: "Git" },
  { label: "React", value: "React" },
  { label: "Node.js", value: "Node.js" },
  { label: "Python", value: "Python" },
  { label: "Docker", value: "Docker" },
  { label: "Postman", value: "Postman" },
];

export const StepRolesTeam = ({
  formData,
  setFormData,
  fieldErrors = {},
}: StepRolesTeamProps) => {
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>(
    {}
  );

  const toggleRole = (id: string) => {
    setExpandedRoles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Role handlers
  const handleAddRole = () => {
    const newId = Date.now().toString();
    const newRole: Role = {
      id: newId,
      category: "",
      roleDescription: "",
      responsibilities: "",
      toolsRequired: [],
      assignMentor: "",
      tasks: [{ id: Date.now().toString(), text: "" }],
    };
    setFormData((prev) => ({
      ...prev,
      roles: [...(prev.roles || []), newRole],
    }));
    // Expand the new role by default
    setExpandedRoles((prev) => ({ ...prev, [newId]: true }));
  };

  const handleRemoveRole = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.filter((r) => r.id !== id),
    }));
  };

  const handleRoleChange = <K extends keyof Role>(
    id: string,
    field: K,
    value: Role[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.map((r) =>
        r.id === id ? { ...r, [field]: value } : r
      ),
    }));
  };

  // Task handlers
  const handleAddTask = (roleId: string) => {
    const newTask: Task = { id: Date.now().toString(), text: "" };
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.map((r) =>
        r.id === roleId ? { ...r, tasks: [...r.tasks, newTask] } : r
      ),
    }));
  };

  const handleRemoveTask = (roleId: string, taskId: string) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.map((r) =>
        r.id === roleId
          ? { ...r, tasks: r.tasks.filter((t) => t.id !== taskId) }
          : r
      ),
    }));
  };

  const handleTaskChange = (roleId: string, taskId: string, text: string) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.map((r) =>
        r.id === roleId
          ? {
              ...r,
              tasks: r.tasks.map((t) => (t.id === taskId ? { ...t, text } : t)),
            }
          : r
      ),
    }));
  };

  return (
    <div className="space-y-8 py-2">
      {/* Project Roles Section */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Project Roles</h3>
          <p className="text-sm text-gray-600">
            Define roles, responsibilities, and tools for each team member
          </p>
        </div>

        <div className="space-y-6">
          {formData.roles &&
            formData.roles.map((role, roleIndex) => (
              <div
                key={role.id}
                className="border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-sm"
              >
                {/* Role Header (Accordion Trigger) */}
                <div
                  className="p-6 flex items-center justify-between gap-1 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleRole(role.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="sm:w-10 sm:h-10 w-7 h-7 rounded-full bg-blue-main text-white flex items-center justify-center font-bold sm:text-lg shrink-0">
                      {roleIndex + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-gray-900">
                        {role.category || "Category Name"}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {role.roleDescription || "No description yet"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {roleIndex > 0 && (
                      <button
                        type="button"
                        onClick={(e) => handleRemoveRole(role.id, e)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors mr-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                    <div className="w-8 h-8 rounded-full bg-blue-main/10 text-blue-main flex items-center justify-center">
                      {expandedRoles[role.id] ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Role Body (Accordion Content) */}
                {expandedRoles[role.id] && (
                  <div className="px-6 pb-8 pt-6 space-y-6 border-t border-gray-100">
                    {/* Row 1: Category & Description */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="ROLE CATEGORY"
                        placeholder=""
                        value={role.category}
                        onChange={(e) =>
                          handleRoleChange(role.id, "category", e.target.value)
                        }
                        error={fieldErrors[`roles.${roleIndex}.category`]}
                      />

                      <Input
                        label="ROLE DESCRIPTION"
                        placeholder="e.g., Lead developer for frontend"
                        value={role.roleDescription}
                        onChange={(e) =>
                          handleRoleChange(
                            role.id,
                            "roleDescription",
                            e.target.value
                          )
                        }
                        error={
                          fieldErrors[`roles.${roleIndex}.roleDescription`]
                        }
                      />
                    </div>

                    {/* Row 2: Responsibilities */}
                    <Textarea
                      label="RESPONSIBILITIES"
                      placeholder="e.g., Build and maintain the frontend UI, ensure responsive design..."
                      value={role.responsibilities}
                      onChange={(e) =>
                        handleRoleChange(
                          role.id,
                          "responsibilities",
                          e.target.value
                        )
                      }
                      rows={3}
                      error={fieldErrors[`roles.${roleIndex}.responsibilities`]}
                    />

                    {/* Row 3: Tools Required (Select) */}
                    <Select
                      label="TOOLS REQUIRED"
                      placeholder="Select tools for Frontend Developer"
                      options={TOOL_OPTIONS}
                      multiple={true}
                      value={role.toolsRequired}
                      onChange={(val) =>
                        handleRoleChange(
                          role.id,
                          "toolsRequired",
                          val as string[]
                        )
                      }
                      error={fieldErrors[`roles.${roleIndex}.toolsRequired`]}
                    />

                    {/* Row 4: Assign Mentor (Select) */}
                    <div className="space-y-1">
                      <Select
                        label="ASSIGN MENTOR"
                        placeholder="Select a mentor"
                        options={[
                          { label: "John Doe", value: "john" },
                          { label: "Jane Smith", value: "jane" },
                        ]}
                        value={role.assignMentor}
                        onChange={(val) =>
                          handleRoleChange(
                            role.id,
                            "assignMentor",
                            val as string
                          )
                        }
                        error={fieldErrors[`roles.${roleIndex}.assignMentor`]}
                      />
                      <div className="flex items-center gap-2 pl-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <p className="text-xs text-gray-400">
                          Showing mentors specialized in{" "}
                          {role.category || "Frontend Developer"}
                        </p>
                      </div>
                    </div>

                    {/* Tasks Section */}
                    <div className="space-y-3 pt-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        TASKS
                      </label>
                      <div className="space-y-3 pt-4">
                        {role.tasks.map((task, taskIndex) => (
                          <div key={task.id} className="flex gap-3 items-start">
                            <span className="text-gray-500 font-medium w-4">
                              {taskIndex + 1}.
                            </span>
                            <div className="flex-1">
                              <Input
                                placeholder="e.g., Design homepage layout"
                                value={task.text}
                                onChange={(e) =>
                                  handleTaskChange(
                                    role.id,
                                    task.id,
                                    e.target.value
                                  )
                                }
                                error={
                                  fieldErrors[
                                    `roles.${roleIndex}.tasks.${taskIndex}.text`
                                  ]
                                }
                                className="bg-gray-50/50"
                              />
                            </div>
                            {role.tasks.length > 1 && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveTask(role.id, task.id)
                                }
                                className="text-gray-400 hover:text-red-500 transition-colors p-2"
                              >
                                <Trash2 size={18} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddTask(role.id)}
                        className="mt-2 text-sm font-bold text-blue-main hover:text-dark-blue-main flex items-center gap-2 px-1"
                      >
                        <Plus size={16} />
                        Add Another Task
                      </button>
                    </div>

                    <div className="pt-4 border-t border-gray-100 mt-6">
                      <p className="text-sm text-gray-400">
                        {role.tasks.length} tasks • {role.toolsRequired.length}{" "}
                        tools
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}

          <Button
            type="button"
            intent="main"
            size="mainDefault"
            onClick={handleAddRole}
            className="w-full"
          >
            <Plus size={20} />
            Add Role
          </Button>
        </div>
      </div>
    </div>
  );
};
