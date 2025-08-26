import {
  ProjectManagerHeader,
  ProjectManagerStatsContainer,
} from "./components";
import { ProjectManagerTableContainer } from "./components";

const AdminProductManager = async () => {
  return (
    <div className="min-h-screen py-3 px-6 bg-stone-50 space-y-6">
      <ProjectManagerHeader />

      <ProjectManagerStatsContainer />

      <ProjectManagerTableContainer />
    </div>
  );
};

export default AdminProductManager;
