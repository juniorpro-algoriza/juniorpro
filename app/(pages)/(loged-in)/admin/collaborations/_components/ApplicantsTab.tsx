"use client";

import React, { useState } from "react";
import { Button, Skeleton, Modal, Textarea, Animate } from "@components";
import { X, Check, Users2, Clock, AlertCircle, User } from "lucide-react";
import {
  useGetJuniorRoleRequests,
  useAcceptJuniorRole,
  useRejectJuniorRole,
} from "../../tanstack/collaborations";
import { components } from "../../../../../../api-schema";
import { toast } from "sonner";

type Application =
  components["schemas"]["Sawiha.Services.DTO.AdminCollaborationModels.GetRoleJuniorRequests.GetAdminCollaborationRoleJuniorsModel"];

interface ApplicantsTabProps {
  collaborationId: number;
}

export function ApplicantsTab({ collaborationId }: ApplicantsTabProps) {
  const [rejectingId, setRejectingId] = useState<number | null>(null);
  const [rejectingName, setRejectingName] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  // Fetch Pending
  const { data: pendingResponse, isLoading: pendingLoading } =
    useGetJuniorRoleRequests({
      collaborationId,
      status: 1, // Pending
    });

  // Fetch Rejected
  const { data: rejectedResponse, isLoading: rejectedLoading } =
    useGetJuniorRoleRequests({
      collaborationId,
      status: 3, // Rejected
    });

  const acceptMutation = useAcceptJuniorRole();
  const rejectMutation = useRejectJuniorRole();

  const handleAccept = (id: number) => {
    acceptMutation.mutate(id, {
      onSuccess: () => toast.success("Applicant approved successfully"),
      onError: () => toast.error("Failed to approve applicant"),
    });
  };

  const handleOpenRejectModal = (id: number, name: string) => {
    setRejectingId(id);
    setRejectingName(name);
    setRejectReason("");
  };

  const handleReject = () => {
    if (rejectingId && rejectReason.trim()) {
      rejectMutation.mutate(
        {
          id: rejectingId,
          actionReason: rejectReason,
        },
        {
          onSuccess: () => {
            toast.success("Applicant rejected successfully");
            setRejectingId(null);
            setRejectingName("");
            setRejectReason("");
          },
          onError: () => toast.error("Failed to reject applicant"),
        }
      );
    }
  };

  const pendingApplications = pendingResponse?.data || [];
  const rejectedApplications = rejectedResponse?.data || [];

  console.log(
    "[GET /api/admin-collaboration/junior-roles-requests] params: { CollaborationId:",
    collaborationId,
    ", Status: 1 (Pending) } →",
    pendingResponse
  );
  console.log(
    "[GET /api/admin-collaboration/junior-roles-requests] params: { CollaborationId:",
    collaborationId,
    ", Status: 3 (Rejected) } →",
    rejectedResponse
  );

  return (
    <div className="space-y-10 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Pending Applications Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              Pending Applications
              {pendingApplications.length > 0 && (
                <span className="bg-orange-50 text-orange-600 text-xs font-bold px-2.5 py-1 rounded-full border border-orange-100 uppercase tracking-wider">
                  {pendingApplications.length} Pending
                </span>
              )}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Review requests to join this collaboration
            </p>
          </div>
        </div>

        {pendingLoading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-2xl" />
            ))}
          </div>
        ) : pendingApplications.length > 0 ? (
          <div className="space-y-4">
            {pendingApplications.map((app: Application) => (
              <Animate key={app.id}>
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Avatar & Info */}
                  <div className="flex gap-4 flex-1">
                    <div className="size-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg border border-blue-100 overflow-hidden shrink-0">
                      {app.juniorName ? (
                        app.juniorName
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .toUpperCase()
                      ) : (
                        <User className="size-6" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 text-lg">
                          {app.juniorName || "Unknown Student"}
                        </h3>
                        <span className="bg-violet-50 text-violet-600 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">
                          LVL 12
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <Users2 className="size-3.5" />
                          {app.roleCategoryNameEn || "Role Name"}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="size-3.5" />
                          {app.actionDate
                            ? new Date(app.actionDate).toLocaleDateString()
                            : "No Date"}
                        </span>
                      </div>
                      {/* Quote/Motivation */}
                      <div className="mt-3 bg-gray-50/50 rounded-xl px-4 py-2 border border-gray-100 inline-block italic text-gray-600 text-sm">
                        "{app.joiningReason || "No motivation provided."}"
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full md:w-auto shrink-0 mt-4 md:mt-0">
                    <Button
                      intent="dangerMain"
                      size="mainDefault"
                      className="flex-1 md:flex-none"
                      onClick={() =>
                        handleOpenRejectModal(
                          app.id!,
                          app.juniorName || "this student"
                        )
                      }
                      icon={<X className="size-4" />}
                      iconPosition="left"
                    >
                      Reject
                    </Button>
                    <Button
                      intent="successMain"
                      size="mainDefault"
                      className="flex-1 md:flex-none"
                      onClick={() => handleAccept(app.id!)}
                      isLoading={
                        acceptMutation.isPending &&
                        acceptMutation.variables === app.id
                      }
                      icon={<Check className="size-4" />}
                      iconPosition="left"
                    >
                      Approve & Add
                    </Button>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-gray-100 rounded-3xl py-16 flex flex-col items-center justify-center text-center space-y-4">
            <div className="size-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
              <Users2 className="size-8" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                No pending applicants
              </h3>
              <p className="text-gray-500 max-w-xs mx-auto">
                All caught up! Check back later for new requests.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Rejected History Section */}
      <section className="space-y-6 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 bg-red-50 text-red-500 rounded-full border border-red-100">
            <X className="size-4" />
          </div>
          <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">
            Rejected History
          </h2>
        </div>

        {rejectedLoading ? (
          <div className="space-y-3">
            {[1].map((i) => (
              <Skeleton key={i} className="h-24 w-full rounded-2xl" />
            ))}
          </div>
        ) : rejectedApplications.length > 0 ? (
          <div className="space-y-3">
            {rejectedApplications.map((app: Application) => (
              <div
                key={app.id}
                className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col md:flex-row items-start gap-6"
              >
                <div className="flex gap-4 flex-1">
                  <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-sm overflow-hidden shrink-0 grayscale opacity-60">
                    {app.juniorName ? (
                      app.juniorName
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()
                    ) : (
                      <User className="size-5" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-gray-700">
                      {app.juniorName || "Unknown Student"}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {app.roleCategoryNameEn || "Student"}
                    </p>
                  </div>
                </div>

                {/* Rejection Reason */}
                <div className="bg-red-50/30 border border-red-50 rounded-xl px-5 py-4 flex-1 w-full md:w-auto">
                  <div className="flex items-center gap-2 mb-1.5">
                    <AlertCircle className="size-3.5 text-red-400" />
                    <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">
                      Rejection Reason
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm italic font-medium">
                    "{app.actionReason || "No reason provided."}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-gray-400 text-sm italic">
            No rejected applications in history.
          </p>
        )}
      </section>

      {/* Reject Modal */}
      {rejectingId && (
        <Modal
          onClose={() => setRejectingId(null)}
          panelClassName="p-0 overflow-hidden md:w-2xl rounded-3xl"
        >
          <div className="relative">
            {/* Header with Circle Icon */}
            <div className="bg-red-200 h-32 flex items-center justify-center relative">
              <div className="size-25 bg-red-500 rounded-full flex items-center justify-center border-[4px] border-white shadow-lg z-10 absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2">
                <X className="size-10 text-white stroke-[3]" />
              </div>
              <div
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                onClick={() => setRejectingId(null)}
              >
                <X className="size-5" />
              </div>
            </div>

            <div className="px-8 pb-10 pt-14 text-center space-y-6">
              <div className="space-y-2">
                <span className="text-sm font-black text-red-500 uppercase tracking-[0.2em]">
                  Application Rejected
                </span>
                <h2 className="text-3xl font-black text-gray-900 leading-tight">
                  Confirm Rejection
                </h2>
                <p className="text-gray-500 font-semibold ">
                  Are you sure you want to reject{" "}
                  <span className="text-gray-900 font-bold">
                    {rejectingName}
                  </span>
                  ?
                </p>
              </div>

              <div className="text-left space-y-2">
                <Textarea
                  placeholder="Reason for rejection (required)..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="min-h-[120px] rounded-2xl border-2 border-gray-100 focus:border-red-500 transition-colors bg-gray-50/30"
                  required
                />
                <p className="text-sm text-gray-400 text-center font-medium">
                  This reason will be shared with the student.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Button
                  intent="dangerMain"
                  size="mainLg"
                  className="w-full"
                  onClick={handleReject}
                  disabled={!rejectReason.trim() || rejectMutation.isPending}
                  isLoading={rejectMutation.isPending}
                >
                  Confirm Rejection
                </Button>
                <button
                  className="w-full py-3 text-gray-500 font-bold text-sm hover:text-gray-700 transition-colors"
                  onClick={() => setRejectingId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
