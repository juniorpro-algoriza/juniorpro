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
import { useGetProjectManagerJuniors } from "../../tanstack/project-managers";
import { components } from "../../../../../../api-schema";
import { JuniorDetailModal } from "./JuniorDetailModal";

type ProjectManagerDetail =
  components["schemas"]["Sawiha.Services.DTO.ProjectMangerModels.ProjectMangerDetailModel"];

interface JuniorsTabProps {
  projectManagerId: number;
}

export function JuniorsTab({ projectManagerId }: JuniorsTabProps) {
  const [search, setSearch] = useState("");
  const [selectedJuniorId, setSelectedJuniorId] = useState<number | null>(null);

  const { data: response, isLoading } = useGetProjectManagerJuniors({
    projectManagerId,
    searchText: search || undefined,
  });

  const juniors = (response?.data as ProjectManagerDetail[] | undefined) || [];

  return (
    <div className="space-y-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <MainCard classname="p-0 border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-gray-900">Juniors</h3>
            <span className="flex items-center justify-center px-2 py-0.5 bg-blue-main/10 text-blue-main text-xs font-bold rounded-full border border-blue-main/10">
              {isLoading ? "..." : juniors.length}
            </span>
          </div>
          <div className="relative min-w-[200px]">
            <Input
              type="text"
              placeholder="Search junior..."
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
                  NAME
                </TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                  EMAIL
                </TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                  STATUS
                </TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                  PROJECTS
                </TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                  JOINED
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
                        <Skeleton className="size-10 rounded-full" />
                        <Skeleton className="h-5 w-32" />
                      </div>
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <Skeleton className="h-5 w-40" />
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <Skeleton className="h-5 w-20" />
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <Skeleton className="h-5 w-12" />
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <Skeleton className="h-5 w-28" />
                    </TableCell>
                    <TableCell className="py-5 px-6 text-right">
                      <Skeleton className="h-8 w-16 rounded-lg ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : juniors.length > 0 ? (
                juniors.map((junior) => (
                  <TableRow
                    key={junior.id}
                    className="group hover:bg-gray-50/30 transition-colors border-gray-200"
                  >
                    <TableCell className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-blue-main/10 flex items-center justify-center text-xs font-bold text-blue-main border border-blue-main/10">
                          {junior.name ? (
                            junior.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .toUpperCase()
                          ) : (
                            <User className="size-4" />
                          )}
                        </div>
                        <span className="font-bold text-gray-900">
                          {junior.name || "Unknown"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-5 px-6 text-sm text-gray-500 font-medium">
                      {junior.email || "—"}
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          junior.status === "Active"
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {junior.status || "—"}
                      </span>
                    </TableCell>
                    <TableCell className="py-5 px-6 text-sm text-gray-500 font-medium">
                      {junior.projectsCount ?? 0}
                    </TableCell>
                    <TableCell className="py-5 px-6 text-sm text-gray-500 font-medium">
                      {junior.joiningDate
                        ? new Date(junior.joiningDate).toLocaleDateString(
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
                        onClick={() => setSelectedJuniorId(junior.id || null)}
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
                    colSpan={6}
                    className="py-12 text-center text-gray-400 font-medium"
                  >
                    No juniors found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </EnhancedTable>
        </div>
      </MainCard>

      {selectedJuniorId && (
        <JuniorDetailModal
          juniorId={selectedJuniorId}
          onClose={() => setSelectedJuniorId(null)}
        />
      )}
    </div>
  );
}
