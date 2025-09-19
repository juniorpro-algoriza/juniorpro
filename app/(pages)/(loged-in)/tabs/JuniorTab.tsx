"use client";

import { TableContainer } from "../tables";

// Mock data
const mockJuniors = [
  {
    id: 101,
    name: "Alice Smith",
    email: "alice@example.com",
    status: "active",
    joinedOn: "30-0-2020",
    PracticeContent: 0,
    contributors: 1,
  },
  {
    id: 102,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "inactive",
    joinedOn: "30-0-2020",
    PracticeContent: 0,
    contributors: 1,
  },
  {
    id: 103,
    name: "Charlie Brown",
    email: "charlie@example.com",
    status: "active",
    joinedOn: "30-0-2020",
    PracticeContent: 0,
    contributors: 1,
  },
];

interface JuniorsTabProps {
  managerId: number;
}

export const JuniorsTab = ({ managerId }: JuniorsTabProps) => {
  return (
    <TableContainer
      managerId={managerId}
      type="juniors"
      initialData={mockJuniors}
      title="Assigned Juniors"
      view="full"
    />
  );
};
