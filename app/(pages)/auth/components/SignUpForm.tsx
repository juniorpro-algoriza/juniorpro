"use client";

import { useActionState, useEffect } from "react";
import { initialState } from "@server/lib";
import { SignUpInputs } from "./SignUpInputs";
import { toast } from "sonner";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { SignUpRadio } from "./SignUpRadio";
import { signUp } from "../server";

export const SignUpForm = () => {
  const [state, formAction, isPending] = useActionState(signUp, initialState);

  useEffect(() => {
    const { error, success } = state;

    if (error) toast.error(error, { id: "register-error" });
    else toast.dismiss("register-error");

    if (success) toast.success("Signed up");
  }, [state]);

  return (
    <form action={formAction}>
      <SignUpRadio />
      <SocialLoginButtons />
      <SignUpInputs isPending={isPending} />
    </form>
  );
};
