/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, useEffect } from "react";
import { Input, Button } from "@components";
import { toast } from "sonner";
import { Link, Loader } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyResetPassword } from "../server/verifyResetPassword";
import { Logo } from "./Logo";

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
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-6">
          <Logo />
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Reset your password
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xs">
            Set a new password for your account associated with:
          </p>
          <div className="bg-violet-50 text-violet-normal font-semibold px-4 py-2 rounded-lg inline-block text-sm sm:text-base break-all">
            {email}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full mt-6 space-y-6 text-left"
          >
            <Input
              label="New Password"
              type="password"
              name="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              type="submit"
              intent="primary"
              size="large"
              className="w-full rounded-xl bg-violet-normal hover:bg-violet-600 transition-all"
              disabled={isSubmitting}
              icon={isSubmitting ? <Loader className="animate-spin" /> : null}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
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
