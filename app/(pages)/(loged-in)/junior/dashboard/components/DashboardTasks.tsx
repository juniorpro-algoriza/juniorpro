import { MoneyIcon, StarIcon } from '@icons';
import { getProjects } from '@server';
import { Project, ProjectType } from '@types';
import { ProjectsCarousel } from './ProjectCarousel';

export const DashboardTasks = async () => {
  const { data: soloProjects } = await getProjects({
    limit: 10,
    pageNum: 1,
    projectType: 'solo',
  });

  const { data: teamProjects } = await getProjects({
    limit: 10,
    pageNum: 1,
    projectType: 'team',
  });

  const freeProjects: { projectType: ProjectType; items: Project[] }[] = [
    {
      projectType: 'solo',
      items: soloProjects,
    },
  ];

  const premiumTasks: { projectType: ProjectType; items: Project[] }[] = [
    {
      projectType: 'team',
      items: teamProjects,
    },
  ];
  return (
    <div className='bg-white rounded-[20px] drop-shadow-xl border border-border-primary p-6'>
      <h3 className='text-2xl font-medium text-yankees-blue'>Solo Tasks</h3>
      <div>
        <div className='flex items-center gap-2'>
          <MoneyIcon fill='#3BB573' />
          <h2 className='text-xl font-medium text-success-500'>
            Free Projects
          </h2>
        </div>

        {freeProjects.map(({ items, projectType }, index) => {
          return (
            <div key={index}>
              <ProjectsCarousel projects={items} projectType={projectType} />
            </div>
          );
        })}
      </div>
      <div>
        <div className='flex items-center gap-2'>
          <StarIcon fill='#DF972A' />
          <h2 className='text-xl font-medium text-dark-orange'>
            Premium Tasks
          </h2>
        </div>

        {premiumTasks.map(({ items, projectType }, index) => {
          return (
            <div key={index}>
              <ProjectsCarousel projects={items} projectType={projectType} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
