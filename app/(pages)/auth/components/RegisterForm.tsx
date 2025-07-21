import { Button, Input } from "@components";

export const RegisterForm = () => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Input label="First Name" type="text" placeholder="Enter first name" />
      <Input label="Last Name" type="text" placeholder="Enter last name" />
    </div>
    <Input label="Email" type="email" placeholder="Enter email address" />
    <Input label="Password" type="password" placeholder="Enter Password" />
    <Input
      label="Confirm Password"
      type="password"
      placeholder="Enter Password"
    />
    <Button intent="primary" className="w-full rounded-xl" size="large">
      Login
    </Button>
  </>
);
