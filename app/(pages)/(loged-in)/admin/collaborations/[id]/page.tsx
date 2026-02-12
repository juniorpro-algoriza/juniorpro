"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Breadcrumb, DetailCard, Tabs } from "@components";
import { Calendar, Users2, Pencil } from "lucide-react";
import type { TabData } from "@types";
import { OverviewTab, RequirementsTab, TaskBoardTab } from "../_components";

export default function CollaborationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/admin/collaborations/${id}/edit`);
  };

  const breadcrumbs = [
    { title: "Home", href: "/admin/dashboard" },
    { title: "Collaborations", href: "/admin/collaborations" },
    {
      title: "Build Ecommerce Website Collab",
      href: `/admin/collaborations/${id}`,
    },
  ];

  const tabs: TabData[] = [
    { name: "Overview", content: <OverviewTab /> },
    { name: "Requirements", content: <RequirementsTab /> },
    { name: "Task Board", content: <TaskBoardTab /> },
  ];

  return (
    <div className="space-y-6 p-4 md:p-0">
      <Breadcrumb breadcrumbs={breadcrumbs} />
      {/* Header Card */}
      <DetailCard
        title="Build Ecommerce Website Collab"
        description="Foster teamwork, manage projects, and track collective progress."
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
        progress={60}
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
            Each member will get <span className="font-bold">500 SAR</span>{" "}
            after completion
          </DetailCard.FooterItem>

          <DetailCard.FooterItem
            className="sm:ml-auto"
            icon={<Calendar className="size-5 flex-shrink-0" />}
          >
            Due: <span className="font-bold text-gray-900">30 March 2024</span>
          </DetailCard.FooterItem>

          <DetailCard.FooterItem
            icon={<Users2 className="size-5 flex-shrink-0" />}
          >
            <span className="font-bold text-gray-900">5</span> /12 open roles
          </DetailCard.FooterItem>
        </DetailCard.Footer>
      </DetailCard>
      a{/* Tabs */}
      <Tabs tabs={tabs} />
    </div>
  );
}
