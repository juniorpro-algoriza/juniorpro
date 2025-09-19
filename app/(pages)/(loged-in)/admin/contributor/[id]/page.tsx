import { UserProfile } from "../../../profile/UserProfile";
import { getUserDetails } from "../../../server/getUser";
import { UserTabs } from "../../../tabs";
export default async function ContributorProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const contributor = await getUserDetails("contributor", Number(params.id));

  return (
    <>
      <UserProfile userType="contributor" user={contributor} />;
      <UserTabs userId={Number(params.id)} userType="contributor" />
    </>
  );
}
