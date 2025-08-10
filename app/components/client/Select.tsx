import {
  Description,
  Field,
  Select as HeadlessSelect,
  Label,
} from '@headlessui/react';
import { ChangeEvent } from 'react';

type SelectOption = {
  value: string;
  label: string;
};

interface SelectProps {
  options: SelectOption[];
  label: string;
  description?: string;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = ({
  options,
  label,
  description,
  disabled = false,
  placeholder = 'Select an option...',
  error,
  required = false,
  value,
  onChange,
}: SelectProps) => {
  return (
    <Field className='w-fit'>
      <Label className='block text-sm font-medium text-gray-900 mb-2'>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </Label>

      {description && (
        <Description className='text-sm text-gray-600 mb-2'>
          {description}
        </Description>
      )}

      <div className='relative'>
        <HeadlessSelect
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full rounded-lg border px-3 py-2.5 pr-10 text-sm
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
            disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
            ${
              error
                ? 'border-red-300 bg-red-50 text-red-900 focus:ring-red-500'
                : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
            }
          `}
        >
          <option value='' disabled>
            {placeholder}
          </option>
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </HeadlessSelect>
      </div>

      {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
    </Field>
  );
};
