/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { GenericTable } from "./GenericTable";
import { userConfigs, type UserType } from "../../../config/userConfig";
import { Button, Input, ModalLink } from "@components";
import { SearchIcon } from "lucide-react";
import { DiamondIcon } from "@icons";

interface TableContainerProps {
  type: UserType;
  initialData: any[];
  title: string;
  managerId?: number;
  view?: "full" | "dashboard";
  total?: number;
  pageNumber?: number;
  pageSize?: number;
}

export const TableContainer: React.FC<TableContainerProps> = ({
  type,
  initialData,
  title,
  view = "full",
  total = 0,
  pageNumber = 1,
  pageSize = 10,
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

  // Apply search
  let filteredData = initialData?.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase())
  );

  // Apply dashboard limit of 6 rows
  if (view === "dashboard") {
    filteredData = filteredData.slice(0, 6);
  }

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="bg-white rounded-[20px] drop-shadow-xl border  border-border-primary">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <h3 className="text-xl font-medium text-yankees-blue">
          {title} ({total || initialData?.length || 0})
        </h3>

        {view === "full" ? (
          <div className="flex items-center gap-3">
            <ModalLink name={config.modals.add}>
              <Button intent="primary" className="h-11 px-5">
                Add {config.entity}
              </Button>
            </ModalLink>

          {(type === "contributor" || type === "junior-contributor") &&
            "assignPoints" in config.modals && (
              <ModalLink name={config.modals.assignPoints}>
                <Button intent="tertiary" className="h-11 px-5 flex items-center gap-2">
                  <DiamondIcon  />
                  Assign Points
                </Button>
              </ModalLink>
            )}



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

      {/* Table */}
      <GenericTable columns={[...columns]} data={filteredData} />

      {/* Pagination (show in both dashboard & full) */}
      {/* Pagination (sticky bottom) */}
      {totalPages > 1 && (
        <div className=" flex items-center justify-between border-t border-gray-200 bg-white shadow-sm rounded-b-[10px] px-6 py-4 z-10">
          <p className="text-sm text-gray-500">
            Page {pageNumber} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              intent="unset"
              className="px-4 py-2 rounded-lg disabled:opacity-50"
              disabled={pageNumber === 1}
              onClick={() => {
                window.location.href = `?page=${pageNumber - 1}`;
              }}
            >
              Previous
            </Button>
            <Button
              intent="primary"
              className="px-4 py-2 rounded-lg disabled:opacity-50"
              disabled={pageNumber === totalPages}
              onClick={() => {
                window.location.href = `?page=${pageNumber + 1}`;
              }}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
