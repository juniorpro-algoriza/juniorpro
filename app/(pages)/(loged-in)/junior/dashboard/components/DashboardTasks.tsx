import { MoneyIcon, StarIcon } from '@icons';
import { getJoinedProjects } from '@server';
import { ProjectsCarousel } from './ProjectCarousel';

export const DashboardTasks = async () => {
  // Free solo projects (projectType = 3)
  const { data: freeSoloProjects } = await getJoinedProjects({
    pageSize: 10,
    pageNumber: 1,
    projectType: 3, // Solo
  });

  // Premium tasks (projectType = 2)
  const { data: premiumTasks } = await getJoinedProjects({
    pageSize: 10,
    pageNumber: 1,
    projectType: 2, // Premium
  });

  return (
    <div className='bg-white rounded-[20px] drop-shadow-xl border border-border-primary p-6 space-y-8'>
      <h3 className='text-2xl font-medium text-yankees-blue'>Solo Tasks</h3>
      
      {/* Free Solo Projects */}
      <div>
        <div className='flex items-center gap-2 mb-4'>
          <MoneyIcon fill='#3BB573' />
          <h2 className='text-xl font-medium text-success-500'>
            Free Solo Tasks
          </h2>
        </div>
        {freeSoloProjects && freeSoloProjects.length > 0 ? (
          <ProjectsCarousel
            projects={freeSoloProjects} 
            projectType={3} 
          />
        ) : (
          <div className='py-8 text-center'>
            <p className='text-gray-500'>No Free Solo Tasks Added Yet</p>
          </div>
        )}
      </div>

      {/* Premium Tasks */}
      <div>
        <div className='flex items-center gap-2 mb-4'>
          <StarIcon fill='#DF972A' />
          <h2 className='text-xl font-medium text-dark-orange'>
            Premium Tasks
          </h2>
        </div>
        {premiumTasks && premiumTasks.length > 0 ? (
          <ProjectsCarousel 
            projects={premiumTasks} 
            projectType={2} 
          />
        ) : (
          <div className='py-8 text-center'>
            <p className='text-gray-500'>No Premium Tasks Added Yet</p>
          </div>
        )}
      </div>
    </div>
  );
};