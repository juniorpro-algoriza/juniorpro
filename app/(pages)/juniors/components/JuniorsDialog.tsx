'use client';

import { Button, Input, Select } from '@components';
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { X } from 'lucide-react';
import { Fragment, useState } from 'react';

interface AddJuniorDialogProps {
  juniorsAge: any[];
  juniorsGrade: any[];
  isOpen: boolean;
  onClose: () => void;
}

export const JuniorDialog = ({
  juniorsAge,
  juniorsGrade,
  isOpen,
  onClose,
}: AddJuniorDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gradeLevel: '',
    email: '',
    points: '',
  });

  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = ['Create Account', 'Invite Existing', 'General'];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreate = () => {
    // Handle form submission logic here
    console.log('Form data:', formData);
    onClose();
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      name: '',
      age: '',
      gradeLevel: '',
      email: '',
      points: '',
    });
    setSelectedTab(0);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/70' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                {/* Header */}
                <div className='flex items-center justify-between mb-3 border-b border-storm-200 pb-2'>
                  <DialogTitle
                    as='h3'
                    className='text-lg font-medium leading-6 text-midnight'
                  >
                    Add a Junior
                  </DialogTitle>
                  <Button
                    intent='unset'
                    onClick={onClose}
                    className='border border-border-secondary p-1.5 rounded-lg'
                  >
                    <X size={18} />
                  </Button>
                </div>

                {/* Tabs */}
                <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
                  <TabList className='flex space-x-1 rounded-full bg-gray-100 p-1 mb-3'>
                    {tabs.map((tab) => (
                      <Tab
                        key={tab}
                        className={({ selected }) =>
                          `w-full rounded-full py-2.5 text-sm font-medium leading-5 transition-all
                          ${
                            selected
                              ? 'bg-white text-violet-normal shadow'
                              : 'text-shadowBlue hover:bg-white/[0.12]'
                          }`
                        }
                      >
                        {tab}
                      </Tab>
                    ))}
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      {/* Create Account Form */}
                      <div className='space-y-4'>
                        <Input
                          label="Junior's Name"
                          placeholder='Write here'
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange('name', e.target.value)
                          }
                          className='w-full'
                        />

                        <div className='grid grid-cols-2 gap-4'>
                          <div className='flex flex-col space-y-1'>
                            <label className='text-sm font-medium text-midnight'>
                              Age
                            </label>
                            <Select
                              options={juniorsAge}
                              placeholder='Select'
                              value={formData.age}
                              onChange={(value) =>
                                handleInputChange('age', value)
                              }
                            />
                          </div>
                          <div className='flex flex-col space-y-1'>
                            <label className='text-sm font-medium text-midnight'>
                              Grade Level
                            </label>
                            <Select
                              options={juniorsGrade}
                              placeholder='Select'
                              value={formData.gradeLevel}
                              onChange={(value) =>
                                handleInputChange('gradeLevel', value)
                              }
                            />
                          </div>
                        </div>

                        <Input
                          label='Email Address (Optional)'
                          placeholder='Write here'
                          type='email'
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange('email', e.target.value)
                          }
                          className='w-full'
                        />
                      </div>
                    </TabPanel>

                    <TabPanel>
                      {/* Invite Existing Content */}
                      <div className='flex flex-col space-y-2'>
                        <Input
                          label="Junior's Email"
                          placeholder='Write here'
                          type='email'
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange('email', e.target.value)
                          }
                          className='w-full'
                        />
                        <p className='text-dark-electric-blue text-[13px] font-light'>
                          We'll send an invitation to this email address. The
                          junior must accept the invitation to link accounts.
                        </p>
                      </div>
                    </TabPanel>

                    <TabPanel>
                      {/* General Content */}
                      <div className='flex flex-col space-y-2'>
                        <Input
                          label='Contribution Amount (Points)'
                          placeholder='Write here'
                          type='email'
                          value={formData.points}
                          onChange={(e) =>
                            handleInputChange('points', e.target.value)
                          }
                          className='w-full'
                        />
                        <p className='text-dark-electric-blue text-[13px] font-light'>
                          Make a general contribution that can be used by any
                          junior in need. These points will go to a community
                          pool to support educational projects.
                        </p>
                      </div>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>

                {/* Footer Buttons */}
                <div className='flex gap-3 mt-6'>
                  <Button
                    intent='primary'
                    onClick={handleCreate}
                    className='flex-1'
                  >
                    Create
                  </Button>
                  <Button
                    intent='secondary'
                    onClick={handleCancel}
                    className='flex-1 text-dark-electric-blue'
                  >
                    Cancel
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
