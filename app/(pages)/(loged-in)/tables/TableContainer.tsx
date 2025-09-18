/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { GenericTable } from "./GenericTable";
import { userConfigs, type UserType } from "../../../config/userConfig";
import { ModalLink } from "@components";
import { SearchIcon } from "lucide-react";

interface TableContainerProps {
  type: UserType;
  initialData: any[];
}

export const TableContainer: React.FC<TableContainerProps> = ({
  type,
  initialData,
}) => {
  const config = userConfigs[type];
  const [search, setSearch] = useState("");

  // Client-side filtering
  const filteredData = initialData.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-[20px] drop-shadow-xl border border-border-primary">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium text-yankees-blue">
            {config.entity}s ({initialData.length})
          </h3>

          <div className="flex items-center gap-3">
            <ModalLink name={config.modals.add}>
              <button className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white">
                Add {config.entity}
              </button>
            </ModalLink>

            <div className="relative">
              <input
                placeholder={`Search ${config.entity}s`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-xl shadow-sm"
              />
              <SearchIcon
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
      <GenericTable columns={[...config.tableColumns]} data={filteredData} />
    </div>
  );
};
