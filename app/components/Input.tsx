import {
  Description,
  Field,
  Input as HeadlessInput,
  Label,
} from '@headlessui/react';
import { forwardRef, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

interface IconContainerProps {
  children: React.ReactNode;
  position: 'left' | 'right';
}

const IconContainer = ({ children, position }: IconContainerProps) => {
  const iconClasses = twMerge(
    'absolute top-1/2 transform -translate-y-1/2 text-gray-400',
    position === 'left' ? 'left-3' : 'right-3'
  );

  return <div className={iconClasses}>{children}</div>;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className,
      containerClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    const containerClasses = twMerge(
      'flex flex-col space-y-1',
      containerClassName
    );

    const labelClasses = 'text-sm font-medium text-gray-700';

    const inputWrapperClasses = 'relative';

    const descriptionClasses = twMerge(
      'text-sm',
      error ? 'text-red-600' : 'text-gray-500'
    );

    const inputClasses = twMerge(
      // Base styles
      'w-full px-3 py-3.5 rounded-lg border transition-all duration-200 outline-none',
      'placeholder:text-gray-400 text-cadetGray font-semibold',

      // Default state
      'border-platinum bg-white',

      // Hover state
      'hover:border-storm-400',

      // Error state
      error && 'border-red-500 ring-2 ring-red-100',

      // Disabled state
      disabled &&
        'bg-white opacity-60 border-platinum text-gray-500 cursor-not-allowed',

      // Icon padding
      leftIcon && 'pl-10',
      rightIcon && 'pr-10',

      className
    );

    return (
      <Field className={containerClasses}>
        {label && <Label className={labelClasses}>{label}</Label>}

        <div className={inputWrapperClasses}>
          {/* Left Icon */}
          {leftIcon && (
            <IconContainer position='left'>{leftIcon}</IconContainer>
          )}
          {/* Input */}
          <HeadlessInput
            ref={ref}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClasses}
            {...props}
          />
          {/* Right Icon */}
          {rightIcon && (
            <IconContainer position='right'>{rightIcon}</IconContainer>
          )}
        </div>

        {/* Error or Helper Text */}
        {(error ?? helperText) && (
          <Description className={descriptionClasses}>
            {error ?? helperText}
          </Description>
        )}
      </Field>
    );
  }
);

Input.displayName = 'Input';

export { Input };
