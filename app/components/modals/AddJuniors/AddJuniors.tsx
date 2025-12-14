/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Fragment, useEffect, useState } from "react";
import { Button, Input, Modal, Select } from "@components";
import { XIcon } from "lucide-react";
import { CloseButton } from "@headlessui/react";
import { getData, getLookup } from "@server";
import { toast } from "sonner";
import { Lookup } from "@types";
import { useRouter, useSearchParams } from "next/navigation";

export interface AddJuniorProps {
  onAdded?: (newJunior: any) => void;
  onClose?: () => void;
}

export const AddJuniors = ({ onAdded, onClose }: AddJuniorProps) => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contributorId: 0,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [contributors, setContributors] = useState<Lookup[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const contributorId = Number(searchParams.get("contributorId"));
  const router = useRouter();

  // Fetch contributors list (unless contributorId was passed)
  useEffect(() => {
    const fetchContributors = async () => {
      const data = await getLookup("/Enabler/look-ups");
      setContributors(data);
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
      const body: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        birthDate: new Date().toISOString(),
      };
      // include contributorId if available
      if (formData.contributorId || contributorId)
        body.contributorId = Number(formData.contributorId || contributorId);

      const newJunior = await getData({
        url: "junior/add",
        method: "POST",
        body,
      });
      toast.success("Junior added successfully!");
      router.refresh();
      onAdded?.(newJunior);
      onClose?.();
      setFormData(initialFormData);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to add junior");
      toast.error(err.message || "Failed to add junior");
    } finally {
      setSaving(false);
    }
  };
  console.log(contributorId);
  return (
    <Modal panelClassName="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-2">
        <h3 className="text-lg font-semibold text-midnight">Add Junior</h3>
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

        {/* Only show contributor select if contributorId is not preselected */}
        <Select
          label="Select Contributor (optional)"
          value={contributorId ? contributorId : formData.contributorId}
          options={contributors}
          onChange={(val) =>
            setFormData({ ...formData, contributorId: Number(val) })
          }
          disabled={contributorId ? true : false}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          intent="primary"
          className="flex-1"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Adding..." : "Add Junior"}
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
