'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { cva, cx } from '@lib';
import type { TabData } from '../types';

export interface TabsProps {
  tabs: TabData[];
  selectedIndex?: number;
  onTabChange?: (index: number) => void;
  tabListClassName?: string;
  tabClassName?: string | ((selected: boolean) => string);
  tabPanelsClassName?: string;
  tabPanelClassName?: string;
  tabStyle?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  selectedIndex = 0,
  onTabChange,
  tabListClassName = '',
  tabClassName = '',
  tabPanelsClassName = '',
  tabPanelClassName = '',
  tabStyle = '',
}) => {
  return (
    <TabGroup selectedIndex={selectedIndex} onChange={onTabChange}>
      <TabList className={cx(defaultTabListClass, tabListClassName)}>
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            className={({ selected }) =>
              tabClassName
                ? typeof tabClassName === 'function'
                  ? tabClassName(selected)
                  : tabClassName
                : cx(
                    defaultTabClass({
                      selected: selected ? 'active' : 'inactive',
                    }),
                    tabStyle
                  )
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

const defaultTabListClass =
  'flex space-x-1 rounded-full bg-gray-100 p-1.5 mb-3 w-fit';

const defaultTabClass = cva({
  base: [
    'rounded-full',
    'py-2.5',
    'text-sm',
    'font-medium',
    'leading-5',
    'transition-all',
    'w-full',
  ],
  variants: {
    selected: {
      active: 'bg-white text-violet-normal shadow',
      inactive: 'text-shadowBlue hover:bg-white/[0.12]',
    },
  },
  defaultVariants: {
    selected: 'inactive',
  },
});
