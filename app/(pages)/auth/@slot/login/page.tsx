"use client";
import { LoginForm, SignUpLink, SocialLoginButtons } from "../../_components";

const LoginSlot = () => {
  return (
    <div className="space-y-6 w-full">
      <SocialLoginButtons />
      <LoginForm />
      <SignUpLink />
    </div>
  );
};

export default LoginSlot;
