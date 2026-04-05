"use client";

import React from "react";
import { Modal, MainCard, Skeleton } from "@components";
import { User, Calendar, Mail, CheckCircle, Wallet, Star } from "lucide-react";
import { useGetEnablerDetails } from "../../tanstack/project-managers";

interface EnablerDetailModalProps {
  enablerId: number;
  onClose: () => void;
}

export function EnablerDetailModal({
  enablerId,
  onClose,
}: EnablerDetailModalProps) {
  const { data: enabler, isLoading } = useGetEnablerDetails(enablerId);

  return (
    <Modal
      title="Enabler Details"
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
      ) : enabler ? (
        <div className="space-y-6">
          {/* Enabler Info */}
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-full bg-purple-main/10 flex items-center justify-center text-lg font-bold text-purple-main border border-purple-main/10">
              {enabler.name ? (
                enabler.name
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
                {enabler.name || "Unknown Enabler"}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-1.5">
                <Mail className="size-3.5" />
                {enabler.email || "—"}
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
                {enabler.isVerified ? (
                  <span className="text-green-600">Yes</span>
                ) : (
                  <span className="text-gray-400">No</span>
                )}
              </div>
            </MainCard>

            <MainCard classname="p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <User className="size-3.5" />
                Juniors
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {enabler.juniorsCount ?? 0}
              </div>
            </MainCard>

            <MainCard classname="p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <Calendar className="size-3.5" />
                Joined
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {enabler.joiningDate
                  ? new Date(enabler.joiningDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "—"}
              </div>
            </MainCard>
          </div>

          {/* Wallet & Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <MainCard classname="p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <Wallet className="size-3.5" />
                Wallet
              </div>
              <div className="text-lg font-bold text-gray-900">
                {enabler.wallet ?? 0} SAR
              </div>
            </MainCard>

            <MainCard classname="p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <Star className="size-3.5" />
                Points
              </div>
              <div className="text-lg font-bold text-gray-900">
                {enabler.points ?? 0}
              </div>
            </MainCard>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">Enabler not found.</div>
      )}
    </Modal>
  );
}
