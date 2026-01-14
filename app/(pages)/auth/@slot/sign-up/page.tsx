import { LoginLink, SignUpForm } from "../../_components";

const SignUpSlot = async ({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string>>;
}) => {
  const params = await searchParams;
  const invited = params?.invited === "true";
  const invitationId = params?.invitationId;

  return (
    <div className="space-y-6 w-full">
      <SignUpForm invited={invited} invitationId={invitationId} />

      <LoginLink />
    </div>
  );
};

export default SignUpSlot;
