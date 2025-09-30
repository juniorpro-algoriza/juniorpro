/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Fragment, useEffect, useState } from "react";
import { Button, Input, Modal, Select } from "@components";
import { getData } from "@server";
import { toast } from "sonner";
import { CloseButton } from "@headlessui/react";

export interface AssignPointsForContributorProps {
  onClose?: () => void;
  onAssigned?: (result: any) => void;
}

export const AssignPointsForContributors = ({
  onClose,
  onAssigned,
}: AssignPointsForContributorProps) => {
  const [contributors, setContributors] = useState<{ id: number; nameEn: string }[]>([]);
  const [selectedContributor, setSelectedContributor] = useState<number | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const data = await getData({ url: "Contributor/look-ups", method: "GET" });
        if (Array.isArray(data)) setContributors(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch contributors");
      }
    };
    fetchContributors();
  }, []);

  const handleSave = async () => {
    if (!selectedContributor) return toast.error("Please select a contributor");

    setSaving(true);
    try {
   await getData({
    url: "Contributor/assign-points-by-admin",
    method: "POST",
    body: { contributorId: selectedContributor, points }
  });

      toast.success("Points assigned successfully!");
      onAssigned?.({ contributorId: selectedContributor, points });
      onClose?.();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to assign points");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal panelClassName="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
      <h3 className="text-lg font-semibold mb-4">Assign Points to Contributor</h3>

      <Select
        label="Select Contributor"
        options={[
          { label: "Select...", value: "" },
          ...contributors.map((c) => ({ label: c.nameEn, value: c.id })),
        ]}
        value={selectedContributor ?? ""}
        onChange={(val) => setSelectedContributor(Number(val))}
      />

      <Input
        label="Points"
        type="number"
        value={points}
        onChange={(e: any) => setPoints(Number(e.target.value))}
      />

      <div className="flex gap-3 mt-6">
        <Button intent="primary" className="flex-1" onClick={handleSave} disabled={saving}>
          {saving ? "Assigning..." : "Assign Points"}
        </Button>
        <CloseButton as={Fragment}>
              <Button intent="unset" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
            </CloseButton>
      </div>
    </Modal>
  );
};
