import { UserProfile } from "../../../profile/UserProfile";
import { getUserDetails } from "../../../server/getUser";

export const Profile = async ({ params }: { params: { id: string } }) => {
  const manager = await getUserDetails("projectManager", Number(params.id));

  return <UserProfile userType="projectManager" user={manager} />;
};
