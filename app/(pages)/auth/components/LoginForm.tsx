"use client";

import { Button, Input } from "@components";
import { initialState } from "@server/lib";
import { Loader } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { signIn } from "../server";

export const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  useEffect(() => {
    const { error } = state;

    if (error) toast.error(error, { id: "login-error" });
    else toast.dismiss("login-error");
  }, [state]);

  return (
    <form action={formAction} className='space-y-2'>
      <Input
        name="email"
        label="Email"
        type="email"
        placeholder="Enter email address"
      />
      <div>
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Enter Password"
        />
        <div className="text-right pt-2">
          <a href="#" className="text-sm text-cadetGray font-medium">
            Forget Password?
          </a>
        </div>
      </div>
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
