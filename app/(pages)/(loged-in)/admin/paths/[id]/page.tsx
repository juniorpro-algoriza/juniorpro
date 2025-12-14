import React from "react";
import { Header } from "@components/client";
import { PathCreateEdit } from "../_components";
import { Breadcrumb } from "@components";
import { getLearningPathById } from "../../server/paths/getLearningPathById";

const EditPathPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  // Load path data on the server
  let pathData;
  try {
    const pathId = Number(id);
    if (!Number.isNaN(pathId)) {
      pathData = await getLearningPathById({ id: pathId });
    }
  } catch (error) {
    console.error("Failed to load path details:", error);
  }

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
      <PathCreateEdit pathId={id} initialData={pathData} />
    </>
  );
};

export default EditPathPage;
