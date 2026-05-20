"use client";

import { Button, FileUpload, Input, MainCard, Skeleton } from "@components";
import { cx } from "@lib";
import {
  Image as ImageIcon,
  Info,
  LockKeyhole,
  Minus,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useAddBadge,
  useBadgeById,
  useUpdateBadge,
} from "../../tanstack/badges";
import {
  BADGE_TYPES,
  BadgeTypeId,
  getBadgeCondition,
  getBadgeType,
} from "./data";
import { BadgeFormValues, getBadgeFormSchema } from "../_schema/badge.schema";

const getInitialFormData = (): BadgeFormValues => ({
  titleEn: "",
  type: undefined,
  count: 1,
  image: null,
});

export const BadgeCreateEdit = ({ badgeId }: { badgeId?: number }) => {
  const router = useRouter();
  const isEditing = !!badgeId;
  const { data: badgeData, isLoading } = useBadgeById(badgeId || 0, isEditing);
  const addBadgeMutation = useAddBadge();
  const updateBadgeMutation = useUpdateBadge();

  const [formData, setFormData] = useState<BadgeFormValues>(getInitialFormData);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!badgeData) return;

    setFormData({
      titleEn: badgeData.titleEn || "",
      type: badgeData.type as BadgeTypeId | undefined,
      count: badgeData.count || 1,
      image: null,
    });
    setImagePreview(badgeData.imageUrl || null);
  }, [badgeData]);

  useEffect(() => {
    if (!formData.image) return;

    const previewUrl = URL.createObjectURL(formData.image);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [formData.image]);

  const selectedType = useMemo(
    () => (formData.type ? getBadgeType(formData.type) : undefined),
    [formData.type]
  );
  const isSubmitting =
    addBadgeMutation.isPending || updateBadgeMutation.isPending;

  const clearFieldError = (field: keyof BadgeFormValues) => {
    setFieldErrors((previous) => {
      if (!previous[field]) return previous;

      const next = { ...previous };
      delete next[field];
      return next;
    });
  };

  const handleTypeChange = (type: BadgeTypeId) => {
    const badgeType = getBadgeType(type);
    setFormData((previous) => ({
      ...previous,
      type,
      count: previous.type === type ? previous.count : badgeType.defaultCount,
    }));
    clearFieldError("type");
    clearFieldError("count");
  };

  const handleCountChange = (value: number) => {
    setFormData((previous) => ({
      ...previous,
      count: Math.max(1, value),
    }));
    clearFieldError("count");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = getBadgeFormSchema(isEditing).safeParse(formData);

    if (!result.success) {
      const errors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (typeof field === "string") {
          errors[field] = issue.message;
        }
      });

      setFieldErrors(errors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setFieldErrors({});
    const validatedData = result.data;
    const badgeType = validatedData.type;

    if (!badgeType) return;

    const payload = new FormData();

    if (badgeId) {
      payload.append("Id", String(badgeId));
    }

    payload.append("TitleEn", validatedData.titleEn);
    payload.append("TitleAr", validatedData.titleEn);
    payload.append(
      "Description",
      getBadgeCondition(validatedData.count, badgeType)
    );
    payload.append("Type", String(badgeType));
    payload.append("Count", String(validatedData.count));

    if (validatedData.image) {
      payload.append("Image", validatedData.image);
    }

    try {
      if (isEditing) {
        await updateBadgeMutation.mutateAsync(payload);
        toast.success("Badge updated successfully.");
      } else {
        await addBadgeMutation.mutateAsync(payload);
        toast.success("Badge created successfully.");
      }

      router.push("/admin/badges");
    } catch (error) {
      console.error("Failed to save badge:", error);
      toast.error(
        `Failed to ${isEditing ? "update" : "create"} badge. Please try again.`
      );
    }
  };

  if (isEditing && isLoading) {
    return (
      <div className="xl:max-w-5xl">
        <Skeleton className="h-[520px] rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="xl:max-w-6xl">
      <form
        id="badge-form"
        onSubmit={handleSubmit}
        className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]"
      >
        <div className="space-y-5">
          <MainCard classname="rounded-3xl border-gray-100 p-6">
            <div className="mb-5">
              <h2 className="text-base font-bold text-yankees-blue">
                Basic Information
              </h2>
              <p className="mt-1 text-sm font-medium text-semi-blue">
                Essential details about this badge
              </p>
            </div>

            <div className="space-y-5">
              <Input
                label="Badge Title"
                required
                value={formData.titleEn}
                onChange={(event) => {
                  setFormData((previous) => ({
                    ...previous,
                    titleEn: event.target.value,
                  }));
                  clearFieldError("titleEn");
                }}
                placeholder="e.g., First Steps, Challenge Master"
                rightIcon={<LockKeyhole className="size-4" />}
                error={fieldErrors.titleEn}
              />

              <FileUpload
                label="Badge Image"
                required={!isEditing}
                accept="image/jpeg,image/png,image/gif,application/pdf"
                maxSizeMB={2}
                placeholder="Drag and drop files here to upload"
                helperText="Maximum file size allowed is 2 MB, supported file formats include .jpg, .png, and .pdf."
                error={fieldErrors.image}
                onFileSelect={(file) => {
                  setFormData((previous) => ({ ...previous, image: file }));
                  clearFieldError("image");
                }}
              />

              <div>
                <p className="mb-3 text-sm font-medium text-midnight">
                  Badge Type <span className="text-red-500">*</span>
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {BADGE_TYPES.map((badgeType) => {
                    const Icon = badgeType.icon;
                    const isSelected = formData.type === badgeType.id;

                    return (
                      <button
                        key={badgeType.id}
                        type="button"
                        onClick={() => handleTypeChange(badgeType.id)}
                        className={cx(
                          "flex min-h-14 items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-left transition-all",
                          isSelected
                            ? `${badgeType.tone.selectedBg} ${badgeType.tone.selectedBorder} ring-4 ${badgeType.tone.ring}`
                            : "border-gray-100 hover:border-gray-200"
                        )}
                      >
                        <span
                          className={cx(
                            "flex size-9 shrink-0 items-center justify-center rounded-xl",
                            isSelected
                              ? `${badgeType.tone.bg} ${badgeType.tone.text}`
                              : "bg-gray-50 text-semi-blue"
                          )}
                        >
                          <Icon className="size-5" />
                        </span>
                        <span className="min-w-0 flex-1 text-sm font-bold text-yankees-blue">
                          {badgeType.label}
                        </span>
                        <span
                          className={cx(
                            "flex size-5 shrink-0 items-center justify-center rounded-full border",
                            isSelected
                              ? `${badgeType.tone.selectedBorder} ${badgeType.tone.text}`
                              : "border-light-blue"
                          )}
                        >
                          {isSelected && (
                            <span className="size-2 rounded-full bg-current" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {fieldErrors.type && (
                  <p className="mt-2 text-sm text-red-600">
                    {fieldErrors.type}
                  </p>
                )}
              </div>
            </div>
          </MainCard>

          <MainCard classname="rounded-3xl border-gray-100 p-6">
            <div className="mb-5">
              <h2 className="text-base font-bold text-yankees-blue">
                Earning Conditions
              </h2>
              <p className="mt-1 text-sm font-medium text-semi-blue">
                Define when junior earn this badge
              </p>
            </div>

            {selectedType ? (
              <div>
                <label className="mb-2 block text-sm font-medium text-midnight">
                  Dependency <span className="text-red-500">*</span>
                </label>
                <div className="grid h-10 grid-cols-[48px_1fr_48px] overflow-hidden rounded-xl border border-light-blue bg-white">
                  <button
                    type="button"
                    onClick={() => handleCountChange(formData.count + 1)}
                    className="flex items-center justify-center bg-gray-50 text-yankees-blue transition-colors hover:bg-gray-100"
                  >
                    <Plus className="size-5" />
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={formData.count}
                    onChange={(event) =>
                      handleCountChange(Number(event.target.value))
                    }
                    className="border-0 text-center text-sm font-bold text-semi-blue focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => handleCountChange(formData.count - 1)}
                    className="flex items-center justify-center bg-gray-50 text-yankees-blue transition-colors hover:bg-gray-100"
                  >
                    <Minus className="size-5" />
                  </button>
                </div>
                <p className="mt-2 text-xs font-medium text-semi-blue">
                  {selectedType.helper}
                </p>
                {fieldErrors.count && (
                  <p className="mt-2 text-sm text-red-600">
                    {fieldErrors.count}
                  </p>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-600">
                <Info className="size-4" />
                Choose a badge type above to see available dependency options
              </div>
            )}
          </MainCard>
        </div>

        <MainCard classname="h-max rounded-3xl border-gray-100 p-5">
          <h2 className="mb-5 text-base font-bold text-yankees-blue">
            Badge Summary
          </h2>
          <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-storm-50">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Badge preview"
                width={180}
                height={180}
                className="h-36 w-36 object-contain"
                unoptimized
              />
            ) : (
              <ImageIcon className="size-12 text-storm-400" />
            )}
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="truncate text-base font-bold text-yankees-blue">
                {formData.titleEn || "Badge Title"}
              </h3>
              <span
                className={cx(
                  "shrink-0 rounded-full px-2 py-1 text-[10px] font-black uppercase",
                  selectedType
                    ? `${selectedType.tone.bg} ${selectedType.tone.text}`
                    : "bg-gray-badge-50 text-gray-badge-400"
                )}
              >
                {selectedType ? selectedType.shortLabel : "Badge Title"}
              </span>
            </div>

            <div className="rounded-xl border border-light-blue bg-storm-50 px-4 py-3">
              <p className="text-[10px] font-black uppercase text-shadowBlue">
                Earning Condition
              </p>
              <p className="mt-1 text-sm font-bold text-yankees-blue">
                {selectedType
                  ? getBadgeCondition(formData.count, selectedType.id)
                  : "Condition"}
              </p>
            </div>
          </div>
        </MainCard>
      </form>

      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5">
        <Button
          intent="main"
          size="mainDefault"
          type="button"
          onClick={() => router.push("/admin/badges")}
        >
          Cancel
        </Button>
        <Button
          intent="main2"
          size="mainDefault"
          type="submit"
          form="badge-form"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? isEditing
              ? "Updating..."
              : "Creating..."
            : isEditing
              ? "Update Badge"
              : "Create New Badge"}
        </Button>
      </div>
    </div>
  );
};
