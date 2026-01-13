import { Breadcrumb } from "@components";
import { Header } from "@components/client";
import React from "react";
import { CreateEditCollaboration } from "../_components";

const CreateCollaboration = () => {
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          {
            title: "Home",
            href: "/admin/dashboard",
          },
          {
            title: "Collaboration",
            href: "/admin/collaboration",
          },
          {
            title: "Create Collaboration",
            href: "/admin/collaboration/create",
          },
        ]}
      />
      <Header
        title="Create Collaboration"
        description="Design a competitive coding challenge for juniors"
      />
      <CreateEditCollaboration />
    </>
  );
};

export default CreateCollaboration;
