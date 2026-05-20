"use client";

import { Button } from "@components";
import { SearchInput } from "@components/client";
import { cx } from "@lib";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BADGE_TYPES, BadgeTypeId } from "./data";

export const BadgeFilters = ({ selectedType }: { selectedType?: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const setType = (type?: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (type) {
      params.set("type", String(type));
    } else {
      params.delete("type");
    }

    params.delete("page");
    const queryString = params.toString();
    replace(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const tabs: { id?: BadgeTypeId; label: string }[] = [
    { id: undefined, label: "All Badges" },
    ...BADGE_TYPES.map((type) => ({ id: type.id, label: type.label })),
  ];

  return (
    <div className="flex items-center justify-between flex-wrap">
      <div className="flex space-x-1 rounded-2xl bg-white border border-gray-200 px-4 py-2 mb-3 w-fit max-w-full overflow-auto">
        {tabs.map((tab) => {
          const isActive = selectedType === tab.id;

          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setType(tab.id)}
              className={cx(
                "rounded-2xl py-2 px-4 text-sm font-medium leading-5 transition-all w-full outline-none cursor-pointer text-nowrap border",
                isActive
                  ? "border-[#C6D2FF] bg-[#EEF2FF] text-[#432DD7] shadow"
                  : "text-black border-transparent"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex sm:items-center sm:gap-4 flex-col sm:flex-row max-sm:w-full">
        <SearchInput
          placeholder="search for badges..."
          containerClassName="relative min-w-[200px]"
        />

        <Link href="/admin/badges/create" className="max-sm:w-full">
          <Button
            intent="main2"
            size="mainDefault"
            icon={<Plus size={18} />}
            className="mb-2 w-full"
          >
            New Badge
          </Button>
        </Link>
      </div>
    </div>
  );
};
