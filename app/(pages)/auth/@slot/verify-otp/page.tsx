"use client";

import { useActionState, useEffect } from "react";
import { Input, Button } from "@components";
import { verifyOtp } from "../../server/verifyOtp";
import { resendOtp } from "../../server/resendOtp"; // 👈 استدعاء resendOtp
import { initialState } from "@server/lib";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function VerifyOtpPage() {
  //Verify OTP
  const [verifyState, verifyAction, isVerifying] = useActionState(
    verifyOtp,
    initialState
  );

  //Resend OTP
  const [resendState, resendAction, isResending] = useActionState(
    resendOtp,
    initialState
  );

  const router = useRouter();

  //Handle verify result
  useEffect(() => {
    if (verifyState.success) {
      toast.success("OTP Verified!");
      router.push("/auth/login");
    }
    if (verifyState.error) {
      toast.error(verifyState.error);
    }
  }, [verifyState, router]);

  //Handle resend result
  useEffect(() => {
    if (resendState.success) {
      toast.success("OTP resent to your email!");
    }
    if (resendState.error) {
      toast.error(resendState.error);
    }
  }, [resendState]);

  return (
    <div className="space-y-4">
      {/* Form verify */}
      <form action={verifyAction} className="space-y-3">
        <Input
          name="otp"
          label="OTP Code"
          type="text"
          placeholder="Enter OTP"
        />
        <Button
          type="submit"
          disabled={isVerifying}
          className="w-full bg-violet-normal"
        >
          {isVerifying ? "Verifying..." : "Verify OTP"}
        </Button>
      </form>

      {/* Form resend */}
      <form action={resendAction}>
        <Button
          type="submit"
          disabled={isResending}
          className="w-full bg-gray-200 text-black hover:bg-gray-300"
        >
          {isResending ? "Resending..." : "Resend OTP"}
        </Button>
      </form>
    </div>
  );
}
