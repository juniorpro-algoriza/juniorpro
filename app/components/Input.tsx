import {
  Description,
  Field,
  Input as HeadlessInput,
  Label,
} from "@headlessui/react";
// TODO: Do NOT import React into any file!
// ! remove this and import `ReactNode` type from react
import React, { forwardRef, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

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
    // TODO: move this to the end of the file.
    const inputClasses = twMerge(
      // Base styles
      "w-full px-3 py-3.5 rounded-lg border transition-all duration-200 outline-none",
      "placeholder:text-gray-400 text-[#96A0B6] font-semibold",

      // Default state
      "border-[#DFE1E8] bg-white",

      // Hover state
      "hover:border-[#808D9E]",

      // Error state
      error && "border-red-500 ring-2 ring-red-100",

      // Disabled state
      disabled &&
        "bg-white opacity-60 border-[#DFE1E8] text-gray-500 cursor-not-allowed",

      // Icon padding
      leftIcon && "pl-10",
      rightIcon && "pr-10",

      className
    );

    return (
      <Field className={twMerge("flex flex-col space-y-1", containerClassName)}>
        {label && (
          <Label className="text-sm font-medium text-gray-700">{label}</Label>
        )}

        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
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
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Error or Helper Text */}
        {(error || helperText) && (
          <Description
            className={twMerge(
              "text-sm",
              error ? "text-red-600" : "text-gray-500"
            )}
          >
            {error || helperText}
          </Description>
        )}
      </Field>
    );
  }
);

Input.displayName = "Input";

export { Input };
