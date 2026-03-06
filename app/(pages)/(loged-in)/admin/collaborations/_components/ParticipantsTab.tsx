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
import { User, Eye } from "lucide-react";
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
      {/* Participants Table */}
      <MainCard classname="p-0 border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-gray-900">
              Total Participants
            </h3>
            <span className="flex items-center justify-center px-2 py-0.5 bg-blue-main/10 text-blue-main text-xs font-bold rounded-full border border-blue-main/10">
              {isLoading ? "Loading..." : participants.length}
            </span>
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
                  LEVEL
                </TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                  REGISTERED
                </TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                  TASKS DONE
                </TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-right">
                  ACTION
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                /* Loading State */
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
                      <Skeleton className="h-5 w-8" />
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <Skeleton className="h-5 w-32" />
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <Skeleton className="h-5 w-8" />
                    </TableCell>
                    <TableCell className="py-5 px-6 text-right">
                      <Skeleton className="h-8 w-16 rounded-lg ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : participants.length > 0 ? (
                /* Data State */
                participants.map((p: Application) => (
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
                            {p.roleCategoryNameEn || "UI Designer"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-5 px-6 text-sm text-gray-500 font-medium">
                      12
                    </TableCell>
                    <TableCell className="py-5 px-6 text-sm text-gray-500 font-medium">
                      {p.actionDate
                        ? new Date(p.actionDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "No date"}
                    </TableCell>
                    <TableCell className="py-5 px-6 text-sm text-gray-500 font-medium">
                      12
                    </TableCell>
                    <TableCell className="py-5 px-6 text-right">
                      <button className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-blue-main transition-colors">
                        <Eye className="size-4" />
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                /* Empty State */
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
    </div>
  );
}
