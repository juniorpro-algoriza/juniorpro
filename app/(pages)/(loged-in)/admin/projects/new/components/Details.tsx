"use client";
import type { Dispatch, SetStateAction } from "react";
import { Input, Select, Textarea } from "@components";
import { ProjectDetails, Lookup } from "@types";
import { ageRanges, projectTypes, projectStatus } from "./helpers";
interface DetailsProps {
  ProjectDetails: ProjectDetails;
  setProjectDetails: Dispatch<SetStateAction<ProjectDetails>>;
  category: Lookup[];
  skills: Lookup[];
  tools: Lookup[];
  duration: Lookup[];
  levels: Lookup[];
  projectMangers: Lookup[];
}
export const Details = ({
  ProjectDetails,
  setProjectDetails,
  category,
  skills,
  tools,
  duration,
  levels,
  projectMangers,
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
        label="Project Name"
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
        {/* <Input
          label="End Date"
          name="endDate"
          value={ProjectDetails.endDate}
          onChange={handleChange}
          type="date"
          placeholder="Write here"
          className="w-full border-[#DFE1E8]"
        /> */}
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
          value={ProjectDetails.projectManagerId}
          onChange={(value) =>
            setProjectDetails({
              ...ProjectDetails,
              projectManagerId: Number(value),
            })
          }
          label="Project Manager"
          placeholder="choose"
          options={projectMangers}
        />
        <Select
          value={ProjectDetails.projectType}
          onChange={(value) =>
            setProjectDetails({
              ...ProjectDetails,
              projectType: Number(value),
            })
          }
          label="Project Type"
          placeholder="choose"
          options={projectTypes}
        />
        <Select
          value={ProjectDetails.status}
          onChange={(value) =>
            setProjectDetails({
              ...ProjectDetails,
              status: Number(value),
            })
          }
          label="Project Status"
          placeholder="choose"
          options={projectStatus}
        />
        <Select
          value={ProjectDetails.ageRange}
          onChange={(value) =>
            setProjectDetails({
              ...ProjectDetails,
              ageRange: Number(value),
            })
          }
          label="Age Range"
          placeholder="choose"
          options={ageRanges}
        />
        <Select
          value={ProjectDetails.toolIds}
          multiple
          onChange={(value) =>
            setProjectDetails({ ...ProjectDetails, toolIds: value })
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
        <Input
          label="Number OF Places"
          type="number"
          min={1}
          max={10}
          placeholder="Write here"
          value={ProjectDetails.numberOfPlaces}
          onChange={(e) => {
            if (Number(e.target.value) <= 10) {
              setProjectDetails({
                ...ProjectDetails,
                numberOfPlaces: Number(e.target.value),
              });
            }
          }}
          className="w-full border-[#DFE1E8]"
        />
        <Input
          label="Points"
          name="points"
          placeholder="Points"
          value={ProjectDetails.points}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (!isNaN(value)) {
              setProjectDetails({
                ...ProjectDetails,
                points: value,
              });
            }
          }}
          className="w-full border-[#DFE1E8]"
        />
      </div>

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
