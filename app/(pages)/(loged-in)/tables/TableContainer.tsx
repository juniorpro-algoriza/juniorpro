/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { GenericTable } from "./GenericTable";
import { userConfigs, type UserType } from "../../../config/userConfig";
import { Button, Input, ModalLink } from "@components";
import { SearchIcon } from "lucide-react";

interface TableContainerProps {
  type: UserType;
  initialData: any[];
  title: string;
  managerId?: number;
  view?: "full" | "dashboard";
}

export const TableContainer: React.FC<TableContainerProps> = ({
  type,
  initialData,
  title,
  view = "full",
  managerId,
}) => {
  const config = userConfigs[type];
  const [search, setSearch] = useState("");

  // Filter columns for dashboard view
  const columns =
    view === "dashboard"
      ? config.tableColumns.filter((col) =>
          ["name", "joinedOn", "wallet", "actionHref"].includes(col.key)
        )
      : config.tableColumns;

  // Client-side filtering
  const filteredData = initialData?.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-[20px] drop-shadow-xl border border-border-primary">
      <div className="p-6 flex items-center justify-between">
        <h3 className="text-xl font-medium text-yankees-blue">
          {title} ({initialData.length})
        </h3>

        {view === "full" ? (
          <div className="flex items-center gap-3">
            <ModalLink name={config.modals.add}>
              <Button intent="primary" className="h-11 px-5">
                Add {config.entity}
              </Button>
            </ModalLink>

            <Input
              placeholder={`Search for ${config.entity}s...`}
              onChange={(e: any) => setSearch(e.target.value)}
              leftIcon={<SearchIcon size={20} />}
              className="shadow-sm w-64 h-12 text-sm"
            />
          </div>
        ) : (
          <a
            href={`/admin/${type}s`}
            className="text-sm text-blue-600 hover:underline"
          >
            View All
          </a>
        )}
      </div>

      <GenericTable columns={[...columns]} data={filteredData} />
    </div>
  );
};
