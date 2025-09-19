"use client";

import { TableContainer } from "../tables";

// Mock data
const mockConributor = [
  {
    id: 101,
    name: "Alice Smith",
    email: "alice@example.com",
    status: "active",
    joinedOn: "30-0-2020",
    PracticeZone: 0,
    contributors: 1,
  },
  {
    id: 102,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "inactive",
    joinedOn: "30-0-2020",
    PracticeZone: 0,
    contributors: 1,
  },
  {
    id: 103,
    name: "Charlie Brown",
    email: "charlie@example.com",
    status: "active",
    joinedOn: "30-0-2020",
    PracticeZone: 0,
    contributors: 1,
  },
];

interface ConributorTabProps {
  managerId: number;
}

export const ContributorTab = ({ managerId }: ConributorTabProps) => {
  return (
    <TableContainer
      managerId={managerId}
      type="contributor"
      initialData={mockConributor}
      title=" Conributor"
      view="full"
    />
  );
};
