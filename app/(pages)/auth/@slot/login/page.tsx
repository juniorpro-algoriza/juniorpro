import {
  LoginForm,
  Logo,
  RegisterLink,
  SocialLoginButtons,
  WelcomeMessage,
} from "../../components";

const LoginSlot = () => {
  return (
    <div className="space-y-6 px-2">
      <Logo />
      <WelcomeMessage />
      <SocialLoginButtons />
      <LoginForm />
      <RegisterLink />
    </div>
  );
};

export default LoginSlot;
