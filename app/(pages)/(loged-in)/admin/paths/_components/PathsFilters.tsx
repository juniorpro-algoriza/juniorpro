"use client";

import { SearchInput } from "@components/client";
import { Button } from "@components";
import { Plus } from "lucide-react";
import Link from "next/link";

// import { Select } from "@components";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useCallback } from "react";

export const PathsFilters = () => {
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

  // const category = [
  //   { value: "1", label: "Category 1" },
  //   { value: "2", label: "Category 2" },
  //   { value: "3", label: "Category 3" },
  // ];

  // const handleSelectChange = useCallback(
  //   (value: string | number) => {
  //     const params = new URLSearchParams(searchParams.toString());
  //     if (value) {
  //       params.set("category", value.toString());
  //     } else {
  //       params.delete("category");
  //     }
  //     replace(`${pathname}?${params.toString()}`);
  //   },
  //   [pathname, replace, searchParams]
  // );

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className=" min-w-[200px] mt-2">
        <SearchInput placeholder="Search for paths..." />
      </div>
      <Link href="/admin/paths/new-path">
        <Button intent="main2" size="mainDefault">
          <Plus className="size-4" />
          New Path
        </Button>
      </Link>
      {/* <div className="w-[200px]">
        <Select
          value={searchParams.get("category") || ""}
          options={category}
          onChange={handleSelectChange}
          placeholder="Select category"
        />
      </div> */}
    </div>
  );
};
