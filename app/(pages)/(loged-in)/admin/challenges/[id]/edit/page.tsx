"use client";

import React from "react";
import { Breadcrumb, Skeleton } from "@components";
import { CreateEditChallenge } from "../../_components";
import { useGetAdminChallengeById } from "../../../tanstack/challenges";
import { ChallengeFormData } from "../../_components/types";

export default function EditChallengePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const challengeId = parseInt(id);

  const {
    data: challenge,
    isLoading,
    error,
  } = useGetAdminChallengeById(challengeId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-5 w-48 mb-4" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-96 w-full rounded-[32px]" />
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Challenge Not Found
        </h2>
        <p className="text-gray-500">
          The challenge you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  const details = challenge.challengeDetails;

  // Map API response back to form data
  const initialData: Partial<ChallengeFormData> = {
    id: details?.id,
    nameEn: details?.nameEn || "",
    nameAr: details?.nameAr || "",
    description: details?.description || "",
    levelId: details?.levelId || null,
    categoryId: details?.categoryId || null,
    juniorsCapacity: details?.juniorsCapacity || 0,
    startDate: details?.startDate ? new Date(details.startDate) : null,
    endDate: details?.endDate ? new Date(details.endDate) : null,
    registerationDeadline: details?.registerationDeadline
      ? new Date(details.registerationDeadline)
      : null,
    icon: details?.icon || null,
    accessCostType: details?.accessCostType || 1,
    guideSteps: (challenge.guideSteps || []).map((s, i) => ({
      id: s.id?.toString() || i.toString(),
      description: s.description || "",
    })),
    goals: (challenge.goals || []).map((g, i) => ({
      id: g.id?.toString() || i.toString(),
      description: g.description || "",
    })),
    requirements: (challenge.requirements || []).map((r, i) => ({
      id: r.id?.toString() || i.toString(),
      description: r.description || "",
    })),
    evaluations: (challenge.evaluations || []).map((e, i) => ({
      id: e.id?.toString() || i.toString(),
      titleEn: e.titleEn || "",
      titleAr: e.titleAr || "",
      description: e.description || "",
      percentage: e.percentage || 0,
    })),
    prizes: (challenge.prizeDistributions || []).map((p, i) => ({
      id: p.id?.toString() || i.toString(),
      rank: (p.rank as number) || i + 1,
      titleEn: p.titleEn || "",
      titleAr: p.titleAr || "",
      xp: p.xp || 0,
      points: p.points || 0,
    })),
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        breadcrumbs={[
          { title: "Home", href: "/admin/dashboard" },
          { title: "Challenges", href: "/admin/challenges" },
          {
            title: details?.nameEn || "Edit Challenge",
            href: `/admin/challenges/${id}`,
          },
          { title: "Edit", href: `/admin/challenges/${id}/edit` },
        ]}
      />
      <CreateEditChallenge
        initialData={initialData}
        challengeId={challengeId}
      />
    </div>
  );
}
