"use client";

import { Suspense, useActionState, useEffect, useState } from "react";
import { Button, Input } from "@components";
import { initialState } from "@server/lib";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { signIn } from "../server";
import { EyeCloseIcon, EyeIcon } from "@icons";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
    <form action={formAction} className="space-y-2">
      <Input
        name="email"
        label="Email"
        type="email"
        placeholder="Enter email address"
      />

      <div>
        <div className="relative">
          <Input
            name="password"
            label="Password"
            type={type}
            placeholder="Enter Password"
          />
          <div
            className="absolute right-5 top-1/2 cursor-pointer"
            onClick={() => setType(type === "password" ? "text" : "password")}
          >
            {type === "password" ? <EyeIcon /> : <EyeCloseIcon />}
          </div>
        </div>
        <div className="text-right pt-2">
          <Link
            href="/auth/forget-password"
            className="text-sm text-violet-normal font-medium hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      {/* Preserve redirect & join params */}
      {redirectParam && (
        <input type="hidden" name="redirect" value={redirectParam} />
      )}
      {joinParam && <input type="hidden" name="join" value={joinParam} />}

      <Button
        icon={isPending ? <Loader className="animate-spin" /> : null}
        disabled={isPending}
        type="submit"
        intent="primary"
        className="w-full rounded-xl bg-violet-normal"
        size="large"
      >
        Login
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
