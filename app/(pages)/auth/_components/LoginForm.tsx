"use client";

import React, { useEffect, useState, Suspense } from "react";
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { useActionState } from "react";
import { toast } from "sonner";
import { initialState } from "@server/lib";
import { signIn } from "../server";
import { Button } from "@components";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const LoginFormContent = () => {
  const [state, formAction, isPending] = useActionState(signIn, initialState);
  const [type, setType] = useState("password");
  const searchParams = useSearchParams();

  const redirectParam = searchParams.get("redirect");
  const joinParam = searchParams.get("join");

  useEffect(() => {
    const { error } = state;

    if (error) toast.error(error, { id: "login-error" });
    else toast.dismiss("login-error");
  }, [state]);

  return (
    <form action={formAction} className="space-y-5">
      {/* Email Input */}
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-blue-saturated transition-colors">
          <Mail size={22} />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full py-4 pl-12 pr-4 bg-gray-50 text-black rounded-xl border-[3px] border-black font-bold text-lg placeholder:text-black/30 focus:bg-white focus:outline-none focus:border-blue-saturated focus:shadow-thick-blue-4 transition-all"
          disabled={isPending}
        />
      </div>

      {/* Password Input */}
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-blue-saturated transition-colors">
          <Lock size={22} />
        </div>
        <input
          type={type}
          name="password"
          placeholder="Password"
          className="w-full py-4 pl-12 pr-4 bg-gray-50 text-black rounded-xl border-[3px] border-black font-bold text-lg placeholder:text-black/30 focus:bg-white focus:outline-none focus:border-blue-saturated focus:shadow-thick-blue-4 transition-all"
          disabled={isPending}
        />
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-black/40 hover:text-blue-saturated transition-colors"
          onClick={() => setType(type === "password" ? "text" : "password")}
        >
          {type === "password" ? <Eye size={20} /> : <EyeOff size={20} />}
        </div>
      </div>

      {/* Forgot Password Link */}
      <div className="text-right">
        <Link
          href="/auth/reset-password"
          className="text-sm text-blue-saturated font-medium hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Preserve redirect & join params */}
      {redirectParam && (
        <input type="hidden" name="redirect" value={redirectParam} />
      )}
      {joinParam && <input type="hidden" name="join" value={joinParam} />}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isPending}
        intent="mainBlue"
        className="w-full py-4 rounded-xl border-[3px] font-black text-lg flex items-center justify-center gap-3 group"
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin" size={22} />
            Signing In...
          </>
        ) : (
          <>
            Sign In
            <ArrowRight
              size={22}
              className="group-hover:translate-x-1 transition-transform"
            />
          </>
        )}
      </Button>
    </form>
  );
};

export const LoginForm = () => {
  return (
    <Suspense
      fallback={
        <div className="text-center text-sm text-gray-400">Loading...</div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
};
