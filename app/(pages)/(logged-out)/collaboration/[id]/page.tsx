import React from "react";
import { notFound } from "next/navigation";
import { TEAMS } from "../_data/teams";
import { ChallengeDetails } from "../_components/ChallengeDetails";

type PageProps = {
  params: Promise<{ id: string }>;
};

const ChallengeDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const team = TEAMS.find((t) => t.id === id);

  if (!team) notFound();

  return <ChallengeDetails team={team} />;
};

export default ChallengeDetailsPage;
