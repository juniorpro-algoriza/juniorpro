import { Tabs } from '@components';

const TabsStylePage = () => {
  const authTabs = [
    {
      name: 'Register as contributor',
      link: '/style/tabs',
      content: 'Contributor registration form would go here...',
    },
    {
      name: 'Register as junior',
      link: '/style/tabs',
      content: 'Junior registration form would go here...',
    },
  ];
  return (
    <>
      <Tabs tabs={authTabs} />
    </>
  );
};

export default TabsStylePage;
