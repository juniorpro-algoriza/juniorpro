// import { Button, ProjectCard } from "@components";
import { Button } from "@components";
import { EmptyData } from "@components/client";
// TODO: replace this with `getProjects()`
// import { getProjects } from "@server";
import { getProjectsData } from "@server";
import { CalendarIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const DashboardProjects = async () => {
  const projectsData = await getProjectsData();

  // const { data: projectsData } = getProjects({
  //   limit: 2,
  //   pageNum: 1,
  //   projectType: "all",
  // });

  return (
    <div className="bg-white rounded-[20px] drop-shadow-xl border border-border-primary p-6 space-y-4">
      <Header numProjects={projectsData.length} />

      {projectsData.map((project) => {
        // TODO: Use <ProjectCard />
        // return <ProjectCard key={project.id} project={project}/>
        return <OldProjectCard key={project.id} project={project} />;
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
// <EmptyData description="No projects added yet" />
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OldProjectCard = ({ project }: { project: any }) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl border border-antiflash-white">
        <Image
          src={project.image}
          alt={project.title}
          width={166}
          height={500}
          className="w-fit h-full object-cover rounded-lg"
        />
        <div className="flex flex-col space-y-2 text-sm justify-center">
          <h2 className="text-violet-normal font-medium ">{project.title}</h2>

          <div className="flex items-center justify-between space-x-1 text-dark-electric-blue font-medium">
            <div className="flex items-center space-x-1">
              <CalendarIcon className="w-4 h-4" />
              <span>Due: {project.date}</span>
            </div>
            <span
              className={`bg-orange-50 text-carrot-orange px-2 py-1 rounded-[40px] `}
            >
              {project.status}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <p className="text-dark-electric-blue">
              Junior:{" "}
              <span className="text-yankees-blue">{project.junior}</span>
            </p>
          </div>
          <Button
            intent="unset"
            size="small"
            className="border border-violet-normal text-violet-normal"
          >
            Report
          </Button>
        </div>
      </div>
    </div>
  );
};
