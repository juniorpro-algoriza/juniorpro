"use server";

import { customFetch } from "@server/lib";

export async function postInviteJunior(email: string) {
  const response = await customFetch("/api/Enabler/invite-junior", {
    method: "post",
    params: { email },
  });
  return response;
}
