import React from "react";
import { notFound } from "next/navigation";
import { TEAMS } from "../_data/teams";
import { CollaborationDetails } from "../_components/CollaborationDetails";

type PageProps = {
  params: Promise<{ id: string }>;
};

const CollaborationDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const team = TEAMS.find((t) => t.id === id);

  if (!team) notFound();

  return <CollaborationDetails team={team} />;
};

export default CollaborationDetailsPage;
