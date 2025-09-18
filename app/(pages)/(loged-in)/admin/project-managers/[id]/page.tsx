import {UserProfile} from '../../../profile/UserProfile';
import {getUserDetails} from '../../../server/getUser';

export default async function ProjectManagerProfilePage({
  params,
}: {
  params: {id: string};
}) {
  const manager = await getUserDetails('project-manager', Number(params.id));

  return <UserProfile userType="project-manager" user={manager} />;
}
