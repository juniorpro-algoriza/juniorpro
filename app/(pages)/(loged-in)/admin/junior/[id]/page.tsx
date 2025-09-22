import {UserProfile} from '../../../profile/UserProfile';
import {getUserDetails} from '../../../server/getUser';
import {UserTabs} from '../../../tabs';
export default async function JuniorProfilePage({
  params,
}: {
  params: Promise<{id: string}>;
}) {
  const {id} = await params;
  const junior = await getUserDetails('junior', Number(id));

  return (
    <>
      <UserProfile userType="junior" user={junior} />;
      <UserTabs userId={Number(id)} userType="junior" />
    </>
  );
}
