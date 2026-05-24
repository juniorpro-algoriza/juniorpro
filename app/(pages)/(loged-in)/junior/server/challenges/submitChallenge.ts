"use server";

import { customFetch } from "@server/lib";

interface SubmitChallengeParams {
  challengeId: number;
  projectLink?: string;
  additionalNotes?: string;
}

export async function submitChallenge(params: SubmitChallengeParams) {
  return customFetch("/api/junior-challenge/submit", {
    method: "put",
    params: {
      ChallengeId: params.challengeId,
      ProjectLink: params.projectLink,
      AdditionalNotes: params.additionalNotes,
    },
  });
}
