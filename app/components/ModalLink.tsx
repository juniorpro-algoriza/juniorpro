"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import type { ModalName } from "./types/ModalName";

interface ModalLinkProps {
  children: ReactNode;
  name: ModalName;
  className?: string;
  query?: Record<string, string | number>;
}

export const ModalLink = ({
  children,
  name,
  className,
  query,
}: ModalLinkProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Create new params based on current ones
  const newParams = new URLSearchParams(searchParams.toString());

  // Set the modal name
  newParams.set("modal", name);

  // Set additional query parameters
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      newParams.set(key, value.toString());
    });
  }

  return (
    <Link
      className={className}
      href={`${pathname}?${newParams.toString()}`}
      scroll={false}
      replace={false}
    >
      {children}
    </Link>
  );
};
