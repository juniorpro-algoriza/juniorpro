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
  selectedIndex?: number;
  onTabChange?: (index: number) => void;
  children?: React.ReactNode;
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
  selectedIndex,
  onTabChange,
  children,
}) => {
  return (
    <TabGroup selectedIndex={selectedIndex} onChange={onTabChange}>
      <div className="flex items-center justify-between flex-wrap">
        <TabList className={cx(defaultTabListClass, tabListClassName)}>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) => {
                if (selectedTabClassName && unselectedTabClassName) {
                  return selected
                    ? selectedTabClassName
                    : unselectedTabClassName;
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
        {children}
      </div>
      <TabPanels className={tabPanelsClassName}>
        {tabs.map((tab, index) => (
          <TabPanel key={index} className={tabPanelClassName}>
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

const defaultTabListClass =
  "flex space-x-1 rounded-2xl bg-white border border-gray-200 px-4 py-2 mb-3 w-fit max-w-full overflow-auto";

const defaultTabClass = cva({
  base: [
    "rounded-2xl",
    "py-2",
    "px-4",
    "text-sm",
    "font-medium",
    "leading-5",
    "transition-all",
    "w-full",
    "outline-none",
    "cursor-pointer",
    "text-nowrap",
  ],
  variants: {
    selected: {
      active: "border border-[#C6D2FF] bg-[#EEF2FF] text-[#432DD7] shadow",
      inactive: "text-black border border-transparent",
    },
  },
  defaultVariants: {
    selected: "inactive",
  },
});
