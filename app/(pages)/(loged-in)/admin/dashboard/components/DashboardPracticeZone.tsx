import { ProjectCard } from "@components";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { getProjects } from "@server";

export const DashboardPracticeZone = async () => {
  const { data: practiceZoneProjects, hasNextPage } = await getProjects({
    limit: 2,
    pageNum: 1,
    projectType: "team",
    juniors: ["lina", "anas"],
  });

  return (
    <div className="bg-white border border-[var(--color-border-primary)] rounded-[20px] p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium text-[var(--color-yankees-blue)]">
          Practice Zone ({practiceZoneProjects.length})
        </h2>
        {hasNextPage && (
          <Link
            href="/admin/practice-zone"
            className="flex items-center gap-1 text-[var(--color-violet-normal)] text-sm font-medium hover:text-blue-700"
          >
            View All
            <ChevronRightIcon size={16} />
          </Link>
        )}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {practiceZoneProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            showDescription={false}
            showDueDate={false}
            showJuniors={true}
            showJuniorsCountOnly={true}
            showRating={false}
            showBadge={true}
            showBadgeNextToDueDate={false}
            badgeText="status"
          />
        ))}
      </div>
    </div>
  );
};
