import { UserProfile } from "../../../profile/UserProfile";
import { getUserDetails } from "../../../server/getUser";
import { UserTabs } from "../../../tabs";
export default async function ProjectManagerProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const manager = await getUserDetails("project-manager", Number(params.id));

  return (
    <>
      <UserProfile userType="project-manager" user={manager} />;
      <UserTabs userId={Number(params.id)} userType="project-manager" />
    </>
  );
}
