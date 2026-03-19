"use client";
import React from "react";
import Link from "next/link";

import { ArrowRight, Plus, Search } from "lucide-react";
import {
  Breadcrumb,
  Button,
  Jumbotron,
  ProjectCard,
  Tabs,
  Skeleton,
  Input,
} from "@components";
import {
  PATH_ICON,
  getCollaborationStatusOptions,
} from "../../../../configs/constants";
import { useCollaborationsWithFilters } from "../../../../tanstack";
import { components } from "../../../../../api-schema";

// Type definition from API schema
type GetCollaborationListModel =
  components["schemas"]["Sawiha.Services.DTO.AdminCollaborationModels.GetAll.GetCollaborationListModel"];

const Collaborations = () => {
  const {
    collaborations,
    isLoading,
    error,
    filters,
    tabCounts,
    updateFilters,
  } = useCollaborationsWithFilters();

  const handleSearch = (value: string) => {
    updateFilters({ search: value, pageNumber: 1 });
  };

  const handleTabChange = (index: number) => {
    const statusOptions = getCollaborationStatusOptions();
    if (index === 0) {
      updateFilters({ status: "all", pageNumber: 1 });
    } else {
      const status = statusOptions[index].value as
        | "all"
        | "draft"
        | "ready"
        | "inprogress"
        | "completed";
      updateFilters({ status, pageNumber: 1 });
    }
  };

  const formatCollaborationData = (collab: GetCollaborationListModel) => {
    return {
      id: collab.id || 0,
      title: collab.nameEn || collab.nameAr || "Untitled Collaboration",
      description: collab.description || "No description available",
      progress: Number((collab.progressPercentage || 0).toFixed(2)),
      price: collab.money || 0,
      currency: "SAR",
      membersCurrent: collab.takenJuniorSeats || 0,
      membersTotal: collab.totalJuniorSeats || 0,
      dateEnd: collab.registerationDeadline
        ? new Date(collab.registerationDeadline).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : "No deadline",
    };
  };

  const renderCollaborationCards = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} className="h-[300px] w-full mb-2" />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-red-500 py-10 text-center font-medium">
          Error loading collaborations. Please try again.
        </div>
      );
    }

    if (collaborations.length === 0) {
      return (
        <div className="text-gray-500 py-10 text-center font-medium">
          {filters.search
            ? "No collaborations found matching your search."
            : "No collaborations found."}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collaborations.map((collab) => {
          const formattedCollab = formatCollaborationData(collab);
          return (
            <Link
              key={formattedCollab.id}
              href={`/admin/collaborations/${formattedCollab.id}`}
              className="block h-full transition-transform hover:scale-[1.01]"
            >
              <ProjectCard
                title={formattedCollab.title}
                description={formattedCollab.description}
                progress={formattedCollab.progress}
                membersCurrent={formattedCollab.membersCurrent}
                membersTotal={formattedCollab.membersTotal}
                dateEnd={formattedCollab.dateEnd}
                iconSrc={
                  PATH_ICON[
                    formattedCollab.id.toString() as keyof typeof PATH_ICON
                  ] || PATH_ICON["1"]
                }
                type="collaboration"
                rewards={
                  <>
                    Each member will get{" "}
                    <span className="font-bold">
                      {formattedCollab.price} {formattedCollab.currency}
                    </span>{" "}
                    after completion
                  </>
                }
                buttonText="Edit Path"
                buttonIntent="main"
                buttonIcon={<ArrowRight size={20} />}
              />
            </Link>
          );
        })}
      </div>
    );
  };
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Collaborations", href: "/admin/collaborations" },
        ]}
      />

      {/* Header */}
      <Jumbotron
        title="Team Collaborations"
        description="Foster teamwork, manage projects, and track collective progress."
        imageClassName="bg-[linear-gradient(135deg,rgba(198,210,255,0.8)0%,rgba(238,242,255,0.8)100%)]"
        imageSrc="/images/handOnHand.svg"
      />

      {/* Tabs & Content */}
      <Tabs
        tabs={[
          {
            name: `All (${tabCounts.all})`,
            content: renderCollaborationCards(),
          },
          {
            name: `Draft (${tabCounts.draft})`,
            content: renderCollaborationCards(),
          },
          {
            name: `Ready to Start (${tabCounts.ready})`,
            content: renderCollaborationCards(),
          },
          {
            name: `In Progress (${tabCounts.inprogress})`,
            content: renderCollaborationCards(),
          },
          {
            name: `Completed (${tabCounts.completed})`,
            content: renderCollaborationCards(),
          },
        ]}
        onTabChange={handleTabChange}
      >
        <div className="flex sm:items-center sm:gap-4 flex-col sm:flex-row max-sm:w-full">
          <div className="relative min-w-[200px]">
            <Input
              type="text"
              placeholder="search collaboration..."
              value={filters.search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
              leftIcon={<Search size={16} />}
            />
          </div>
          <Link href="/admin/collaborations/create" className=" ">
            <Button
              intent="main2"
              size="mainDefault"
              icon={<Plus size={18} />}
              className="mb-2 w-full"
            >
              New Collaboration
            </Button>
          </Link>
        </div>
      </Tabs>
    </>
  );
};

export default Collaborations;
