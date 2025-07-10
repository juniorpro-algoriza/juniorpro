'use client';

import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  type TabGroupProps as HeadlessTabGroupProps,
} from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

interface TabItem {
  name: string;
  link: string;
  content?: string;
}

interface TabsProps extends Omit<HeadlessTabGroupProps, 'children'> {
  tabs: TabItem[];
  className?: string;
  showContent?: boolean;
}

export const Tabs = ({
  tabs,
  className,
  showContent = true,
  ...props
}: TabsProps) => {
  // const handleTabClick = (link: string) => {
  //   window.location.href = link;
  // };

  return (
    <TabGroup className={twMerge(tabsStyle, className)} {...props}>
      <TabList className={tabListStyle}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            className={tabStyle}
            // onClick={() => handleTabClick(tab.link)}
          >
            {tab.name}
          </Tab>
        ))}
      </TabList>
      {showContent && (
        <TabPanels className='mt-4'>
          {tabs.map((tab, index) => (
            <TabPanel key={index} className='p-4'>
              {tab.content || `Content for ${tab.name}`}
            </TabPanel>
          ))}
        </TabPanels>
      )}
    </TabGroup>
  );
};

const tabsStyle = 'w-fit';
const tabListStyle = 'flex bg-gray-100 rounded-full p-1 gap-1';
const tabStyle =
  'px-6 py-2 rounded-full font-medium transition-colors data-[selected]:bg-white data-[selected]:text-[#5879DC] data-[selected]:shadow-sm text-[#7E8CA0] hover:text-gray-700 cursor-pointer focus:outline-none focus:ring-0 border-0';
