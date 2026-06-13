"use client";

import React from "react";
import Image from "next/image";
import {
  Button,
  Modal,
  InfoSection,
  Carousel,
  RoleCard,
  MainCard,
  Textarea,
  Skeleton,
} from "@components";
import {
  ListTodo,
  Briefcase,
  Calendar,
  Users2,
  AlertCircle,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useJuniorCollaborationById,
  useJuniorCollaborationRoles,
  useJoinCollaborationRole,
} from "../../../(pages)/(loged-in)/junior/tanstack/collaborations";
import { toast } from "sonner";
import { JUNIOR_STATUS } from "../../../configs/constants";

const getReadableCollaborationError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);

  return message.includes("JuniorHasNoPackage")
    ? "You are not assigned to a package."
    : "Failed to join collaboration";
};

export const JoinCollaboration = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idStr = searchParams.get("id");
  const id = idStr ? parseInt(idStr) : null;
  const [selectedRole, setSelectedRole] = React.useState<number | null>(null);
  const [joiningReason, setJoiningReason] = React.useState("");

  const { data: collabData, isLoading: loadingCollab } =
    useJuniorCollaborationById(id || 0);
  const { data: roles, isLoading: loadingRoles } = useJuniorCollaborationRoles(
    id || 0
  );
  const joinRole = useJoinCollaborationRole();

  const collab = collabData?.collaborationDetails;
  const requirements = collabData?.requirements || [];
  const isRejected = collab?.juniorStatus === JUNIOR_STATUS.REJECTED;
  const rejectionReason = collab?.actionReason;

  React.useEffect(() => {
    if (roles && roles.length > 0 && !selectedRole) {
      setSelectedRole(roles[0].id || null);
    }
  }, [roles, selectedRole]);

  const handleClose = () => {
    router.back();
  };

  const handleJoin = async () => {
    if (!selectedRole || !id) return;

    try {
      await joinRole.mutateAsync({
        roleId: selectedRole,
        joiningReason: joiningReason || undefined,
      });
      toast.success("Your request has been submitted and is pending approval!");
      router.back();
    } catch (error) {
      toast.error(getReadableCollaborationError(error));
    }
  };

  const isLoading = loadingCollab || loadingRoles;

  if (isLoading) {
    return (
      <Modal panelClassName="w-[95%] max-w-4xl bg-white rounded-2xl sm:rounded-[32px] shadow-2xl overflow-hidden p-0 flex flex-col max-h-[90dvh] space-y-0">
        <div className="p-6 sm:p-10 space-y-6">
          <div className="flex items-start gap-4">
            <Skeleton className="size-14 rounded-2xl" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
        </div>
      </Modal>
    );
  }

  if (!collab) return null;

  const rewardText = collab.money
    ? `${collab.money} SAR`
    : collab.xpReward
      ? `${collab.xpReward} XP`
      : "";
  const openRoles =
    (collab.totalJuniorSeats || 0) - (collab.takenJuniorSeats || 0);
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const requirementItems = requirements
    .map((r) => r.description)
    .filter(Boolean) as string[];

  return (
    <Modal panelClassName="w-[95%] max-w-4xl bg-white rounded-2xl sm:rounded-[32px] shadow-2xl overflow-hidden p-0 flex flex-col max-h-[90dvh] space-y-0">
      {/* Header Section */}
      <div className="p-6 sm:p-10 pb-4 shrink-0">
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
          <div className="size-12 sm:size-14 bg-blue-main/5 rounded-2xl flex items-center justify-center text-blue-main flex-shrink-0">
            <Image
              src="/images/code-3d.png"
              width={48}
              height={48}
              alt="Collab Icon"
              className="size-8 sm:size-10 object-contain"
            />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              {collab.nameEn || collab.nameAr || "Collaboration"}
            </h2>
            <p className="text-gray-500 font-medium text-14 sm:text-15">
              {collab.description}
            </p>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-200 mt-6 pt-6 flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-4 text-[10px] sm:text-xs font-medium uppercase tracking-wide">
          {rewardText && (
            <div className="flex items-center gap-2 text-gray-600 flex-wrap">
              <Image
                src="/images/1stBadge.png"
                width={16}
                height={16}
                alt="Badge"
                className="sm:w-5 sm:h-5"
              />
              <span className="text-gray-400 font-bold whitespace-nowrap">
                You will get
              </span>
              <span className="text-gray-900 font-bold whitespace-nowrap">
                {rewardText}
              </span>
              <span className="text-gray-400 font-bold whitespace-nowrap">
                after completion
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-gray-400 sm:size-[18px]" />
            <span className="text-gray-400 font-bold">Due:</span>
            <span className="text-gray-900 font-bold">
              {formatDate(collab.registerationDeadline)}
            </span>
          </div>
          <div className="flex items-center gap-2 tracking-tight">
            <Users2 size={14} className="text-gray-400 sm:size-[18px]" />
            <span className="text-gray-900 font-bold">{openRoles}</span>
            <span className="text-gray-400 font-bold">
              /{collab.totalJuniorSeats || 0} open roles
            </span>
          </div>
        </div>
      </div>

      {/* Rejection Banner */}
      {isRejected && (
        <div className="mx-6 sm:mx-10 p-4 bg-red-50 mb-8 border border-red-200 rounded-2xl flex items-start gap-3">
          <AlertCircle className="size-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-bold text-red-700">
              Your previous application was rejected
            </p>
            {rejectionReason && (
              <p className="text-sm text-red-600">{rejectionReason}</p>
            )}
            <p className="text-xs text-red-500">
              You can select a role and reapply below.
            </p>
          </div>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-10 sm:pt-0 space-y-8 custom-scrollbar">
        {/* Requirements Section */}
        {requirementItems.length > 0 && (
          <InfoSection
            title="Requirements"
            description="Things your project must have"
            icon={<ListTodo className="size-6" />}
            watermark={<ListTodo className="size-48" />}
            type="checked"
            items={requirementItems}
          />
        )}

        {/* Roles & Mentors Section */}
        <MainCard classname="p-5 max-sm:p-0 md:p-8 !rounded-3xl max-sm:border-0 max-sm:shadow-none border-gray-100 shadow-sm relative overflow-hidden ">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-dark-blue-main/10 text-dark-blue-main rounded-2xl">
              <Briefcase className="size-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 leading-none mb-1">
                Roles & Mentors
              </h3>
              <p className="text-gray-500 text-sm font-medium">
                {roles && roles.length > 0
                  ? "Select a role to join this collaboration"
                  : "No roles available at the moment."}
              </p>
            </div>
          </div>

          {roles && roles.length > 0 && (
            <Carousel className="mt-4">
              {roles.map((role) => {
                const mentorName = role.mentorName || "Mentor";
                const initials = mentorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase();
                const joined = role.juniorsJoined || 0;
                const capacity = role.teamCapacity || 0;
                const isFull = capacity > 0 && joined >= capacity;

                return (
                  <RoleCard
                    key={role.id}
                    title={role.categoryNameEn || role.categoryNameAr || "Role"}
                    description={role.description || ""}
                    statusLabel={
                      isFull
                        ? `${joined}/${capacity} Full`
                        : `${joined}/${capacity} Filled`
                    }
                    statusState={
                      isFull ? "full" : joined > 0 ? "filled" : "open"
                    }
                    tools={
                      (role.tools
                        ?.map((t) => t.nameEn || t.nameAr || "")
                        .filter(Boolean) as string[]) || []
                    }
                    variant="select"
                    isSelected={selectedRole === role.id}
                    onSelect={() => setSelectedRole(role.id || null)}
                    mentor={{
                      name: mentorName,
                      role: "Mentor",
                      initials,
                    }}
                    responsibilities={
                      (role.responsibilities
                        ?.map((r) => r.description)
                        .filter(Boolean) as string[]) || []
                    }
                  />
                );
              })}
            </Carousel>
          )}
        </MainCard>

        {/* Why Fit Section */}
        <div className="space-y-4">
          <Textarea
            label="WHY ARE YOU A GOOD FIT?"
            placeholder="e.g: Tell the team about your relevant experience, skills, and what you can bring to this project..."
            className="resize-none h-40"
            containerClassName="!space-y-4"
            value={joiningReason}
            onChange={(e) => setJoiningReason(e.target.value)}
          />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 sm:p-8 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 shrink-0">
        <Button
          intent="main"
          size="mainDefault"
          className="w-full sm:w-auto bg-white hover:bg-gray-50 border border-gray-200 text-gray-500 font-bold px-8 sm:px-10 rounded-2xl"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          intent="main2"
          size="mainDefault"
          className="w-full sm:w-auto px-8 sm:px-10 rounded-2xl shadow-lg shadow-blue-main/20 font-bold"
          disabled={!selectedRole}
          onClick={handleJoin}
          isLoading={joinRole.isPending}
        >
          {isRejected ? "Rejoin Collaboration" : "Join Collaboration"}
        </Button>
      </div>
    </Modal>
  );
};
