import { getProjectManagerData } from "../server";
import {
  ProjectManagerHeader,
  ProjectManagerStatsContainer,
  ProjectManagerTable,
} from "./components";

const AdminProductManager = async () => {
  const projectManagerData = await getProjectManagerData();

  return (
    <div className="min-h-screen py-3 px-6 bg-stone-50 space-y-6">
      <ProjectManagerHeader />

      <ProjectManagerStatsContainer />

      <ProjectManagerTable projectManagerData={projectManagerData} />
    </div>
  );
};

export default AdminProductManager;
