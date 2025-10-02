import { LoginLink, Logo, SignUpForm, WelcomeMessage } from "../../components";

const SignUpSlot = ({
  searchParams,
}: {
  searchParams: { invited?: string; invitationId?: string };
}) => {
  const invited = searchParams.invited === "true";
  const invitationId = searchParams.invitationId;

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
