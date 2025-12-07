"use client";

import { useState, useCallback, FormEvent, Fragment } from "react";
import { Button, Modal, Input, Textarea, MainCard, Select } from "@components";
import { ArrowRight } from "lucide-react";
import { CloseButton } from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { components } from "../../../../api-schema";

/** -------------------- Types -------------------- **/
interface FeatureFormData {
  nameEn: string;
  description: string;
  type: "Boolean" | "Number" | null;
}

const TypeOptions = [
  { value: "Boolean", label: "Boolean" },
  { value: "Number", label: "Number" },
];

const getInitialFormData = (): FeatureFormData => ({
  nameEn: "",
  description: "",
  type: null,
});

export const CreateEditFeature = () => {
  const searchParams = useSearchParams();
  const featureId = searchParams.get("featureId");
  const isEditing = !!featureId;

  const [formData, setFormData] =
    useState<FeatureFormData>(getInitialFormData());

  /** -------------------- Form Submission -------------------- **/
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(formData);
    },
    [formData, isEditing]
  );

  return (
    <Modal panelClassName="w-full max-w-2xl p-6 bg-white rounded-2xl shadow-xl max-h-[95dvh]">
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-midnight">
          {isEditing ? "Edit Feature" : "Create New Feature"}
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          {isEditing
            ? "Update feature details"
            : "Add a new feature to the system"}
        </p>
      </div>

      <form
        id="create-feature-form"
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <MainCard>
          <Input
            type="text"
            name="nameEn"
            label="Feature Name (English)"
            value={formData.nameEn}
            onChange={(e) =>
              setFormData({ ...formData, nameEn: e.target.value })
            }
            placeholder="Feature Name (English)"
            required
          />
          <Input
            type="text"
            name="description"
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Description"
            required
          />
          <Select
            label="Type"
            options={TypeOptions}
            placeholder="Select type"
            value={formData.type}
            onChange={(value) =>
              setFormData({
                ...formData,
                type: value as "Boolean" | "Number" | null,
              })
            }
          />
        </MainCard>
      </form>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-6">
        <CloseButton as={Fragment}>
          <Button
            intent="main"
            size="mainDefault"
            className="text-dark-electric-blue"
          >
            Cancel
          </Button>
        </CloseButton>

        <Button
          intent="main2"
          size="mainDefault"
          type="submit"
          form="create-feature-form"
        >
          {isEditing ? "Update" : "Create Feature"}{" "}
          <ArrowRight className="size-5" />
        </Button>
      </div>
    </Modal>
  );
};
