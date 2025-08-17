import { Tabs } from '@components/client';
import { TabData } from '@types';
import { BadgesAchievements, Profile, Projects } from './tabs';

export const ProfileTabs = () => {
  const tabsData: TabData[] = [
    {
      name: 'Profile',
      content: <Profile />,
    },
    {
      name: 'Projects',
      content: <Projects />,
    },
    {
      name: 'Badges & Achievements',
      content: <BadgesAchievements />,
    },
  ];

  return (
    <Tabs
      tabs={tabsData}
      tabListClassName='flex space-x-0 bg-[#E8EDFF] p-0 mb-0 w-full rounded-t-none rounded-b-2xl'
      selectedTabClassName='px-6 py-3 transition-all duration-200 focus:outline-none focus:ring-0 text-violet-normal'
      unselectedTabClassName='px-6 py-3 transition-all duration-200 focus:outline-none focus:ring-0 text-gray-600 border-transparent hover:text-violet-normal'
      tabPanelClassName='p-0'
    />
  );
};
