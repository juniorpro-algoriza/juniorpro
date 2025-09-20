/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ServerTableWrapper.tsx
import { getUserData } from "../server/getUser";
import type { UserType } from "../../../config/userConfig";
import { Badge } from "@components";
import { TableContainer } from ".";

export const ServerTableWrapper = async ({
  type,
  title,
  view = "full",
  pageNumber = 1,
}: {
  type: UserType;
  title: string;
  view?: "full" | "dashboard";
  pageNumber?: number;
}) => {
  const pageSize = view === "dashboard" ? 4 : 10;

  const {
    data,
    total,
    pageSize: backendPageSize,
  } = await getUserData(type, pageNumber, pageSize);

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
      total={total}
      pageNumber={pageNumber}
      pageSize={backendPageSize}
    />
  );
};
