"use client";

import { initialState } from "@server/lib";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { signUp } from "../server";
import { SignUpInputs } from "./SignUpInputs";
import { SignUpRadio } from "./SignUpRadio";
import { SocialLoginButtons } from "./SocialLoginButtons";

export const SignUpForm = () => {
  const [state, formAction, isPending] = useActionState(signUp, initialState);

  useEffect(() => {
    const { error, success } = state;

    if (error) toast.error(error, { id: "register-error" });
    else toast.dismiss("register-error");

    if (success) toast.success("Signed up");
  }, [state]);

  return (
    <form action={formAction} className='space-y-3'>
      <SignUpRadio />
      <SocialLoginButtons />
      <SignUpInputs isPending={isPending} />
    </form>
  );
};
