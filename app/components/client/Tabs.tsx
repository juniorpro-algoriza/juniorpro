'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useState } from 'react';
import { TabData } from '../types';

interface TabsProps {
  tabs: TabData[];
  defaultSelectedIndex?: number;
  onTabChange?: (index: number) => void;
  tabListClassName?: string;
  tabClassName?: string | ((selected: boolean) => string);
  tabPanelsClassName?: string;
  tabPanelClassName?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultSelectedIndex = 0,
  onTabChange,
  tabListClassName = '',
  tabClassName = '',
  tabPanelsClassName = '',
  tabPanelClassName = '',
}) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex);

  const handleTabChange = (index: number) => {
    setSelectedIndex(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  const defaultTabListClass =
    'flex space-x-1 rounded-full bg-gray-100 p-1.5 mb-3 w-fit';
  const defaultTabClass = (selected: boolean) =>
    `w-fit rounded-full px-6 py-2.5 font-medium leading-5 transition-all focus:ring-2 focus:ring-violet-normal
    ${
      selected
        ? 'bg-white text-violet-normal shadow'
        : 'text-shadowBlue hover:bg-white/[0.12]'
    }`;

  return (
    <TabGroup selectedIndex={selectedIndex} onChange={handleTabChange}>
      <TabList className={tabListClassName || defaultTabListClass}>
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            className={({ selected }) =>
              tabClassName
                ? typeof tabClassName === 'function'
                  ? tabClassName(selected)
                  : tabClassName
                : defaultTabClass(selected)
            }
          >
            {tab.name}
          </Tab>
        ))}
      </TabList>

      <TabPanels className={tabPanelsClassName}>
        {tabs.map((tab, index) => (
          <TabPanel
            key={index}
            className={
              tabPanelClassName ||
              'bg-white shadow rounded-[20px] border border-border-primary p-6 space-y-6'
            }
          >
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};
