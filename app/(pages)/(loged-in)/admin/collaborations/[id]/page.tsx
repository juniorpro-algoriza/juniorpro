"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Breadcrumb, DetailCard, Tabs } from "@components";
import { Calendar, Users2, Pencil } from "lucide-react";
import type { TabData } from "@types";
import { OverviewTab, RequirementsTab, TaskBoardTab } from "../_components";
import { useGetCollaborationById } from "../../tanstack/collaborations";

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

  const handleEditClick = () => {
    router.push(`/admin/collaborations/${id}/edit`);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 md:p-0">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
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
