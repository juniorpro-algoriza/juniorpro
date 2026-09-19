"use client";

import React from "react";
import { Modal, MainCard, Skeleton } from "@components";
import { User, Calendar, Mail, CheckCircle, Star } from "lucide-react";
import { useGetJuniorDetails } from "../../tanstack/project-managers";

interface JuniorDetailModalProps {
  juniorId: number;
  onClose: () => void;
}

export function JuniorDetailModal({
  juniorId,
  onClose,
}: JuniorDetailModalProps) {
  const { data: junior, isLoading } = useGetJuniorDetails(juniorId);

  return (
    <Modal
      title="Junior Details"
      onClose={onClose}
      panelClassName="rounded-3xl max-w-2xl w-full"
    >
      {isLoading ? (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="size-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
          </div>
        </div>
      ) : junior ? (
        <div className="space-y-6">
          {/* Junior Info */}
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-full bg-blue-main/10 flex items-center justify-center text-lg font-bold text-blue-main border border-blue-main/10">
              {junior.name ? (
                junior.name
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
                {junior.name || "Unknown Junior"}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-1.5">
                <Mail className="size-3.5" />
                {junior.email || "—"}
              </p>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <MainCard classname="p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <CheckCircle className="size-3.5" />
                Verified
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {junior.isVerified ? (
                  <span className="text-green-600">Yes</span>
                ) : (
                  <span className="text-gray-400">No</span>
                )}
              </div>
            </MainCard>

            <MainCard classname="p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <Star className="size-3.5 text-amber-500" />
                Points
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {junior.points ?? 0}
              </div>
            </MainCard>

            <MainCard classname="p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <Calendar className="size-3.5" />
                Joined
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {junior.joiningDate
                  ? new Date(junior.joiningDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "—"}
              </div>
            </MainCard>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <MainCard classname="p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <Star className="size-3.5" />
                Points
              </div>
              <div className="text-lg font-bold text-gray-900">
                {junior.points ?? 0}
              </div>
            </MainCard>

            <MainCard classname="p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <User className="size-3.5" />
                Enabler
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {junior.enablerName || "—"}
              </div>
            </MainCard>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">Junior not found.</div>
      )}
    </Modal>
  );
}
