'use client';

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import { Fragment } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  error?: boolean;
}

export const Select = ({
  options,
  value,
  placeholder = 'Select',
  onChange,
  className = '',
  disabled = false,
  error = false,
}: SelectProps) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={`relative ${className}`}>
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <ListboxButton
          className={`
            relative w-full cursor-default rounded-lg bg-white py-3 pl-4 pr-10 text-left 
            border transition-colors duration-200 text-sm
            ${
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-border-primary focus:border-vioring-violet-normal focus:ring-violet-normal'
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-20
            disabled:bg-gray-50 disabled:cursor-not-allowed disabled:border-gray-200
           
          `}
        >
          <span
            className={`block truncate ${
              !selectedOption
                ? 'text-cadetGray'
                : disabled
                  ? 'text-gray-500'
                  : 'text-gray-900'
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                disabled ? 'text-gray-300' : 'text-gray-400'
              }`}
              aria-hidden='true'
            />
          </span>
        </ListboxButton>

        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <ListboxOptions className='absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-violet-normal ring-opacity-5 focus:outline-none border border-border-primary'>
            {options.length === 0 ? (
              <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                No options available
              </div>
            ) : (
              options.map((option, optionIdx) => (
                <ListboxOption
                  key={optionIdx}
                  className={({ active, selected }) =>
                    `relative cursor-pointer select-none py-2.5 pl-10 pr-4 transition-colors duration-150 ${
                      active
                        ? 'bg-blue-50 text-violet-normal'
                        : selected
                          ? 'bg-blue-50 text-violet-normal'
                          : 'text-gray-900 hover:bg-gray-50'
                    }`
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-violet-normal'>
                          <Check className='h-4 w-4' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))
            )}
          </ListboxOptions>
        </Transition>
      </Listbox>
    </div>
  );
};
