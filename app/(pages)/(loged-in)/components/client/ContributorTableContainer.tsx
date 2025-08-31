import { getContributorData } from "../../admin/server";
import { ContributorTable } from "./ContributorTable";
import { Badge } from "@components";

export const ContributorTableContainer = async () => {
  const contributorData = await getContributorData();

  const transformedData = contributorData.map((contributor) => ({
    ...contributor,
    status: (
      <Badge
        label={contributor.status}
        variant={contributor.status === "active" ? "green" : "orange"}
      />
    ),
  }));

  return <ContributorTable contributorData={transformedData} view="full" />;
};
