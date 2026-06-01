"use client";
import React from "react";
import Image from "next/image";
import { Breadcrumb, DetailCard, Skeleton, Tabs } from "@components";
import {
  AlertCircle,
  Calendar,
  ClipboardList,
  FileText,
  Sparkles,
  Trophy,
  Users2,
} from "lucide-react";
import type { TabData } from "@types";
import {
  OverviewTab,
  RequirementsTab,
  ParticipantsTab,
  SubmissionTab,
  LeaderboardTab,
} from "../_components";
import { PATH_ICON } from "../../../../../configs/constants";
import { useJuniorChallengeById } from "../../tanstack/challenges";

const PRIZE_MEDALS = [
  "/images/1st-medal.png",
  "/images/2nd-medal.png",
  "/images/3rd-medal.png",
];

const PRIZE_LABELS = ["1st Place", "2nd Place", "3rd Place"];

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
  if (!error) return "Unable to load this challenge. Please try again.";

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

    return rawMessage || "Unable to load this challenge. Please try again.";
  } catch {
    return error instanceof Error && error.message
      ? error.message
      : "Unable to load this challenge. Please try again.";
  }
};

export default function JuniorChallengeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = React.use(params);
  const id = parseInt(idStr);

  const {
    data: challengeData,
    isLoading,
    error: challengeError,
  } = useJuniorChallengeById(id);

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 md:p-0">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-12 w-96" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  if (challengeError) {
    return (
      <div className="space-y-6 p-4 md:p-0">
        <div className="rounded-3xl border border-red-100 bg-red-50 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 size-5 flex-shrink-0 text-red-500" />
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-red-700">
                Challenge unavailable
              </h2>
              <p className="text-sm font-medium text-red-600">
                {getReadableChallengeError(challengeError)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const details = challengeData?.challengeDetails;
  if (!details) return null;

  const goals = challengeData?.goals || [];
  const guideSteps = challengeData?.guideSteps || [];
  const requirements = challengeData?.requirements || [];
  const evaluations = challengeData?.evaluations || [];
  const prizes = challengeData?.prizeDistributions || [];
  const participantDetail = challengeData?.participantDetail;

  const iconKey = (details.icon?.toString() || "1") as keyof typeof PATH_ICON;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const breadcrumbs = [
    { title: "Home", href: "/junior/dashboard" },
    { title: "Challenges", href: "/junior/challenges" },
    {
      title: details.nameEn || details.nameAr || "Challenge",
      href: `/junior/challenges/${id}`,
    },
  ];

  const isJoined = details.isJoined;

  const tabs: TabData[] = [
    {
      name: (
        <span className="inline-flex items-center gap-1.5">
          <ClipboardList className="size-4" />
          Overview
        </span>
      ),
      content: (
        <OverviewTab goals={goals} guideSteps={guideSteps} prizes={prizes} />
      ),
    },
    {
      name: (
        <span className="inline-flex items-center gap-1.5">
          <FileText className="size-4" />
          Requirements
        </span>
      ),
      content: <RequirementsTab requirements={requirements} />,
    },
    {
      name: (
        <span className="inline-flex items-center gap-1.5">
          <Users2 className="size-4" />
          Participants
        </span>
      ),
      content: (
        <ParticipantsTab participantCount={details.participantCount || 0} />
      ),
    },
    {
      name: (
        <span className="inline-flex items-center gap-1.5">
          <Trophy className="size-4" />
          Winners
        </span>
      ),
      content: <LeaderboardTab challengeId={id} prizeDistributions={prizes} />,
    },
  ];

  if (isJoined) {
    tabs.push({
      name: "Submission",
      content: (
        <SubmissionTab
          challengeId={id}
          evaluations={evaluations}
          participantDetail={participantDetail}
        />
      ),
    });
  }

  return (
    <div className="space-y-6 p-4 md:p-0">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <DetailCard
        title={details.nameEn || details.nameAr || "Challenge"}
        description={details.description || ""}
        icon={
          <Image
            src={PATH_ICON[iconKey] || PATH_ICON["1"]}
            width={64}
            height={64}
            alt="Challenge Icon"
            className="size-10 md:size-12 object-contain"
          />
        }
        iconClassName="bg-purple-main/5 border border-purple-main/10"
        buttonText={details.isJoined ? "Joined" : "Open"}
        buttonIcon={<Sparkles className="size-4 text-yellow-500" />}
        backgroundOverlay="/images/handOnHand.svg"
      >
        <DetailCard.Footer className="gap-4 md:gap-8">
          {prizes.length > 0 ? (
            prizes.slice(0, 3).map((prize, index) => (
              <DetailCard.FooterItem
                key={prize.id || index}
                className="text-gray-700 font-medium"
                icon={
                  <Image
                    src={PRIZE_MEDALS[index]}
                    width={22}
                    height={22}
                    alt={`${PRIZE_LABELS[index]} medal`}
                    className="size-5 object-contain flex-shrink-0"
                  />
                }
              >
                <span>{PRIZE_LABELS[index]}</span>{" "}
                <span className="font-bold text-gray-900">
                  {prize.points || 0} SAR
                </span>
              </DetailCard.FooterItem>
            ))
          ) : (
            <DetailCard.FooterItem className="text-gray-700 font-medium">
              No prizes configured
            </DetailCard.FooterItem>
          )}

          <DetailCard.FooterItem
            className="sm:ml-auto"
            icon={<Calendar className="size-5 flex-shrink-0" />}
          >
            Due:{" "}
            <span className="font-bold text-gray-900">
              {formatDate(details.endDate)}
            </span>
          </DetailCard.FooterItem>

          <DetailCard.FooterItem
            icon={<Users2 className="size-5 flex-shrink-0" />}
          >
            <span className="font-bold text-gray-900">
              {details.participantCount || 0}
            </span>{" "}
            participants
          </DetailCard.FooterItem>
        </DetailCard.Footer>
      </DetailCard>

      <Tabs tabs={tabs} />
    </div>
  );
}
