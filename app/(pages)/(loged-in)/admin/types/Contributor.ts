import { ReactNode } from "react";

export type Contributor = {
  name: string;
  email: string;
  status: string | ReactNode;
  juniors: number;
  wallet: number;
  joinedOn: string;
};

export interface ContributorTableContainerProps {
  contributorData: Contributor[];
  view?: "dashboard" | "full";
}
