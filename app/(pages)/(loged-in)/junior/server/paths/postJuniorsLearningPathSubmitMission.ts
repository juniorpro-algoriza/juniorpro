"use server";

import { customFetch } from "@server/lib";

export async function postJuniorsLearningPathSubmitMission({ 
  id, 
  submissionLink,
  submissionNotes
}: { 
  id: number;
  submissionLink: string;
  submissionNotes?: string | null;
}) {
  const result = await customFetch("/junior-learning-path/submit-mission", {
    method: "post",
    data: {
      id,
      submissionLink,
      submissionNotes,
    },
  });
  return result;
}
