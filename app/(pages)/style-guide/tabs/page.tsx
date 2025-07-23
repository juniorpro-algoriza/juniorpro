import { Tabs } from "@components";

const TabsStylePage = () => {
  const authTabs = [
    {
      title: "Beta",
      link: "#!",
    },
    {
      title: "Alpha",
      link: "#2",
    },
  ];

  return (
    <>
      <Tabs tabItems={authTabs} />
    </>
  );
};

export default TabsStylePage;
