"use client";

import React from "react";
import {
  Skeleton,
  MainCard,
  EnhancedTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components";
import { User, Eye, Users2 } from "lucide-react";
import { useGetJuniorRoleRequests } from "../../tanstack/collaborations";
import { components } from "../../../../../../api-schema";

type Application =
  components["schemas"]["Sawiha.Services.DTO.AdminCollaborationModels.GetRoleJuniorRequests.GetAdminCollaborationRoleJuniorsModel"];

interface ParticipantsTabProps {
  collaborationId: number;
}

export function ParticipantsTab({ collaborationId }: ParticipantsTabProps) {
  // Fetch Accepted (Participants)
  const { data: participantsResponse, isLoading } = useGetJuniorRoleRequests({
    collaborationId,
    status: 2, // Accepted
  });

  const participants = participantsResponse?.data || [];

  return (
    <div className="space-y-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header / Stats */}
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-[#111827]">Total Participants</h2>
        <span className="bg-[#EEF2FF] text-[#6366F1] text-xs font-bold px-2.5 py-1 rounded-full">
          {participants.length}
        </span>
      </div>

      {/* Participants Table */}
      {isLoading ? (
        <MainCard classname="p-0 overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem]">
          <div className="p-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-2xl" />
            ))}
          </div>
        </MainCard>
      ) : participants.length > 0 ? (
        <MainCard classname="p-0 overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem]">
          <div className="overflow-x-auto">
            <EnhancedTable>
              <TableHeader className="bg-gray-50/30 border-b border-gray-100/50">
                <TableRow>
                  <TableHead className="text-[11px] font-black text-[#9CA3AF] uppercase tracking-widest px-8 py-6">
                    PARTICIPANT
                  </TableHead>
                  <TableHead className="text-[11px] font-black text-[#9CA3AF] uppercase tracking-widest px-8 py-6">
                    LEVEL
                  </TableHead>
                  <TableHead className="text-[11px] font-black text-[#9CA3AF] uppercase tracking-widest px-8 py-6">
                    REGISTERED
                  </TableHead>
                  <TableHead className="text-[11px] font-black text-[#9CA3AF] uppercase tracking-widest px-8 py-6">
                    TASKS DONE
                  </TableHead>
                  <TableHead className="text-[11px] font-black text-[#9CA3AF] uppercase tracking-widest px-8 py-6 text-right">
                    ACTION
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.map((p: Application) => (
                  <TableRow
                    key={p.id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0 group"
                  >
                    <TableCell className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#6B7280] font-bold text-sm shrink-0">
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
                        <div className="space-y-0.5">
                          <div className="font-bold text-[#1F2937]">
                            {p.juniorName || "Unknown Student"}
                          </div>
                          <div className="text-xs text-[#9CA3AF] font-medium">
                            {p.roleCategoryNameEn || "UI Designer"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-8 py-6 text-sm text-[#4B5563] font-medium">
                      12
                    </TableCell>
                    <TableCell className="px-8 py-6 text-sm text-[#4B5563] font-medium">
                      {p.actionDate
                        ? new Date(p.actionDate)
                            .toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                            .replace(",", "")
                        : "20 Jan 2024, 12:00PM"}
                    </TableCell>
                    <TableCell className="px-8 py-6 text-sm text-[#4B5563] font-medium">
                      12
                    </TableCell>
                    <TableCell className="px-8 py-6 text-right">
                      <button className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B7280] hover:text-[#4F46E5] transition-colors">
                        <Eye className="size-4" />
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </EnhancedTable>
          </div>
        </MainCard>
      ) : (
        <div className="bg-white border-2 border-dashed border-gray-100 rounded-[2rem] py-20 flex flex-col items-center justify-center text-center space-y-4 shadow-sm">
          <div className="size-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
            <Users2 className="size-8" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">
              No participants yet
            </h3>
            <p className="text-gray-500 max-w-xs mx-auto">
              Accepted applicants will appear here once they join the
              collaboration.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
