"use client";

import { Input } from "@components";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";
interface SearchInputProps {
  className?: string;
  placeholder?: string;
}
export const SearchInput = ({ className, placeholder }: SearchInputProps) => {
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
        placeholder={placeholder}
        onChange={(e) => setDebouncedQuery(e.target.value)}
        className={className}
        leftIcon={<SearchIcon />}
      />
    </div>
  );
};
