import {
  DashboardCards,
  DashboardHeader,
  DashboardProjects,
  DashboardTasks,
} from './components';

const DashboardPage = () => {
  return (
    <div className='min-h-screen py-3 px-6 space-y-5 bg-stone-50'>
      <DashboardHeader />
      <DashboardCards />
      <DashboardProjects />
      <DashboardTasks />
    </div>
  );
};

export default DashboardPage;
