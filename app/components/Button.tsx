// TODO: Fix colors from globals.css
import {
  Button as HeadlessButton,
  ButtonProps as HeadlessButtonProps,
} from "@headlessui/react";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends HeadlessButtonProps {
  children: ReactNode;
  className?: string;
  // TODO: move these into a type/interface definition in the same file at the end of the file
  variant?: "primary" | "secondary" | "tertiary" | "destructive";
  size?: "small" | "medium" | "large";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = ({
  children,
  className,
  variant = "primary",
  size = "medium",
  icon,
  iconPosition = "left",
  ...props
}: ButtonProps) => {
  return (
    <HeadlessButton
      className={twMerge(
        baseStyle,
        vars[`${variant}Style`],
        sizes[`${size}Style`],
        className
      )}
      {...props}
    >
      {/* TODO: use padding instead of margins*/}
      {icon && iconPosition === "left" && (
        <span className={twMerge("flex items-center", children && "mr-2")}>
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className={twMerge("flex items-center", children && "ml-2")}>
          {icon}
        </span>
      )}
    </HeadlessButton>
  );
};

const baseStyle = `
  inline-flex items-center justify-center hover:cursor-pointer
  font-medium rounded-lg transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
`;

const vars = {
  primaryStyle: `
    bg-primary-blue
    hover:bg-primary-hover 
    focus:ring-focus-ring
    disabled:bg-primary-disabled disabled:text-white
  `,
  secondaryStyle: `
    bg-secondary-bg text-secondary-text
    hover:bg-secondary-hover hover:text-secondary-text
    focus:ring-focus-ring
    disabled:bg-primary-disabled disabled:text-white
  `,
  tertiaryStyle: `
    bg-transparent text-tertiary-text border border-tertiary-text
    hover:bg-transparent hover:text-tertiary-hover hover:border-tertiary-hover
    focus:ring-focus-ring
    disabled:text-tertiary-disabled disabled:border-tertiary-disabled
  `,
  destructiveStyle: `
    bg-transparent text-destructive-text border border-destructive-text
    hover:bg-transparent hover:border-destructive-hover hover:text-destructive-hover
    focus:ring-focus-ring
    disabled:text-destructive-disabled disabled:border-destructive-disabled
  `,
};

const sizes = {
  smallStyle: "px-3 py-1.5 text-sm w-fit",
  mediumStyle: "px-4 py-2 text-base w-fit",
  largeStyle: "px-6 py-3 text-lg w-fit",
};
