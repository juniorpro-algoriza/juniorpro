// TODO: Replace tabs with radio buttons
import { Tabs } from '@components';

export const RegisterTab = () => {
  const RegisterTabs = [
    {
      title: 'Register as contributor',
      link: '/auth/register/#1',
    },
    {
      title: 'Register as junior',
      link: '/auth/register/#2',
    },
  ];

  return (
    <>
      <Tabs
        className='flex items-center justify-center'
        tabItems={RegisterTabs}
      />
    </>
  );
};
