"use client";

import React from "react";
import Image from "next/image";
import { Button, Modal, InfoSection, MainCard, Skeleton } from "@components";
import { AlertCircle, Calendar, Users2, Trophy, ListTodo } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useJuniorChallengeById,
  useJoinChallenge,
} from "../../../(pages)/(loged-in)/junior/tanstack/challenges";
import { toast } from "sonner";
import { PATH_ICON } from "../../../configs/constants";

const MEDALS = [
  "/images/1st-medal.png",
  "/images/2nd-medal.png",
  "/images/3rd-medal.png",
];

const CHALLENGE_ERROR_MESSAGES: Record<string, string> = {
  RegistrationDeadlinePassed:
    "The registration deadline for this challenge has passed.",
};

const findReadableChallengeError = (value: unknown) => {
  const text =
    typeof value === "string" ? value : value ? JSON.stringify(value) : "";

  const matchedCode = Object.keys(CHALLENGE_ERROR_MESSAGES).find((code) =>
    text.includes(code)
  );

  return matchedCode ? CHALLENGE_ERROR_MESSAGES[matchedCode] : null;
};

const getReadableChallengeError = (error: unknown) => {
  if (!error) return "Unable to join this challenge. Please try again.";

  const knownMessage = findReadableChallengeError(error);
  if (knownMessage) return knownMessage;

  try {
    const parsed = JSON.parse((error as Error).message);
    const parsedKnownMessage = findReadableChallengeError(parsed);
    if (parsedKnownMessage) return parsedKnownMessage;

    const rawMessage =
      parsed.errorMessage ||
      parsed.message ||
      parsed.code ||
      parsed.details?.errorMessage ||
      parsed.details?.message ||
      parsed.details?.code;

    return rawMessage || "Unable to join this challenge. Please try again.";
  } catch {
    return error instanceof Error && error.message
      ? error.message
      : "Unable to join this challenge. Please try again.";
  }
};

export const JoinChallenge = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idStr = searchParams.get("id");
  const id = idStr ? parseInt(idStr) : null;

  const {
    data: challengeData,
    isLoading,
    error: challengeError,
  } = useJuniorChallengeById(id || 0);
  const joinMutation = useJoinChallenge();

  const details = challengeData?.challengeDetails;
  const requirements = challengeData?.requirements || [];
  const prizes = challengeData?.prizeDistributions || [];
  const guideSteps = challengeData?.guideSteps || [];

  const handleClose = () => {
    router.back();
  };

  const handleJoin = async () => {
    if (!id) return;

    try {
      await joinMutation.mutateAsync(id);
      toast.success("You have successfully joined the challenge!");
      router.back();
    } catch (error) {
      toast.error(getReadableChallengeError(error));
    }
  };

  if (isLoading) {
    return (
      <Modal panelClassName="w-[95%] max-w-4xl bg-white rounded-2xl sm:rounded-[32px] shadow-2xl overflow-hidden p-0 flex flex-col max-h-[90dvh] space-y-0">
        <div className="p-6 sm:p-10 space-y-6">
          <div className="flex items-start gap-4">
            <Skeleton className="size-14 rounded-2xl" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
        </div>
      </Modal>
    );
  }

  if (challengeError) {
    return (
      <Modal panelClassName="w-[95%] max-w-xl bg-white rounded-2xl sm:rounded-[32px] shadow-2xl overflow-hidden p-0">
        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4">
            <AlertCircle className="mt-0.5 size-5 flex-shrink-0 text-red-500" />
            <div className="space-y-1">
              <h2 className="text-base font-bold text-red-700">
                Challenge unavailable
              </h2>
              <p className="text-sm font-medium text-red-600">
                {getReadableChallengeError(challengeError)}
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              intent="main"
              size="mainDefault"
              className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-500 font-bold px-8 rounded-2xl"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  if (!details) return null;

  const iconKey = (details.icon?.toString() || "1") as keyof typeof PATH_ICON;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const requirementItems = requirements
    .map((r) => r.description)
    .filter(Boolean) as string[];

  return (
    <Modal panelClassName="w-[95%] max-w-4xl bg-white rounded-2xl sm:rounded-[32px] shadow-2xl overflow-hidden p-0 flex flex-col max-h-[90dvh] space-y-0">
      {/* Header Section */}
      <div className="p-6 sm:p-10 pb-4 shrink-0">
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
          <div className="size-12 sm:size-14 bg-purple-main/5 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Image
              src={PATH_ICON[iconKey] || PATH_ICON["1"]}
              width={48}
              height={48}
              alt="Challenge Icon"
              className="size-8 sm:size-10 object-contain"
            />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              {details.nameEn || details.nameAr || "Challenge"}
            </h2>
            <p className="text-gray-500 font-medium text-14 sm:text-15">
              {details.description}
            </p>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-200 mt-6 pt-6 flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-4 text-[10px] sm:text-xs font-medium uppercase tracking-wide">
          {prizes.length > 0 && (
            <div className="flex items-center gap-2 text-gray-600 flex-wrap">
              <Image
                src="/images/1stBadge.png"
                width={16}
                height={16}
                alt="Badge"
                className="sm:w-5 sm:h-5"
              />
              <span className="text-gray-400 font-bold whitespace-nowrap">
                Top Prize
              </span>
              <span className="text-gray-900 font-bold whitespace-nowrap">
                {prizes[0]?.points || 0} Points & {prizes[0]?.xp || 0} XP
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-gray-400 sm:size-[18px]" />
            <span className="text-gray-400 font-bold">Due:</span>
            <span className="text-gray-900 font-bold">
              {formatDate(details.endDate)}
            </span>
          </div>
          <div className="flex items-center gap-2 tracking-tight">
            <Users2 size={14} className="text-gray-400 sm:size-[18px]" />
            <span className="text-gray-900 font-bold">
              {details.participantCount || 0}
            </span>
            <span className="text-gray-400 font-bold">participants</span>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-10 sm:pt-0 space-y-8 custom-scrollbar">
        {/* Requirements Section */}
        {requirementItems.length > 0 && (
          <InfoSection
            title="Requirements"
            description="Things you need before starting"
            icon={<ListTodo className="size-6" />}
            watermark={<ListTodo className="size-48" />}
            type="checked"
            items={requirementItems}
          />
        )}

        {/* Guidelines */}
        {guideSteps.length > 0 && (
          <InfoSection
            title="Guidelines"
            description="Steps to complete this challenge"
            icon={<ListTodo className="size-6" />}
            type="bullet"
            items={guideSteps.map(
              (step, i) => step.description || `Step ${i + 1}`
            )}
          />
        )}

        {/* Prize Distribution */}
        {prizes.length > 0 && (
          <div>
            <div className="flex items-start gap-4 mb-6 px-2">
              <div className="p-3 bg-dark-blue-main/10 text-dark-blue-main rounded-xl">
                <Trophy className="size-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Prize Distribution
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Rewards for top performers
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {prizes.map((prize, index) => (
                <MainCard key={index} classname="flex items-center gap-4 p-4">
                  <div className="relative size-12 flex-shrink-0">
                    {index < 3 ? (
                      <Image
                        src={MEDALS[index]}
                        alt={`${index + 1} place medal`}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-lg text-dark-blue-main border border-gray-200">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="font-semibold text-gray-900">
                      {prize.titleEn ||
                        `${index + 1}${index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"} Place`}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="font-medium">
                        {prize.points || 0} Points
                      </span>
                      <span className="font-medium">{prize.xp || 0} XP</span>
                    </div>
                  </div>
                </MainCard>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 sm:p-8 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 shrink-0">
        <Button
          intent="main"
          size="mainDefault"
          className="w-full sm:w-auto bg-white hover:bg-gray-50 border border-gray-200 text-gray-500 font-bold px-8 sm:px-10 rounded-2xl"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          intent="main2"
          size="mainDefault"
          className="w-full sm:w-auto px-8 sm:px-10 rounded-2xl shadow-lg shadow-blue-main/20 font-bold"
          onClick={handleJoin}
          isLoading={joinMutation.isPending}
        >
          Join Challenge
        </Button>
      </div>
    </Modal>
  );
};
