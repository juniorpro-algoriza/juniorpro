import {
  Description,
  Field,
  Textarea as HeadlessTextarea,
  Label,
} from "@headlessui/react";
import { cva, cx } from "@lib";
import type { VariantProps } from "cva";
import type {
  ChangeEvent,
  ReactNode,
  Ref,
  TextareaHTMLAttributes,
} from "react";

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textarea> {
  label?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  containerClassName?: string;
  ref?: Ref<HTMLTextAreaElement>;
}

interface IconContainerProps {
  children: ReactNode;
  position: "left" | "right";
}

const IconContainer = ({ children, position }: IconContainerProps) => {
  const iconClasses = cx(
    "absolute top-3 transform text-gray-400",
    position === "left" ? "left-3" : "right-3"
  );

  return <div className={iconClasses}>{children}</div>;
};

const Textarea = ({
  label,
  value,
  onChange,
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
}: TextareaProps) => {
  const containerClasses = cx("flex flex-col space-y-2", containerClassName);

  const textareaState =
    state || (error ? "error" : disabled ? "disabled" : "default");

  const wrapperClasses = "relative";

  const textareaClasses = cx(
    textarea({
      state: textareaState,
      hasLeftIcon: !!leftIcon,
      hasRightIcon: !!rightIcon,
    }),
    className
  );

  return (
    <Field className={containerClasses}>
      {label && <Label className={labelVariants({ disabled })}>{label}</Label>}

      <div className={wrapperClasses}>
        {leftIcon && <IconContainer position="left">{leftIcon}</IconContainer>}

        <HeadlessTextarea
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={textareaClasses}
          rows={3}
          {...props}
        />

        {rightIcon && (
          <IconContainer position="right">{rightIcon}</IconContainer>
        )}
      </div>

      {(error ?? helperText) && (
        <Description
          className={descriptionVariants({
            textareaType: error ? "error" : "helper",
          })}
        >
          {error ?? helperText}
        </Description>
      )}
    </Field>
  );
};

Textarea.displayName = "Textarea";

export { Textarea };

// Styles
const textarea = cva({
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
    textareaType: {
      error: "text-red-600",
      helper: "text-gray-500",
    },
  },
  defaultVariants: {
    textareaType: "helper",
  },
});
