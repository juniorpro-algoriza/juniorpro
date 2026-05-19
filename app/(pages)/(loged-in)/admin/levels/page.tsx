import React, { Suspense } from "react";
import { Header } from "@components/client";
import { Breadcrumb } from "@components";
import { LevelsFilters, LevelsList } from "./_components";

const LevelsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const resolvedSearchParams = await searchParams;
  const searchText = resolvedSearchParams.query || "";

  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          {
            title: "Home",
            href: "/admin/dashboard",
          },
          {
            title: "Levels",
            href: "/admin/levels",
          },
        ]}
      />
      <Header
        title="Level Management"
        description="Define and manage junior progress levels, XP requirements, and badges."
      />
      <div className="xl:max-w-4/5 space-y-5 md:mt-10">
        <Suspense
          fallback={
            <div className="h-12 animate-pulse bg-gray-100 rounded-2xl" />
          }
        >
          <LevelsFilters />
        </Suspense>
        <LevelsList searchText={searchText} />
      </div>
    </>
  );
};

export default LevelsPage;
