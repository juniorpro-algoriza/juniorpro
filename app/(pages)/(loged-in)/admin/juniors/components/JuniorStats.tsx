import {
  CalendarIcon,
  DocumentValidationIcon,
  FileUnkownIcon,
  UserIcon,
} from "@icons";

import { StatCard } from "../../../components";
import { getJuniorStats } from "../../server";

export const JuniorStats = async () => {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const config = cardConfig[stat.label as keyof typeof cardConfig];
        return (
          <StatCard
            key={stat.label}
            value={stat.value}
            label={stat.label}
            icon={config.icon}
            variant={config.variant}
          />
        );
      })}
    </div>
  );
};
