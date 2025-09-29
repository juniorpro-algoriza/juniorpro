"use client";

import { Button, Input, Table } from "@components";
import type { Junior } from "@server/types";
import { ListFilter, SearchIcon } from "lucide-react";
import { ModalLink } from "../../../../../components/ModalLink";

interface JuniorsTableProps {
  juniorsData: Junior[];
}

export const JuniorsTable = ({ juniorsData }: JuniorsTableProps) => {
  return (
    <div>
      <div className="bg-white rounded-[20px] drop-shadow-xl border border-border-primary">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-medium text-yankees-blue">
              Juniors ({juniorsData.length})
            </h3>
            <div className="flex justify-center gap-2.5">
              <ModalLink name="AddJuniorForContributor">
                <Button intent="primary" className="text-sm" size="large">
                  Add Junior
                </Button>
              </ModalLink>

              <Input
                placeholder="Search for Juniors"
                leftIcon={<SearchIcon size={20} />}
                className="shadow-sm"
              />
              <Button
                intent="unset"
                className="shadow-sm px-2.5 border border-border-primary"
              >
                <ListFilter className="text-cadetGray" />
              </Button>
            </div>
          </div>
        </div>

        <Table
          columns={[
            { header: "Name", key: "name" },
            { header: "Points", key: "points" },
            { header: "Active Projects", key: "activeProjects" },
            { header: "Completed Projects", key: "completedProjects" },
          ]}
          data={juniorsData}
          emptyMessage="No juniors added yet"
        />
      </div>
    </div>
  );
};
