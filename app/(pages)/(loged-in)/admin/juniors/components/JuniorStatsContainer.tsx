import {
  UserIcon,
  FileUnkownIcon,
  CalendarIcon,
  DocumentValidationIcon,
} from "@icons";

import { getJuniorStats } from "../../server";
import { JuniorStats } from "./JuniorStats";

export const JuniorStatsContainer = async () => {
  const stats = await getJuniorStats();
  const cardConfig = {
    "Active Juniors": {
      icon: (
        <UserIcon width="25" height="25" fill="var( --color-success-400)" />
      ),
      variant: "green",
    },
    "Pending Reviews": {
      icon: (
        <FileUnkownIcon
          width="25"
          height="25"
          fill="var( --color-carrot-orange)"
        />
      ),
      variant: "orange",
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
  return <JuniorStats stats={stats} cardConfig={cardConfig} />;
};
