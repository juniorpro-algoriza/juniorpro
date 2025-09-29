/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginLink, Logo, SignUpForm, WelcomeMessage } from "../../components";

const SignUpSlot = ({ searchParams }: { searchParams: any }) => {
  const invited = searchParams.invited === "true";

  return (
    <div className="space-y-6 px-6">
      <Logo />
      <WelcomeMessage content="Create an Account" />
      <SignUpForm invited={invited} />
      <LoginLink />
    </div>
  );
};

export default SignUpSlot;
