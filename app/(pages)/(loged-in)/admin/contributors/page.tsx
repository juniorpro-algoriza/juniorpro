import { ContributorTable } from "../../components/client";
import { getContributorData } from "../server";
import { ContributorStatContainer, ContributorHeader } from "./components";

const AdminContributor = async () => {
  const contributorData = await getContributorData();

  return (
    <div className="min-h-screen py-3 px-6 bg-stone-50 space-y-6">
      <ContributorHeader />

      <ContributorStatContainer />

      <ContributorTable contributorData={contributorData} view="full" />
    </div>
  );
};

export default AdminContributor;
