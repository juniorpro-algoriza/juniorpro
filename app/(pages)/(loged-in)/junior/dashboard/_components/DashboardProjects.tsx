import { getJoinedProjects } from '@server';
import { ProjectsCarousel } from '.';
export const DashboardProjects = async () => {
  // Fetch team projects only (projectType = 1)
  const { data: teamProjects } = await getJoinedProjects({
    pageSize: 10,
    pageNumber: 1,
    projectType: 1, // Team
  });

  return (
    <div className='bg-white rounded-[20px] drop-shadow-xl border border-border-primary p-6 space-y-4'>      
      <div className='pt-2'>
        <h4 className='text-2xl font-medium text-yankees-blue mb-4'>My Team Projects</h4>
        {teamProjects && teamProjects.length > 0 ? (
          <ProjectsCarousel
            projects={teamProjects}
            projectType={1}
          />
        ) : (
          <div className='py-12 text-center'>
            <p className='text-gray-500 text-lg'>No Team Projects Joined Yet</p>
          </div>
        )}
      </div>
    </div>
  );
};