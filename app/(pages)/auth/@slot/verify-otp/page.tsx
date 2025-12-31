"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@components";
import { verifyOtp } from "../../server/verifyOtp";
import { resendOtp } from "../../server/resendOtp";
import { initialState } from "@server/lib";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, Key } from "lucide-react";

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
    <div className="space-y-5 w-full">
      {/* Form verify */}
      <form action={verifyAction} className="space-y-10">
        {/* OTP Input */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-blue-saturated transition-colors">
            <Key size={22} />
          </div>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            className="w-full py-4 pl-12 pr-4 bg-gray-50 text-black rounded-xl border-[3px] border-black font-bold text-lg placeholder:text-black/30 focus:bg-white focus:outline-none focus:border-blue-saturated focus:shadow-thick-blue-4 transition-all"
            disabled={isVerifying}
          />
        </div>

        <Button
          type="submit"
          disabled={isVerifying}
          intent="mainBlue"
          className="w-full py-4 rounded-xl border-[3px] font-black text-lg flex items-center justify-center gap-3 group"
        >
          {isVerifying ? (
            <>
              <Loader2 className="animate-spin" size={22} />
              Verifying...
            </>
          ) : (
            <>
              Verify OTP
              <ArrowRight
                size={22}
                className="group-hover:translate-x-1 transition-transform"
              />
            </>
          )}
        </Button>
      </form>

      {/* Form resend */}
      <form action={resendAction} className="space-y-5 -mt-2.5">
        <Button
          type="submit"
          disabled={isResending}
          intent="mainWhite"
          className="w-full py-4 rounded-xl border-[3px] font-black text-lg flex items-center justify-center gap-3 group"
        >
          {isResending ? (
            <>
              <Loader2 className="animate-spin" size={22} />
              Resending...
            </>
          ) : (
            <>Resend OTP</>
          )}
        </Button>
      </form>
    </div>
  );
}
