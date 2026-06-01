"use client";

import React, { useState, useEffect } from "react";
import { Modal, Input, Button, FileUpload } from "@components";
import { Zap, ImageIcon, Info } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { components } from "../../../../../../api-schema";

import {
  useAddLevel,
  useUpdateLevel,
  useLastLevel,
  useLevelById,
} from "../../tanstack/levels/useLevels";

type Level =
  components["schemas"]["Sawiha.Services.DTO.LevelFeatureModel.GetAll.GetAdminLevelModel"];

export const CreateEditLevelModal = ({
  initialData,
  trigger,
  isOpen: controlledIsOpen,
  setIsOpen: controlledSetIsOpen,
}: {
  initialData?: Level;
  trigger?: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlModal = searchParams.get("modal");
  const urlLevelId = searchParams.get("levelId");

  const isSearchParamOpen = urlModal === "CreateEditLevel";
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : isSearchParamOpen;

  const levelIdToUse = urlLevelId || initialData?.id;
  const isEditing = !!levelIdToUse;

  const { data: levelByIdData } = useLevelById(
    Number(levelIdToUse),
    !!levelIdToUse && isSearchParamOpen
  );

  const activeLevelData = levelByIdData || initialData;

  const [xpToNextLevel, setXpToNextLevel] = useState(
    activeLevelData?.xpToNextLevel || ""
  );
  const [xpError, setXpError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Sync state if activeLevelData finishes loading asynchronously
  useEffect(() => {
    if (activeLevelData) {
      setXpToNextLevel(activeLevelData.xpToNextLevel || "");
    } else {
      setXpToNextLevel("");
    }
  }, [activeLevelData]);

  const addMutation = useAddLevel();
  const updateMutation = useUpdateLevel();
  const { data: lastLevelData, isLoading: isLoadingLastLevel } = useLastLevel();

  const isPending = addMutation.isPending || updateMutation.isPending;

  const handleClose = () => {
    if (controlledSetIsOpen) {
      controlledSetIsOpen(false);
    } else if (isSearchParamOpen) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("modal");
      params.delete("levelId");
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handleOpen = () => {
    if (controlledSetIsOpen) {
      controlledSetIsOpen(true);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.set("modal", "CreateEditLevel");
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!xpToNextLevel) {
      const message = "Please enter XP requirement";
      setXpError(message);
      toast.error(message);
      return;
    }

    if (Number(xpToNextLevel) <= 0) {
      const message = "XP requirement must be more than 0";
      setXpError(message);
      toast.error(message);
      return;
    }

    setXpError("");

    const formData = new FormData();
    formData.append("XPToNextLevel", xpToNextLevel.toString());
    if (selectedFile) {
      formData.append("Image", selectedFile);
    }
    if (isEditing && levelIdToUse) {
      formData.append("Id", levelIdToUse.toString());
    }

    try {
      if (isEditing) {
        await updateMutation.mutateAsync(formData);
        toast.success("Level updated successfully");
      } else {
        if (!selectedFile) {
          toast.error("Please select a level image");
          return;
        }
        await addMutation.mutateAsync(formData);
        toast.success("Level created successfully");
      }
      handleClose();
    } catch (error) {
      console.error(error);
      try {
        const err = error as Error;
        const errorData = JSON.parse(err.message);
        toast.error(errorData.errorMessage || "Something went wrong");
      } catch {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      {trigger && <div onClick={handleOpen}>{trigger}</div>}

      {isOpen && (
        <Modal
          panelClassName="w-full max-w-lg p-6 bg-white rounded-2xl shadow-xl max-h-[95dvh] overflow-auto"
          onClose={handleClose}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="border-b border-gray-100 pb-4 space-y-1">
              <h2 className="text-xl font-semibold text-gray-900">
                {isEditing
                  ? `Edit Level ${activeLevelData?.number || ""}`
                  : "Create New Level"}
              </h2>
            </div>

            {/* Fields */}
            <div className="space-y-5">
              {!isEditing && (
                <Input
                  label="Last Level Number"
                  type="text"
                  value={
                    isLoadingLastLevel
                      ? "Loading..."
                      : (lastLevelData?.number ?? "0")
                  }
                  helperText={
                    isLoadingLastLevel ? (
                      "Loading..."
                    ) : (
                      <div className="flex items-center gap-1">
                        <Info className="size-3" />
                        Auto-generated and read-only
                      </div>
                    )
                  }
                  disabled
                  className="bg-gray-50 border-gray-100 text-gray-500 cursor-not-allowed"
                  error=""
                />
              )}
              {/* XP Input */}
              <Input
                label="Required XP "
                type="number"
                placeholder="e.g., 1500"
                value={xpToNextLevel}
                onChange={(e) => {
                  setXpToNextLevel(e.target.value);
                  setXpError("");
                }}
                leftIcon={<Zap className="size-4 text-dark-blue-main" />}
                min={1}
                defaultValue={1}
                error={xpError}
                required
              />

              {/* Badge Upload */}
              <FileUpload
                label="Level Image"
                accept="image/*"
                onFileSelect={setSelectedFile}
                maxSizeMB={1}
                helperText={
                  <div className="flex items-center gap-1">
                    <Info className="size-3" />
                    Recommended: 400x400px square image (Max size: 1MB)
                  </div>
                }
                required
                placeholder="Upload Level Image"
              />

              {/* Current Badge Preview (edit mode only) */}
              {isEditing && !selectedFile && activeLevelData?.imageUrl && (
                <div className="flex flex-col items-center gap-3 p-4 bg-primary-50 rounded-2xl border border-primary-100">
                  <div className="flex items-center gap-2 w-full">
                    <ImageIcon className="size-4 text-cadetGray" />
                    <span className="text-xs font-semibold text-cadetGray uppercase tracking-widest">
                      Current Level
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-gray-100 shadow-main">
                    <img
                      src={activeLevelData.imageUrl}
                      alt="Current Badge"
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center gap-3 border-t border-gray-100 pt-4 justify-between">
              <Button
                type="button"
                intent="main"
                size="mainDefault"
                onClick={handleClose}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                intent="main2"
                size="mainDefault"
                disabled={isPending}
                isLoading={isPending}
              >
                {!isPending && (
                  <>{isEditing ? "Save Changes" : "Create Level"}</>
                )}
                {isPending && (isEditing ? "Saving..." : "Creating...")}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
