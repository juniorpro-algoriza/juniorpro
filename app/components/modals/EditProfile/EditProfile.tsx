import { Button, Input, Modal, Textarea } from '@components';
import { Select } from '@components/client';
import { CloseButton } from '@headlessui/react';
import { LocationIcon } from '@icons';
import profileAvatarImage from '@public/images/profile-avartar.svg';
import SaudiFlagIcon from '@public/images/saudi-flag.svg';
import skyBg from '@public/images/sky.svg';
import { getCareerTypes } from '@server';
import { CameraIcon, UploadIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import { Fragment } from 'react';

export const EditProfile = async () => {
  const carerTypesData = await getCareerTypes();
  return (
    <Modal panelClassName='w-full max-w-2xl h-[90vh] overflow-auto transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
      <div className='flex items-center justify-between mb-3 border-b border-storm-200 pb-2'>
        <h3 className='text-lg font-medium leading-6 text-midnight'>
          Edit Profile
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

      <div className='relative h-32 mb-16'>
        <Image
          src={skyBg}
          alt='Profile background'
          fill
          className='object-cover rounded-t-[20px] opacity-80'
        />
        <div className='absolute inset-0 flex items-center justify-center bg-black/10'>
          <Button
            intent='unset'
            className='bg-transparent text-storm-500 px-4 py-2 rounded-lg border border-storm-300 flex items-center gap-2'
          >
            <UploadIcon className='text-stone-500' size={16} />
            Choose Cover Photo
          </Button>
        </div>
        <div className='absolute left-1/6 -bottom-14 transform -translate-x-1/2'>
          <div>
            <Image
              src={profileAvatarImage}
              alt={`profile avatar`}
              className='w-full h-full object-cover relative'
            />
            <Button
              intent='unset'
              className='absolute bottom-2 right-2 bg-violet-normal rounded-full border-2 border-white p-2 focus:outline-none focus:ring-0 focus:ring-violet-normal'
            >
              <CameraIcon className='text-white' />
            </Button>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        <Input label='First Name' placeholder='Write here' className='w-full' />
        <Input label='Last Name' placeholder='Write here' className='w-full' />
        <Input label='Age' placeholder='Write here' className='w-full' />
        <Select
          description=''
          label='Career Type'
          placeholder='choose'
          options={carerTypesData}
        />
      </div>

      <Input label='Email' placeholder='Write here' className='w-full' />
      <Input
        label='Number'
        placeholder='05 xxx xxx xxx'
        className='w-full'
        leftIcon={<Image src={SaudiFlagIcon} alt='saudi flag' />}
      />
      <Input
        label='Location'
        placeholder='choose location'
        className='w-full placeholder:text-violet-normal'
        leftIcon={<LocationIcon fill='#5879DC' />}
      />
      <Textarea label='About' placeholder='Write here' className='w-full' />

      <div className='flex gap-3 mt-6'>
        <Button intent='primary' className='flex-1'>
          Save
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
