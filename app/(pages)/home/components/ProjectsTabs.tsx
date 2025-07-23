import { Tabs } from '@components';
import { getProjectTabs } from '../server';
import { ProjectsHeader } from './ProjectsHeader';

export const ProjectsTabs = async () => {
  const tabItems = await getProjectTabs();
  return (
    <>
      <ProjectsHeader />
      <div className='pt-10 flex items-center justify-center bg-white'>
        <Tabs tabItems={tabItems} />
      </div>
    </>
  );
};
