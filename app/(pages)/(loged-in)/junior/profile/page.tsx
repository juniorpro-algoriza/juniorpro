import { ProfileCard, ProfileHeader } from './components';

const JuniorProfilePage = () => {
  return (
    <div className='min-h-screen py-3 px-6 space-y-5 bg-stone-50'>
      <ProfileHeader />
      <ProfileCard />
    </div>
  );
};

export default JuniorProfilePage;
