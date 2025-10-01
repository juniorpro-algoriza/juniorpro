import { JuniorsTable } from "../juniors/components";
import {
  DashboardHeader,
  // DashboardJuniors,
  DashboardPoints,
  DashboardProjects,
} from "./components";

const DashboardPage = async () => {
  return (
    <div className="min-h-screen py-3 px-6 bg-stone-50">
      {/* Header */}
      <DashboardHeader />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left Column - Points Allocation */}
        <DashboardPoints />

        {/* Right Column - Projects */}
        <DashboardProjects />
      </div>

      {/* Juniors Table */}
      <JuniorsTable />
    </div>
  );
};

export default DashboardPage;
