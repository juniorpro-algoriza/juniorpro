import {
  Button as HeadlessButton,
  ButtonProps as HeadlessButtonProps,
} from "@headlessui/react";
import { cva, cx } from "@lib";
import type { VariantProps } from "cva";
import type { ReactNode, Ref } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "destructive"
  | "main"
  | "main2"
  | "mainPink"
  | "mainWhite"
  | "mainBlack"
  | "mainBlue"
  | "dangerMain";
type ButtonSize =
  | "small"
  | "medium"
  | "large"
  | "mainDefault"
  | "mainLg"
  | "custom";
type IconPosition = "left" | "right";

export interface ButtonProps
  extends HeadlessButtonProps,
    VariantProps<typeof button> {
  children?: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  ref?: Ref<HTMLButtonElement>; // Accept ref as a normal prop
}

export const Button = ({
  children,
  className,
  size = "medium",
  intent = "primary",
  icon,
  iconPosition = "right",
  ref,
  ...props
}: ButtonProps) => {
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
};

export type { ButtonSize, ButtonVariant, IconPosition };

const button = cva({
  base: [
    "inline-flex",
    "items-center",
    "justify-center",
    "cursor-pointer",
    "font-medium",
    "rounded-lg",
    "transition-all",
    "duration-200",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "disabled:opacity-70",
    "disabled:cursor-not-allowed",
    "min-w-max",
    "gap-3",
  ],
  variants: {
    intent: {
      unset: null,
      primary:
        "bg-violet-normal text-white hover:bg-violet-hover focus:ring-primary-200 disabled:bg-primary-400 disabled:text-white",
      secondary:
        "bg-primary-100 text-tertiary hover:bg-primary-200 focus:ring-primary-200 disabled:bg-tertiary disabled:text-white",
      tertiary:
        "bg-transparent text-violet-normal border border-violet-normal hover:bg-violet-50 focus:ring-violet-200 disabled:text-violet-400 disabled:border-violet-400",
      destructive:
        "bg-transparent text-danger-350 border border-danger-350 hover:bg-danger-50 hover:border-danger-300 hover:text-danger-300 focus:ring-rejected-200 disabled:text-danger-500 disabled:border-danger-500",
      // new
      main: "bg-white text-dark-blue-main hover:bg-dark-blue-main/5 focus:ring-dark-blue-main/10  border-b-5 border-dark-blue-main/15 [box-shadow:0px_1px_3px_0px_#0000001A] ",
      main2:
        "bg-dark-blue-main text-white hover:bg-dark-blue-main/85 focus:ring-dark-blue-main/10 disabled:bg-dark-blue-main/10 disabled:text-dark-blue-main border-b-5 border-[#372AAC] [box-shadow:0px_1px_3px_0px_#0000001A] ",
      dangerMain:
        "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/10 disabled:bg-red-500/10 disabled:text-red-500 border-b-5 border-red-700 [box-shadow:0px_1px_3px_0px_#0000001A] ",
      // marketing screens
      mainPink:
        "bg-pink-main hover:bg-pink-main/95 text-white rounded-full px-8 py-4 border-2 border-black shadow-thick-4 transition-all hover:shadow-thick-6 hover:-translate-y-1",
      mainWhite:
        "bg-white hover:bg-white/95 rounded-full px-8 py-4 border-2 border-black shadow-thick-4 transition-all hover:shadow-thick-6 hover:-translate-y-1",
      mainBlack:
        "bg-black hover:bg-black/95 text-white rounded-xl px-8 py-4 border-2 border-black transition-all shadow-thick-blue-4 hover:shadow-thick-blue-6 hover:-translate-y-1",
      mainBlue:
        "bg-blue-saturated hover:bg-blue-saturated/95 text-white rounded-xl px-8 py-4 border-2 border-black transition-all shadow-thick-4 hover:shadow-thick-6 hover:-translate-y-1",
    },
    size: {
      small: "px-3 py-1.5 text-sm",
      medium: "px-4 py-2 text-base",
      large: "px-6 py-3 text-lg",
      //new
      mainDefault: "px-6 py-3 font-bold rounded-2xl text-sm",
      mainLg: "px-6 py-4 font-bold rounded-3xl text-sm",
      custom: "",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});
