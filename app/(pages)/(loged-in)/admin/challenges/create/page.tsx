import { Breadcrumb } from "@components";
import { Header } from "@components/client";
import React from "react";
import { CreateEditChallenge } from "../_components";

const CreateChallenges = () => {
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          {
            title: "Home",
            href: "/admin/dashboard",
          },
          {
            title: "Challenges",
            href: "/admin/challenges",
          },
          {
            title: "Create Challenges",
            href: "/admin/challenges/create",
          },
        ]}
      />
      <Header
        title="Create Challenges"
        description="Design a competitive coding challenge for juniors"
      />
      <CreateEditChallenge showTitle={false} />
    </>
  );
};

export default CreateChallenges;
