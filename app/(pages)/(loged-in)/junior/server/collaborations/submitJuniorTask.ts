"use server";

import { customFetch } from "../../../../../server/lib";

interface SubmitJuniorTaskParams {
  id: number;
  projectLink?: string;
  additionalNotes?: string;
}

export async function submitJuniorTask(params: SubmitJuniorTaskParams) {
  return customFetch("/api/junior-collaboration/submit-task", {
    method: "put",
    params: {
      Id: params.id,
      ProjectLink: params.projectLink,
      AdditionalNotes: params.additionalNotes,
    },
  });
}
