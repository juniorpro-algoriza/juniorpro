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
            title: "Collaborations",
            href: "/admin/collaborations",
          },
          {
            title: "Create Collaboration",
            href: "/admin/collaborations/create",
          },
        ]}
      />
      <Header
        title="Create Collaboration"
        description="Design a collaborative project for juniors"
      />
      <CreateEditCollaboration />
    </>
  );
};

export default CreateCollaboration;
