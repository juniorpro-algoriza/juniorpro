import { ProductManagerStats } from "../types/admin/ProductManagerStats";

export const getProductManagerStats = async (): Promise<
  ProductManagerStats[]
> => {
  const dummyData: ProductManagerStats[] = [
    { label: "Active Juniors", value: 36 },
    { label: "Wallet", value: 36 },
    { label: "Today's Sessions", value: 36 },
    { label: "Waiting List", value: 36 },
  ];

  return dummyData;
};
