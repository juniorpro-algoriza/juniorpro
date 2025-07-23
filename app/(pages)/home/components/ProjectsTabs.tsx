import { Tabs } from "@components";
import { getProjectTabs } from "../server";
import { ProjectsHeader } from "./ProjectsHeader";

export const ProjectsTabs = async () => {
  const tabItems = await getProjectTabs();
  return (
    <>
      <ProjectsHeader />
      <div className="flex items-center px-4 justify-center bg-white">
        <Tabs tabItems={tabItems} />
      </div>
    </>
  );
};
