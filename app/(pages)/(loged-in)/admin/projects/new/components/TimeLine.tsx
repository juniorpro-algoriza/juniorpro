"use client";

import { useState } from "react";
import { PlusIcon, X } from "lucide-react";

import { Button, Input, Textarea } from "@components";
import { Task } from "../../../types";

export const TimeLine = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: Date.now(), taskName: "", skills: "", deadline: "", description: "" },
  ]);

  const addTask = () => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        taskName: "",
        skills: "",
        deadline: "",
        description: "",
      },
    ]);
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Add Tasks</h2>

      {tasks.map((task) => (
        <div
          key={task.id}
          className="relative rounded-xl border border-gray-200 bg-[#F7F8F9] p-6 space-y-4"
        >
          {/* Delete Button */}
          {tasks.length > 1 && (
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
              placeholder="Write here"
              className="w-full border-[#DFE1E8]"
            />
          </div>

          {/* Skills & Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Skills</label>
              <select className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">Choose</option>
                <option value="react">React</option>
                <option value="node">Node.js</option>
                <option value="design">Design</option>
              </select>
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
