import {
  Button as HeadlessButton,
  ButtonProps as HeadlessButtonProps,
} from '@headlessui/react';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends HeadlessButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  size?: 'small' | 'medium' | 'large';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  ...props
}: ButtonProps) => {
  return (
    <HeadlessButton
      className={twMerge(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className={twMerge('flex items-center', children && 'mr-2')}>
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className={twMerge('flex items-center', children && 'ml-2')}>
          {icon}
        </span>
      )}
    </HeadlessButton>
  );
};

const baseStyles = `
  inline-flex items-center justify-center hover:cursor-pointer
  font-medium rounded-lg transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
`;

const variantStyles = {
  primary: `
    bg-primary-blue text-white
    hover:bg-primary-hover 
    focus:ring-focus-ring
    disabled:bg-primary-disabled disabled:text-white
  `,
  secondary: `
    bg-secondary-bg text-secondary-text
    hover:bg-secondary-hover hover:text-secondary-text
    focus:ring-focus-ring
    disabled:bg-primary-disabled disabled:text-white
  `,
  tertiary: `
    bg-transparent text-tertiary-text border border-tertiary-text
    hover:bg-transparent hover:text-tertiary-hover hover:border-tertiary-hover
    focus:ring-focus-ring
    disabled:text-tertiary-disabled disabled:border-tertiary-disabled
  `,
  destructive: `
    bg-transparent text-destructive-text border border-destructive-text
    hover:bg-transparent hover:border-destructive-hover hover:text-destructive-hover
    focus:ring-focus-ring
    disabled:text-destructive-disabled disabled:border-destructive-disabled
  `,
};

const sizeStyles = {
  small: 'px-3 py-1.5 text-sm w-fit',
  medium: 'px-4 py-2 text-base w-fit',
  large: 'px-6 py-3 text-lg w-fit',
};
