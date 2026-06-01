"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Breadcrumb,
  Button,
  Jumbotron,
  ProjectCard,
  Tabs,
  Skeleton,
  Input,
} from "@components";
import { PATH_ICON } from "../../../../configs/constants";
import {
  useDeleteAdminChallenge,
  useGetAdminChallenges,
} from "../tanstack/challenges";
import { components } from "../../../../../api-schema";

type GetChallengeListModel =
  components["schemas"]["Sawiha.Services.DTO.AdminChallengeModels.GetAll.GetChallengeListModel"];

const Challenges = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [deletingChallengeId, setDeletingChallengeId] = useState<number | null>(
    null
  );
  const deleteChallengeMutation = useDeleteAdminChallenge();

  const {
    data: response,
    isLoading,
    error,
  } = useGetAdminChallenges({
    pageNumber,
    pageSize: 12,
    searchText: search || undefined,
  });

  const challenges =
    (response?.data as GetChallengeListModel[] | undefined) || [];

  const formatChallengeData = (challenge: GetChallengeListModel) => {
    const iconKey = challenge.icon?.toString() || "1";
    // The API may return extra fields not in the schema (e.g., prizeDistributions)
    const extra = challenge as Record<string, unknown>;
    const prizeDistributions =
      (extra.prizeDistributions as Array<Record<string, unknown>>) || [];

    const ORDINALS = [
      "1st Place",
      "2nd Place",
      "3rd Place",
      "4th Place",
      "5th Place",
      "6th Place",
    ];

    return {
      id: challenge.id || 0,
      title: challenge.nameEn || challenge.nameAr || "Untitled Challenge",
      description: challenge.description || "No description available",
      participants: challenge.participantCount || 0,
      dateEnd: challenge.endDate
        ? new Date(challenge.endDate).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "No deadline",
      iconSrc: PATH_ICON[iconKey as keyof typeof PATH_ICON] || PATH_ICON["1"],
      prizes: prizeDistributions.slice(0, 3).map((p, i) => ({
        place: (p.titleEn as string) || ORDINALS[i] || `${i + 1}th Place`,
        amount: `${(p.points as number) || 0} SAR`,
      })),
    };
  };

  const handleDeleteChallenge = async (
    event: React.MouseEvent<HTMLButtonElement>,
    challengeId: number
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setDeletingChallengeId(challengeId);

    try {
      await deleteChallengeMutation.mutateAsync(challengeId);
      toast.success("Challenge deleted successfully.");
    } catch (error) {
      console.error("Failed to delete challenge:", error);
      toast.error("Failed to delete challenge. Please try again.");
    } finally {
      setDeletingChallengeId(null);
    }
  };

  const renderChallengeCards = () => {
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
          Error loading challenges. Please try again.
        </div>
      );
    }

    if (challenges.length === 0) {
      return (
        <div className="text-gray-500 py-10 text-center font-medium">
          {search
            ? "No challenges found matching your search."
            : "No challenges found."}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => {
          const formatted = formatChallengeData(challenge);
          const isDeleting = deletingChallengeId === formatted.id;

          return (
            <div key={formatted.id} className="h-full">
              <ProjectCard
                title={formatted.title}
                description={formatted.description}
                membersCurrent={formatted.participants}
                membersTotal={0}
                dateEnd={formatted.dateEnd}
                iconSrc={formatted.iconSrc}
                type="challenge"
                prizes={
                  formatted.prizes.length > 0 ? formatted.prizes : undefined
                }
                buttonText="View Details"
                buttonIntent="main"
                buttonIcon={<ArrowRight size={20} />}
                buttonOnClick={() =>
                  router.push(`/admin/challenges/${formatted.id}`)
                }
                className="transition-transform hover:scale-[1.01]"
                titleBadge={
                  <button
                    type="button"
                    onClick={(event) =>
                      handleDeleteChallenge(event, formatted.id)
                    }
                    disabled={isDeleting}
                    className="ml-auto flex size-8 cursor-pointer items-center justify-center rounded-full bg-red-50 text-red-500 transition-colors hover:bg-red-100 disabled:cursor-wait disabled:opacity-80"
                    aria-label="Delete challenge"
                  >
                    {isDeleting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2 className="size-4" />
                    )}
                  </button>
                }
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { title: "Home", href: "/admin/dashboard" },
          { title: "Challenges", href: "/admin/challenges" },
        ]}
      />

      <Jumbotron
        title="Coding Challenges"
        description="Create competitive coding challenges, track participation, and reward top performers."
        imageClassName="bg-[linear-gradient(135deg,rgba(198,210,255,0.8)0%,rgba(238,242,255,0.8)100%)]"
        imageSrc="/images/handOnHand.svg"
      />

      <Tabs
        tabs={[
          {
            name: "All Challenges",
            content: renderChallengeCards(),
          },
        ]}
      >
        <div className="flex sm:items-center sm:gap-4 flex-col sm:flex-row max-sm:w-full">
          <div className="relative min-w-[200px]">
            <Input
              type="text"
              placeholder="search challenge..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPageNumber(1);
              }}
              className="pl-10"
              leftIcon={<Search size={16} />}
            />
          </div>
          <Link href="/admin/challenges/create">
            <Button
              intent="main2"
              size="mainDefault"
              icon={<Plus size={18} />}
              className="mb-2 w-full"
            >
              New Challenge
            </Button>
          </Link>
        </div>
      </Tabs>
    </>
  );
};

export default Challenges;
