import {UserProfile} from '../../../profile/UserProfile';
import {getUserDetails} from '../../../server/getUser';

export const Profile = async ({params}: {params: {id: string}}) => {
  const manager = await getUserDetails('project-manager', Number(params.id));

  return <UserProfile userType="project-manager" user={manager} />;
};
