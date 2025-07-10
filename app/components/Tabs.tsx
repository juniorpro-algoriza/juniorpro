import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  type TabGroupProps as HeadlessTabGroupProps,
} from "@headlessui/react";
import { twMerge } from "tailwind-merge";

interface TabGroupProps extends HeadlessTabGroupProps {
  className?: string;
}

interface TabsProps {
  tabGroupProps?: TabGroupProps;
}

export const Tabs = ({ tabGroupProps }: TabsProps) => {
  const tabGroupClassName = tabGroupProps?.className;

  return (
    <TabGroup
      className={twMerge(tabGroupStyle, tabGroupClassName)}
      {...tabGroupProps}
    >
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Content 1</TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

const tabGroupStyle = "border border-black";
