import { LoginLink, Logo, SignUpForm, WelcomeMessage } from "../../components";

const SignUpSlot = async ({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string>>;
}) => {
  const params = await searchParams;
  const invited = params?.invited === "true";
  const invitationId = params?.invitationId;

  return (
    <div className="space-y-6 px-6">
      <Logo />
      <WelcomeMessage content="Create an Account" />

      <SignUpForm invited={invited} invitationId={invitationId} />

      <LoginLink />
    </div>
  );
};

export default SignUpSlot;
