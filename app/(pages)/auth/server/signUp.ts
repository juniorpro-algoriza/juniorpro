"use server";

import type { ActionState } from "@server/types";
import z from "zod";

const Schema = z.object({
  email: z.email(),
  password: z.string().min(6),
  passwordConfirm: z.string().min(6),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
});

export const signUp = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const dataObject = Object.fromEntries(formData);
  const { data, error } = Schema.safeParse(dataObject);

  if (error) {
    console.error(error);
  }

  const firstName = data?.firstName;
  const lastName = data?.lastName;
  const email = data?.email;
  const password = data?.password;
  const passwordConfirm = data?.passwordConfirm;

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

  if (!password) {
    return {
      success: false,
      error: "Password confirmation is required",
    };
  }

  if (password !== passwordConfirm) {
    return {
      success: false,
      error: "Passwords dont' match",
    };
  }

  if (!firstName) {
    return {
      success: false,
      error: "Invalid first name",
    };
  }

  if (!lastName) {
    return {
      success: false,
      error: "Invalid last name",
    };
  }

  console.log("Singing up:", {
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  });

  return {
    success: true,
    error: null,
  };
};
