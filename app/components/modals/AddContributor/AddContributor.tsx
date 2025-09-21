/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Fragment, useState } from "react";
import { Button, Input, Modal } from "@components";
import { XIcon } from "lucide-react";
import { getData } from "@server";
import { toast } from "sonner";
import { CloseButton } from "@headlessui/react";

export interface AddContributorProps {
  onAdded?: (newManager: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => void;
  onClose?: () => void;
}

export const AddContributor = ({ onAdded, onClose }: AddContributorProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      const response = await getData({
        url: "Contributor/add",
        method: "POST",
        body: formData,
      });

      if (response === true) {
        toast.success("Contributor added successfully!");
        onAdded?.(formData);
        onClose?.();
      } else {
        setError("Failed to add Contributor ");
        toast.error("Failed to add Contributor ");
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
        <h3 className="text-lg font-semibold text-midnight">
          Add Contributor{" "}
        </h3>
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
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
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
            intent="unset"
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
