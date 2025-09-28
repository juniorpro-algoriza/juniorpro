"use client";
import type { Dispatch, SetStateAction } from "react";
import { Input, Select, Textarea } from "@components";
import { ProjectDetails, Lookup } from "@types";
interface DetailsProps {
  ProjectDetails: ProjectDetails;
  setProjectDetails: Dispatch<SetStateAction<ProjectDetails>>;
  category: Lookup[];
  skills: Lookup[];
  tools: Lookup[];
  duration: Lookup[];
  levels: Lookup[];
}
export const Details = ({
  ProjectDetails,
  setProjectDetails,
  category,
  skills,
  tools,
  duration,
  levels,
}: DetailsProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectDetails({ ...ProjectDetails, [name]: value });
  };
  return (
    <>
      <Input
        label="Course Name"
        name="courseName"
        placeholder="Write here"
        value={ProjectDetails.courseName}
        onChange={handleChange}
        className="w-full border-[#DFE1E8]"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Start Date"
          name="startDate"
          value={ProjectDetails.startDate}
          onChange={handleChange}
          type="date"
          placeholder="Write here"
          className="w-full border-[#DFE1E8]"
        />
        <Input
          label="End Date"
          name="endDate"
          value={ProjectDetails.endDate}
          onChange={handleChange}
          type="date"
          placeholder="Write here"
          className="w-full border-[#DFE1E8]"
        />
        <Select
          value={ProjectDetails.categoryId}
          options={category}
          onChange={(value) =>
            setProjectDetails({ ...ProjectDetails, categoryId: Number(value) })
          }
          label="Category"
          placeholder="choose"
        />
        <Select
          value={ProjectDetails.levelId}
          onChange={(value) =>
            setProjectDetails({ ...ProjectDetails, levelId: Number(value) })
          }
          label="Level"
          placeholder="choose"
          options={levels}
        />
      </div>
      <Select
        value={ProjectDetails.durationId}
        onChange={(value) =>
          setProjectDetails({ ...ProjectDetails, durationId: Number(value) })
        }
        label="Estimated Duration"
        placeholder="choose"
        options={duration}
      />
      <Select
        value={ProjectDetails.toolIds}
        onChange={(value) =>
          setProjectDetails({ ...ProjectDetails, toolIds: Number(value) })
        }
        label="Tools"
        placeholder="choose"
        options={tools}
      />
      <Select
        value={ProjectDetails.skillIds}
        onChange={(value) =>
          setProjectDetails({ ...ProjectDetails, skillIds: value })
        }
        label="Skills"
        multiple
        placeholder="choose"
        options={skills}
      />
      <Textarea
        label="Description"
        name="description"
        value={ProjectDetails.description}
        onChange={handleChange}
        placeholder="Write here"
        className="w-full border-[#DFE1E8]"
      />
    </>
  );
};
