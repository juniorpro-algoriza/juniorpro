import React, { Suspense } from "react";
import { Header, PathCard } from "@components/client";
import { Breadcrumb, Button, PATH_ICON } from "@components";
import { Plus } from "lucide-react";
import { PathsFilters } from "./_components";
import { getLearningPaths } from "../server/paths/getLearningPaths";
import Link from "next/link";
import { components } from "../../../../../api-schema";

const PathsPage = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
  // Get search text from query parameters
  const resolvedSearchParams = await searchParams;
  const searchText = resolvedSearchParams.query || "";
  const getLearningPathsResponse = await getLearningPaths({SearchText:searchText});

  const paths =
    getLearningPathsResponse.data?.map((path: components["schemas"]["Sawiha.Services.DTO.PathModels.GetLearningPathListModel"]) => ({
      id: path.id || 0,
      image: PATH_ICON[String(path.icon) as keyof typeof PATH_ICON],
      title: path.nameEn || path.nameAr || "Untitled Path",
      description: path.description || "No description available",
      missions: path.missionsCount || 0,
      xp: path.totalXP || 0,
      points: path.totalPoints || 0,
    })) || [];

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
        <div className="grid md:grid-cols-2 gap-5">
          {paths?.map((path) => (
            <PathCard key={path.id} path={path} userType="admin" cardLink={`/admin/paths/${path.id}`} />
          ))}
          {paths?.length === 0 && (
            <p className="text-gray-600">No paths found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PathsPage;
