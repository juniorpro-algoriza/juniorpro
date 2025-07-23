import { Tabs } from "@components";
import { getProjectTabs } from "../server";

export const ProjectsTabs = async () => {
  const tabItems = await getProjectTabs();
  return (
    <div className="pt-20">
      <Tabs tabItems={tabItems} />
    </div>
  );
};
