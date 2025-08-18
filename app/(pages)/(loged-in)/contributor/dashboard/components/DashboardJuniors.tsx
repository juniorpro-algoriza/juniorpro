import { Button, Table } from "@components";
// TODO: import from "@server" is better
import { getJuniorsData } from "@server";
// import { getJuniorsData } from "../../../../../server";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const DashboardJuniors = async () => {
  const juniorsData = await getJuniorsData();

  return (
    <div className="mt-6">
      <div className="bg-white rounded-[20px] drop-shadow-xl border border-border-primary">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-medium text-yankees-blue">
              Juniors ({juniorsData.length})
            </h3>
            {juniorsData.length ? (
              <Link href={"/juniors"}>
                <Button
                  intent="tertiary"
                  iconPosition="right"
                  size="small"
                  className="border-none text-violet-normal"
                  icon={<ChevronRight className="w-4 h-4" />}
                >
                  View All
                </Button>
              </Link>
            ) : (
              ""
            )}
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
          tableHeight="max-h-60"
          emptyMessage="No juniors added yet"
        />
      </div>
    </div>
  );
};
