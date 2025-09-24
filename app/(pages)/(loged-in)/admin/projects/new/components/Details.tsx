import { Input, Select, Textarea } from "@components";

export const Details = () => {
  return (
    <>
      <Input
        label="Course Name"
        name="firstName"
        placeholder="Write here"
        className="w-full border-[#DFE1E8]"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Start Date"
          name="startDate"
          type="date"
          placeholder="Write here"
          className="w-full border-[#DFE1E8]"
        />
        <Input
          label="End Date"
          name="endDate"
          type="date"
          placeholder="Write here"
          className="w-full border-[#DFE1E8]"
        />
        <Select
          value=""
          onChange={() => {}}
          label="Category"
          placeholder="choose"
          options={[]}
        />
        <Select
          value=""
          onChange={() => {}}
          label="Level"
          placeholder="choose"
          options={[]}
        />
      </div>
      <Select
        value=""
        onChange={() => {}}
        label="Estimated Duration"
        placeholder="choose"
        options={[]}
      />
      <Select
        value=""
        onChange={() => {}}
        label="Tools"
        placeholder="choose"
        options={[]}
      />
      <Select
        value=""
        onChange={() => {}}
        label="Skills"
        placeholder="choose"
        options={[]}
      />
      <Textarea
        label="Description"
        name="about"
        placeholder="Write here"
        className="w-full border-[#DFE1E8]"
      />
    </>
  );
};
