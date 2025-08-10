import { Button, Input, Modal } from '@components';
import { Select, Tabs } from '@components/client';
import { CloseButton } from '@headlessui/react';
import { getJuniorsAge, getJuniorsGrades } from '@server';
import { XIcon } from 'lucide-react';
import { Fragment } from 'react';
import type { TabData } from '../../types';

export const AddJunior = async () => {
  const juniorsAge = await getJuniorsAge();
  const juniorsGrade = await getJuniorsGrades();
  const tabsData: TabData[] = [
    {
      name: 'Create Account',
      content: (
        <div className='space-y-4'>
          <Input
            label="Junior's Name"
            placeholder='Write here'
            className='w-full'
          />

          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col space-y-1'>
              <label className='text-sm font-medium text-midnight'>Age</label>
              <Select description='' label='' options={juniorsAge} />
            </div>
            <div className='flex flex-col space-y-1'>
              <label className='text-sm font-medium text-midnight'>
                Grade Level
              </label>
              <Select description='' label='' options={juniorsGrade} />
            </div>
          </div>

          <Input
            label='Email Address (Optional)'
            placeholder='Write here'
            type='email'
            className='w-full'
          />
        </div>
      ),
    },
    {
      name: 'Invite Existing',
      content: (
        <div className='flex flex-col space-y-2'>
          <Input
            label="Junior's Email"
            placeholder='Write here'
            type='email'
            className='w-full'
          />
          <p className='text-dark-electric-blue text-[13px] font-light'>
            We'll send an invitation to this email address. The junior must
            accept the invitation to link accounts.
          </p>
        </div>
      ),
    },
    {
      name: 'General',
      content: (
        <div className='flex flex-col space-y-2'>
          <Input
            label='Contribution Amount (Points)'
            placeholder='Write here'
            type='email'
            className='w-full'
          />
          <p className='text-dark-electric-blue text-[13px] font-light'>
            Make a general contribution that can be used by any junior in need.
            These points will go to a community pool to support educational
            projects.
          </p>
        </div>
      ),
    },
  ];
  return (
    <Modal panelClassName='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
      <div className='flex items-center justify-between mb-3 border-b border-storm-200 pb-2'>
        <h3 className='text-lg font-medium leading-6 text-midnight'>
          Add a Junior
        </h3>
        <CloseButton as={Fragment}>
          <Button
            intent='unset'
            className='border border-border-secondary p-1.5 rounded-lg'
          >
            <XIcon size={18} />
          </Button>
        </CloseButton>
      </div>

      <Tabs
        tabs={tabsData}
        selectedIndex={0}
        tabListClassName='flex space-x-1 rounded-full bg-gray-100 p-1.5 mb-3 w-full'
      />

      <div className='flex gap-3 mt-6'>
        <Button intent='primary' className='flex-1'>
          Create
        </Button>

        <CloseButton as={Fragment}>
          <Button intent='secondary' className='flex-1 text-dark-electric-blue'>
            Cancel
          </Button>
        </CloseButton>
      </div>
    </Modal>
  );
};
