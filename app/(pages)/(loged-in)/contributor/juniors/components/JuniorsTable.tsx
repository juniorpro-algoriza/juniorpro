// components/ServerJuniorsTableWrapper.tsx

import { TableContainer } from "../../../tables";
import { getJuniorsData } from "../../server";

export const JuniorsTable = async () => {
  const { data, total, pageSize } = await getJuniorsData();

  return (
    <TableContainer
      type="junior-contributor"
      initialData={data}
      title="Juniors"
      total={total}
      pageSize={pageSize}
    />
  );
};
