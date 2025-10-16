"use client";

import { useState } from "react";
import { Input, Button } from "@components";
import { toast } from "sonner";
import { Loader, MailCheck } from "lucide-react";
import Link from "next/link";
import { forgetPassword } from "../server";
import { Logo } from "./Logo";

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
      const result = await forgetPassword(formData);

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
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-b from-white to-purple-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-6">
          <Logo />

          {isSent ? (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-50 text-violet-normal">
                <MailCheck className="w-10 h-10" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Check your inbox
              </h1>
              <div className="space-y-5 text-center">
                {/* Main confirmation text */}
                <p className="text-gray-800 text-base sm:text-lg font-medium leading-relaxed">
                  We’ve sent a secure link to reset your password.
                </p>

                {/* Email Highlight */}
                <div className="bg-violet-50 text-violet-normal font-semibold px-4 py-2 rounded-lg inline-block text-sm sm:text-base break-all">
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
                    intent="tertiary"
                    className="text-violet-normal hover:bg-violet-50 transition-all rounded-xl"
                    onClick={() => setIsSent(false)}
                  >
                    Resend Email
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Forgot your password?
              </h1>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xs">
                Enter your registered email address, and we’ll send you a link
                to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="w-full mt-8 space-y-6">
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button
                  type="submit"
                  intent="primary"
                  size="large"
                  className="w-full rounded-xl bg-violet-normal hover:bg-violet-600 transition-all"
                  disabled={isSubmitting}
                  icon={
                    isSubmitting ? <Loader className="animate-spin" /> : null
                  }
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-8 mt-10 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="text-violet-normal font-medium hover:underline"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
