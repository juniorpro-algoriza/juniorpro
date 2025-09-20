import { getData } from "./getData";

export const getJuniorStatistic = async () => {
  const res = await getData({
    url: "junior/statistics",
    method: "GET",
  });
  return res;
};
