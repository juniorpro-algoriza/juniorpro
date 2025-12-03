import React from "react";
import { Header } from "@components/client";
import { PathCreateEdit } from "../components";

const NewPathPage = () => {
  return (
    <>
      <Header
        title="Create New Path"
        description="Create a new learning path with steps, missions, and resources."
      />
        <PathCreateEdit />
    </>
  );
};

export default NewPathPage;
