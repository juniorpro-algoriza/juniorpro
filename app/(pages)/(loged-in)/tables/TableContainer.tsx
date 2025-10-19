"use client";

import React, { useState, useTransition } from "react";
import { GenericTable } from "./GenericTable";
import { userConfigs, type UserType } from "../../../config/userConfig";
import { Button, Input, ModalLink } from "@components";
import { SearchIcon } from "lucide-react";
import { DiamondIcon } from "@icons";
import { useMediaQuery } from "usehooks-ts";
import { useRouter, useSearchParams } from "next/navigation";

type TableData = Record<string, string | number | React.ReactNode>;

interface TableContainerProps {
  type: UserType;
  initialData: TableData[];
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Get initial search from URL
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // Handle search with debouncing
  const handleSearch = (value: string) => {
    setSearch(value);

    // Debounce the actual search
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      params.set("page", "1"); // Reset to page 1 on search

      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    }, 500);

    return () => clearTimeout(timer);
  };

  // Filter columns for dashboard view
  const columns =
    view === "dashboard"
      ? config.tableColumns.filter((col) =>
          ["name", "joinedOn", "wallet", "actionHref"].includes(col.key)
        )
      : config.tableColumns;

  // For dashboard view, limit to 6 rows
  const displayData =
    view === "dashboard" ? initialData.slice(0, 6) : initialData;

  const totalPages = Math.ceil(total / pageSize);
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  return (
    <div className="bg-white rounded-[20px] mt-4 drop-shadow-xl border border-border-primary">
      {/* Header */}
      <div className="p-3 md:p-6 flex items-center justify-between gap-3 flex-wrap">
        <h3 className="text-xl font-medium text-yankees-blue">
          {title} ({total || initialData?.length || 0})
        </h3>

        {view === "full" ? (
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex gap-3 items-center">
              <ModalLink name={config.modals.add}>
                <Button
                  intent="primary"
                  size={isSmallScreen ? "small" : "medium"}
                  className="h-11 px-2 md:px-5"
                >
                  Add {config.entity}
                </Button>
              </ModalLink>

              {(type === "contributor" || type === "junior-contributor") &&
                "assignPoints" in config.modals && (
                  <ModalLink name={config.modals.assignPoints}>
                    <Button
                      intent="tertiary"
                      size={isSmallScreen ? "small" : "medium"}
                      className="h-11 px-2 md:px-5 flex items-center gap-2"
                    >
                      <DiamondIcon />
                      Assign Points
                    </Button>
                  </ModalLink>
                )}
            </div>
            <div className="relative">
              <Input
                placeholder={`Search for ${config.entity}s...`}
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSearch(e.target.value)
                }
                leftIcon={<SearchIcon size={20} />}
                className="shadow-sm w-64 h-12 text-sm"
              />
              {isPending && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full" />
                </div>
              )}
            </div>
          </div>
        ) : (
          <a
            href={`/admin/${type}`}
            className="text-sm text-blue-600 hover:underline"
          >
            View All
          </a>
        )}
      </div>

      {/* Table */}
      <GenericTable columns={[...columns]} data={displayData} />

      {/* Pagination */}
      {view === "full" && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white shadow-sm rounded-b-[10px] px-6 py-4 z-10">
          <p className="text-sm text-gray-500">
            Page {pageNumber} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              intent="unset"
              className="px-4 py-2 rounded-lg disabled:opacity-50"
              disabled={pageNumber === 1 || isPending}
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", String(pageNumber - 1));
                router.push(`?${params.toString()}`);
              }}
            >
              Previous
            </Button>
            <Button
              intent="primary"
              className="px-4 py-2 rounded-lg disabled:opacity-50"
              disabled={pageNumber === totalPages || isPending}
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", String(pageNumber + 1));
                router.push(`?${params.toString()}`);
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
