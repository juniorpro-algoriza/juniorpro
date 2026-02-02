"use client";
import React from "react";
import Image from "next/image";
import { Breadcrumb, DetailCard, Tabs } from "@components";
import { Calendar, Users2, Sparkles } from "lucide-react";
import type { TabData } from "@types";
import { OverviewTab, RequirementsTab, TaskBoardTab } from "../_components";
import { JUNIOR_COLLABORATIONS } from "@data/juniorCollaborations";
import { PATH_ICON } from "../../../../../configs/constants";

export default function JuniorCollaborationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = React.use(params);
  const id = parseInt(idStr);

  const collab = JUNIOR_COLLABORATIONS.find((c) => c.id === id);

  if (!collab) return null;

  const breadcrumbs = [
    { title: "Home", href: "/junior/dashboard" },
    { title: "Collaborations", href: "/junior/collaborations" },
    {
      title: collab.title,
      href: `/junior/collaborations/${id}`,
    },
  ];

  const tabs: TabData[] = [
    {
      name: "Overview",
      content: <OverviewTab features={collab.features} roles={collab.roles} />,
    },
    {
      name: "Requirements",
      content: (
        <RequirementsTab
          requirements={collab.requirements}
          guidelines={collab.guidelines}
        />
      ),
    },
    {
      name: "Task Board",
      content: <TaskBoardTab tasks={collab.tasks} />,
    },
  ];

  const isJoined = collab.status === "joined";
  const isCompleted = collab.status === "completed";

  return (
    <div className="space-y-6 p-4 md:p-0">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      {/* Header Card */}
      <DetailCard
        title={collab.title}
        description={collab.description}
        icon={
          <Image
            src={
              PATH_ICON[collab.id.toString() as keyof typeof PATH_ICON] ||
              PATH_ICON["1"]
            }
            width={64}
            height={64}
            alt="Collaboration Icon"
            className="size-10 md:size-12 object-contain"
          />
        }
        iconClassName="bg-blue-main/5 border border-blue-main/10"
        buttonText={isCompleted ? "Completed" : isJoined ? "Joined" : "Open"}
        buttonIcon={
          isCompleted ? (
            <Sparkles className="size-4 text-green-500" />
          ) : (
            <Sparkles className="size-4 text-yellow-500" />
          )
        }
        progress={collab.progress || (isCompleted ? 100 : 0)}
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
              {collab.reward.amount} {collab.reward.currency}
            </span>{" "}
            after completion
          </DetailCard.FooterItem>

          <DetailCard.FooterItem
            className="sm:ml-auto"
            icon={<Calendar className="size-5 flex-shrink-0" />}
          >
            Due:{" "}
            <span className="font-bold text-gray-900">{collab.dueDate}</span>
          </DetailCard.FooterItem>

          <DetailCard.FooterItem
            icon={<Users2 className="size-5 flex-shrink-0" />}
          >
            <span className="font-bold text-gray-900">
              {collab.rolesCount.open}
            </span>{" "}
            /{collab.rolesCount.total} open roles
          </DetailCard.FooterItem>
        </DetailCard.Footer>
      </DetailCard>

      {/* Tabs */}
      <Tabs tabs={tabs} />
    </div>
  );
}
