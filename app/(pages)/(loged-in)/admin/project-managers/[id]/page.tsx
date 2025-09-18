import { UserProfile } from "../../../profile/UserProfile";
import { getUserDetails } from "../../../server/getUser";

export default async function ProjectManagerProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const manager = await getUserDetails("projectManager", Number(params.id));

  return <UserProfile userType="projectManager" user={manager} />;
}
