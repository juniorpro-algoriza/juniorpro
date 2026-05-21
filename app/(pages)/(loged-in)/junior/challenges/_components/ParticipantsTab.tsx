"use client";

import React from "react";
import { Users2 } from "lucide-react";
import { MainCard } from "@components";

interface ParticipantsTabProps {
  participantCount: number;
}

export function ParticipantsTab({ participantCount }: ParticipantsTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-6">
      <MainCard classname="p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-blue-main/10 text-blue-main rounded-2xl">
            <Users2 className="size-8" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900">
              {participantCount}
            </h3>
            <p className="text-gray-500 text-sm mt-1 font-medium">
              Participants joined this challenge
            </p>
          </div>
        </div>
      </MainCard>
    </div>
  );
}
