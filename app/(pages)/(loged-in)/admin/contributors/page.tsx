import { ServerTableWrapper } from "../../tables";
import { ContributorStatContainer, ContributorHeader } from "./components";

const AdminContributorPage = async () => {
  return (
    <div className="min-h-screen py-3 px-6 bg-stone-50 space-y-6">
      <ContributorHeader />
      <ContributorStatContainer />
      <ServerTableWrapper title="Contributors" type="contributor" />
    </div>
  );
};

export default AdminContributorPage;
