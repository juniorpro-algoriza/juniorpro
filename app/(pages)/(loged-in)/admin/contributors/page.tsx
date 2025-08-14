export const dynamic = "force-dynamic";

import { getContributorData } from "../../../../server/admin/getContributorData";
import { ContributorTable } from "../../components/client";
import { ContributorHeader } from "./components/ContributorHeader";
import ContributorStats from "./components/ContributorStats";

const AdminContributor = async () => {
  const contributorData = await getContributorData();

  return (
    <div className="min-h-screen py-3 px-6 bg-stone-50 space-y-6">
      <ContributorHeader />

      <ContributorStats />

      <ContributorTable contributorData={contributorData} view="full" />
    </div>
  );
};

export default AdminContributor;
