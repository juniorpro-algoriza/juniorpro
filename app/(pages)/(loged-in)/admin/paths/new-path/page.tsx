import React from "react";
import { Header } from "@components/client";
import { PathCreateEdit } from "../_components";
import { Breadcrumb } from "@components";

const NewPathPage = () => {
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          {
            title: "Home",
            href: "/admin/dashboard",
          },
          {
            title: "Learning Paths",
            href: "/admin/paths",
          },
          {
            title: "New Path",
            href: "/admin/paths/new-path",
          },
        ]}
      />
      <Header
        title="Create New Path"
        description="Create a new learning path with steps, missions, and resources."
      />
      <PathCreateEdit />
    </>
  );
};

export default NewPathPage;
