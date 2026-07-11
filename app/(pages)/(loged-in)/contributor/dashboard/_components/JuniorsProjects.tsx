"use client";

import { MainCard, Skeleton } from "@components";
import { FolderKanban, Calendar, Users, User } from "lucide-react";
import { useJuniorsProjects } from "../../tanstack";
import { components } from "../../../../../../api-schema";
import { cx } from "@lib";

type ProjectModel =
  components["schemas"]["Sawiha.Services.DTO.EnablerDashboard.EnablerDashboardProjectModel"];

export const JuniorsProjects = () => {
  const { data: projectsData, isLoading, error } = useJuniorsProjects();

  if (isLoading) {
    return (
      <MainCard classname="h-full">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="size-10 rounded-xl" />
          <Skeleton className="h-5 w-40 rounded" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border border-gray-100 rounded-2xl">
              <Skeleton className="h-4 w-3/4 mb-3" />
              <Skeleton className="h-3 w-1/2 mb-4" />
              <div className="flex justify-between">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </MainCard>
    );
  }

  if (error) {
    return (
      <MainCard classname="h-full flex items-center justify-center py-8">
        <p className="text-red-500 font-medium text-sm">
          Failed to load projects
        </p>
      </MainCard>
    );
  }

  const projects = projectsData?.data || [];

  return (
    <MainCard classname="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="size-10 sm:size-12 rounded-xl rotate-3 border-b-4 border-emerald-500 bg-emerald-400 flex items-center justify-center shadow-emerald-100 shrink-0">
            <FolderKanban className="size-5 sm:size-6 text-white -rotate-3" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg">Juniors Projects</h3>
            <p className="text-xs text-gray-500 font-medium">
              Projects your juniors are working on
            </p>
          </div>
        </div>
        <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
          {projectsData?.pg_total || projects.length} Projects
        </div>
      </div>

      <div className="flex-1 overflow-auto mt-2 pr-1">
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {projects.map((project: ProjectModel) => (
              <div
                key={project.id}
                className="group flex flex-col p-4 rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-md hover:bg-emerald-50/10 transition-all cursor-pointer relative"
              >
                {/* Header: Category & Status */}
                <div className="flex justify-between items-start mb-3">
                  <div className="bg-gray-50 text-gray-500 border border-gray-100 text-[10px] font-extrabold px-2 py-0.5 rounded tracking-wide uppercase">
                    {project.categoryNameEn || "General"}
                  </div>

                  {/* Status Badge */}
                  <div
                    className={cx(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full border",
                      project.status === 1
                        ? "bg-blue-50 text-blue-600 border-blue-100"
                        : project.status === 2
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-amber-50 text-amber-600 border-amber-100"
                    )}
                  >
                    {project.status === 1
                      ? "Active"
                      : project.status === 2
                        ? "Completed"
                        : "Pending"}
                  </div>
                </div>

                {/* Project Title */}
                <h4 className="font-bold text-sm text-gray-900 mb-1.5 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                  {project.projectNameEn || project.projectNameAr}
                </h4>

                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-5 font-medium">
                  <Calendar className="size-3.5 text-gray-300" />
                  <span>
                    {project.modificationDate
                      ? new Date(project.modificationDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" }
                        )
                      : "Recently updated"}
                  </span>
                </div>

                {/* Footer: User & Type */}
                <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-extrabold">
                      {project.juniorName?.slice(0, 1).toUpperCase()}
                    </div>
                    <span className="text-xs font-semibold text-gray-700">
                      {project.juniorName}
                    </span>
                  </div>

                  <span className="flex items-center gap-1 text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100/50">
                    {project.projectType === 1 ? (
                      <>
                        <Users className="size-3" />
                        Team
                      </>
                    ) : (
                      <>
                        <User className="size-3" />
                        Solo
                      </>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-12 text-center text-gray-500">
            <FolderKanban className="size-16 text-gray-200 mb-4" />
            <p className="text-base font-semibold text-gray-700 mb-1">
              No Projects Found
            </p>
            <p className="text-sm">
              Your juniors haven't started any projects yet.
            </p>
          </div>
        )}
      </div>
    </MainCard>
  );
};
