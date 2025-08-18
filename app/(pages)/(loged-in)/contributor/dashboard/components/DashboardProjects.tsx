import { Button, ProjectCard } from "@components";
import { EmptyData } from "@components/client";
// TODO: import from @server is better
import { getProjects } from "@server";
// import { getProjects } from "../../../../../server";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export const DashboardProjects = async () => {
  const { data: projectsData } = await getProjects({
    limit: 2,
    pageNum: 1,
    projectType: "all",
  });

  return (
    <div className="bg-white rounded-[20px] drop-shadow-xl border border-border-primary p-6 space-y-4">
      <Header numProjects={projectsData.length} />

      {projectsData.map((project) => {
        return (
          <ProjectCard
            key={project.id}
            project={project}
            showDescription={false}
            showDueDate={false}
            showJuniors={true}
            showBadge={false}
            showRating={false}
            showBadgeNextToDueDate={true}
            badgeText="projectType"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            showJuniorCount={false}
          />
        );
      })}

      <EmptyData
        description="No projects added yet"
        projectsNum={projectsData.length}
      />
    </div>
  );
};

const Header = ({ numProjects = 0 }) => {
  if (numProjects === 0) return null;

  return (
    <div className="flex items-center justify-between">
      <h3 className="text-2xl font-medium text-yankees-blue">
        Projects ({numProjects})
      </h3>
      <Link href={"./projects"}>
        <Button
          intent="tertiary"
          iconPosition="right"
          size="small"
          className="border-none text-violet-normal"
          icon={<ChevronRightIcon className="w-4 h-4" />}
        >
          View All
        </Button>
      </Link>
    </div>
  );
};
