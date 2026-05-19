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
    replace(`${pathname}?${params.toString()}`);
  };

  const tabs: { id?: BadgeTypeId; label: string }[] = [
    { id: undefined, label: "All Badges" },
    ...BADGE_TYPES.map((type) => ({ id: type.id, label: type.label })),
  ];

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex items-center bg-white border border-gray-100 shadow-main rounded-2xl p-1 overflow-x-auto max-w-full">
        {tabs.map((tab) => {
          const isActive = selectedType === tab.id;

          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setType(tab.id)}
              className={cx(
                "px-4 py-2.5 rounded-xl text-sm font-bold text-nowrap transition-all",
                isActive
                  ? "bg-violet-light text-dark-blue-main shadow-sm"
                  : "text-yankees-blue hover:bg-gray-50"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="min-w-[260px] flex-1 md:max-w-[420px]">
        <SearchInput
          placeholder="search for badges..."
          className="rounded-2xl"
        />
      </div>

      <Link href="/admin/badges/create" className="max-sm:w-full">
        <Button intent="main2" size="mainDefault" className="max-sm:w-full">
          <Plus className="size-4" />
          New Badge
        </Button>
      </Link>
    </div>
  );
};
