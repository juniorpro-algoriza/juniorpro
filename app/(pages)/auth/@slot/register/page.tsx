import {
  LoginLink,
  Logo,
  RegisterForm,
  RegisterTab,
  SocialLoginButtons,
  WelcomeMessage,
} from '../../components';

const RegiserSlot = () => {
  return (
    <div className='space-y-6 px-6'>
      <Logo />
      <WelcomeMessage content='Create an Account' />
      <RegisterTab />
      <SocialLoginButtons />
      <RegisterForm />
      <LoginLink />
    </div>
  );
};

export default RegiserSlot;
