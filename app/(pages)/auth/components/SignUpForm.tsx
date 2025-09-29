"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "../server/signUp";
import { SignUpInputs } from "./SignUpInputs";
import { SignUpRadio } from "./SignUpRadio";
import { useFormStatus } from "react-dom";

export const SignUpSubmitWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  console.log("SignUpSubmitWrapper", children);
  const { pending } = useFormStatus();
  return <SignUpInputs isPending={pending} />;
};
export const SignUpForm = ({ invited = false }: { invited?: boolean }) => {
  const [signInAs, setSignInAs] = useState<"junior" | "contributor">(
    invited ? "junior" : "contributor" // default depends on invited
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
      <SignUpRadio value={signInAs} onChange={setSignInAs} invited={invited} />
      <input type="hidden" name="signInAs" value={signInAs} />

      {/* Inputs */}
      <SignUpInputs isPending={isPending} signInAs={signInAs} />
    </form>
  );
};
