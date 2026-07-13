"use client";

import { useState } from "react";
import { MainCard, Skeleton, Button, Input } from "@components";
import { Users, Mail, Check, UserPlus } from "lucide-react";
import { useJuniorsData, useInviteJunior } from "../../tanstack";
import { toast } from "sonner";
import { components } from "../../../../../../api-schema";

type JuniorModel =
  components["schemas"]["Sawiha.Services.DTO.JuniorModels.JuniorOfEnablerModel"];

export const ManageJuniorsWidget = () => {
  const { data: juniorsResponse, isLoading } = useJuniorsData();
  const inviteJunior = useInviteJunior();
  const [email, setEmail] = useState("");

  const handleInvite = async () => {
    if (!email) return;
    try {
      await inviteJunior.mutateAsync(email);
      toast.success("Junior invited successfully!");
      setEmail("");
    } catch (error: unknown) {
      let errorMessage = "Failed to invite junior";
      try {
        const parsedError = JSON.parse((error as Error).message);
        if (parsedError.code === "EMAIL_ALREADY_EXIST") {
          errorMessage = "This email is already registered.";
        } else if (parsedError.statusText) {
          errorMessage = parsedError.statusText;
        }
      } catch {
        if (error instanceof Error && error.message)
          errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <MainCard classname="h-[420px] flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="size-10 rounded-xl" />
          <Skeleton className="h-5 w-40 rounded" />
        </div>
        <Skeleton className="h-10 w-full mb-4 rounded-lg" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg" />
          ))}
        </div>
      </MainCard>
    );
  }

  const juniors = juniorsResponse?.data || [];

  return (
    <MainCard classname="h-[420px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="size-10 sm:size-12 rounded-xl border-b-4 border-indigo-500 bg-indigo-400 flex items-center justify-center shadow-indigo-100 shrink-0">
            <Users className="size-5 sm:size-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg">My Juniors</h3>
            <p className="text-xs text-gray-500 font-medium">
              Manage and invite juniors
            </p>
          </div>
        </div>
        <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
          {juniors.length} Total
        </div>
      </div>

      <div className="flex gap-2 mb-4 items-center">
        <Input
          type="email"
          placeholder="Junior's email address..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          leftIcon={<Mail className="size-4 text-gray-400" />}
        />
        <Button
          intent="main2"
          size="mainDefault"
          disabled={!email || inviteJunior.isPending}
          onClick={handleInvite}
          isLoading={inviteJunior.isPending}
        >
          <UserPlus className="size-4 mr-2" />
          Invite
        </Button>
      </div>

      <div className="flex-1 overflow-auto pr-1 space-y-2">
        {juniors.length > 0 ? (
          juniors.map((junior: JuniorModel, index: number) => (
            <div
              key={junior.id ?? index}
              className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                  {junior.name?.slice(0, 1).toUpperCase() || "J"}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {junior.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Level {junior.currentLevel || 1} •{" "}
                    {junior.totalXP || junior.points || 0} XP
                  </p>
                </div>
              </div>

              {junior.isJoinedToCurrentPackage ? (
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                  <Check className="size-3" />
                  Assigned
                </span>
              ) : (
                <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full border border-gray-200">
                  Unassigned
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-gray-500 flex flex-col items-center">
            <Users className="size-8 text-gray-300 mb-2" />
            <p className="text-sm font-semibold">No Juniors Yet</p>
            <p className="text-xs">Invite a junior to get started.</p>
          </div>
        )}
      </div>
    </MainCard>
  );
};
