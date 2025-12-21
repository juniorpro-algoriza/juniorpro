"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "../server/signUp";
import { SignUpInputs } from "./SignUpInputs";
import { SignUpRadio } from "./SignUpRadio";

export const SignUpForm = ({
  invited = false,
  invitationId,
}: {
  invited?: boolean;
  invitationId?: string;
}) => {
  const [signInAs, setSignInAs] = useState<"junior" | "contributor">(
    invited ? "junior" : "contributor"
  );

  const [state, formAction, isPending] = useActionState(signUp, {
    success: false,
    error: null,
  });

  const router = useRouter();

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success("Signed up, please verify OTP");
      router.push("/auth/verify-otp");
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-3">
      {/* Radio */}
      <SignUpRadio
        value={signInAs}
        onChange={setSignInAs}
        invitationId={invitationId}
      />
      <input type="hidden" name="signInAs" value={signInAs} />

      {/* Hidden invitationId */}
      {invitationId && (
        <input type="hidden" name="invitationId" value={invitationId} />
      )}

      {/* Inputs */}
      <SignUpInputs
        isPending={isPending}
        signInAs={signInAs}
        invitationId={invitationId}
      />
    </form>
  );
};
