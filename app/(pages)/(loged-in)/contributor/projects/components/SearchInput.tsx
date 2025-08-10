"use client";

import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";

export const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [debouncedQuery, setDebouncedQuery] = useDebounceValue("", 500);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    handleSearch(debouncedQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  return (
    <div className="relative">
      <SearchIcon className="w-3.5 absolute left-0 top-1/2 transform -translate-y-1/2 ml-3" />
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setDebouncedQuery(e.target.value)}
        className="shadow-none border-black/20 border rounded-lg px-6 pl-9 py-3 active:ring-0 active:border-0 focus:ring-2 focus:border-0 ring-blue-500"
      />
    </div>
  );
};
