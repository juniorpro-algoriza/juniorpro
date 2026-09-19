"use client";

import { Button, EmptyData, Skeleton } from "@components";
import { useBadges } from "../../tanstack/badges";
import { ArrowLeft, ArrowRight, Award } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { components } from "../../../../../../api-schema";
import { BadgeCard } from "./BadgeCard";

type BadgeType =
  components["schemas"]["Sawiha.CrossCutting.Model.Entities.BadgeFeature.BadgeType"];

export const BadgesList = ({
  searchText,
  selectedType,
  pageNumber,
}: {
  searchText: string;
  selectedType?: BadgeType;
  pageNumber: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pageSize = 12;

  const {
    data: badgesResponse,
    isLoading,
    error,
  } = useBadges({
    SearchText: searchText,
    Type: selectedType,
    PageNumber: pageNumber,
    PageSize: pageSize,
  });

  const badges = badgesResponse?.data || [];
  const total = badgesResponse?.pg_total || badges.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    replace(`${pathname}?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <Skeleton key={index} className="h-[285px] rounded-[28px]" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 py-14 text-center text-sm font-bold text-red-600">
        Error loading badges. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {badges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </div>

      {badges.length === 0 && (
        <EmptyData
          icon={<Award className="size-6" />}
          title="No Badges Found"
          description="Create a badge or adjust the current filters."
        />
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-100 pt-5">
          <Button
            intent="main"
            size="small"
            type="button"
            disabled={pageNumber <= 1}
            onClick={() => setPage(pageNumber - 1)}
          >
            <ArrowLeft className="size-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages })
              .slice(0, 7)
              .map((_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setPage(page)}
                    className={`flex size-9 items-center justify-center rounded-xl text-sm font-bold transition-colors ${
                      page === pageNumber
                        ? "bg-gray-50 text-yankees-blue"
                        : "text-semi-blue hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
          </div>

          <Button
            intent="main"
            size="small"
            type="button"
            disabled={pageNumber >= totalPages}
            onClick={() => setPage(pageNumber + 1)}
          >
            Next
            <ArrowRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
