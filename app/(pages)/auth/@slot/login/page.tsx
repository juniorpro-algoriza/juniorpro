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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Logo />
          <WelcomeMessage />
          <SocialLoginButtons />
          <LoginForm />
          <RegisterLink />
        </div>
      </div>

      {/* Right Side */}
      <HeroSection />
    </div>
  );
};

export default LoginSlot;
