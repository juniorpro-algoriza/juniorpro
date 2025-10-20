/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Fragment, useEffect, useState } from "react";
import { Button, Input, Modal, Select } from "@components";
import { getData } from "@server";
import { toast } from "sonner";
import { CloseButton } from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";

export interface AssignPointsForJuniorProps {
  contributorId: number; // only show juniors for this contributor
  onClose?: () => void;
  onAssigned?: (result: { juniorId: number; points: number }) => void;
}

// Typing for the junior object from the API
interface Junior {
  id: number;
  name: string; // API returns `name`, not `nameEn`
}

// Typing for the paginated API response
interface JuniorsResponse {
  data: Junior[];
  pageNumber: number;
  pageSize: number;
  pg_total: number;
  status: number;
}

export const AssignPointsForJuniors = ({
  contributorId,
  onClose,
  onAssigned,
}: AssignPointsForJuniorProps) => {
  const juniorId = Number(useSearchParams().get("juniorId"));
  const [juniors, setJuniors] = useState<Junior[]>([]);
  const [selectedJunior, setSelectedJunior] = useState<number | null>(juniorId);
  const [points, setPoints] = useState<number>(0);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchJuniors = async () => {
      try {
        const res = await getData<JuniorsResponse>({
          url: `Contributor/juniors?ProjectManagerId=${contributorId}&PageNumber=1&PageSize=100`,
          method: "GET",
        });

        if (res && Array.isArray(res.data)) {
          setJuniors(res.data);
        } else {
          toast.error("No juniors found");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch juniors");
      }
    };

    fetchJuniors();
  }, [contributorId]);

  const handleSave = async () => {
    if (!selectedJunior) return toast.error("Please select a junior");

    setSaving(true);
    try {
      await getData({
        url: "Contributor/assign-points-to-junior",
        method: "POST",
        params: { juniorId: selectedJunior, points },
      });

      toast.success("Points assigned successfully!");
      router.refresh();
      onAssigned?.({ juniorId: selectedJunior, points });
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
      <h3 className="text-lg font-semibold mb-4">Assign Points to Junior</h3>

      <Select
        label="Junior"
        options={[
          { label: "Select...", value: "" },
          ...juniors.map((j) => ({ label: j.name, value: j.id })),
        ]}
        value={juniorId ? juniorId : selectedJunior}
        onChange={(val) => setSelectedJunior(Number(val))}
        disabled={juniorId ? true : false}
      />

      <Input
        label="Points"
        type="number"
        value={points}
        onChange={(e: any) => setPoints(Number(e.target.value))}
      />

      <div className="flex gap-3 mt-6">
        <Button
          intent="primary"
          className="flex-1"
          onClick={handleSave}
          disabled={saving}
        >
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
