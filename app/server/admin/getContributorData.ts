import type { Contributor } from "@server/types";

export const getContributorData = async (): Promise<Contributor[]> => {
  return [
    {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      status: 1,
      juniors: 3,
      wallet: 150,
      joinedOn: "2023-01-10",
    },
    {
      name: "Sam Smith",
      email: "sam.smith@example.com",
      status: 0,
      juniors: 1,
      wallet: 200,
      joinedOn: "2023-03-22",
    },
    {
      name: "John Doe",
      email: "john.doe@example.com",
      status: 1,
      juniors: 2,
      wallet: 200,
      joinedOn: "2023-05-15",
    },
    {
      name: "Harry Potter",
      email: "harry.potter@example.com",
      status: 1,
      juniors: 4,
      wallet: 400,
      joinedOn: "2023-02-05",
    },
  ];
};
