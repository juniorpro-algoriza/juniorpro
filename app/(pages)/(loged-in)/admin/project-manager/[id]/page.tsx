import {UserProfile} from '../../../profile/UserProfile';
import {getUserDetails} from '../../../server/getUser';
import {UserTabs} from '../../../tabs';
export default async function ProjectManagerProfilePage({
  params,
}: {
  params: Promise<{id: string}>;
}) {
  const {id} = await params;
  const manager = await getUserDetails('project-manager', Number(id));

  return (
    <>
      <UserProfile userType="project-manager" user={manager} />;
      <UserTabs userId={Number(id)} userType="project-manager" />
    </>
  );
}
