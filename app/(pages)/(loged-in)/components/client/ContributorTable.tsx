"use client";

import { Table } from "@components";
import type { Contributor } from "@server/types";
import { EyeIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Badge } from "../../../../components/Badge";
interface ContributorsTableProps {
  contributorData: Contributor[];
  view?: "dashboard" | "full";
}

export const ContributorTable = ({
  contributorData,
  view,
}: ContributorsTableProps) => {
  const transformedData = contributorData.map((contributor) => ({
    ...contributor,
    status: (
      <Badge
        label={contributor.status}
        variant={contributor.status === "active" ? "green" : "orange"}
      />
    ),
  }));
  const pathname = usePathname();

  // Determine view type based on prop or pathname (columns diff in dashboard)
  const isDashboard =
    view === "dashboard" || (!view && pathname.includes("/dashboard"));

  const columns = isDashboard
    ? [
        { header: "Name", key: "name" },
        { header: "Email", key: "email" },
        { header: "Wallet", key: "wallet" },
        {
          header: "Action",
          key: "action",
          isAction: true,
          actionLabel: "View",
          actionIcon: <EyeIcon size={16} />,
          href: "/contributors",
          width: "w-24",
        },
      ]
    : [
        { header: "Name", key: "name" },
        { header: "Email", key: "email" },
        { header: "Status", key: "status" },
        { header: "Juniors", key: "juniors" },
        { header: "Wallet", key: "wallet" },
        { header: "Joined On", key: "joinedOn" },
        {
          header: "Action",
          key: "action",
          isAction: true,
          actionLabel: "View",
          actionIcon: <EyeIcon size={16} />,
          href: "/contributors",
          width: "w-24",
        },
      ];

  return (
    <div>
      <div className="bg-white rounded-[20px] drop-shadow-xl border border-border-primary">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium text-yankees-blue">
              Contributors ({contributorData.length})
            </h3>
            {/* <div className="flex justify-center gap-2.5">
              <ModalLink name="AddJunior">
                <Button intent="primary" className="text-sm" size="large">
                  Add Contributor
                </Button>
              </ModalLink>

              <Input
                placeholder="Search for Contributors"
                leftIcon={<SearchIcon size={20} />}
                className="shadow-sm"
              />
              <Button
                intent="unset"
                className="shadow-sm px-2.5 border border-border-primary"
              >
                <ListFilter className="text-cadetGray" />
              </Button>
            </div> */}
          </div>
        </div>

        <Table
          columns={columns}
          data={transformedData}
          emptyMessage="No contributor added yet"
        />
      </div>
    </div>
  );
};
