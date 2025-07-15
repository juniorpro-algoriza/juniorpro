import { Tabs } from "@components";

const TabsStylePage = () => {
  const authTabs = [
    {
      title: "Beta",
      link: "/style-guide/tabs/#2",
    },
    {
      title: "Alpha",
      link: "/style-guide/tabs/#1",
    },
  ];

  return (
    <>
      <Tabs tabItems={authTabs} />
    </>
  );
};

export default TabsStylePage;
