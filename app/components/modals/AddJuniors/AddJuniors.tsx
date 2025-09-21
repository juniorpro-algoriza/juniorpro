/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Fragment, useEffect, useState } from "react";
import { Button, Input, Modal } from "@components";
import { XIcon } from "lucide-react";
import { getData } from "@server";
import { toast } from "sonner";
import { CloseButton } from "@headlessui/react";
import { Select } from "@components";

export interface AddJuniorProps {
  onAdded?: (newJunior: any) => void;
  onClose?: () => void;
}

export const AddJuniors = ({ onAdded, onClose }: AddJuniorProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contributorId: "" as string | number | "",
  });

  const [contributors, setContributors] = useState<
    { id: number; nameEN: string }[]
  >([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [juniorCreated, setJuniorCreated] = useState<any>(null); // stores newly added junior

  // Fetch contributors for dropdown
  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const res = await getData({
          url: "Contributor/look-ups",
          method: "GET",
        });
        if (Array.isArray(res)) setContributors(res);
      } catch (err) {
        console.error("Failed to load contributors", err);
      }
    };
    fetchContributors();
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
      // Step 1: Add junior without contributorId
      await getData({
        url: "junior/add",
        method: "POST",
        body: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          birthDate: new Date().toISOString(),
        },
      });

      // Step 2: Fetch juniors list and find the one just created by email
      const juniorsResponse = await getData({
        url: "junior/look-ups",
        method: "GET",
      });
      const junior = Array.isArray(juniorsResponse)
        ? juniorsResponse.find(
            (j: any) =>
              j.email === formData.email ||
              j.nameEN === `${formData.firstName} ${formData.lastName}`
          )
        : null;

      if (!junior?.id) {
        throw new Error("Junior creation failed (no ID found).");
      }

      setJuniorCreated(junior);
      toast.success("Junior added successfully! Please assign a contributor.");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong.");
      toast.error(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleAssign = async () => {
    if (!formData.contributorId) {
      toast.error("Please select a contributor.");
      return;
    }
    setSaving(true);
    try {
      await getData({
        url: "Contributor/assign-junior",
        method: "POST",
        body: {
          juniorId: juniorCreated.id,
          contributorId: formData.contributorId,
        },
      });
      toast.success(`Junior assigned to contributor successfully!`);
      onAdded?.(juniorCreated);
      onClose?.();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to assign contributor.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal panelClassName="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-2">
        <h3 className="text-lg font-semibold text-midnight">
          {juniorCreated ? "Assign Contributor" : "Add Junior"}
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

      <div className="space-y-4">
        {!juniorCreated ? (
          <>
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
          </>
        ) : (
          <>
            <p className="text-gray-700">
              Do you want to Assign contributor to junior:{" "}
              <strong>{juniorCreated.nameEN}</strong> ?
            </p>
            <Select
              label="Select Contributor"
              value={formData.contributorId}
              options={[
                { label: "Select...", value: "" },
                ...contributors.map((c) => ({ label: c.nameEN, value: c.id })),
              ]}
              onChange={(val) => handleChange("contributorId", val)}
            />
          </>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="flex gap-3 mt-6">
        {!juniorCreated ? (
          <Button
            intent="primary"
            className="flex-1"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Adding..." : "Add Junior"}
          </Button>
        ) : (
          <Button
            intent="primary"
            className="flex-1"
            onClick={handleAssign}
            disabled={saving}
          >
            {saving ? "Assigning..." : "Assign"}
          </Button>
        )}
        <CloseButton as={Fragment}>
          <Button
            intent="secondary"
            className="flex-1 text-dark-electric-blue"
            onClick={onClose}
          >
            Cancel{" "}
          </Button>
        </CloseButton>
      </div>
    </Modal>
  );
};
