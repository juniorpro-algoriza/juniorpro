import { UserProfile } from "../../../profile/UserProfile";
import { getUserDetails } from "../../../server/getUser";
import { UserTabs } from "../../../tabs";
export default async function JuniorProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const junior = await getUserDetails("junior", Number(params.id));

  return (
    <>
      <UserProfile userType="junior" user={junior} />;
      <UserTabs userId={Number(params.id)} userType="junior" />
    </>
  );
}
