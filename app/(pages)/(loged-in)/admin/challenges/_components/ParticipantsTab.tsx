"use client";

import React, { useState } from "react";
import {
  Skeleton,
  MainCard,
  EnhancedTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Input,
} from "@components";
import { User, Eye, Search } from "lucide-react";
import { useGetChallengeParticipants } from "../../tanstack/challenges";
import { components } from "../../../../../../api-schema";
import { ParticipantDetailModal } from "./ParticipantDetailModal";

type Participant =
  components["schemas"]["Sawiha.Services.DTO.AdminChallengeModels.GetAllParticpants.GetAllChallengeParticipantModel"];

const STATUS_MAP: Record<number, { label: string; className: string }> = {
  1: {
    label: "Registered",
    className: "bg-gray-100 text-gray-600",
  },
  2: {
    label: "In Progress",
    className: "bg-amber-50 text-amber-600",
  },
  3: {
    label: "Submitted",
    className: "bg-green-50 text-green-600",
  },
};

interface ParticipantsTabProps {
  challengeId: number;
}

export function ParticipantsTab({ challengeId }: ParticipantsTabProps) {
  const [search, setSearch] = useState("");
  const [selectedParticipantId, setSelectedParticipantId] = useState<
    number | null
  >(null);

  const { data: response, isLoading } = useGetChallengeParticipants({
    id: challengeId,
    searchText: search || undefined,
  });

  const participants = (response?.data as Participant[] | undefined) || [];

  const getStatusBadge = (status?: number) => {
    const statusInfo = STATUS_MAP[status || 1] || STATUS_MAP[1];
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusInfo.className}`}
      >
        {statusInfo.label}
      </span>
    );
  };

  return (
    <div className="space-y-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <MainCard classname="p-0 border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-gray-900">
              Total Participants
            </h3>
            <span className="flex items-center justify-center px-2 py-0.5 bg-blue-main/10 text-blue-main text-xs font-bold rounded-full border border-blue-main/10">
              {isLoading ? "..." : participants.length}
            </span>
          </div>
          <div className="relative min-w-[200px]">
            <Input
              type="text"
              placeholder="Search participant..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
              leftIcon={<Search size={16} />}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <EnhancedTable>
            <TableHeader>
              <TableRow className="bg-gray-50/50 text-gray-500 border-y border-gray-100">
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                  PARTICIPANT
                </TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                  REGISTERED
                </TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                  STATUS
                </TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                  SUBMITTED
                </TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-right">
                  ACTION
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [...Array(3)].map((_, index) => (
                  <TableRow key={index} className="border-y border-gray-100">
                    <TableCell className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <Skeleton className="size-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <Skeleton className="h-5 w-32" />
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <Skeleton className="h-5 w-20" />
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <Skeleton className="h-5 w-32" />
                    </TableCell>
                    <TableCell className="py-5 px-6 text-right">
                      <Skeleton className="h-8 w-16 rounded-lg ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : participants.length > 0 ? (
                participants.map((p) => (
                  <TableRow
                    key={p.id}
                    className="group hover:bg-gray-50/30 transition-colors border-gray-200"
                  >
                    <TableCell className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 border border-gray-200">
                          {p.juniorName ? (
                            p.juniorName
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .toUpperCase()
                          ) : (
                            <User className="size-5" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="font-bold text-gray-900 text-base">
                            {p.juniorName || "Unknown Student"}
                          </div>
                          <div className="text-sm text-gray-400 font-medium">
                            {p.careerNameEn || p.careerNameAr || "—"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-5 px-6 text-sm text-gray-500 font-medium">
                      {p.registerationDate
                        ? new Date(p.registerationDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : "—"}
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      {getStatusBadge(p.status as number | undefined)}
                    </TableCell>
                    <TableCell className="py-5 px-6 text-sm text-gray-500 font-medium">
                      {p.submissionDate
                        ? new Date(p.submissionDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : "—"}
                    </TableCell>
                    <TableCell className="py-5 px-6 text-right">
                      <button
                        onClick={() => setSelectedParticipantId(p.id || null)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-blue-main transition-colors"
                      >
                        <Eye className="size-4" />
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-12 text-center text-gray-400 font-medium"
                  >
                    No participants found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </EnhancedTable>
        </div>
      </MainCard>

      {selectedParticipantId && (
        <ParticipantDetailModal
          participantId={selectedParticipantId}
          onClose={() => setSelectedParticipantId(null)}
        />
      )}
    </div>
  );
}
