"use client";

import React from "react";
import { Breadcrumb, Skeleton } from "@components";
import { Header } from "@components/client";
import { CreateEditProjectManager } from "../../_components";
import { useGetProjectManagerById } from "../../../tanstack/project-managers";

export default function EditProjectManagerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const projectManagerId = parseInt(id);

  const {
    data: projectManager,
    isLoading,
    error,
  } = useGetProjectManagerById(projectManagerId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-5 w-48 mb-4" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-96 w-full rounded-[32px]" />
      </div>
    );
  }

  if (error || !projectManager) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Project Manager Not Found
        </h2>
        <p className="text-gray-500">
          The project manager you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  // Split name into firstName and lastName
  const nameParts = (projectManager.name || "").split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { title: "Home", href: "/admin/dashboard" },
          { title: "Project Managers", href: "/admin/project-managers" },
          {
            title: projectManager.name || "Edit Project Manager",
            href: `/admin/project-managers/${id}`,
          },
          { title: "Edit", href: `/admin/project-managers/${id}/edit` },
        ]}
      />
      <Header
        title="Edit Project Manager"
        description="Update project manager information"
      />
      <CreateEditProjectManager
        initialData={{
          id: projectManagerId,
          firstName,
          lastName,
          email: projectManager.email || "",
        }}
        projectManagerId={projectManagerId}
      />
    </>
  );
}
