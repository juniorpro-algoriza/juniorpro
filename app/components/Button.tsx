import React, { ReactNode, Ref } from "react";
import {
  Button as HeadlessButton,
  ButtonProps as HeadlessButtonProps,
} from "@headlessui/react";
import { cva, cx } from "@lib";
import { VariantProps } from "cva";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "destructive";
type ButtonSize = "small" | "medium" | "large";
type IconPosition = "left" | "right";

export interface ButtonProps
  extends HeadlessButtonProps,
    VariantProps<typeof button> {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  ref?: Ref<HTMLButtonElement>; // Accept ref as a normal prop
}

export function Button({
  children,
  className,
  size = "medium",
  intent = "primary",
  icon,
  iconPosition = "right",
  ref,
  ...props
}: ButtonProps) {
  return (
    <HeadlessButton
      ref={ref}
      className={cx(button({ intent, size }), className)}
      {...props}
    >
      {iconPosition === "left" && icon && (
        <span className="mr-2 flex-shrink-0">{icon}</span>
      )}
      {children}
      {iconPosition === "right" && icon && (
        <span className="ml-2 flex-shrink-0">{icon}</span>
      )}
    </HeadlessButton>
  );
}

export type { ButtonVariant, ButtonSize, IconPosition };

const button = cva({
  base: [
    "inline-flex items-center justify-center",
    "cursor-pointer",
    "font-medium rounded-lg transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ],
  variants: {
    intent: {
      unset: null,
      primary:
        "bg-primary-400 text-white hover:bg-primary-500 focus:ring-primary-200 disabled:bg-primary-400 disabled:text-white",
      secondary:
        "bg-primary-100 text-tertiary hover:bg-primary-200 focus:ring-primary-200 disabled:bg-tertiary disabled:text-white",
      tertiary:
        "bg-transparent text-tertiary border border-tertiary hover:bg-primary-50 focus:ring-primary-200 disabled:text-primary-400 disabled:border-primary-400",
      destructive:
        "bg-transparent text-danger-350 border border-danger-350 hover:bg-danger-50 hover:border-danger-300 hover:text-danger-300 focus:ring-rejected-200 disabled:text-danger-500 disabled:border-danger-500",
    },
    size: {
      small: "px-3 py-1.5 text-sm",
      medium: "px-4 py-2 text-base",
      large: "px-6 py-3 text-lg",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});
