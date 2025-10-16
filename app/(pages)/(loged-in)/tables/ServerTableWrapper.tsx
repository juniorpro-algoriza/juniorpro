import { getUserData } from "../server/getUser";
import type { UserType } from "../../../config/userConfig";
import { Badge } from "@components";
import { TableContainer } from ".";

// Helper function to get badge variant based on status
const getStatusVariant = (
  status: string
): "green" | "orange" | "red" | "gray" => {
  const statusLower = status?.toLowerCase();

  switch (statusLower) {
    case "active":
    case "verified":
      return "green";
    case "pending":
    case "not verified":
    case "inactive":
      return "orange";
    default:
      return "gray";
  }
};

// Helper function to format status label
const getStatusLabel = (status: string): string => {
  const statusLower = status?.toLowerCase();

  // Capitalize first letter
  return statusLower.charAt(0).toUpperCase() + statusLower.slice(1);
};

type TransformedDataItem = {
  id: number | undefined;
  name: string | number;
  email: string | number;
  status: React.ReactNode;
  isVerified?: boolean;
  projects: string | number;
  practiceContent: string | number;
  contributors: string | number;
  juniorsCount: string | number;
  wallet: string | number;
  points: string | number;
  contributorName: string | number;
  activeProjects: string | number;
  completedProjects: string | number;
  joinedOn: string | number;
  actionHref: string;
};

export const ServerTableWrapper = async ({
  type,
  title,
  view = "full",
  pageNumber = 1,
  searchText,
}: {
  type: UserType;
  title: string;
  view?: "full" | "dashboard";
  pageNumber?: number;
  searchText?: string;
}) => {
  const pageSize = view === "dashboard" ? 4 : 10;

  const {
    data,
    total,
    pageSize: backendPageSize,
  } = await getUserData(type, pageNumber, pageSize, searchText);

  const transformedData: TransformedDataItem[] = data?.map((item) => ({
    ...item,
    status: (
      <Badge
        label={getStatusLabel(item.status)}
        variant={getStatusVariant(item.status)}
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
