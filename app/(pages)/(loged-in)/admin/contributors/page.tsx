import { ContributorTableContainer } from "../../components/client";
import { ContributorStatContainer, ContributorHeader } from "./components";

const AdminContributor = async () => {
  return (
    <div className="min-h-screen py-3 px-6 bg-stone-50 space-y-6">
      <ContributorHeader />

      <ContributorStatContainer />

      <ContributorTableContainer />
    </div>
  );
};

export default AdminContributor;
