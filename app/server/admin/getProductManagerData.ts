import type { ProductManager } from "../types/admin/ProductManager";
export const getProductManagerData = async (): Promise<ProductManager[]> => {
  return [
    {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      status: "active",
      projects: 3,
      practiceZone: 150,
      contributors: 2,
      joinedOn: "2023-01-10",
    },
    {
      name: "Sam Smith",
      email: "sam.smith@example.com",
      status: "active",
      projects: 1,
      practiceZone: 200,
      contributors: 2,
      joinedOn: "2023-03-22",
    },
    {
      name: "John Doe",
      email: "john.doe@example.com",
      status: "pending",
      projects: 2,
      practiceZone: 200,
      contributors: 2,
      joinedOn: "2023-05-15",
    },
    {
      name: "Harry Potter",
      email: "harry.potter@example.com",
      status: "pending",
      projects: 4,
      practiceZone: 400,
      contributors: 2,
      joinedOn: "2023-02-05",
    },
  ];
};
