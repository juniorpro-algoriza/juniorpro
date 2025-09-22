import {ProjectCard} from '@components';
import {getProjects} from '@server';
import type {Project} from '@types';
import {pickRandom} from '@utils';
import {SearchInput} from '../../components/client';
import {ProjectsHeader} from '../../admin/projects/components';

interface ProjectsPageProps {
  searchParams: Promise<{junior: string; query: string}>;
}

const ProjectsPage = async ({searchParams}: ProjectsPageProps) => {
  const junior = (await searchParams).junior;

  const {data: projects} = await getProjects({
    limit: 30,
    pageNum: 1,
    projectType: 'all',
  });

  const completedProjects: Project[] = projects.map((p) => ({
    ...p,
    status: 'completed',
  }));

  let allProjects: Project[] = completedProjects;
  if (junior === 'all juniors') {
    allProjects = completedProjects
      .map((p) => ({
        ...p,
        juniors: ['Marwa', 'Anas ', pickRandom(['Adam', 'Samy'])],
      }))
      .filter((_, index) => {
        return index % 5 === 0;
      });
  }

  return (
    <main className="min-h-screen px-6 py-3 bg-stone-50">
      <ProjectsHeader />
      <div className="bg-white rounded-[20px] drop-shadow-xl border border-border-primary">
        <div className="flex justify-between items-center px-1 py-2 xl:py-8 md:py-4 xl:px-6 md:px-2 ">
          <h2 className="relative text-2xl font-medium left-2 top-1 text-yankees-blue">
            Projects ({projects.length})
          </h2>
          <div className="flex items-center gap-2">
            {/* <JuniorsDropdown juniors={juniors} /> */}
            <SearchInput />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 px-1 xl:gap-6 md:px-2 xl:px-6 pb-10">
          {allProjects.map((p) => {
            return (
              <div
                key={p.id}
                className="basis-full md:basis-[calc(50%_-_10px)] flex-1 xl:basis-[calc(30%_-_30px)] xl:max-w-[calc(33%_-_10px)]">
                <ProjectCard
                  project={p}
                  showDescription={false}
                  showDueDate={true}
                  showJuniors={true}
                  badgeText="status"
                  showBadgeNextToDueDate={false}
                  showBadge={true}
                  showRating={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
export default ProjectsPage;
