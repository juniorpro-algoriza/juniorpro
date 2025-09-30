// components/ServerJuniorsTableWrapper.tsx

import { TableContainer } from "../../../tables";
import { getJuniorsData } from "../../server";

interface Props {
  contributorId: number;
  pageNumber?: number;
}

export const JuniorsTable = async ({
  contributorId,
  pageNumber = 1,
}: Props) => {
  const { data, total, pageSize } = await getJuniorsData(contributorId, pageNumber);

  return (
    <TableContainer
      type="junior-contributor"
      initialData={data}
      title="Juniors"
      total={total}
      pageNumber={pageNumber}
      pageSize={pageSize}
    />
  );
};