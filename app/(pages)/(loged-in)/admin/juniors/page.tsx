import { getJuniorsData } from '@server';
import { JuniorHeader, JuniorStats, JuniorsTable } from './components';

const AdminJuniors = async () => {
  const juniorsData = await getJuniorsData();
  return (
    <div className='min-h-screen py-3 px-6 bg-stone-50 space-y-6'>
      <JuniorHeader />
      <JuniorStats />
      <JuniorsTable juniorsData={juniorsData} />
    </div>
  );
};

export default AdminJuniors;
