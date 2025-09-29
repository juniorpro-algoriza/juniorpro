import {ServerTableWrapper} from '../../tables';
import {ContributorStatContainer, ContributorHeader} from './components';

const AdminContributorPage = async ({
  searchParams,
}: {
  searchParams: Promise<{page?: string}>;
}) => {
  const {page} = await searchParams;
  const pageNumber = Number(page) || 1;

  return (
    <div className="min-h-screen py-3 px-6 bg-stone-50 space-y-6">
      <ContributorHeader />
      <ContributorStatContainer />
      <ServerTableWrapper
        title="Contributors"
        type="contributor"
        pageNumber={pageNumber}
      />
    </div>
  );
};
export default AdminContributorPage;
