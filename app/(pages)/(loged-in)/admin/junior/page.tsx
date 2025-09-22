import {ServerTableWrapper} from '../../tables';
import {JuniorHeader, JuniorStatsContainer} from './components';

const AdminJuniorsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{page?: string}>;
}) => {
  const {page} = await searchParams;
  const pageNumber = Number(page) || 1;

  return (
    <div className="min-h-screen py-3 px-6 bg-stone-50 space-y-6">
      <JuniorHeader />
      <JuniorStatsContainer />
      <ServerTableWrapper
        title="Juniors"
        type="junior"
        pageNumber={pageNumber}
      />
    </div>
  );
};

export default AdminJuniorsPage;
