import {ProjectCard} from '@components';
import {getProjects} from '@server';

export const ProjectsTab = async ({limit}: {limit: number}) => {
  const {data: practiceZoneProjects} = await getProjects({
    limit: limit,
    pageNum: 1,
    projectType: 'team',
    juniors: ['lina', 'anas'],
  });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {practiceZoneProjects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          showDescription={false}
          showDueDate={false}
          showJuniors={true}
          showJuniorsCountOnly={true}
          showRating={false}
          showBadge={true}
          showBadgeNextToDueDate={false}
          badgeText="status"
        />
      ))}
    </div>
  );
};
