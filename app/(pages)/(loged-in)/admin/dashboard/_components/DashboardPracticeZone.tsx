import { ProjectCard } from "@components";
import { getProjects } from "@server";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export const DashboardPracticeZone = async () => {
  const {
    data: practiceZoneProjects,
    hasNextPage,
    total,
  } = await getProjects({
    limit: 2,
    pageNum: 1,
    projectType: 2 | 3, // Practice Zone & Challenges
  });

  return (
    <div className="bg-white shadow-sm rounded-[20px] p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium text-yankees-blue">
          Practice Zone ({total})
        </h2>
        {hasNextPage && (
          <Link
            href="/admin/projects"
            className="flex items-center gap-1 text-violet-normal text-sm font-medium hover:text-blue-700"
          >
            <span>View All</span>
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
            showDescription={true}
            showDueDate={false}
            showJuniors={true}
            showBadge={true}
            showStatus={true}
            showAge={false}
            showBadgeNextToDueDate={false}
            buttonText="View Project"
          />
        ))}
      </div>
    </div>
  );
};
