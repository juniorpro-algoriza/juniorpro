// admin/projectmanager/root.tsx

import { ServerTableWrapper } from "../../tables";
import {
  ProjectManagerHeader,
  ProjectManagerStatsContainer,
} from "./components";

const AdminProductManagerPage = async () => {
  return (
    <div className="min-h-screen py-3 px-6 bg-stone-50 space-y-6">
      <ProjectManagerHeader />
      <ProjectManagerStatsContainer />
      {/* Render the new ServerTableWrapper component */}
      <ServerTableWrapper title="Project Managers" type="project-manager" />
    </div>
  );
};

export default AdminProductManagerPage;
