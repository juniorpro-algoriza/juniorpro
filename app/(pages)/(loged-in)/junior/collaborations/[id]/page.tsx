"use client";
import React from "react";
import Image from "next/image";
import {
  Breadcrumb,
  DetailCard,
  Skeleton,
  Tabs,
  ModalLink,
  Button,
} from "@components";
import {
  Calendar,
  Users2,
  Sparkles,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import type { TabData } from "@types";
import { OverviewTab, RequirementsTab, TaskBoardTab } from "../_components";
import {
  PATH_ICON,
  COLLABORATION_STATUS,
  JUNIOR_STATUS,
} from "../../../../../configs/constants";
import {
  useJuniorCollaborationById,
  useJuniorCollaborationRoles,
} from "../../tanstack";

export default function JuniorCollaborationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = React.use(params);
  const id = parseInt(idStr);

  const { data: collabData, isLoading: loadingCollab } =
    useJuniorCollaborationById(id);
  const { data: roles, isLoading: loadingRoles } =
    useJuniorCollaborationRoles(id);

  if (loadingCollab || loadingRoles) {
    return (
      <div className="space-y-6 p-4 md:p-0">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-12 w-96" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  const collab = collabData?.collaborationDetails;
  if (!collab) return null;

  const requirements = collabData?.requirements || [];
  const goals = collabData?.goals || [];
  const iconKey = (collab.icon?.toString() || "1") as keyof typeof PATH_ICON;

  const isJoined = collab.isJoined;
  const isCompleted = collab.status === COLLABORATION_STATUS.COMPLETED;
  const isPending = collab.juniorStatus === JUNIOR_STATUS.PENDING;
  const isRejected = collab.juniorStatus === JUNIOR_STATUS.REJECTED;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const rewardText = collab.money
    ? `${collab.money} SAR`
    : collab.xpReward
      ? `${collab.xpReward} XP`
      : "";

  const breadcrumbs = [
    { title: "Home", href: "/junior/dashboard" },
    { title: "Collaborations", href: "/junior/collaborations" },
    {
      title: collab.nameEn || collab.nameAr || "Collaboration",
      href: `/junior/collaborations/${id}`,
    },
  ];

  const tabs: TabData[] = [
    {
      name: "Overview",
      content: <OverviewTab goals={goals} roles={roles || []} />,
    },
    {
      name: "Requirements",
      content: <RequirementsTab requirements={requirements} />,
    },
    {
      name: "Task Board",
      content: <TaskBoardTab collaborationId={id} />,
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-0">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      {/* Header Card */}
      <DetailCard
        title={collab.nameEn || collab.nameAr || "Collaboration"}
        description={collab.description || ""}
        icon={
          <Image
            src={PATH_ICON[iconKey] || PATH_ICON["1"]}
            width={64}
            height={64}
            alt="Collaboration Icon"
            className="size-10 md:size-12 object-contain"
          />
        }
        iconClassName="bg-blue-main/5 border border-blue-main/10"
        buttonText={
          isCompleted
            ? "Completed"
            : isPending
              ? "Pending Approval"
              : isRejected
                ? "Rejected"
                : isJoined
                  ? "Joined"
                  : "Open"
        }
        buttonIcon={
          isCompleted ? (
            <Sparkles className="size-4 text-green-500" />
          ) : isPending ? (
            <Clock className="size-4 text-yellow-500" />
          ) : isRejected ? (
            <XCircle className="size-4 text-red-500" />
          ) : (
            <Sparkles className="size-4 text-yellow-500" />
          )
        }
        progress={isCompleted ? 100 : collab.progressPercentage || 0}
        backgroundOverlay="/images/handOnHand.svg"
      >
        <DetailCard.Footer>
          {rewardText && (
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
              Each member will get{" "}
              <span className="font-bold">{rewardText}</span> after completion
            </DetailCard.FooterItem>
          )}

          <DetailCard.FooterItem
            className="sm:ml-auto"
            icon={<Calendar className="size-5 flex-shrink-0" />}
          >
            Due:{" "}
            <span className="font-bold text-gray-900">
              {formatDate(collab.registerationDeadline)}
            </span>
          </DetailCard.FooterItem>

          <DetailCard.FooterItem
            icon={<Users2 className="size-5 flex-shrink-0" />}
          >
            <span className="font-bold text-gray-900">
              {(collab.totalJuniorSeats || 0) - (collab.takenJuniorSeats || 0)}
            </span>{" "}
            /{collab.totalJuniorSeats || 0} open roles
          </DetailCard.FooterItem>
        </DetailCard.Footer>
      </DetailCard>

      {/* Rejection Banner */}
      {isRejected && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-start gap-3 flex-1">
            <AlertCircle className="size-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-red-700">
                Your application was rejected
              </p>
              {collab.actionReason && (
                <p className="text-sm text-red-600">{collab.actionReason}</p>
              )}
            </div>
          </div>
          <ModalLink
            name="JoinCollaboration"
            query={{ id }}
            className="shrink-0"
          >
            <Button
              intent="main2"
              size="mainDefault"
              className="rounded-xl font-bold px-6"
            >
              Join Again
            </Button>
          </ModalLink>
        </div>
      )}

      {/* Pending Banner */}
      {isPending && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-2xl flex items-start gap-3">
          <Clock className="size-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-bold text-yellow-700">
              Your application is pending approval
            </p>
            <p className="text-xs text-yellow-600">
              You will be notified once the admin reviews your request.
            </p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <Tabs tabs={tabs} />
    </div>
  );
}
