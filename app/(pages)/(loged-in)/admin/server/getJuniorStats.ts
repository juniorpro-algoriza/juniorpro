import { Stats } from "./types";

export const getJuniorStats = async (): Promise<Stats[]> => {
  const dummyData: Stats[] = [
    { label: "Active Juniors", value: 36 },
    { label: "Pending Reviews", value: 36 },
    { label: "Today's Sessions", value: 36 },
    { label: "Waiting List", value: 36 },
  ];

  return dummyData;
};
