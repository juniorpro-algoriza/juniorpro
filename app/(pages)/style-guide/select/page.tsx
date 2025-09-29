"use client";

import { Select } from "@components/client";
import { containerStyle } from "../styles";

const SelectStylePage = () => {
  const options = [
    {
      value: "alpha",
      label: "Alpha",
    },
    {
      value: "beta",
      label: "Beta",
    },
    {
      value: "gamma",
      label: "Gamma",
    },
  ];
  return (
    <div className={containerStyle}>
      <Select
        value=""
        onChange={() => {}}
        description="description"
        label="label"
        options={options}
      />
    </div>
  );
};

export default SelectStylePage;
