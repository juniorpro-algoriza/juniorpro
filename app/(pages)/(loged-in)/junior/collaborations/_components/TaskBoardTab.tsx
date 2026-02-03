import React from "react";
import {
  MainCard,
  EnhancedTable,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Select,
  SearchInput,
} from "@components";
import { Calendar } from "lucide-react";
import { cx } from "@lib";
import { useRouter } from "next/navigation";
import { Task } from "@data/juniorCollaborations";

const STATUS_STYLING = {
  "Not Started": "bg-gray-100 text-gray-600 border-gray-200",
  "In Progress": "bg-orange-50 text-orange-600 border-orange-100",
  Submitted: "bg-green-50 text-green-600 border-green-100",
};

const PRIORITY_STYLING = {
  High: "bg-red-50 text-red-600 border-red-100",
  Medium: "bg-orange-50 text-orange-600 border-orange-100",
  Low: "bg-blue-50 text-blue-600 border-blue-100",
};

interface TaskBoardTabProps {
  tasks: Task[];
  collabId: number;
}

export function TaskBoardTab({ tasks, collabId }: TaskBoardTabProps) {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = React.useState<string | number>(
    "all"
  );
  const [memberFilter, setMemberFilter] = React.useState<string | number>(
    "all"
  );

  if (!tasks || tasks.length === 0) {
    return (
      <div className="py-10 text-center space-y-3">
        <p className="text-gray-500 font-medium">
          No tasks assigned to this project yet.
        </p>
        <p className="text-sm text-gray-400">
          Keep an eye out for updates from your team lead!
        </p>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center sm:gap-3 gap-1">
          {/* Search */}
          <div className="min-w-[240px] flex-1">
            <SearchInput
              placeholder="Search tasks..."
              className="bg-white rounded-2xl border-gray-200"
            />
          </div>

          {/* Select Filters */}
          <div className="flex items-center sm:gap-3 gap-1 flex-1 w-full flex-wrap">
            <div className="max-sm:min-w-44 sm:w-44 flex-1">
              <Select
                options={[
                  { label: "All Status", value: "all" },
                  { label: "Not Started", value: "not-started" },
                  { label: "In Progress", value: "in-progress" },
                  { label: "Submitted", value: "submitted" },
                ]}
                value={statusFilter}
                onChange={setStatusFilter}
              />
            </div>
            <div className="max-sm:min-w-44 sm:w-44 flex-1">
              <Select
                options={[{ label: "All Members", value: "all" }]}
                value={memberFilter}
                onChange={setMemberFilter}
              />
            </div>
          </div>
        </div>
      </div>

      {/* List Content */}
      <MainCard classname="p-0 border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-gray-900">Total Tasks</h3>
            <span className="flex items-center justify-center px-2 py-0.5 bg-blue-main/10 text-blue-main text-xs font-bold rounded-full border border-blue-main/10">
              {tasks.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <EnhancedTable>
            <TableHeader>
              <TableRow className="bg-gray-50/50 text-gray-500 border-y border-gray-100">
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                  Task Details
                </TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-center">
                  Status
                </TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-center">
                  Priority
                </TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                  Assignee
                </TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                  Due Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow
                  key={task.id}
                  onClick={() =>
                    router.push(
                      `?modal=TaskDetails&taskId=${task.id}&collabId=${collabId}`
                    )
                  }
                  className="group hover:bg-gray-50/30 transition-colors border-gray-200 cursor-pointer"
                >
                  <TableCell className="py-5 px-6 min-w-[300px]">
                    <div className="space-y-1">
                      <p className="font-bold text-gray-900 group-hover:text-blue-main transition-colors text-base">
                        {task.title}
                      </p>
                      <p className="text-sm text-gray-400 font-medium line-clamp-1">
                        {task.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 px-6 text-center">
                    <span
                      className={cx(
                        "px-3 py-1.5 rounded-full text-xs font-bold border",
                        STATUS_STYLING[
                          task.status as keyof typeof STATUS_STYLING
                        ]
                      )}
                    >
                      {task.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-5 px-6 text-center">
                    <span
                      className={cx(
                        "px-3 py-1.5 rounded-full text-xs font-bold border",
                        PRIORITY_STYLING[
                          task.priority as keyof typeof PRIORITY_STYLING
                        ]
                      )}
                    >
                      {task.priority}
                    </span>
                  </TableCell>
                  <TableCell className="py-5 px-6">
                    {task.assignee ? (
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 border border-gray-200">
                          {task.assignee.initials}
                        </div>
                        <span className="text-base font-bold text-gray-700">
                          {task.assignee.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-medium text-gray-300 italic">
                        Unassigned
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="py-5 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
                      <Calendar size={16} className="text-gray-400" />
                      {task.dueDate}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </EnhancedTable>
        </div>
      </MainCard>
    </div>
  );
}
