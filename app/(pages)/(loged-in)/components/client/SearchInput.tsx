"use client";

import { Input } from "@components";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";
import { cx } from "@lib";
interface SearchInputProps {
  className?: string;
}
export const SearchInput = ({ className }: SearchInputProps) => {
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
      <Input
        type="text"
        placeholder="Search for projects..."
        onChange={(e) => setDebouncedQuery(e.target.value)}
        className={cx(
          "mt-2 shadow-lg rounded-lg  py-3 active:ring-0 active:border-0 focus:ring-2 focus:border-0 ring-violet-normal",
          className
        )}
        leftIcon={<SearchIcon className="mt-2" />}
      />
    </div>
  );
};
