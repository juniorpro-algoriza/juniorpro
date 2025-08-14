import { Junior } from "../types/admin/Junior";

export const getJuniorData = async (): Promise<Junior[]> => {
  return [
    {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      status: "active",
      contributor: "John Smith",
      projects: 3,
      joinedOn: "2023-01-10",
    },
    {
      name: "Sam Smith",
      email: "sam.smith@example.com",
      status: "active",
      contributor: "Jane Doe",
      projects: 1,
      joinedOn: "2023-03-22",
    },
    {
      name: "John Doe",
      email: "john.doe@example.com",
      status: "pending",
      contributor: "Harry Potter",
      projects: 2,
      joinedOn: "2023-05-15",
    },
    {
      name: "Harry Potter",
      email: "harry.potter@example.com",
      status: "active",
      contributor: "Alex Johnson",
      projects: 4,
      joinedOn: "2023-02-05",
    },
  ];
};
