import Link from "next/link";
import type { ReactNode } from "react";

export type ModalName =
  | "AddJunior"
  | "EditProfile"
  | "AddProjectManager"
  | "EditProjectManagerProfile"
  | "AddContributor"
  | "EditContributorProfile";

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
