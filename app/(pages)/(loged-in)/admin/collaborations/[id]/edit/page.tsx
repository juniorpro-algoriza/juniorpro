import { Breadcrumb } from "@components";
import { Header } from "@components/client";
import React from "react";
import { CreateEditCollaboration } from "../../_components";
import { getCollaborationById } from "../../../server/collaborations";
import { notFound } from "next/navigation";

interface EditCollaborationPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ step?: string }>;
}

const EditCollaboration = async ({
  params,
  searchParams,
}: EditCollaborationPageProps) => {
  const { id } = await params;
  const { step } = await searchParams;
  const collaborationId = parseInt(id);
  const initialStep = step ? parseInt(step) : 1;

  if (isNaN(collaborationId)) {
    notFound();
  }

  const collaborationData = await getCollaborationById(collaborationId);

  if (!collaborationData) {
    notFound();
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
            title: "Collaborations",
            href: "/admin/collaborations",
          },
          {
            title:
              collaborationData.collaborationDetails?.nameEn ||
              "Edit Collaboration",
            href: `/admin/collaborations/${id}`,
          },
          {
            title: "Edit",
            href: `/admin/collaborations/${id}/edit`,
          },
        ]}
      />
      <Header
        title="Edit Collaboration"
        description={`Update "${collaborationData.collaborationDetails?.nameEn || ""}" project details`}
      />
      <CreateEditCollaboration
        mode="edit"
        initialData={collaborationData}
        collaborationId={collaborationId}
        initialStep={initialStep}
      />
    </>
  );
};

export default EditCollaboration;
