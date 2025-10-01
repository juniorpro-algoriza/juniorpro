
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { ProjectsHeader } from './ProjectsHeader';
import { tabClassName, tabListClassName } from '@styles';
import { ProjectsCarousel } from './ProjectCarousel';
import { twMerge } from 'tailwind-merge';
import { getLandingProjects } from '../../server';
import { NormalizedProject } from '../../../../../types/Projects';

export const ProjectsSection = async () => {
  // Fetch all projects
  const { data: allProjects } = await getLandingProjects({
    pageNumber: 1,
    pageSize: 10,
  });

  // Fetch Team projects (ProjectType = 1)
  const { data: teamProjects } = await getLandingProjects({
    pageNumber: 1,
    pageSize: 10,
    projectType: 1,
  });

  // Fetch Solo projects (ProjectType = 2 or 3)
  const { data: soloProjects } = await getLandingProjects({
    pageNumber: 1,
    pageSize: 10,
    projectType: 2, 
  });

  const projects: { title: string; items: NormalizedProject[]; projectType?: number }[] = [
    {
      title: 'All',
      items: allProjects,
    },
    {
      title: 'Solo Projects',
      items: soloProjects,
      projectType: 2,
    },
    {
      title: 'Team Projects',
      items: teamProjects,
      projectType: 1,
    },
  ];

  return (
    <>
      <ProjectsHeader />
      <TabGroup className="pt-8">
        <div className="flex justify-center px-4">
          <TabList className={tabListClassName}>
            {projects.map(({ title }) => {
              return (
                <Tab
                  className={twMerge(tabClassName, 'capitalize')}
                  key={title}>
                  {title}
                </Tab>
              );
            })}
          </TabList>
        </div>
        <TabPanels className="pt-10">
          {projects.map(({ items, title, projectType }) => {
            return (
              <TabPanel key={title}>
                <ProjectsCarousel
                  projects={items}
                  projectType={projectType}
                />
              </TabPanel>
            );
          })}
        </TabPanels>
      </TabGroup>
    </>
  );
};
