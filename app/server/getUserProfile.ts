"use server";

import { customFetch } from "@server/lib";

export async function getUserProfile() {
  const userProfile = customFetch("/User/profile", {
    method: "get",
  });
  return userProfile;
}
