import { Button } from '@components';
import { FaArrowRight, FaStar, FaTrashAlt } from 'react-icons/fa';

const ButtonStylePage = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-5 sm:gap-24'>
      <div className='flex flex-col items-center gap-4'>
        <p className='font-bold text-xl'>Primary Button</p>
        <Button variant='primary' size='small'>
          Font weight
        </Button>
        <Button variant='primary' size='medium'>
          Font weight
        </Button>
        <Button variant='primary' size='large'>
          Font weight
        </Button>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <p className='font-bold text-xl'>Secondary Button</p>
        <Button variant='secondary' size='small'>
          Font weight
        </Button>
        <Button variant='secondary' size='medium'>
          Font weight
        </Button>
        <Button variant='secondary' size='large'>
          Font weight
        </Button>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <p className='font-bold text-xl'>Tertiary Button</p>
        <Button variant='tertiary' size='small'>
          Font weight
        </Button>
        <Button variant='tertiary' size='medium'>
          Font weight
        </Button>
        <Button variant='tertiary' size='large'>
          Font weight
        </Button>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <p className='font-bold text-xl'>Destructive Button</p>
        <Button variant='destructive' size='small'>
          Font weight
        </Button>
        <Button variant='destructive' size='medium'>
          Font weight
        </Button>
        <Button variant='destructive' size='large'>
          Font weight
        </Button>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <p className='font-bold text-xl'>Icon Buttons</p>
        <Button
          variant='primary'
          size='small'
          icon={<FaStar />}
          iconPosition='left'
        >
          Save
        </Button>
        <Button
          variant='secondary'
          size='medium'
          icon={<FaArrowRight />}
          iconPosition='right'
        >
          Next
        </Button>
        <Button variant='destructive' size='large' icon={<FaTrashAlt />}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ButtonStylePage;
