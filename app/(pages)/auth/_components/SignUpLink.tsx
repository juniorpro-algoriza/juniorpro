import React from "react";
import Link from "next/link";

export const SignUpLink = () => {
  return (
    <div className="mt-8 flex flex-col items-center gap-4 w-full">
      <p className="text-[#1F3D8B] font-bold text-center text-sm">
        Don't have an account?{" "}
        <Link
          href="/auth/sign-up"
          className="text-blue-saturated font-black hover:underline decoration-2 underline-offset-2"
        >
          Sign up.
        </Link>
      </p>
    </div>
  );
};
