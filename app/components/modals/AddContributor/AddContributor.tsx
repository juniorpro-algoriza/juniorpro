/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Fragment, useState, useEffect } from "react";
import { Button, Input, Modal, Select } from "@components";
import { XIcon } from "lucide-react";
import { getData, getLookup } from "@server";
import { toast } from "sonner";
import { CloseButton } from "@headlessui/react";
import { Lookup } from "@types";

interface AddContributorProps {
  onAdded?: (newContributor: any) => void;
  onClose?: () => void;
}

export const AddContributor = ({ onAdded, onClose }: AddContributorProps) => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    projectManagerId: 0,
  };
  const [formData, setFormData] = useState(initialFormData);

  const [projectManagers, setProjectManagers] = useState<Lookup[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch project managers for the dropdown
  useEffect(() => {
    const fetchPMs = async () => {
      const data = await getLookup("/project-manager/look-ups");
      setProjectManagers(data);
    };
    fetchPMs();
  }, []);

  const handleChange = (
    field: keyof typeof formData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      const body = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        projectManagerId: formData.projectManagerId,
      };

      const response = await getData({
        url: "Contributor/add",
        method: "POST",
        body,
      });

      if (response === true) {
        toast.success("Contributor added successfully!");
        onAdded?.(formData);
        setFormData(initialFormData);
        onClose?.();
      } else {
        setError("Failed to add contributor");
        toast.error("Failed to add contributor");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong.");
      toast.error(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal panelClassName="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-2">
        <h3 className="text-lg font-semibold text-midnight">Add Contributor</h3>
        <CloseButton as={Fragment}>
          <Button
            intent="unset"
            className="p-1.5 rounded-lg border"
            onClick={onClose}
          >
            <XIcon size={18} />
          </Button>
        </CloseButton>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <Input
          label="First Name"
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
        <Input
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        {/* Project Manager Select */}
        <Select
          label="Assign to Project Manager (optional)"
          value={formData.projectManagerId}
          options={projectManagers}
          onChange={(val) =>
            setFormData({ ...formData, projectManagerId: Number(val) })
          }
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <Button
          intent="primary"
          className="flex-1"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Adding..." : "Add"}
        </Button>
        <CloseButton as={Fragment}>
          <Button
            intent="secondary"
            className="flex-1 text-dark-electric-blue"
            onClick={onClose}
          >
            Cancel
          </Button>
        </CloseButton>
      </div>
    </Modal>
  );
};
