"use client";

import { useState } from "react";
import { Skill } from "../../../types";
import { BadgesSection } from "./BadgeSection";
import { Button } from "@components";
import { PlusIcon } from "lucide-react";

export const Points = () => {
  const [skills, setSkills] = useState<Skill[]>([
    { id: Date.now(), name: "", points: 0 },
  ]);

  const addSkill = () => {
    setSkills((prev) => [...prev, { id: Date.now(), name: "", points: 0 }]);
  };

  const updateSkill = (id: number, field: "name" | "points", value: string) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id
          ? { ...skill, [field]: field === "points" ? Number(value) : value }
          : skill
      )
    );
  };

  const saveProject = () => {
    //will intergarate
    console.log("Saving Project:", skills);
  };

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="flex gap-4">
            {/* Skills Dropdown */}

            <select //we will use hte Select component and pass to it the options
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Choose skill</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Problem Solver">Problem Solver</option>
              <option value="Project Manager">Project Manager</option>
            </select>

            {/* Points Dropdown */}
            <select
              value={skill.points || ""}
              onChange={(e) => updateSkill(skill.id, "points", e.target.value)}
              className="w-32 rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Choose</option>
              <option value="5">5</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="10">10</option>
            </select>
          </div>
        ))}

        {/* Add Skill */}
        <Button
          onClick={addSkill}
          className="w-full rounded-xl border border-dashed border-gray-300 py-3 text-gray-600 hover:bg-gray-100"
        >
          <PlusIcon />
          Add Another Skill
        </Button>

        {/* Save Project */}
        <div className="flex justify-between items-center mt-4">
          <Button className="px-6 py-2 rounded-lg border text-gray-600">
            ← Back
          </Button>
          <Button
            onClick={saveProject}
            className="px-6 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
          >
            Save Project
          </Button>
        </div>
      </div>

      {/* Badges Section */}
      <BadgesSection skills={skills.filter((s) => s.name && s.points)} />
    </div>
  );
};
