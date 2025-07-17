import {
  Button as HeadlessButton,
  ButtonProps as HeadlessButtonProps,
} from '@headlessui/react';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive';
type ButtonSize = 'small' | 'medium' | 'large';
type IconPosition = 'left' | 'right';

interface ButtonProps extends HeadlessButtonProps {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: IconPosition;
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
  const variantStyles = {
    primary: `
      bg-primary-400 text-white
      hover:bg-primary-500
      focus:ring-primary-200
      disabled:bg-primary-400 disabled:text-white
    `,
    secondary: `
      bg-primary-100 text-tertiary
      hover:bg-primary-200
      focus:ring-primary-200
      disabled:bg-tertiary disabled:text-white
    `,
    tertiary: `
      bg-transparent text-tertiary border border-tertiary
      hover:bg-primary-50
      focus:ring-primary-200
      disabled:text-primary-400 disabled:border-primary-400
    `,
    destructive: `
      bg-transparent text-danger-350 border border-danger-350
      hover:bg-danger-50 hover:border-danger-300 hover:text-danger-300
      focus:ring-rejected-200
      disabled:text-danger-500 disabled:border-danger-500
    `,
  };

  const baseStyle = `
  inline-flex items-center justify-center hover:cursor-pointer
  font-medium rounded-lg transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
`;

  const sizeStyles = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const iconSpacing = {
    left: children ? 'mr-2' : '',
    right: children ? 'ml-2' : '',
  };

  return (
    <HeadlessButton
      className={twMerge(
        baseStyle,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className={twMerge('flex items-center', iconSpacing.left)}>
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className={twMerge('flex items-center', iconSpacing.right)}>
          {icon}
        </span>
      )}
    </HeadlessButton>
  );
};

export type { ButtonProps, ButtonSize, ButtonVariant, IconPosition };
