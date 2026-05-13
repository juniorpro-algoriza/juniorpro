"use client";
import React, { use } from "react";
import { Header } from "@components/client";
import { PathCreateEdit } from "../_components";
import { Breadcrumb } from "@components";
import { useLearningPathById } from "../../tanstack/paths/useLearningPaths";

const EditPathPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: pathData } = useLearningPathById(Number(id));

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
            title: "Edit Path",
            href: `/admin/paths/${id}`,
          },
        ]}
      />
      <Header
        title="Edit Path"
        description="Edit a learning path with steps, missions, and resources."
      />
      <PathCreateEdit pathId={id} initialData={pathData ?? undefined} />
    </>
  );
};

export default EditPathPage;
