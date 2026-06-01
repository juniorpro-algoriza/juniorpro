"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Breadcrumb, DetailCard, Tabs, Skeleton } from "@components";
import {
  Calendar,
  ClipboardList,
  FileText,
  Pencil,
  Trophy,
  Users2,
} from "lucide-react";
import type { TabData } from "@types";
import { PATH_ICON } from "../../../../../configs/constants";
import {
  OverviewTab,
  RequirementsTab,
  ParticipantsTab,
  LeaderboardTab,
} from "../_components";
import { useGetAdminChallengeById } from "../../tanstack/challenges";

const PRIZE_MEDALS = [
  "/images/1st-medal.png",
  "/images/2nd-medal.png",
  "/images/3rd-medal.png",
];

const PRIZE_LABELS = ["1st Place", "2nd Place", "3rd Place"];

export default function ChallengeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const router = useRouter();
  const challengeId = parseInt(id);

  const {
    data: challenge,
    isLoading,
    error,
  } = useGetAdminChallengeById(challengeId);

  const handleEditClick = () => {
    router.push(`/admin/challenges/${id}/edit`);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 md:p-0">
        <Skeleton className="h-5 w-48 mb-4" />
        <div className="bg-white border border-gray-100 rounded-[32px] p-6 space-y-6">
          <div className="flex items-start gap-4">
            <Skeleton className="size-12 md:size-16 rounded-2xl" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-7 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="h-11 w-36 rounded-xl hidden md:block" />
          </div>
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-50">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-5 w-40 md:ml-auto" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex gap-4 border-b border-gray-100 pb-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-96 w-full rounded-[32px]" />
        </div>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="space-y-6 p-4 md:p-0">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Challenge Not Found
          </h2>
          <p className="text-gray-500">
            The challenge you&apos;re looking for doesn&apos;t exist or you
            don&apos;t have permission to view it.
          </p>
        </div>
      </div>
    );
  }

  const details = challenge.challengeDetails;
  const iconKey = details?.icon?.toString() || "1";
  const iconSrc =
    PATH_ICON[iconKey as keyof typeof PATH_ICON] || PATH_ICON["1"];

  const breadcrumbs = [
    { title: "Home", href: "/admin/dashboard" },
    { title: "Challenges", href: "/admin/challenges" },
    {
      title: details?.nameEn || "Challenge Details",
      href: `/admin/challenges/${id}`,
    },
  ];

  const tabs: TabData[] = [
    {
      name: (
        <span className="inline-flex items-center gap-1.5">
          <ClipboardList className="size-4" />
          Overview
        </span>
      ),
      content: <OverviewTab challenge={challenge} />,
    },
    {
      name: (
        <span className="inline-flex items-center gap-1.5">
          <FileText className="size-4" />
          Requirements
        </span>
      ),
      content: <RequirementsTab challenge={challenge} />,
    },
    {
      name: (
        <span className="inline-flex items-center gap-1.5">
          <Users2 className="size-4" />
          Participants
        </span>
      ),
      content: <ParticipantsTab challengeId={challengeId} />,
    },
    {
      name: (
        <span className="inline-flex items-center gap-1.5">
          <Trophy className="size-4" />
          Winners
        </span>
      ),
      content: (
        <LeaderboardTab
          challengeId={challengeId}
          prizeDistributions={challenge.prizeDistributions}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-0">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <DetailCard
        title={details?.nameEn || "Challenge"}
        description={details?.description || "No description available"}
        icon={
          <Image
            src={iconSrc}
            width={64}
            height={64}
            alt="Challenge Icon"
            className="size-10 md:size-12 object-contain"
          />
        }
        iconClassName="bg-purple-main/5 border border-purple-main/10"
        buttonText="Edit Challenge"
        buttonIcon={<Pencil className="size-4" />}
        onButtonClick={handleEditClick}
        progress={0}
        backgroundOverlay="/images/handOnHand.svg"
      >
        <DetailCard.Footer className="gap-4 md:gap-8">
          {challenge.prizeDistributions &&
          challenge.prizeDistributions.length > 0 ? (
            challenge.prizeDistributions.slice(0, 3).map((prize, index) => (
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
              {details?.endDate
                ? new Date(details.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "No deadline"}
            </span>
          </DetailCard.FooterItem>

          <DetailCard.FooterItem
            icon={<Users2 className="size-5 flex-shrink-0" />}
          >
            <span className="font-bold text-gray-900">
              {details?.participantCount || 0}
            </span>{" "}
            participants
          </DetailCard.FooterItem>
        </DetailCard.Footer>
      </DetailCard>

      <Tabs tabs={tabs} />
    </div>
  );
}
