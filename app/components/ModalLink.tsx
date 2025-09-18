import Link from "next/link";
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
  // Build query string if provided
  const searchParams = query
    ? "?" +
      new URLSearchParams(
        Object.entries(query).map(([key, value]) => [key, value.toString()])
      ).toString()
    : "";

  return (
    <Link
      className={className}
      href={`/modal/${name}${searchParams}`}
      scroll={false}
    >
      {children}
    </Link>
  );
};
