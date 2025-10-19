import { ServerTableWrapper } from "../../tables";
import { ContributorStatContainer, ContributorHeader } from "./components";

const AdminContributorPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) => {
  const params = await searchParams;
  const pageNumber = Number(params.page) || 1;
  const searchText = params.search || undefined;
  return (
    <div className="min-h-screen py-3 px-6 bg-stone-50 space-y-6">
      <ContributorHeader />
      <ContributorStatContainer />
      <ServerTableWrapper
        title="Contributors"
        type="contributor"
        pageNumber={pageNumber}
        searchText={searchText}
      />
    </div>
  );
};
export default AdminContributorPage;
