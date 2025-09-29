"use client";

import { Tabs } from "@components/client";
import {
  CalendarIcon,
  // DiamondIcon,
  FolderDetailsIcon,
  LeftArrowIcon,
} from "@icons";
import Link from "next/link";
import { TabData } from "@types";
import { Details } from "./Details";
import { TimeLine } from "./TimeLine";
// import { Points } from "./Points";
import { useState } from "react";
import { ProjectDetails, Task, Lookup } from "@types";
import { Button } from "@components";
import { getData } from "@server";
import { toast } from "sonner";
import { Loader } from "lucide-react";

interface CreateFormProps {
  category: Lookup[];
  skills: Lookup[];
  tools: Lookup[];
  duration: Lookup[];
  levels: Lookup[];
  projectMangers: Lookup[];
}
export const CreateForm = ({
  category,
  skills,
  tools,
  duration,
  levels,
  projectMangers,
}: CreateFormProps) => {
  const [loading, setLoading] = useState(false);
  const defaultProjectDetails: ProjectDetails = {
    courseName: "",
    startDate: "",
    endDate: "",
    categoryId: 0,
    levelId: 0,
    durationId: 0,
    toolIds: [],
    skillIds: [],
    projectType: 0,
    numberOfPlaces: 1,
    status: 0,
    description: "",
    ageRange: 0,
    points: 0,
    projectManagerId: 0,
  };
  const defaultProjectTasks: Task[] = [
    {
      id: Date.now(),
      taskName: "",
      skillIds: [],
      deadline: "",
      description: "",
    },
  ];
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>(
    defaultProjectDetails
  );
  const [projectTasks, setProjectTasks] = useState<Task[]>(defaultProjectTasks);
  const tasks = projectTasks?.map((task) => ({
    nameAr: task.taskName,
    nameEn: task.taskName,
    deadline: task.deadline,
    description: task.description,
    taskSkillIds: task.skillIds,
  }));

  const handleSaveProject = async () => {
    setLoading(true);
    try {
      await getData({
        url: "project",
        method: "POST",
        body: {
          projectDetails: {
            image: "/images/featued-Project-image.svg",
            numberOfPlaces: projectDetails.numberOfPlaces,
            nameAr: projectDetails.courseName,
            nameEn: projectDetails.courseName,
            projectType: projectDetails.projectType,
            status: projectDetails.status,
            description: projectDetails.description,
            categoryId: projectDetails.categoryId,
            levelId: projectDetails.levelId,
            durationId: projectDetails.durationId,
            ageRange: projectDetails.ageRange,
            points: projectDetails.points,
            projectManagerId: projectDetails.projectManagerId,
            skillIds: projectDetails.skillIds,
            toolIds: projectDetails.toolIds,
            startDate: projectDetails.startDate,
          },
          projectTasks: tasks,
        },
      });
      toast.success("Project created successfully");
    } catch (err) {
      console.log(err);
      toast.error("Error creating project");
    } finally {
      setLoading(false);
      setProjectDetails(defaultProjectDetails);
      setProjectTasks(defaultProjectTasks);
    }
  };
  const tabsData: TabData[] = [
    {
      name: (
        <div className="flex items-center gap-2 px-3 py-2 cursor-pointer outline-none">
          <FolderDetailsIcon fill="#5879DC" />
          <span>Project Details</span>
        </div>
      ),
      content: (
        <Details
          ProjectDetails={projectDetails}
          setProjectDetails={setProjectDetails}
          category={category}
          skills={skills}
          tools={tools}
          duration={duration}
          levels={levels}
          projectMangers={projectMangers}
        />
      ),
    },
    {
      name: (
        <div className="flex items-center gap-2 px-3 py-2 cursor-pointer outline-none">
          <CalendarIcon fill="#5879DC" />
          <span>Project Timeline</span>
        </div>
      ),
      content: (
        <TimeLine
          projectTasks={projectTasks}
          setProjectTasks={setProjectTasks}
          skills={skills}
        />
      ),
    },
    // {
    //   name: (
    //     <div className="flex items-center gap-2 px-3 py-2 cursor-pointer outline-none">
    //       <DiamondIcon fill="#5879DC" />
    //       <span>Points</span>
    //     </div>
    //   ),
    //   content: <Points />,
    // },
  ];

  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <header className="flex items-center gap-4 mb-4">
        <Link href="/admin/projects">
          <LeftArrowIcon width="15" height="14" />
        </Link>
        <h2 className="text-2xl font-medium">Add Project</h2>
      </header>

      <Tabs
        tabs={tabsData}
        tabListClassName="bg-white p-0 pb-3 mb-6 rounded-none space-x-3 border-b border-border-primary w-full"
        selectedTabClassName="relative text-violet-normal border border-violet-normal bg-violet-normal/10 rounded-lg before:absolute before:-bottom-3.5 before:left-0 before:right-0 before:h-[1px] before:z-10 before:bg-violet-normal"
        unselectedTabClassName="text-[#737F8E] hover:text-violet-normal"
      />
      <div className="py-4 px-2">
        <Button
          icon={loading ? <Loader className="animate-spin" /> : null}
          variant="primary"
          className="whitespace-nowrap w-full"
          size="large"
          onClick={handleSaveProject}
          disabled={loading}
        >
          Save Project
        </Button>
      </div>
    </section>
  );
};
