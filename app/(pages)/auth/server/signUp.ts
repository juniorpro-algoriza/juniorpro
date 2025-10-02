"use server";

import type { ActionState } from "@server/types";
import z from "zod";
import { cookies } from "next/headers";

// Base schema
const BaseSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  passwordConfirm: z.string().min(6),
  signInAs: z.enum(["contributor", "junior"]),
  invitationId: z.string().optional(),
});

const JuniorSchema = BaseSchema.extend({
  contributorEmail: z.string().email().or(z.literal("")).optional(),
});

type payloadType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  invitationId?: string | null;
  contributorEmail?: string;
};

export const signUp = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const rawData: Record<string, string> = {};
  formData.forEach((value, key) => {
    rawData[key] = value.toString();
  });

  const invitationId = rawData.invitationId;
  const isJunior = rawData.signInAs === "junior";

  const parsed = (isJunior ? JuniorSchema : BaseSchema).safeParse(rawData);
  if (!parsed.success) return { success: false, error: "Invalid inputs" };

  const { firstName, lastName, email, password, passwordConfirm, signInAs } =
    parsed.data;

  let contributorEmail: string | undefined;
  if (isJunior) {
    contributorEmail =
      (parsed.data as z.infer<typeof JuniorSchema>).contributorEmail ||
      undefined;
  }

  const url =
    signInAs === "contributor" ? "contributor/sign-up" : "junior/sign-up";

  try {
    const payload: payloadType = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword: passwordConfirm,
      invitationId: signInAs === "junior" && invitationId ? invitationId : null,
    };

    if (contributorEmail) payload.contributorEmail = contributorEmail;

    const res = await fetch(
      `https://juniorpro-001-site1.ntempurl.com/api/${url}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) return { success: false, error: "Failed to sign up" };

    const cookieStore = await cookies();
    cookieStore.set("signup_email", email, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    if (contributorEmail)
      cookieStore.set("contributor_email", contributorEmail, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      });

    return { success: true, error: null };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Unexpected error" };
  }
};
