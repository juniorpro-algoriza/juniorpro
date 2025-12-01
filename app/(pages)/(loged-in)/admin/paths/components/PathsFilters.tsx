"use client";

import { Select } from "@components";
import { SearchInput } from "../../../components/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const PathsFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const category = [
    { value: "1", label: "Category 1" },
    { value: "2", label: "Category 2" },
    { value: "3", label: "Category 3" },
  ];

  const handleSelectChange = useCallback(
    (value: string | number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("category", value.toString());
      } else {
        params.delete("category");
      }
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams]
  );

  return (
    <div className="flex items-start gap-4 flex-wrap">
      <div className="flex-1 min-w-[200px]">
        <SearchInput placeholder="Search for paths..." />
      </div>
      <div className="w-[200px]">
        <Select
          value={searchParams.get("category") || ""}
          options={category}
          onChange={handleSelectChange}
          placeholder="Select category"
        />
      </div>
    </div>
  );
};
