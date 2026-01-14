"use client";

import { Button } from "@components";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";
import type { FC, ComponentType } from "react";
import { LucideProps } from "lucide-react";

export const inputNames = {
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  password: "password",
  passwordConfirm: "passwordConfirm",
  contributorEmail: "contributorEmail", // optional for contributors
};

interface SignUpInputsProps {
  isPending?: boolean;
  signInAs?: "junior" | "contributor";
  invitationId?: string;
}

const CustomInput = ({
  name,
  placeholder,
  type = "text",
  icon: Icon,
  showPasswordToggle = false,
  disabled = false,
}: {
  name: string;
  placeholder: string;
  type?: string;
  icon: ComponentType<LucideProps>;
  showPasswordToggle?: boolean;
  disabled?: boolean;
}) => {
  const [inputType, setInputType] = useState(type);

  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-blue-saturated transition-colors">
        <Icon size={22} />
      </div>
      <input
        type={showPasswordToggle ? inputType : type}
        name={name}
        placeholder={placeholder}
        className="w-full py-4 pl-12 pr-4 bg-gray-50 text-black rounded-xl border-[3px] border-black font-bold text-lg placeholder:text-black/30 focus:bg-white focus:outline-none focus:border-blue-saturated focus:shadow-thick-blue-4 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={disabled}
      />
      {showPasswordToggle && (
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-black/40 hover:text-blue-saturated transition-colors"
          onClick={() =>
            setInputType(inputType === "password" ? "text" : "password")
          }
        >
          {inputType === "password" ? <Eye size={20} /> : <EyeOff size={20} />}
        </div>
      )}
    </div>
  );
};

export const SignUpInputs: FC<SignUpInputsProps> = ({
  isPending,
  signInAs,
  invitationId,
}) => {
  return (
    <>
      <CustomInput
        name={inputNames.firstName}
        placeholder="First Name"
        icon={User}
        disabled={isPending}
      />
      <CustomInput
        name={inputNames.lastName}
        placeholder="Last Name"
        icon={User}
        disabled={isPending}
      />
      <CustomInput
        name={inputNames.email}
        placeholder="Email Address"
        type="email"
        icon={Mail}
        disabled={isPending}
      />
      <CustomInput
        name={inputNames.password}
        placeholder="Password"
        type="password"
        icon={Lock}
        showPasswordToggle={true}
        disabled={isPending}
      />
      <CustomInput
        name={inputNames.passwordConfirm}
        placeholder="Confirm Password"
        type="password"
        icon={Lock}
        showPasswordToggle={true}
        disabled={isPending}
      />

      {/* Conditional input for juniors */}
      {(signInAs === "junior" || invitationId) && (
        <CustomInput
          name={inputNames.contributorEmail}
          placeholder="Contributor Email (optional)"
          type="email"
          icon={Mail}
          disabled={isPending}
        />
      )}

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
            Signing Up...
          </>
        ) : (
          <>
            Sign Up
            <ArrowRight
              size={22}
              className="group-hover:translate-x-1 transition-transform"
            />
          </>
        )}
      </Button>
    </>
  );
};
