import { JuniorStat } from "@server/types";

export const getJuniorStats = async (): Promise<JuniorStat[]> => {
  const dummyData: JuniorStat[] = [
    { label: "Active Juniors", value: 36 },
    { label: "Pending Reviews", value: 36 },
    { label: "Today's Sessions", value: 36 },
    { label: "Waiting List", value: 36 },
  ];

  return dummyData;
};
