/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, Fragment } from "react";
import { Button, Input, Modal } from "@components";
import { CloseButton } from "@headlessui/react";
import { XIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { getData } from "@server";
import { toast } from "sonner";

export interface ManagerProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface EditProjectManagerProfileProps {
  managerId?: number;
  onUpdated?: (updated: ManagerProfile) => void;
  onClose?: () => void;
}

export const EditProjectManagerProfile = ({
  onUpdated,
  onClose,
}: EditProjectManagerProfileProps) => {
  const [profile, setProfile] = useState<ManagerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const managerId = searchParams.get("managerId");

  useEffect(() => {
    if (!managerId) return;

    async function fetchProfile() {
      setLoading(true);
      try {
        const data = await getData({
          url: `project-manager/details/${managerId}`,
          method: "GET",
          dummyData: [],
        });

        const fullName = data?.name || "";
        const [firstName, ...rest] = fullName.split(" ");

        setProfile({
          id: data?.id || 0,
          firstName: firstName || "",
          lastName: rest.join(" ") || "",
          email: data?.email || "",
        });
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error loading profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [managerId]);

  const handleChange = (field: keyof ManagerProfile, value: string) => {
    setProfile((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    setError(null);

    try {
      const response = await getData({
        url: "project-manager/update",
        method: "PUT",
        body: {
          id: profile.id,
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
        },
        dummyData: [],
      });
      if (response === true) {
        // Immediately reflect changes in local state
        setProfile({ ...profile });
        onUpdated?.({ ...profile });

        // Show toast
        toast.success("Profile updated successfully!");

        // Close modal safely
        if (onClose) onClose();
      } else {
        setError("Update failed, no success confirmation from API.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <Modal panelClassName="w-full max-w-md p-6">
        <p>Loading profile...</p>
      </Modal>
    );

  if (!profile)
    return (
      <Modal panelClassName="w-full max-w-md p-6">
        <p>Profile not found.</p>
      </Modal>
    );

  return (
    <Modal panelClassName="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
      <div className="flex items-center justify-between mb-6 border-b pb-2">
        <h3 className="text-lg font-semibold text-midnight">
          Edit Project Manager Profile
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
        <Input
          label="First Name"
          value={profile.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
        <Input
          label="Last Name"
          value={profile.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          value={profile.email}
          onChange={(e) => handleChange("email", e.target.value)}
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
          {saving ? "Updating..." : "Update"}
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
