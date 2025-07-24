"use server";

import type { ActionState } from "@server/types";
import z from "zod";

const Schema = z.object({
  email: z.email(),
  password: z.string(),
});

export const signUp = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const dataObject = Object.fromEntries(formData);
  console.log({ dataObject });
  const { data, error } = Schema.safeParse(dataObject);

  if (error) {
    console.error(error);
  }

  const email = data?.email;
  const password = data?.password;

  if (!email) {
    return {
      success: false,
      error: "Invalid Email",
    };
  }

  if (!password) {
    return {
      success: false,
      error: "Invalid Password",
    };
  }

  console.log("Singing in with email and password", { email, password });

  return {
    success: true,
    error: null,
  };
};
