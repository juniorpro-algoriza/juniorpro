/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserData } from "../server/getUser";
import type { UserType } from "../../../config/userConfig";
import { TableContainer } from "./TableContainer";
import { Badge } from "@components";

export const ServerTableWrapper = async ({
  type,
  title,
  view = "full",
}: {
  type: UserType;
  title: string;
  view?: "full" | "dashboard";
}) => {
  const data = await getUserData(type);

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
      title={title}
      view={view}
    />
  );
};
