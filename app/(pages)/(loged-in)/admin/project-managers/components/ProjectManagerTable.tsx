import { Table, Button, Input, ModalLink } from "@components";
import { EyeIcon, SearchIcon } from "lucide-react";
import { ProjectManagerTableProps } from "../../types";

export const ProjectManagerTable = ({
  projectManagerData,
  searchValue,
  onSearchChange,
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
      key: "actionHref",
      isAction: true,
      actionLabel: "View",
      actionIcon: <EyeIcon size={16} />,
      width: "w-24",
    },
  ];

  return (
    <div className="bg-white rounded-[20px] drop-shadow-xl border border-border-primary">
      <div className="p-6">
        <div className="flex items-center  justify-between">
          <h3 className="text-xl font-medium text-yankees-blue">
            Project Managers ({projectManagerData.length})
          </h3>

          {/* Header: Add Button + Search */}
          <div className="flex items-center gap-3">
            <ModalLink name="AddProjectManager">
              <Button intent="primary" size="medium">
                Add Project Manager
              </Button>
            </ModalLink>

            <Input
              placeholder="Search Project Managers"
              value={searchValue}
              onChange={onSearchChange}
              leftIcon={<SearchIcon size={20} />}
              className="shadow-sm"
            />
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        data={projectManagerData}
        emptyMessage="No project manager added yet"
      />
    </div>
  );
};
