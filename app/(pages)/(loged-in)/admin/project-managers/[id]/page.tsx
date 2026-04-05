"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb, DetailCard, Tabs, Skeleton } from "@components";
import { Calendar, Users2, Pencil, Briefcase, User } from "lucide-react";
import type { TabData } from "@types";
import { OverviewTab, EnablersTab, JuniorsTab } from "../_components";
import { useGetProjectManagerById } from "../../tanstack/project-managers";

export default function ProjectManagerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const router = useRouter();
  const projectManagerId = parseInt(id);

  const {
    data: projectManager,
    isLoading,
    error,
  } = useGetProjectManagerById(projectManagerId);

  const handleEditClick = () => {
    router.push(`/admin/project-managers/${id}/edit`);
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

  if (error || !projectManager) {
    return (
      <div className="space-y-6 p-4 md:p-0">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Project Manager Not Found
          </h2>
          <p className="text-gray-500">
            The project manager you&apos;re looking for doesn&apos;t exist or
            you don&apos;t have permission to view it.
          </p>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { title: "Home", href: "/admin/dashboard" },
    { title: "Project Managers", href: "/admin/project-managers" },
    {
      title: projectManager.name || "Project Manager Details",
      href: `/admin/project-managers/${id}`,
    },
  ];

  const tabs: TabData[] = [
    {
      name: "Overview",
      content: <OverviewTab projectManager={projectManager} />,
    },
    {
      name: "Enablers",
      content: <EnablersTab projectManagerId={projectManagerId} />,
    },
    {
      name: "Juniors",
      content: <JuniorsTab projectManagerId={projectManagerId} />,
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-0">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <DetailCard
        title={projectManager.name || "Project Manager"}
        description={projectManager.email || "No email available"}
        icon={
          <div className="size-10 md:size-12 rounded-full bg-purple-main/10 flex items-center justify-center text-base font-bold text-purple-main">
            {projectManager.name ? (
              projectManager.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()
            ) : (
              <User className="size-5" />
            )}
          </div>
        }
        iconClassName="bg-purple-main/5 border border-purple-main/10"
        buttonText="Edit"
        buttonIcon={<Pencil className="size-4" />}
        onButtonClick={handleEditClick}
        backgroundOverlay="/images/handOnHand.svg"
      >
        <DetailCard.Footer>
          <DetailCard.FooterItem
            className="text-gray-700 font-medium"
            icon={<Briefcase className="size-5 flex-shrink-0" />}
          >
            <span className="font-bold text-gray-900">
              {projectManager.projectsCount ?? 0}
            </span>{" "}
            projects
          </DetailCard.FooterItem>

          <DetailCard.FooterItem
            className="sm:ml-auto"
            icon={<Calendar className="size-5 flex-shrink-0" />}
          >
            Joined:{" "}
            <span className="font-bold text-gray-900">
              {projectManager.joiningDate
                ? new Date(projectManager.joiningDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )
                : "—"}
            </span>
          </DetailCard.FooterItem>

          <DetailCard.FooterItem
            icon={<Users2 className="size-5 flex-shrink-0" />}
          >
            <span className="font-bold text-gray-900">
              {projectManager.enablersCount ?? 0}
            </span>{" "}
            enablers
          </DetailCard.FooterItem>
        </DetailCard.Footer>
      </DetailCard>

      <Tabs tabs={tabs} />
    </div>
  );
}
