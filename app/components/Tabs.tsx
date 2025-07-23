import {
  Tab,
  TabGroup,
  TabList,
  type TabGroupProps as HeadlessTabGroupProps,
} from '@headlessui/react';
import Link from 'next/link';
import type { TabItem } from './types/TabItem';

interface TabsProps extends HeadlessTabGroupProps {
  tabItems: TabItem[];
}

export const Tabs = ({ tabItems, ...props }: TabsProps) => {
  return (
    <TabGroup {...props}>
      <TabList className={tabListStyle}>
        {tabItems.map(({ link, title }) => (
          <TabItem key={link} link={link} title={title} />
        ))}
      </TabList>
    </TabGroup>
  );
};

const TabItem = ({ link, title }: TabItem) => {
  return (
    <Link key={link} href={link}>
      <Tab className={tabStyle}>{title}</Tab>
    </Link>
  );
};

const tabListStyle =
  'flex item-center justify-center w-fit bg-gray-100 rounded-full p-1 gap-1';

const tabStyle =
  'px-6 py-2 rounded-full font-medium transition-colors data-[selected]:bg-white data-[selected]:text-unitedBlue data-[selected]:shadow-sm text-shadowBlue hover:text-gray-700 cursor-pointer focus:outline-none focus:ring-0 border-0';
