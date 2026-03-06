"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Breadcrumb, DetailCard, Tabs, Skeleton, Button } from "@components";
import { Calendar, Users2, Pencil, Check } from "lucide-react";
import type { TabData } from "@types";
import { COLLABORATION_STATUS } from "../../../../../configs/constants";
import { toast } from "sonner";
import {
  OverviewTab,
  RequirementsTab,
  TaskBoardTab,
  ApplicantsTab,
  ParticipantsTab,
} from "../_components";
import {
  useGetCollaborationById,
  useMakeCollaborationReady,
} from "../../tanstack/collaborations";

export default function CollaborationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const router = useRouter();
  const collaborationId = parseInt(id);

  const {
    data: collaboration,
    isLoading,
    error,
  } = useGetCollaborationById(collaborationId);

  const { mutate: publishCollaboration, isPending: isPublishing } =
    useMakeCollaborationReady();

  const handleEditClick = () => {
    router.push(`/admin/collaborations/${id}/edit`);
  };

  const handlePublishClick = () => {
    publishCollaboration(collaborationId, {
      onSuccess: () => toast.success("Collaboration published successfully"),
      onError: () => toast.error("Failed to publish collaboration"),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 md:p-0">
        <Skeleton className="h-5 w-48 mb-4" /> {/* Breadcrumb simulation */}
        {/* Header Card Skeleton */}
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
        {/* Tabs Skeleton */}
        <div className="space-y-6">
          <div className="flex gap-4 border-b border-gray-100 pb-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-96 w-full rounded-[32px]" />
        </div>
      </div>
    );
  }

  if (error || !collaboration) {
    return (
      <div className="space-y-6 p-4 md:p-0">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Collaboration Not Found
          </h2>
          <p className="text-gray-500">
            The collaboration you're looking for doesn't exist or you don't have
            permission to view it.
          </p>
        </div>
      </div>
    );
  }

  const collaborationDetails = collaboration.collaborationDetails;

  const breadcrumbs = [
    { title: "Home", href: "/admin/dashboard" },
    { title: "Collaborations", href: "/admin/collaborations" },
    {
      title: collaborationDetails?.nameEn || "Collaboration Details",
      href: `/admin/collaborations/${id}`,
    },
  ];

  const tabs: TabData[] = [
    {
      name: "Overview",
      content: <OverviewTab collaboration={collaboration} />,
    },
    {
      name: "Requirements",
      content: <RequirementsTab collaboration={collaboration} />,
    },
    {
      name: "Applicants",
      content: <ApplicantsTab collaborationId={collaborationId} />,
    },
    {
      name: "Participants",
      content: <ParticipantsTab collaborationId={collaborationId} />,
    },
    {
      name: "Task Board",
      content: <TaskBoardTab collaborationId={collaborationId} />,
    },
  ];

  // Calculate progress based on filled roles vs total capacity
  const totalCapacity = collaborationDetails?.totalJuniorSeats || 0;
  const takenSeats = collaborationDetails?.takenJuniorSeats || 0;
  const progress = totalCapacity > 0 ? (takenSeats / totalCapacity) * 100 : 0;

  return (
    <div className="space-y-6 p-4 md:p-0">
      <Breadcrumb breadcrumbs={breadcrumbs} />
      {/* Header Card */}
      <DetailCard
        title={collaborationDetails?.nameEn || "Collaboration"}
        description={
          collaborationDetails?.description || "No description available"
        }
        icon={
          <Image
            src="/images/code-3d.png"
            width={64}
            height={64}
            alt="Collaboration Icon"
            className="size-10 md:size-12 object-contain"
          />
        }
        iconClassName="bg-blue-main/5 border border-blue-main/10"
        buttonText="Edit Collaboration"
        buttonIcon={<Pencil className="size-4" />}
        onButtonClick={handleEditClick}
        progress={Math.round(progress)}
        backgroundOverlay="/images/handOnHand.svg"
        extraActions={
          collaborationDetails?.status === COLLABORATION_STATUS.DRAFT ? (
            <Button
              intent="successMain"
              size="mainDefault"
              onClick={handlePublishClick}
              isLoading={isPublishing}
              icon={<Check className="size-4" />}
              iconPosition="left"
              className="flex-1 md:flex-none"
            >
              Publish
            </Button>
          ) : undefined
        }
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
            Each member will get{" "}
            <span className="font-bold">
              {collaborationDetails?.money || 0} SAR
            </span>{" "}
            after completion
          </DetailCard.FooterItem>

          <DetailCard.FooterItem
            className="sm:ml-auto"
            icon={<Calendar className="size-5 flex-shrink-0" />}
          >
            Due:{" "}
            <span className="font-bold text-gray-900">
              {collaborationDetails?.registerationDeadline
                ? new Date(
                    collaborationDetails.registerationDeadline
                  ).toLocaleDateString("en-US", {
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
            <span className="font-bold text-gray-900">{takenSeats}</span> /
            {totalCapacity} open roles
          </DetailCard.FooterItem>
        </DetailCard.Footer>
      </DetailCard>
      {/* Tabs */}
      <Tabs tabs={tabs} />
    </div>
  );
}
