import { LoginLink, Logo, SignUpForm, WelcomeMessage } from "../../components";

const SignUpSlot = () => {
  return (
    <div className="space-y-6 px-6">
      <Logo />
      <WelcomeMessage content="Create an Account" />
      <SignUpForm />
      <LoginLink />
    </div>
  );
};

export default SignUpSlot;
