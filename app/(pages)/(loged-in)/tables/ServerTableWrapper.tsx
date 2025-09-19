/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserData } from "../server/getUser";
import { TableContainer } from "./TableContainer";
import { Badge } from "@components";
import type { UserType } from "../../../config/userConfig";

interface ServerTableWrapperProps {
  type: UserType;
  id?: number;
  title?: string;
}

export const ServerTableWrapper = async ({
  type,

  title,
}: ServerTableWrapperProps) => {
  const data = await getUserData(type); // pass id to filter

  const transformedData = data?.map((item: any) => ({
    ...item,
    status: (
      <Badge
        label={item.status}
        variant={item.status === "active" ? "green" : "orange"}
      />
    ),
    actionHref: `/admin/${type}/${item.id}`,
  }));

  return (
    <TableContainer
      type={type}
      initialData={transformedData}
      title={title || ""}
    />
  );
};
