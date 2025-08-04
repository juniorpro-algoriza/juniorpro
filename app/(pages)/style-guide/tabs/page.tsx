import { Tabs } from '@components/client';

const TabsStylePage = () => {
  const tabs = [
    {
      name: 'Profile',
      content: (
        <div>
          <h3 className='text-xl font-semibold mb-3'>User Profile</h3>
          <p className='text-gray-600'>
            Manage your personal information and preferences.
          </p>
        </div>
      ),
    },
    {
      name: 'Settings',
      content: (
        <div>
          <h3 className='text-xl font-semibold mb-3'>Account Settings</h3>
          <p className='text-gray-600'>
            Configure your account settings and privacy options.
          </p>
        </div>
      ),
    },
    {
      name: 'Help',
      content: (
        <div>
          <h3 className='text-xl font-semibold mb-3'>Help Center</h3>
          <p className='text-gray-600'>
            Find answers to common questions and get support.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Simple Tabs Example</h1>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default TabsStylePage;
