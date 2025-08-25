import {
  CalendarIcon,
  DocumentValidationIcon,
  UserIcon,
  WalletIcon,
} from "@icons";

import { getProjectManageStats } from "../../server";
import { ProjectManagerStats } from "./ProjectManagerStats";

export const ProjectManagerStatsContainer = async () => {
  const stats = await getProjectManageStats();
  const cardConfig = {
    "Active Juniors": {
      icon: (
        <UserIcon width="25" height="25" fill="var( --color-success-400)" />
      ),
      variant: "green",
    },
    Wallet: {
      icon: <WalletIcon width="25" height="25" fill="#D44E4E" />,
      variant: "red",
    },

    "Today's Sessions": {
      icon: (
        <CalendarIcon
          width="25"
          height="25"
          fill="var( --color-violet-normal)"
        />
      ),
      variant: "blue",
    },
    "Waiting List": {
      icon: (
        <DocumentValidationIcon
          width="25"
          height="25"
          fill="var( --color-storm-600)"
        />
      ),
      variant: "gray",
    },
  } as const;
  return <ProjectManagerStats stats={stats} cardConfig={cardConfig} />;
};
