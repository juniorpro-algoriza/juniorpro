import {UserProfile} from '../../../profile/UserProfile';
import {getUserDetails} from '../../../server/getUser';
import {UserTabs} from '../../../tabs';

export default async function ContributorProfilePage({
  params,
}: {
  params: Promise<{id: string}>;
}) {
  const {id} = await params;
  const contributor = await getUserDetails('contributor', Number(id));

  return (
    <>
      <UserProfile userType="contributor" user={contributor} />;
      <UserTabs userId={Number(id)} userType="contributor" />
    </>
  );
}
