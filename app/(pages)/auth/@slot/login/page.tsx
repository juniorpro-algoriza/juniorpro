import {
  LoginForm,
  Logo,
  RegisterLink,
  SocialLoginButtons,
  WelcomeMessage,
} from "../../components";

const LoginSlot = () => {
  return (
    <div className="space-y-6">
      <Logo />
      <WelcomeMessage />
      <SocialLoginButtons />
      <LoginForm />
      <RegisterLink />
    </div>
  );
};

export default LoginSlot;
