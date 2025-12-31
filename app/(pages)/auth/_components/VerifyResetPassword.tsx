"use client";

import { useState, useEffect } from "react";
import { Button } from "@components";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { verifyResetPassword } from "../server/verifyResetPassword";

export const VerifyResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // xtract email + token from URL
  const emailParam = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const [email] = useState(emailParam);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await verifyResetPassword({
        email,
        password,
        confirmPassword,
        token,
      });

      if (result?.success) {
        toast.success("Password reset successfully!");
        setTimeout(() => router.push("/auth/login"), 1500);
      } else {
        toast.error(result?.message || "Reset failed.");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!emailParam || !token) {
      toast.error("Invalid or missing reset link.");
      router.push("/auth/reset-password");
    }
  }, [emailParam, token, router]);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Reset your password</h1>
        <p className="text-gray-500 font-medium leading-relaxed">
          Set a new password for your account associated with:
        </p>

        {/* Email Highlight */}
        <div className="bg-violet-50 shadow-thick-4 border-[3px] border-black text-blue-main font-semibold px-4 py-2 rounded-lg inline-block text-sm sm:text-base break-all">
          {email}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full mt-8 space-y-5">
          {/* Password Input */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-blue-saturated transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-4 pl-12 pr-4 bg-gray-50 text-black rounded-xl border-[3px] border-black font-bold text-lg placeholder:text-black/30 focus:bg-white focus:outline-none focus:border-blue-saturated focus:shadow-thick-blue-4 transition-all"
              disabled={isSubmitting}
            />
          </div>

          {/* Confirm Password Input */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-blue-saturated transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                Resetting...
              </>
            ) : (
              <>Reset Password</>
            )}
          </Button>
        </form>
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
