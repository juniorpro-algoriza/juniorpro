import { Button, Input } from "@components";
import { Loader } from "lucide-react";
import type { FC } from "react";

export const inputNames = {
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  password: "password",
  passwordConfirm: "passwordConfirm",
};

export const SignUpInputs: FC<{ isPending: boolean }> = ({ isPending }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          name={inputNames.firstName}
          label="First Name"
          type="text"
          placeholder="Enter first name"
        />
        <Input
          name={inputNames.lastName}
          label="Last Name"
          type="text"
          placeholder="Enter last name"
        />
      </div>
      <Input
        name={inputNames.email}
        label="Email"
        type="text"
        placeholder="Enter email address"
      />
      <Input
        name={inputNames.password}
        label="Password"
        type="password"
        placeholder="Enter Password"
      />
      <Input
        name={inputNames.passwordConfirm}
        label="Confirm Password"
        type="password"
        placeholder="Enter Password"
      />
      <Button
        icon={isPending ? <Loader className="animate-spin" /> : null}
        disabled={isPending}
        type="submit"
        intent="primary"
        className="w-full rounded-xl bg-violet-normal"
        size="large"
      >
        Sign Up
      </Button>
    </>
  );
};
