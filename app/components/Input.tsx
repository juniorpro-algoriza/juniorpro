import { Field, Input as HeadlessInput, Label } from "@headlessui/react";
import { cva, cx } from "@lib";
import type { VariantProps } from "cva";
import type { InputHTMLAttributes, ReactNode, Ref } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {
  label?: string | ReactNode;
  placeholder?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  containerClassName?: string;
  ref?: Ref<HTMLInputElement>;
}

interface IconContainerProps {
  children: ReactNode;
  position: "left" | "right";
}

const IconContainer = ({ children, position }: IconContainerProps) => {
  const iconClasses = cx(
    "absolute top-1/2 transform -translate-y-1/2 text-gray-400",
    position === "left" ? "left-3" : "right-3"
  );

  return <div className={iconClasses}>{children}</div>;
};

const Input = ({
  label,
  placeholder,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  containerClassName,
  disabled = false,
  state,
  ref,
  ...props
}: InputProps) => {
  const containerClasses = cx("flex flex-col space-y-2 ", containerClassName);

  // Determine input state based on props if not explicitly provided
  const inputState =
    state || (error ? "error" : disabled ? "disabled" : "default");

  const inputWrapperClasses = "relative";

  const inputClasses = cx(
    input({
      state: inputState,
      hasLeftIcon: !!leftIcon,
      hasRightIcon: !!rightIcon,
    }),
    className
  );

  return (
    <Field className={containerClasses}>
      {label && <Label className={labelVariants({ disabled })}>{label}</Label>}

      <div className={inputWrapperClasses}>
        {/* Left Icon */}
        {leftIcon && <IconContainer position="left">{leftIcon}</IconContainer>}
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
          <IconContainer position="right">{rightIcon}</IconContainer>
        )}
      </div>

      {/* Error or Helper Text */}
      {(error ?? helperText) && (
        <p
          className={descriptionVariants({ type: error ? "error" : "helper" })}
        >
          {error ?? helperText}
        </p>
      )}
    </Field>
  );
};

Input.displayName = "Input";

export { Input };

const input = cva({
  base: [
    "w-full",
    "px-4",
    "py-3",
    "focus:ring-2",
    "focus:ring-blue-main",
    "rounded-2xl",
    "border",
    "transition-all",
    "duration-200",
    "outline-none",
    "placeholder:text-gray-300",
    "placeholder:max-md:text-sm",
  ],
  variants: {
    state: {
      default: "border-gray-200 bg-white",
      error: "border-red-500 ring-2 ring-red-100",
      disabled:
        "bg-white opacity-60 border-platinum text-gray-500 cursor-not-allowed",
    },
    hasLeftIcon: {
      true: "pl-10",
      false: "",
    },
    hasRightIcon: {
      true: "pr-10",
      false: "",
    },
  },
  defaultVariants: {
    state: "default",
    hasLeftIcon: false,
    hasRightIcon: false,
  },
});

const labelVariants = cva({
  base: "text-sm font-medium",
  variants: {
    disabled: {
      true: "text-gray-400",
      false: "text-midnight",
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

const descriptionVariants = cva({
  base: "text-sm",
  variants: {
    type: {
      error: "text-red-600",
      helper: "text-gray-500",
    },
  },
  defaultVariants: {
    type: "helper",
  },
});
