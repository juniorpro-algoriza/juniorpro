"use client";

import { Tabs } from "@components/client";
import {
  CalendarIcon,
  DiamondIcon,
  FolderDetailsIcon,
  LeftArrowIcon,
} from "@icons";
import Link from "next/link";
import { TabData } from "@types";
import { Details } from "./Details";
import { TimeLine } from "./TimeLine";
import { Points } from "./Points";
import { useState } from "react";
import { ProjectDetails, Task, Lookup } from "@types";

interface CreateFormProps {
  category: Lookup[];
  skills: Lookup[];
  tools: Lookup[];
  duration: Lookup[];
  levels: Lookup[];
}
export const CreateForm = ({
  category,
  skills,
  tools,
  duration,
  levels,
}: CreateFormProps) => {
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    courseName: "",
    startDate: "",
    endDate: "",
    categoryId: 0,
    levelId: 0,
    durationId: 0,
    toolIds: 0,
    skillIds: 0,
    projectType: 0,
    status: 0,
    description: "",
    attachment: "",
    ageRange: 0,
    points: 0,
    projectManagerId: 0,
  });
  const [projectTasks, setProjectTasks] = useState<Task[]>([
    { id: Date.now(), taskName: "", skills: 0, deadline: "", description: "" },
  ]);
  console.log(projectTasks);
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
    {
      name: (
        <div className="flex items-center gap-2 px-3 py-2 cursor-pointer outline-none">
          <DiamondIcon fill="#5879DC" />
          <span>Points</span>
        </div>
      ),
      content: <Points />,
    },
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
    </section>
  );
};
