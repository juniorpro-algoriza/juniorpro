"use client";

import { useState, useEffect } from "react";
import { getLookup } from "@server";
import { BadgesSection } from "./BadgeSection";
import { Button, Input, Select } from "@components";
import { PlusIcon } from "lucide-react";
import { Lookup } from "@types";

export const Points = () => {
  const [skills, setSkills] = useState<
    { id: number; skillId?: number; points?: number }[]
  >([{ id: Date.now() }]);

  const [skillOptions, setSkillOptions] = useState<Lookup[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data: Lookup[] = await getLookup("Lookup/Skill");
        setSkillOptions(data || []);
      } catch (err) {
        console.error("Failed to load skills:", err);
      }
    };
    fetchSkills();
  }, []);

  const addSkill = () => setSkills((prev) => [...prev, { id: Date.now() }]);

  const updateSkill = (
    id: number,
    field: "skillId" | "points",
    value: number
  ) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  // const saveProject = () => {
  //   console.log("Saving Project:", skills);
  // };

  return (
    <div className="space-y-6">
      <div>
        {skills.map((s) => (
          <div key={s.id} className="flex gap-4 items-end">
            <div className="flex-1">
              <Select
                label="Skill"
                value={s.skillId || null}
                onChange={(value) =>
                  updateSkill(s.id, "skillId", Number(value))
                }
                options={skillOptions.map((opt) => ({
                  label: opt.label,
                  value: opt.value,
                }))}
                placeholder="Choose skill"
              />
            </div>

            <div className="mt-10">
              <Input
                type="number"
                min={1}
                max={10}
                value={s.points || ""}
                onChange={(e) =>
                  updateSkill(s.id, "points", Number(e.target.value))
                }
                placeholder="Points"
                disabled={!s.skillId}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add skill button */}
      <Button
        onClick={addSkill}
        className="w-full rounded-xl border border-dashed bg-gray-50 border-gray-300 py-3 text-black hover:bg-gray-100"
      >
        <PlusIcon />
        Add Another Skill
      </Button>

      {/* Badges section */}
      <BadgesSection
        skills={skills
          .filter((s) => s.skillId && s.points)
          .map((s) => ({
            id: s.id,
            name:
              skillOptions.find((opt) => opt.value === s.skillId!)?.label || "",
            points: s.points!,
          }))}
      />

      {/* Save project button */}
      {/* <div className="flex justify-between items-center mt-4">
        <Button
          onClick={saveProject}
          className="px-6 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
        >
          Save Project
        </Button>
      </div> */}
    </div>
  );
};
