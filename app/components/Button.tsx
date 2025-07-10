import {
  ButtonProps as HeadlessButtonProps,
  Button as HeadlessButton,
} from "@headlessui/react";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends HeadlessButtonProps {
  children: ReactNode;
  className?: string;
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <HeadlessButton className={twMerge(buttonStyle, className)} {...props}>
      {children}
    </HeadlessButton>
  );
};

const buttonStyle = "p-2 border border-black rounded-lg";
