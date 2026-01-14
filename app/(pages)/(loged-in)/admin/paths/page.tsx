import React, { Suspense } from "react";
import { Header } from "@components/client";
import { Breadcrumb, Button } from "@components";
import { Plus } from "lucide-react";
import { PathsFilters, PathsList } from "./_components";
import Link from "next/link";
const PathsPage = async ({
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
            title: "Learning Paths",
            href: "/admin/paths",
          },
        ]}
      />
      <Header
        title="Path Management"
        description="Create, organize, and track structured learning journeys for your juniors."
        end={
          <Link href="/admin/paths/new-path">
            <Button intent="main2" size="mainDefault">
              <Plus className="size-4" />
              New Path
            </Button>
          </Link>
        }
      />
      <div className="xl:max-w-4/5 space-y-5 md:mt-10">
        <Suspense
          fallback={
            <div className="h-12 animate-pulse bg-gray-100 rounded-2xl" />
          }
        >
          <PathsFilters />
        </Suspense>
        <PathsList searchText={searchText} />
      </div>
    </>
  );
};

export default PathsPage;
