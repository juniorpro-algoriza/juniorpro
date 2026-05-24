"use client";
import React from "react";
import Image from "next/image";
import { Breadcrumb, DetailCard, Skeleton, Tabs } from "@components";
import { Calendar, Users2, Sparkles } from "lucide-react";
import type { TabData } from "@types";
import {
  OverviewTab,
  RequirementsTab,
  ParticipantsTab,
  SubmissionTab,
} from "../_components";
import { PATH_ICON } from "../../../../../configs/constants";
import { useJuniorChallengeById } from "../../tanstack/challenges";

export default function JuniorChallengeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = React.use(params);
  const id = parseInt(idStr);

  const { data: challengeData, isLoading } = useJuniorChallengeById(id);

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
      name: "Overview",
      content: (
        <OverviewTab goals={goals} guideSteps={guideSteps} prizes={prizes} />
      ),
    },
    {
      name: "Requirements",
      content: <RequirementsTab requirements={requirements} />,
    },
    {
      name: "Participants",
      content: (
        <ParticipantsTab participantCount={details.participantCount || 0} />
      ),
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
        <DetailCard.Footer>
          <DetailCard.FooterItem
            className="text-gray-700 font-medium"
            icon={
              <Image
                src="/images/1stBadge.png"
                width={20}
                height={20}
                alt="Badge"
                className="size-5 object-contain flex-shrink-0"
              />
            }
          >
            {prizes.length > 0 ? (
              <>
                Top prize:{" "}
                <span className="font-bold">
                  {prizes[0]?.points || 0} Points
                </span>
                {" & "}
                <span className="font-bold">{prizes[0]?.xp || 0} XP</span>
              </>
            ) : (
              "No prizes configured"
            )}
          </DetailCard.FooterItem>

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
