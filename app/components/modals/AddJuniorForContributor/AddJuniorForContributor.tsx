/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Fragment, useState } from "react";
import { Button, Input, Modal } from "@components";
import { XIcon } from "lucide-react";
import { CloseButton } from "@headlessui/react";
import { toast } from "sonner";
import {
  addContributorJunior,
  inviteContributorJunior,
} from "../../../server/addJuniorForContributor";
import { Tabs } from "@components/client";
import { useRouter } from "next/navigation";

export const AddJuniorForContributor = ({
  onClose,
}: {
  onClose?: () => void;
}) => {
  const [activeTab, setActiveTab] = useState(0);

  // Add Junior form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: "",
  });
  const [saving, setSaving] = useState(false);

  // Invite Junior state
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviting, setInviting] = useState(false);
  const router = useRouter();

  const handleFormChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddJunior = async () => {
    setSaving(true);
    try {
      await addContributorJunior(formData);
      toast.success("Junior added successfully!");
      router.refresh();
      onClose?.();
    } catch (err: any) {
      toast.error(err.message || "Failed to add junior.");
    } finally {
      setSaving(false);
    }
  };

  const handleInviteJunior = async () => {
    if (!inviteEmail) {
      toast.error("Please enter an email address.");
      return;
    }
    setInviting(true);
    try {
      await inviteContributorJunior(inviteEmail);
      toast.success("Invitation sent successfully!");
      setInviteEmail("");
      onClose?.();
    } catch (err: any) {
      toast.error(err.message || "Failed to send invite.");
    } finally {
      setInviting(false);
    }
  };

  const tabs = [
    {
      name: "Add Junior",
      content: (
        <div className="space-y-4">
          <Input
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleFormChange("firstName", e.target.value)}
          />
          <Input
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleFormChange("lastName", e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleFormChange("email", e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleFormChange("password", e.target.value)}
          />
          <Input
            label="Birth Date"
            type="date"
            value={formData.birthDate}
            onChange={(e) => handleFormChange("birthDate", e.target.value)}
          />
        </div>
      ),
    },
    {
      name: "Invite Junior",
      content: (
        <div className="space-y-4">
          <Input
            label="Junior's Email"
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <p className="text-sm text-gray-500">
            We'll send an invitation to this email. The junior must accept to be
            linked.
          </p>
        </div>
      ),
    },
  ];

  return (
    <Modal panelClassName="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-2">
        <h3 className="text-lg font-semibold text-midnight">
          Add / Invite Junior
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

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        tabListClassName="flex space-x-1 rounded-full bg-gray-100 p-1.5 mb-3 w-full"
        onTabChange={setActiveTab}
      />

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        {activeTab === 0 ? (
          <Button
            intent="primary"
            className="flex-1"
            onClick={handleAddJunior}
            disabled={saving}
          >
            {saving ? "Adding..." : "Add"}
          </Button>
        ) : (
          <Button
            intent="primary"
            className="flex-1"
            onClick={handleInviteJunior}
            disabled={inviting}
          >
            {inviting ? "Sending..." : "Send Invite"}
          </Button>
        )}

        <CloseButton as={Fragment}>
          <Button intent="unset" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
        </CloseButton>
      </div>
    </Modal>
  );
};
