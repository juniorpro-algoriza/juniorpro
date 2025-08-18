import { ProjectCard } from "@components";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { getPracticeZoneProjects } from "../../server/getPracticeZoneProjects";
// TODO: use getProjects() from "@server"
// import { getProjects } from "@server";

// TODO: add export to the function defintion is better
export const DashboardPracticeZone = async () => {
  // TODO: use getProjects() from "@server"
  const practiceZoneProjects = await getPracticeZoneProjects();
  return (
    <div className="bg-white border border-[#F1F3F9] rounded-[20px] p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium text-[#202637]">
          Practice Zone ({practiceZoneProjects.length})
        </h2>
        {getPracticeZoneProjects.length > 2 && (
          <Link
            replace
            href="/admin/practice-zone"
            className="flex items-center gap-1 text-[#5879DC] text-sm font-medium hover:text-blue-700"
          >
            View All
            <ChevronRightIcon size={16} />
          </Link>
        )}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {practiceZoneProjects.slice(0, 2).map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            showDescription={false}
            showDueDate={false}
            showJuniors={false}
            showJuniorCount={true}
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
// TODO: do not use default imports for components
// export default DashboardPracticeZone;
