import {
  LoginForm,
  Logo,
  SignUpLink,
  SocialLoginButtons,
  WelcomeMessage,
} from "../../_components";

const LoginSlot = () => {
  return (
    <div className="space-y-6">
      <Logo />
      <WelcomeMessage content="Hello! Welcome back" />
      <SocialLoginButtons />
      <LoginForm />
      <SignUpLink />
    </div>
  );
};

export default LoginSlot;
