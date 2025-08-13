'use client';

import { Tabs } from '@components/client';
import { useState } from 'react';
import { TabData } from '../../../../../components/types';
import { BadgesAchievements, Profile, Projects } from './tabs';

export const ProfileTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);

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
      selectedIndex={selectedTab}
      onTabChange={setSelectedTab}
      tabListClassName='flex space-x-0 bg-[#E8EDFF] p-0 mb-0 w-full rounded-t-none rounded-b-2xl'
      tabClassName={(selected) =>
        `px-6 py-3 transition-all duration-200 focus:outline-none focus:ring-0  ${
          selected
            ? 'text-violet-normal'
            : 'text-gray-600 border-transparent hover:text-violet-normal'
        }`
      }
      tabPanelClassName=' p-0'
    />
  );
};
