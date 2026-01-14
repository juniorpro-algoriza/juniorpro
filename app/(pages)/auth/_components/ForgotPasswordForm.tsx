"use client";

import { useState } from "react";
import { Button } from "@components";
import { toast } from "sonner";
import { Loader, Mail } from "lucide-react";
import Link from "next/link";
import { resetPassword } from "../server";

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("email", email);

    try {
      const result = await resetPassword(formData);

      if ("error" in result) throw new Error(result.error);

      toast.success("Reset link sent successfully!");
      setIsSent(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-6">
        {isSent ? (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold">Check your inbox</h1>
            <div className="space-y-5 text-center">
              {/* Main confirmation text */}
              <p className="text-gray-500 font-medium leading-relaxed">
                We’ve sent a secure link to reset your password.
              </p>

              {/* Email Highlight */}
              <div className="bg-violet-50 shadow-thick-4 border-[3px] border-black text-blue-main font-semibold px-4 py-2 rounded-lg inline-block text-sm sm:text-base break-all">
                {email}
              </div>

              {/* Supporting message */}
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xs mx-auto">
                Didn’t receive it? Check your{" "}
                <span className="font-medium">spam</span> or{" "}
                <span className="font-medium">junk</span> folder before
                resending.
              </p>

              {/* Resend Button */}
              <div className="w-full flex justify-center mt-3">
                <Button
                  intent="mainBlue"
                  className="py-3 px-6 rounded-xl border-[3px] font-black text-lg w-full"
                  onClick={() => setIsSent(false)}
                >
                  Resend Email
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Forgot your password?
            </h1>
            <p className="text-gray-500 font-medium leading-relaxed">
              Enter your registered email address, and we’ll send you a link to
              reset your password.
            </p>

            <form onSubmit={handleSubmit} className="w-full mt-8 space-y-5">
              {/* Email Input */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-blue-saturated transition-colors">
                  <Mail size={22} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-4 pl-12 pr-4 bg-gray-50 text-black rounded-xl border-[3px] border-black font-bold text-lg placeholder:text-black/30 focus:bg-white focus:outline-none focus:border-blue-saturated focus:shadow-thick-blue-4 transition-all"
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                intent="mainBlue"
                className="w-full py-4 rounded-xl border-[3px] font-black text-lg flex items-center justify-center gap-3 group"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin" size={22} />
                    Sending...
                  </>
                ) : (
                  <>Send Reset Link</>
                )}
              </Button>
            </form>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 flex flex-col items-center gap-4 w-full">
        <p className="text-[#1F3D8B] font-bold text-center text-sm">
          Remember your password?{" "}
          <Link
            href="/auth/login"
            className="text-blue-saturated font-black hover:underline decoration-2 underline-offset-2"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};
