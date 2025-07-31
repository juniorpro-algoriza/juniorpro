import {
    PointsAllocationSection,
    PointsHeader,
    PurchasePoints,
} from './components';

const PointsPage = () => {
  return (
    <div className='space-y-4 px-6 py-3 bg-stone-50'>
      <PointsHeader />
      <PointsAllocationSection />
      <PurchasePoints />
    </div>
  );
};
export default PointsPage;
