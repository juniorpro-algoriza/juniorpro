"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { cva, cx } from "@lib";
import type { TabData } from "@types";

export interface TabsProps {
  tabs: TabData[];
  tabListClassName?: string;
  tabClassName?: string;
  selectedTabClassName?: string;
  unselectedTabClassName?: string;
  tabPanelsClassName?: string;
  tabPanelClassName?: string;
  tabStyle?: string;
  onTabChange?: (index: number) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  tabListClassName = "",
  tabClassName = "",
  selectedTabClassName = "",
  unselectedTabClassName = "",
  tabPanelsClassName = "",
  tabPanelClassName = "",
  tabStyle = "",
  onTabChange,
}) => {
  return (
    <TabGroup onChange={onTabChange}>
      <TabList className={cx(defaultTabListClass, tabListClassName)}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            className={({ selected }) => {
              if (selectedTabClassName && unselectedTabClassName) {
                return selected ? selectedTabClassName : unselectedTabClassName;
              }
              return (
                tabClassName ||
                cx(
                  defaultTabClass({
                    selected: selected ? "active" : "inactive",
                  }),
                  tabStyle
                )
              );
            }}
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
              "bg-white shadow rounded-[20px] border border-border-primary p-6 space-y-6"
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
  "flex space-x-1 rounded-full bg-gray-100 p-1.5 mb-3 w-fit";

const defaultTabClass = cva({
  base: [
    "rounded-full",
    "py-2.5",
    "text-sm",
    "font-medium",
    "leading-5",
    "transition-all",
    "w-full",
  ],
  variants: {
    selected: {
      active: "bg-white text-violet-normal shadow",
      inactive: "text-shadowBlue hover:bg-white/[0.12]",
    },
  },
  defaultVariants: {
    selected: "inactive",
  },
});
