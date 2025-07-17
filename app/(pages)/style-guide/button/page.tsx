'use client';

import { Button } from '@components';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { containerStyle } from '../styles';

type ButtonSize = 'small' | 'medium' | 'large';

const ButtonStylePage = () => {
  const [selectedSize, setSelectedSize] = useState<ButtonSize>('medium');

  const sizeOptions: { value: ButtonSize; label: string }[] = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  return (
    <>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>
            Button Size
          </label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value as ButtonSize)}
            className='block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
          >
            {sizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={containerStyle}>
          <Button variant='primary' size={selectedSize}>
            Primary Button
          </Button>
          <Button variant='secondary' size={selectedSize}>
            Secondary Button
          </Button>
          <Button variant='tertiary' size={selectedSize}>
            Tertiary Button
          </Button>
          <Button variant='destructive' size={selectedSize}>
            Destructive Button
          </Button>
          <Button variant='primary' size={selectedSize} icon={<Star />}>
            With Icon
          </Button>
        </div>
      </div>
    </>
  );
};

export default ButtonStylePage;
