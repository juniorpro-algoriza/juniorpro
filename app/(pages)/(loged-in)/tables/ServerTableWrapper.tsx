/* eslint-disable @typescript-eslint/no-explicit-any */

import { getUserData } from "../server/getUser";
import type { UserType } from "../../../config/userConfig";
import { TableContainer } from "./TableContainer";

export const ServerTableWrapper = async ({ type }: { type: UserType }) => {
  const data = await getUserData(type);

  const transformedData = data.map((item: any) => ({
    ...item,
    actionHref: `/admin/${type}/${item.id}`,
  }));

  return <TableContainer type={type} initialData={transformedData} />;
};
