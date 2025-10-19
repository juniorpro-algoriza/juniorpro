import { ServerTableWrapper } from "../../tables";
import { JuniorHeader, JuniorStatsContainer } from "./components";

const AdminJuniorsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) => {
  const params = await searchParams;
  const pageNumber = Number(params.page) || 1;
  const searchText = params.search || undefined;

  return (
    <div className="min-h-screen py-3 px-6 bg-stone-50 space-y-6">
      <JuniorHeader />
      <JuniorStatsContainer />
      <ServerTableWrapper
        title="Juniors"
        type="junior"
        pageNumber={pageNumber}
        searchText={searchText}
      />
    </div>
  );
};

export default AdminJuniorsPage;
