import { Tabs } from "@components";
import { getProjectTabs } from "../server";

export const ProjectsTabs = async () => {
  const tabItems = await getProjectTabs();
  return <Tabs className="p-4" tabItems={tabItems} />;
};
