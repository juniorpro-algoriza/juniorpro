import {Tabs} from '@components/client';
import {TableContainer} from '../tables';
import {userConfigs, type UserType} from '../../../config/userConfig';
import {Badge, ProjectCard} from '@components';
import {
  getProjectManagerContributors,
  getProjectManagerJuniors,
  getProjectManagerProjects,
  getProjectManagerPracticeZone,
} from '../admin/server/getProjectManagerData';

interface UserTabsProps {
  userType: UserType;
  userId: number;
}

export const UserTabs = async ({userType, userId}: UserTabsProps) => {
  const config = userConfigs[userType];

  const {data: juniors} = await getProjectManagerJuniors(userId);
  const {data: contributors} = await getProjectManagerContributors(userId);
  const {data: projects} = await getProjectManagerProjects(userId);
  const {data: practiceZoneProjects} =
    await getProjectManagerPracticeZone(userId);
  // Wrap status with Badge
  const wrapStatus = (status: string) => (
    <Badge label={status} variant={status === 'active' ? 'green' : 'orange'} />
  );

  // Build tabs
  const tabs = config.tabs.map((tabName) => {
    let content;

    switch (tabName) {
      case 'Juniors':
        content = (
          <TableContainer
            type="junior"
            initialData={
              juniors?.length > 0
                ? juniors?.map((j) => ({
                    ...j,
                    status: wrapStatus(j.status || 'inactive'),
                  }))
                : []
            }
            title="Assigned Juniors"
          />
        );
        break;

      case 'Contributors':
        content = (
          <TableContainer
            type="contributor"
            initialData={
              contributors?.length > 0
                ? contributors?.map((c) => ({
                    ...c,
                    status: wrapStatus(c.status || 'inactive'),
                  }))
                : []
            }
            title="Contributors"
          />
        );
        break;

      case 'Projects':
        content =
          projects?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
              {projects?.map((project) => (
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
                  badgeText={project.status}
                />
              ))}
            </div>
          ) : (
            <div className="p-6 text-gray-500">No projects found</div>
          );
        break;

      case 'Practice Zone':
        content =
          practiceZoneProjects?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
              {practiceZoneProjects?.map((project) => (
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
                  badgeText={project.status}
                />
              ))}
            </div>
          ) : (
            <div className="p-6 text-gray-500">No practice zone projects</div>
          );
        break;

      default:
        content = <div className="p-6 text-gray-500">No data</div>;
    }

    return {name: tabName, content};
  });

  return (
    <Tabs
      tabs={tabs}
      tabListClassName="flex m-3 rounded-full bg-gray-50 p-2 mb-3 w-150"
    />
  );
};
