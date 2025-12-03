import Link from "next/link";
import type { ReactNode } from "react";

export type ModalName =
  | "AddJuniors"
  | "EditProfile"
  | "AddProjectManager"
  | "EditJuniors"
  | "EditProjectManagerProfile"
  | "AddJuniorForContributor"
  | "AddContributor"
  | "AssignContributor"
  | "EditContributorProfile"
  | "AssignPointsForContributors"
  | "AssignPointsForJuniors"
  | "EditJuniorsProfile"
  | "MissionCompleted"
  | "CreateEditMission";

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
