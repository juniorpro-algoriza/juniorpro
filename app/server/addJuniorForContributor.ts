"use server";

import { getData } from "@server";

export const addContributorJunior = async (payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
}) => {
  return await getData({
    url: "Contributor/add-junior",
    method: "POST",
    body: payload,
  });
};

export const inviteContributorJunior = async (email: string) => {
  return await getData({
    url: `Contributor/invite-junior?email=${encodeURIComponent(email)}`,
    method: "POST",
  });
};
