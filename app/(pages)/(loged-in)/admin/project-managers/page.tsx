export const dynamic = "force-dynamic";

import { getProjectManagerData } from "../server";
import { ProjectManagerHeader } from "./components/ProjectManagerHeader";
import { ProjectManagerStats } from "./components/ProjectManagerStats";
import { ProjectManagerTable } from "./components/ProjectManagerTable";

const AdminProductManager = async () => {
  const projectManagerData = await getProjectManagerData();

  return (
    <div className="min-h-screen py-3 px-6 bg-stone-50 space-y-6">
      <ProjectManagerHeader />

      <ProjectManagerStats />

      <ProjectManagerTable projectManagerData={projectManagerData} />
    </div>
  );
};

export default AdminProductManager;
