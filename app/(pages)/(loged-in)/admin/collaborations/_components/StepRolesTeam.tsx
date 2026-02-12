"use client";

import { Input, Select, Button, Skeleton } from "@components";
import { CollaborationFormData, Role, Responsibility } from "./types";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { useLookup } from "../../../../../tanstack/useLookup";
import {
  useGetCollaborationRoles,
  useUpdateCollaborationRole,
  useDeleteCollaborationRole,
  useAddCollaborationRole,
} from "../../tanstack/collaboration";
import { useQueryClient } from "@tanstack/react-query";
import { components } from "../../../../../../api-schema";
import {
  roleSchema,
  responsibilitySchema,
} from "../_schema/collaboration.schema";
import { z } from "zod";

// Type definitions from API schema
type GetAllCollaborationRoleModel =
  components["schemas"]["Sawiha.Services.DTO.CollaborationRoleModels.GetAll.GetAllCollaborationRoleModel"];
type CollaborationRoleResponsiblitiesModel =
  components["schemas"]["Sawiha.Services.DTO.CollaborationRoleModels.Add.CollaborationRoleResponsiblitiesModel"];
type CollaborationRoleToolModel =
  components["schemas"]["Sawiha.Services.DTO.CollaborationRoleModels.GetAll.CollaborationRoleToolModel"];

interface StepRolesTeamProps {
  formData: CollaborationFormData;
  setFormData: Dispatch<SetStateAction<CollaborationFormData>>;
  fieldErrors?: Record<string, string>;
  setFieldErrors?: Dispatch<SetStateAction<Record<string, string>>>;
  mode?: "create" | "edit";
  collaborationId?: number;
}

export const StepRolesTeam = ({
  formData,
  setFormData,
  fieldErrors = {},
  setFieldErrors,
  mode = "create",
  collaborationId,
}: StepRolesTeamProps) => {
  // Fetch existing roles in edit mode
  const { data: existingRoles, isLoading: rolesLoading } =
    useGetCollaborationRoles(collaborationId || 0);

  // Mutations for role operations
  const updateRole = useUpdateCollaborationRole();
  const deleteRole = useDeleteCollaborationRole();
  const addRole = useAddCollaborationRole();
  const queryClient = useQueryClient();

  // Individual loading states for each role
  const [savingRoleIds, setSavingRoleIds] = useState<Set<string>>(new Set());
  const [deletingRoleIds, setDeletingRoleIds] = useState<Set<string>>(
    new Set()
  );

  // Real-time validation function
  const validateRoleField = (
    role: Role,
    fieldName: keyof Role
  ): string | null => {
    try {
      // Create a partial schema for the specific field
      const fieldSchema =
        fieldName === "category"
          ? z
              .string()
              .min(1, "Category name is required")
              .refine(
                (val) => !isNaN(parseInt(val)) && parseInt(val) > 0,
                "Please select a valid category"
              )
          : fieldName === "roleDescription"
            ? z
                .string()
                .min(1, "Role description is required")
                .min(2, "Role description must be at least 2 characters long")
                .max(200, "Role description must be less than 200 characters")
                .trim()
                .refine(
                  (val) => val.trim().length > 0,
                  "Role description cannot be just whitespace"
                )
            : fieldName === "teamCapacity"
              ? z.coerce
                  .number()
                  .min(1, "Team capacity must be at least 1")
                  .max(50, "Team capacity cannot exceed 50 members")
                  .int("Team capacity must be a whole number")
              : fieldName === "assignMentor"
                ? z
                    .string()
                    .min(1, "Assign mentor is required")
                    .refine(
                      (val) => !isNaN(parseInt(val)) && parseInt(val) > 0,
                      "Please select a valid mentor"
                    )
                : fieldName === "toolsRequired"
                  ? z
                      .array(z.string())
                      .min(1, "At least one tool is required")
                      .max(20, "Cannot select more than 20 tools")
                      .refine(
                        (tools) =>
                          tools.every((tool) => tool.trim().length > 0),
                        "All tools must be valid"
                      )
                  : fieldName === "responsibilities"
                    ? z
                        .array(responsibilitySchema)
                        .min(1, "At least one responsibility is required")
                        .max(10, "Cannot have more than 10 responsibilities")
                        .refine(
                          (responsibilities) =>
                            responsibilities.every(
                              (resp) => resp.text.trim().length > 0
                            ),
                          "All responsibilities must have content"
                        )
                    : z.any();

      const result = fieldSchema.safeParse(role[fieldName]);
      return result.success
        ? null
        : result.error.issues[0]?.message || "Invalid value";
    } catch {
      return "Validation error";
    }
  };

  // Validate individual responsibility
  const validateResponsibility = (text: string): string | null => {
    try {
      const result = responsibilitySchema.shape.text.safeParse(text);
      return result.success
        ? null
        : result.error.issues[0]?.message || "Invalid responsibility";
    } catch {
      return "Validation error";
    }
  };

  // Populate form with existing roles when in edit mode and data is available
  useEffect(() => {
    console.log("existingRoles:", existingRoles);
    if (
      mode === "edit" &&
      collaborationId &&
      existingRoles &&
      existingRoles.data &&
      formData.roles.length === 0
    ) {
      const mappedRoles: Role[] = existingRoles.data
        .filter((role: GetAllCollaborationRoleModel) => role.id != null)
        .map((role: GetAllCollaborationRoleModel) => ({
          id: role.id!.toString(),
          category: role.categoryId?.toString() || "",
          roleDescription: role.description || "",
          teamCapacity: role.teamCapacity || 1,
          responsibilities:
            role.responsibilities && role.responsibilities.length > 0
              ? role.responsibilities.map(
                  (
                    resp: CollaborationRoleResponsiblitiesModel,
                    index: number
                  ) => ({
                    id: index.toString(),
                    text: resp.description || "",
                  })
                )
              : [{ id: "0", text: "" }], // Always provide at least one empty responsibility
          toolsRequired:
            role.tools && role.tools.length > 0
              ? role.tools
                  .map((tool: CollaborationRoleToolModel) => {
                    // Handle tool objects from backend with id, nameAr, nameEn
                    if (typeof tool === "object" && tool.id) {
                      return {
                        label: tool.nameEn || tool.nameAr || `Tool ${tool.id}`,
                        value: tool.id.toString(),
                      };
                    }
                    // Handle simple number IDs
                    return {
                      label: `Tool ${tool}`,
                      value: tool.toString(),
                    };
                  })
                  .map((t: { label: string; value: string }) => t.value) // Extract just the values for the form
              : [], // Empty array for tools if none exist
          assignMentor: role.mentorId?.toString() || "",
        }));

      setFormData((prev) => ({
        ...prev,
        roles: mappedRoles,
      }));
    }
  }, [
    mode,
    collaborationId,
    existingRoles,
    formData.roles.length,
    setFormData,
  ]);
  // Fetch tools from lookup API
  const { data: toolsData, isLoading: toolsLoading } =
    useLookup("/api/Lookup/Tool");

  const toolOptions =
    toolsData?.map((tool) => ({
      label: tool.label,
      value: tool.value.toString(),
    })) || [];

  // Fetch project managers from lookup API
  const { data: projectManagersData, isLoading: projectManagersLoading } =
    useLookup("/api/project-manager/look-ups");

  const projectManagerOptions =
    projectManagersData && projectManagersData.length > 0
      ? projectManagersData.map((pm) => ({
          label: pm.label,
          value: pm.value.toString(),
        }))
      : [
          { label: "John Doe", value: "1" },
          { label: "Jane Smith", value: "2" },
          { label: "Mike Johnson", value: "3" },
        ];

  // Fetch categories from lookup API
  const { data: categoriesData, isLoading: categoriesLoading } = useLookup(
    "/api/Lookup/Category"
  );

  const categoryOptions =
    categoriesData?.map((category) => ({
      label: category.label,
      value: category.value.toString(),
    })) || [];
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      formData.roles.forEach((role) => {
        initial[role.id] = true;
      });
      return initial;
    }
  );

  const toggleRole = (id: string) => {
    setExpandedRoles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Helper function to check if role is new (frontend only) or existing (backend)
  const isNewRole = (roleId: string) => {
    // New roles have timestamp-based IDs (very large numbers) or don't exist in existing roles
    const roleIdNum = parseInt(roleId);
    return (
      roleIdNum > 1000000000000 ||
      !existingRoles?.data?.some(
        (r: GetAllCollaborationRoleModel) => r.id?.toString() === roleId
      )
    );
  };

  // Role handlers
  const handleAddRole = () => {
    const newId = Date.now().toString();
    const newRole: Role = {
      id: newId,
      category: "",
      roleDescription: "",
      teamCapacity: 1,
      responsibilities: [{ id: Date.now().toString(), text: "" }],
      toolsRequired: [],
      assignMentor: "",
    };
    setFormData((prev) => ({
      ...prev,
      roles: [...(prev.roles || []), newRole],
    }));
    setExpandedRoles((prev) => ({ ...prev, [newId]: true }));
  };

  const handleRemoveRole = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    // Add this role to deleting state
    setDeletingRoleIds((prev) => new Set(prev).add(id));

    // Check if this is an existing role or a new role
    if (mode === "edit" && collaborationId && !isNewRole(id)) {
      // This is an existing role - delete from API
      const roleToDelete = formData.roles.find((r) => r.id === id);
      const roleId = parseInt(roleToDelete?.id || "0");

      if (roleId > 0) {
        try {
          await deleteRole.mutateAsync(roleId);
          toast.success("Role deleted successfully!");

          // Invalidate the roles query to refresh data from backend
          await queryClient.invalidateQueries({
            queryKey: ["admin", "collaborations", "roles", collaborationId],
          });

          // Clear form roles to trigger repopulation with fresh data from backend
          setFormData((prev) => ({ ...prev, roles: [] }));
        } catch (error) {
          console.error("Failed to delete role:", error);
          toast.error("Failed to delete role. Please try again.");
        } finally {
          // Remove this role from deleting state
          setDeletingRoleIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
        }
      }
    } else {
      // This is a new role - just remove from frontend state
      toast.success("Role removed successfully!");

      // Remove from deleting state immediately for new roles
      setDeletingRoleIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }

    // Remove from form state in both cases
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
    setFormData((prev) => {
      const updatedRoles = prev.roles.map((r) =>
        r.id === id ? { ...r, [field]: value } : r
      );

      // Real-time validation for the updated role
      const updatedRole = updatedRoles.find((r) => r.id === id);
      if (updatedRole && setFieldErrors) {
        const roleIndex = updatedRoles.findIndex((r) => r.id === id);
        const errorMessage = validateRoleField(updatedRole, field);

        const fieldName = `roles.${roleIndex}.${field}`;

        setFieldErrors((prev) => {
          const newErrors = { ...prev };
          if (errorMessage) {
            newErrors[fieldName] = errorMessage;
          } else {
            delete newErrors[fieldName];
          }
          return newErrors;
        });
      }

      return {
        ...prev,
        roles: updatedRoles,
      };
    });
  };

  // Responsibility handlers
  const handleAddResponsibility = (roleId: string) => {
    const newResp: Responsibility = { id: Date.now().toString(), text: "" };
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.map((r) =>
        r.id === roleId
          ? { ...r, responsibilities: [...r.responsibilities, newResp] }
          : r
      ),
    }));
  };

  const handleRemoveResponsibility = (roleId: string, respId: string) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.map((r) =>
        r.id === roleId
          ? {
              ...r,
              responsibilities: r.responsibilities.filter(
                (resp) => resp.id !== respId
              ),
            }
          : r
      ),
    }));
  };

  const handleResponsibilityChange = (
    roleId: string,
    respId: string,
    text: string
  ) => {
    setFormData((prev) => {
      const updatedRoles = prev.roles.map((r) =>
        r.id === roleId
          ? {
              ...r,
              responsibilities: r.responsibilities.map((resp) =>
                resp.id === respId ? { ...resp, text } : resp
              ),
            }
          : r
      );

      // Real-time validation for the updated responsibility
      if (setFieldErrors) {
        const roleIndex = updatedRoles.findIndex((r) => r.id === roleId);
        const respIndex = updatedRoles[roleIndex]?.responsibilities.findIndex(
          (resp) => resp.id === respId
        );

        if (roleIndex !== -1 && respIndex !== -1) {
          const errorMessage = validateResponsibility(text);
          const fieldName = `roles.${roleIndex}.responsibilities.${respIndex}.text`;

          setFieldErrors((prev) => {
            const newErrors = { ...prev };
            if (errorMessage) {
              newErrors[fieldName] = errorMessage;
            } else {
              delete newErrors[fieldName];
            }
            return newErrors;
          });
        }
      }

      return {
        ...prev,
        roles: updatedRoles,
      };
    });
  };

  const handleSaveRole = async (roleId: string) => {
    if (!collaborationId) {
      toast.error("No collaboration ID found.");
      return;
    }

    const roleToSave = formData.roles.find((r) => r.id === roleId);
    if (!roleToSave) {
      toast.error("Role not found.");
      return;
    }

    // Validate role data before saving
    const validationResult = roleSchema.safeParse(roleToSave);

    if (!validationResult.success) {
      console.error("Role validation failed:", validationResult.error.issues);

      // Show validation errors to user
      const firstError = validationResult.error.issues[0];
      const errorMessage =
        firstError?.message || "Please fill in all required fields correctly";

      toast.error(errorMessage);

      // Set field errors for the specific role
      const roleIndex = formData.roles.findIndex((r) => r.id === roleId);
      const errors: Record<string, string> = {};

      validationResult.error.issues.forEach((issue) => {
        const fieldName = `roles.${roleIndex}.${issue.path.join(".")}`;
        errors[fieldName] = issue.message;
      });

      // Update parent component's field errors
      if (setFieldErrors) {
        setFieldErrors((prev) => ({ ...prev, ...errors }));
      }

      return;
    }

    // Add this role to loading state
    setSavingRoleIds((prev) => new Set(prev).add(roleId));

    console.log("=== SAVING ROLE ===");
    console.log("Role ID:", roleId);
    console.log("Is New Role:", isNewRole(roleId));
    console.log("Role Data:", roleToSave);
    console.log("Collaboration ID:", collaborationId);

    try {
      const rolePayload = {
        collaborationRole: {
          id: isNewRole(roleId) ? 0 : parseInt(roleToSave.id) || 0,
          description: roleToSave.roleDescription,
          categoryId: parseInt(roleToSave.category) || 0,
          mentorId: parseInt(roleToSave.assignMentor) || 0,
          teamCapacity: roleToSave.teamCapacity,
          collaborationId: collaborationId,
        },
        tools: roleToSave.toolsRequired
          .map((t) => parseInt(t))
          .filter((t) => !isNaN(t)),
        responsiblities: roleToSave.responsibilities.map((r) => ({
          id: 0,
          description: r.text,
        })),
      };

      console.log("=== ROLE PAYLOAD ===");
      console.log("Payload:", rolePayload);

      if (isNewRole(roleId)) {
        // This is a new role - use create endpoint
        console.log(
          "=== CALLING ENDPOINT: POST /api/admin-collaboration/add-role ==="
        );
        await addRole.mutateAsync(rolePayload);
        toast.success("Role created successfully!");

        // Refetch roles to get new ID from backend
        await queryClient.invalidateQueries({
          queryKey: ["admin", "collaborations", "roles", collaborationId],
        });

        // Clear form roles to trigger repopulation with new data from backend
        setFormData((prev) => ({ ...prev, roles: [] }));
      } else {
        // This is an existing role - use update endpoint
        console.log(
          "=== CALLING ENDPOINT: PUT /api/admin-collaboration/update-role ==="
        );
        await updateRole.mutateAsync(rolePayload);
        toast.success("Role updated successfully!");
      }
    } catch (error) {
      console.error("Failed to save role:", error);
      toast.error(
        `Failed to ${isNewRole(roleId) ? "create" : "update"} role. Please try again.`
      );
    } finally {
      // Remove this role from loading state
      setSavingRoleIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(roleId);
        return newSet;
      });
    }
  };

  return (
    <div className="space-y-6 py-2">
      {rolesLoading ? (
        // Simple loading skeleton
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={`skeleton-${index}`} className="h-18 rounded-2xl" />
          ))}
        </div>
      ) : (
        // Actual content
        formData.roles &&
        formData.roles.map((role, roleIndex) => (
          <div
            key={role.id}
            className="border border-gray-200 rounded-2xl bg-white overflow-hidden"
          >
            {/* Role Header (Accordion Trigger) */}
            <div
              className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleRole(role.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm shrink-0">
                  {roleIndex + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-base text-gray-900">
                    {categoryOptions.find((cat) => cat.value === role.category)
                      ?.label || "Category Name"}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {role.roleDescription || "No description yet"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handleRemoveRole(role.id, e)}
                  disabled={deletingRoleIds.has(role.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingRoleIds.has(role.id) ? (
                    <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Trash2 size={18} />
                  )}
                </button>
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
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
              <div className="px-4 pb-6 pt-2 space-y-6 border-t border-gray-100">
                {/* Row 1: Category, Team Capacity, Role Description */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select
                    label="ROLE CATEGORY"
                    placeholder="Select a category"
                    options={categoryOptions}
                    disabled={categoriesLoading}
                    loading={categoriesLoading}
                    value={role.category}
                    onChange={(val) =>
                      handleRoleChange(role.id, "category", val as string)
                    }
                    error={fieldErrors[`roles.${roleIndex}.category`]}
                  />

                  <Input
                    label="TEAM CAPACITY"
                    placeholder=""
                    type="number"
                    min={1}
                    value={role.teamCapacity}
                    onChange={(e) =>
                      handleRoleChange(
                        role.id,
                        "teamCapacity",
                        parseInt(e.target.value) || 1
                      )
                    }
                    error={fieldErrors[`roles.${roleIndex}.teamCapacity`]}
                    // className="bg-gray-50"
                  />

                  <Input
                    label="ROLE DESCRIPTION"
                    placeholder="eg. Lead"
                    value={role.roleDescription}
                    onChange={(e) =>
                      handleRoleChange(
                        role.id,
                        "roleDescription",
                        e.target.value
                      )
                    }
                    error={fieldErrors[`roles.${roleIndex}.roleDescription`]}
                    // className="bg-gray-50"
                  />
                </div>

                {/* Responsibilities Section */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    RESPONSIBILITIES
                  </label>
                  <div className="space-y-3">
                    {role.responsibilities.map((resp, respIndex) => (
                      <div key={resp.id} className="flex gap-3 items-start">
                        <span className="text-gray-400 font-medium w-6 text-center pt-3">
                          {respIndex + 1}
                        </span>
                        <div className="flex-1">
                          <Input
                            placeholder="e.g., Design homepage layout"
                            value={resp.text}
                            onChange={(e) =>
                              handleResponsibilityChange(
                                role.id,
                                resp.id,
                                e.target.value
                              )
                            }
                            error={
                              fieldErrors[
                                `roles.${roleIndex}.responsibilities.${respIndex}.text`
                              ]
                            }
                            // className="bg-gray-50"
                          />
                        </div>
                        {role.responsibilities.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveResponsibility(role.id, resp.id)
                            }
                            className="text-gray-400 hover:text-red-500 transition-colors p-2 pt-3"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddResponsibility(role.id)}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 px-1"
                  >
                    <Plus size={16} />
                    Add Another Responsibility
                  </button>
                </div>

                {/* Tools Required (Select) */}
                <Select
                  label="TOOLS REQUIRED"
                  placeholder="Select tools"
                  options={toolOptions || []}
                  multiple={true}
                  disabled={toolsLoading}
                  loading={toolsLoading}
                  value={role.toolsRequired}
                  onChange={(val) =>
                    handleRoleChange(role.id, "toolsRequired", val as string[])
                  }
                  error={fieldErrors[`roles.${roleIndex}.toolsRequired`]}
                />

                {/* Assign Mentor (Select) */}
                <Select
                  label="ASSIGN MENTOR"
                  placeholder="Select a mentor"
                  options={projectManagerOptions}
                  disabled={projectManagersLoading}
                  loading={projectManagersLoading}
                  value={role.assignMentor}
                  onChange={(val) =>
                    handleRoleChange(role.id, "assignMentor", val as string)
                  }
                  error={fieldErrors[`roles.${roleIndex}.assignMentor`]}
                />

                {/* Save Role Button - Only show in edit mode */}
                {mode === "edit" && (
                  <div className="flex justify-end pt-2">
                    <Button
                      type="button"
                      intent="main2"
                      size="mainDefault"
                      onClick={() => handleSaveRole(role.id)}
                      disabled={savingRoleIds.has(role.id)}
                      className="min-w-32"
                    >
                      {savingRoleIds.has(role.id)
                        ? "Saving..."
                        : isNewRole(role.id)
                          ? "Create Role"
                          : "Update Role"}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}

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
  );
};
