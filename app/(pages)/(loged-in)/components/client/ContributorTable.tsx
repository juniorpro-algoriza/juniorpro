"use client";
import { Table } from "@components";
import { EyeIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import type { ContributorTableContainerProps } from "../../admin/types";

export const ContributorTable = ({
  contributorData,
  view,
}: ContributorTableContainerProps) => {
  const pathname = usePathname();
  const isDashboard =
    view === "dashboard" || (!view && pathname.includes("/dashboard"));

  // TODO: refactor <Table />
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
    <div className="bg-white rounded-[20px] drop-shadow-xl border border-border-primary">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium text-yankees-blue">
            Conributors ({contributorData.length})
          </h3>
        </div>
      </div>
      <Table
        columns={columns}
        data={contributorData}
        emptyMessage="No contributor added yet"
      />
    </div>
  );
};
