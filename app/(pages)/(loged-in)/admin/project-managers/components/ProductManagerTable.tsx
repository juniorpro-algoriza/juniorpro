"use client";

import { Table } from "@components";
import { EyeIcon } from "lucide-react";
import { Badge } from "../../../../../components/Badge";
import { ProductManager } from "../../types/ProductManager";

interface ProductManagerTableProps {
  productManagerData: ProductManager[];
  view?: "dashboard" | "full";
}

export const ProductManagerTable = ({
  productManagerData,
}: ProductManagerTableProps) => {
  const transformedData = productManagerData.map((productManager) => ({
    ...productManager,
    status: (
      <Badge
        label={productManager.status}
        variant={productManager.status === "active" ? "green" : "orange"}
      />
    ),
  }));

  const columns = [
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Status", key: "status" },
    { header: "Projects", key: "projects" },
    { header: "Practice Content", key: "practiceContent" },
    { header: "Contributors", key: "contributors" },
    { header: "Joined On", key: "joinedOn" },
    {
      header: "Action",
      key: "action",
      isAction: true,
      actionLabel: "View",
      actionIcon: <EyeIcon size={16} />,
      href: "/admin/project-managers/id",
      width: "w-24",
    },
  ];

  return (
    <div>
      <div className="bg-white rounded-[20px] drop-shadow-xl border border-border-primary">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium text-yankees-blue">
              Project Managers ({productManagerData.length})
            </h3>
            {/* <div className="flex justify-center gap-2.5">
              <ModalLink name="AddJunior">
                <Button intent="primary" className="text-sm" size="large">
                  Add Contributor
                </Button>
              </ModalLink>

              <Input
                placeholder="Search for Contributors"
                leftIcon={<SearchIcon size={20} />}
                className="shadow-sm"
              />
              <Button
                intent="unset"
                className="shadow-sm px-2.5 border border-border-primary"
              >
                <ListFilter className="text-cadetGray" />
              </Button>
            </div> */}
          </div>
        </div>

        <Table
          columns={columns}
          data={transformedData}
          emptyMessage="No contributor added yet"
        />
      </div>
    </div>
  );
};
