import { getJuniorsData } from "@server";

import { Badge } from "@components";
import { JuniorsTable } from "./JuniorsTable";

export const JuniorTableContainer = async () => {
  const JuniorTableData = await getJuniorsData();

  const transformedData = JuniorTableData.map((juniorTable) => ({
    ...juniorTable,
    status: (
      <Badge
        label={juniorTable.status}
        variant={juniorTable.status === "active" ? "green" : "orange"}
      />
    ),
  }));

  return <JuniorsTable juniorsData={transformedData} />;
};
