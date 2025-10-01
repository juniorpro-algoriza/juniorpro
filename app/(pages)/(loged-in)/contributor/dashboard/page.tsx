import { JuniorsTable } from "../juniors/components";
import {
  DashboardHeader,
  // DashboardJuniors,
  DashboardPoints,
  DashboardProjects,
} from "./components";

interface Props {
  params: { id: string }; // contributor id
  searchParams?: { page?: string };
}

const DashboardPage = async ({ params, searchParams }: Props) => {
  const contributorId = Number(params.id);
  const pageNumber = Number(searchParams?.page) || 1;
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
      <JuniorsTable contributorId={contributorId} pageNumber={pageNumber} />
    </div>
  );
};

export default DashboardPage;
