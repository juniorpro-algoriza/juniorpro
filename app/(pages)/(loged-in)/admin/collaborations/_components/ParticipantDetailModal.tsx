"use client";

import React from "react";
import { Modal, MainCard } from "@components";
import { User, Calendar, CheckCircle2, MessageSquare } from "lucide-react";
import {
  JUNIOR_STATUS,
  JUNIOR_STATUS_LABELS,
} from "../../../../../configs/constants";
import { components } from "../../../../../../api-schema";

type Participant =
  components["schemas"]["Sawiha.Services.DTO.AdminCollaborationModels.GetRoleJuniorRequests.GetAdminCollaborationRoleJuniorsModel"];

const STATUS_STYLE: Record<number, string> = {
  [JUNIOR_STATUS.PENDING]: "bg-gray-100 text-gray-600",
  [JUNIOR_STATUS.ACCEPTED]: "bg-green-50 text-green-600",
  [JUNIOR_STATUS.REJECTED]: "bg-red-50 text-red-600",
};

interface ParticipantDetailModalProps {
  participant: Participant;
  onClose: () => void;
}

export function ParticipantDetailModal({
  participant,
  onClose,
}: ParticipantDetailModalProps) {
  const statusNum = (participant.status as number) || JUNIOR_STATUS.PENDING;
  const statusLabel =
    JUNIOR_STATUS_LABELS[statusNum as keyof typeof JUNIOR_STATUS_LABELS] ||
    "Unknown";
  const statusClass =
    STATUS_STYLE[statusNum] || STATUS_STYLE[JUNIOR_STATUS.PENDING];

  return (
    <Modal
      title="Participant Details"
      onClose={onClose}
      panelClassName="rounded-3xl max-w-2xl w-full"
    >
      <div className="space-y-6">
        {/* Participant Info */}
        <div className="flex items-center gap-4">
          <div className="size-16 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-500 border border-gray-200">
            {participant.juniorName ? (
              participant.juniorName
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()
            ) : (
              <User className="size-6" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {participant.juniorName || "Unknown Student"}
            </h3>
            <p className="text-sm text-gray-500">
              {participant.roleCategoryNameEn ||
                participant.roleCategoryNameAr ||
                "—"}
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <MainCard classname="p-4 space-y-1">
            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
              <Calendar className="size-3.5" />
              Action Date
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {participant.actionDate
                ? new Date(participant.actionDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "—"}
            </div>
          </MainCard>

          <MainCard classname="p-4 space-y-1">
            <div className="text-xs text-gray-500 font-medium">Status</div>
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusClass}`}
            >
              {statusLabel}
            </span>
          </MainCard>

          <MainCard classname="p-4 space-y-1">
            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
              <CheckCircle2 className="size-3.5" />
              Tasks Completed
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {participant.completedTasks ?? 0}
            </div>
          </MainCard>
        </div>

        {/* Joining Reason */}
        {participant.joiningReason && (
          <MainCard classname="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="size-4 text-gray-500" />
              <h4 className="font-semibold text-gray-900">Joining Reason</h4>
            </div>
            <p className="text-sm text-gray-600">{participant.joiningReason}</p>
          </MainCard>
        )}

        {/* Action Reason */}
        {/* {participant.actionReason && (
          <MainCard classname="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Briefcase className="size-4 text-gray-500" />
              <h4 className="font-semibold text-gray-900">Action Reason</h4>
            </div>
            <p className="text-sm text-gray-600">{participant.actionReason}</p>
          </MainCard>
        )} */}
      </div>
    </Modal>
  );
}
