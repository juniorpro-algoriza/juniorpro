import {
  Tab,
  TabGroup,
  TabList,
  type TabGroupProps as HeadlessTabGroupProps,
} from "@headlessui/react";
import Link from "next/link";
import type { TabItem } from "./types/TabItem";
import { cx } from "cva";

interface TabsProps extends HeadlessTabGroupProps {
  tabItems: TabItem[];
  tabListClassName?: string;
}

export const Tabs = ({ tabItems, tabListClassName, ...props }: TabsProps) => {
  return (
    <TabGroup {...props} className="w-full px-4 pt-16 flex lg:justify-center">
      <TabList className={cx(defaultTabListClassName, tabListClassName)}>
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
      <Tab className={tabClassName}>{title}</Tab>
    </Link>
  );
};

const defaultTabListClassName =
  "flex py-2 px-4 justify-center flex-wrap text-sm md:text-base lg:text-lg bg-gray-100 w-fit rounded-full p-1 gap-1 items-center";

const tabClassName =
  "xl:px-6 px-4 py-2 xl:py-4 min-w-max rounded-full font-medium transition-colors data-[selected]:bg-white data-[selected]:text-unitedBlue data-[selected]:shadow-sm text-shadowBlue hover:text-gray-700 cursor-pointer focus:outline-none focus:ring-0 border-0";
