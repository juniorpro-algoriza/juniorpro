import { Table } from "@components";
import { EyeIcon } from "lucide-react";
import { ProjectManagerTableProps } from "../../types";

export const ProjectManagerTable = ({
  projectManagerData,
}: ProjectManagerTableProps) => {
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
              Project Managers ({projectManagerData.length})
            </h3>
          </div>
        </div>

        <Table
          columns={columns}
          data={projectManagerData}
          emptyMessage="No project manager added yet"
        />
      </div>
    </div>
  );
};
