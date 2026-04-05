import { Breadcrumb } from "@components";
import { Header } from "@components/client";
import React from "react";
import { CreateEditProjectManager } from "../_components";

const CreateProjectManager = () => {
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          {
            title: "Home",
            href: "/admin/dashboard",
          },
          {
            title: "Project Managers",
            href: "/admin/project-managers",
          },
          {
            title: "Create Project Manager",
            href: "/admin/project-managers/create",
          },
        ]}
      />
      <Header
        title="Create Project Manager"
        description="Add a new project manager to the platform"
      />
      <CreateEditProjectManager />
    </>
  );
};

export default CreateProjectManager;
