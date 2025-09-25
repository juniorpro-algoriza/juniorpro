"use client";

// import { useState } from "react";
import { PlusIcon, X } from "lucide-react";
import { Button, Input, Select, Textarea } from "@components";
import { Lookup, Task } from "@types";

interface TimeLineProps {
  projectTasks: Task[];
  setProjectTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  skills: Lookup[];
}

export const TimeLine = ({
  projectTasks,
  setProjectTasks,
  skills,
}: TimeLineProps) => {
  const addTask = () => {
    setProjectTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        taskName: "",
        skills: 0,
        deadline: "",
        description: "",
      },
    ]);
  };

  const removeTask = (id: number) => {
    setProjectTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Add Tasks</h2>

      {projectTasks.map((task) => (
        <div
          key={task.id}
          className="relative rounded-xl border border-gray-200 bg-[#F7F8F9] p-6 space-y-4"
        >
          {/* Delete Button */}
          {projectTasks.length > 1 && (
            <Button
              onClick={() => removeTask(task.id)}
              className=" bg-gray-50 absolute top-3 right-3 text-gray-500 hover:bg-red-100 hover:text-red-500 "
            >
              <X size={20} />
            </Button>
          )}

          {/* Task Name */}
          <div>
            <Input
              type="text"
              label="Task Name"
              value={task.taskName}
              onChange={(e) =>
                setProjectTasks((prev) =>
                  prev.map((t) =>
                    t.id === task.id ? { ...t, taskName: e.target.value } : t
                  )
                )
              }
              placeholder="Write here"
              className="w-full border-[#DFE1E8]"
            />
          </div>

          {/* Skills & Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Select
                value={task.skills}
                onChange={(value) =>
                  setProjectTasks(
                    projectTasks.map((t) =>
                      t.id === task.id ? { ...t, skills: Number(value) } : t
                    )
                  )
                }
                label="Skills"
                placeholder="choose"
                options={skills}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Deadline</label>
              <Input type="date" className="w-full border-[#DFE1E8]" />
            </div>
          </div>

          {/* Description */}
          <div>
            <Textarea
              label="Description"
              placeholder="Write here"
              value={task.description}
              onChange={(e) =>
                setProjectTasks((prev) =>
                  prev.map((t) =>
                    t.id === task.id ? { ...t, description: e.target.value } : t
                  )
                )
              }
              className="w-full border-[#DFE1E8]"
              rows={3}
            />
          </div>

          {/* Attachment */}
          <div>
            <Input
              label="Attachement"
              type="file"
              accept=".jpg,.jpeg,.png,.gif"
              className="w-full border-[#DFE1E8]"
            />
          </div>
        </div>
      ))}

      {/* Add Another Task Button */}
      <Button
        onClick={addTask}
        className="w-full rounded-xl border border-dashed bg-gray-50 border-gray-300 py-3 text-black hover:bg-gray-100"
      >
        <PlusIcon />
        Add Another Task
      </Button>
    </div>
  );
};
