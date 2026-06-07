"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import {
  Briefcase,
  Calendar,
  CheckCircle,
  ClipboardCheck,
  User,
} from "lucide-react";
import { MainCard, Modal, Skeleton } from "@components";
import { useGetJuniorRoleRequests } from "../../../(pages)/(loged-in)/admin/tanstack/collaborations";
import { components } from "../../../../api-schema";

type Application =
  components["schemas"]["Sawiha.Services.DTO.AdminCollaborationModels.GetRoleJuniorRequests.GetAdminCollaborationRoleJuniorsModel"];

const formatDate = (date?: string | null) => {
  if (!date) return "No date";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getInitials = (name?: string | null) => {
  return name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();
};

export const ParticipantDetails = () => {
  const searchParams = useSearchParams();

  const collaborationId = Number(searchParams.get("collaborationId") || 0);
  const participantId = Number(searchParams.get("participantId") || 0);

  const { data: participantsResponse, isLoading } = useGetJuniorRoleRequests({
    collaborationId,
    status: 2,
    pageNumber: 1,
    pageSize: 1000,
  });

  const selectedParticipant = React.useMemo<Application | null>(() => {
    const participants = participantsResponse?.data || [];
    if (!participantId) return null;
    return (
      participants.find((p: Application) => p.id === participantId) || null
    );
  }, [participantId, participantsResponse?.data]);

  return (
    <Modal panelClassName="w-[95%] max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden p-0 flex flex-col max-h-[90dvh] space-y-0">
      <div className="p-6 pb-0 shrink-0">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-green-100 bg-green-50 text-green-600">
              Accepted Participant
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">
              Collaboration Member
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="size-16 rounded-full bg-blue-main/10 flex items-center justify-center text-lg font-bold text-blue-main border border-blue-main/10 shrink-0">
                {selectedParticipant?.juniorName ? (
                  getInitials(selectedParticipant.juniorName)
                ) : (
                  <User className="size-6" />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-gray-900 truncate">
                  {selectedParticipant?.juniorName || "Unknown Student"}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {selectedParticipant?.roleCategoryNameEn ||
                    selectedParticipant?.roleCategoryNameAr ||
                    "No role"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-3 border-gray-50 w-[95%] mx-auto" />

      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5 custom-scrollbar">
        {isLoading ? (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Skeleton className="h-24 rounded-2xl" />
              <Skeleton className="h-24 rounded-2xl" />
              <Skeleton className="h-24 rounded-2xl" />
            </div>
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-28 rounded-2xl" />
          </div>
        ) : selectedParticipant ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <MainCard classname="p-4 space-y-1">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <Calendar className="size-3.5" />
                  Registered
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {formatDate(selectedParticipant.actionDate)}
                </div>
              </MainCard>

              <MainCard classname="p-4 space-y-1">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <ClipboardCheck className="size-3.5" />
                  Tasks Done
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {selectedParticipant.completedTasks ?? 0}
                </div>
              </MainCard>

              <MainCard classname="p-4 space-y-1">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <CheckCircle className="size-3.5" />
                  Status
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold">
                  Accepted
                </span>
              </MainCard>
            </div>

            <MainCard classname="p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <Briefcase className="size-3.5" />
                Role
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {selectedParticipant.roleCategoryNameEn ||
                  selectedParticipant.roleCategoryNameAr ||
                  "No role"}
              </div>
            </MainCard>

            {selectedParticipant.joiningReason && (
              <MainCard classname="p-4 space-y-2">
                <h4 className="text-xs font-bold text-gray-500 tracking-widest uppercase">
                  Joining Reason
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {selectedParticipant.joiningReason}
                </p>
              </MainCard>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-10 text-center text-sm font-medium text-gray-500">
            Participant not found.
          </div>
        )}
      </div>
    </Modal>
  );
};
