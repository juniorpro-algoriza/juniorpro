import { cva } from '@lib';

export const statCard = cva({
  base: [
    'flex',
    'items-start',
    'justify-between',
    'p-4',
    'rounded-lg',
    'shadow',
    'border',
    'border-[var(--color-border-secondary)]',
  ],
  variants: {
    variant: {
      blue: 'bg-[var(--color-violet-light)]',
      red: 'bg-[#FDEEEE]',
      green: 'bg-[var(--color-light-green)]',
      orange: 'bg-[var(--color-orange-50)]',
      gray: 'bg-[var(--color-storm-50)]',
      base: 'bg-white',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});

export const statCardValue = cva({
  base: ['text-[32px]', 'font-medium'],
  variants: {
    variant: {
      blue: 'text-[var(--color-violet-normal)]',
      red: 'text-[var(--color-danger-400)]',
      green: 'text-[var(--color-success-500)]',
      orange: 'text-[var(--color-dark-orange)]',
      gray: 'text-[var(--color-gray-900)]',
      base: 'text-black',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});

export const statCardLabel = cva({
  base: ['font-medium', 'text-[var(--color-dark-electric-blue)]'],
  variants: {
    variant: {
      blue: 'text-xl',
      red: 'text-xl',
      green: 'text-xl',
      orange: 'text-xl',
      gray: 'text-xl',
      base: 'text-[16px] text-black',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});

export const statCardIconContainer = cva({
  base: [
    'w-10',
    'h-10',
    'rounded-[8px]',
    'flex',
    'items-center',
    'justify-center',
  ],
  variants: {
    variant: {
      blue: 'bg-[var(--color-carolina-blue-opacity)]',
      red: 'bg-[#FCE6E6]',
      green: 'bg-[var(--color-success-100)]',
      orange: 'bg-[var(--color-light-orange)]',
      gray: 'bg-[var(--color-storm-100)]',
      base: 'bg-[var(--color-carolina-blue-opacity)]',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});

export const statCardIcon = cva({
  base: ['w-6', 'h-6'],
  variants: {
    variant: {
      blue: 'text-[var(--color-violet-normal)]',
      red: 'text-[#D44E4E]',
      green: 'text-[var(--color-success-400)]',
      orange: 'text-[var(--color-dark-orange)]',
      gray: 'text-[var(--color-storm-600)]',
      base: 'text-[var(--color-violet-normal)]',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});
