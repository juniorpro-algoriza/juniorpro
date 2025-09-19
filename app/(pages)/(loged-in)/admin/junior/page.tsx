import { ServerTableWrapper } from "../../tables";
import { JuniorHeader, JuniorStatsContainer } from "./components";

const AdminJuniorsPage = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const pageNumber = Number(searchParams.page) || 1;

  return (
    <div className="min-h-screen py-3 px-6 bg-stone-50 space-y-6">
      <JuniorHeader />
      <JuniorStatsContainer />
      <ServerTableWrapper
        title="Juniors"
        type="junior"
        pageNumber={pageNumber}
      />
    </div>
  );
};

export default AdminJuniorsPage;
