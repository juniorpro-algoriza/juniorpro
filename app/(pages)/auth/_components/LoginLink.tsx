import React from "react";
import Link from "next/link";

export const LoginLink = () => {
  return (
    <div className="mt-8 flex flex-col items-center gap-4 w-full">
      <p className="text-[#1F3D8B] font-bold text-center text-sm">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-blue-saturated font-black hover:underline decoration-2 underline-offset-2"
        >
          Login.
        </Link>
      </p>
    </div>
  );
};
