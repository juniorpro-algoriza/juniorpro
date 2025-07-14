import {
  HeroSection,
  LoginForm,
  Logo,
  RegisterLink,
  SocialLoginButtons,
  WelcomeMessage,
} from "../../components";

const LoginSlot = () => {
  return (
    <div className="bg-gray-50 flex">
      {/* Left Side */}
      <div className="w-1/2 flex-col flex">
        <Logo />
        <WelcomeMessage />
        <SocialLoginButtons />
        <LoginForm />
        <RegisterLink />
      </div>

      {/* Right Side */}
      <HeroSection />
    </div>
  );
};

export default LoginSlot;
