"use client";

import React from "react";
import { createPortal } from "react-dom";
import {
  Listbox,
  ListboxOption,
  Transition,
  Description,
  ListboxButton,
} from "@headlessui/react";
import { CheckIcon, ChevronDown } from "lucide-react";
import { cx } from "@lib";

// Helper to sync Headless UI state with local state safely
const OpenStateSync = ({
  open,
  setIsOpen,
}: {
  open: boolean;
  setIsOpen: (v: boolean) => void;
}) => {
  React.useEffect(() => {
    setIsOpen(open);
  }, [open, setIsOpen]);
  return null;
};

export interface SelectOption {
  label: string;
  value: string | number;
}

interface BaseProps {
  label?: string | React.ReactNode;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  error?: string;
}

interface SingleSelectProps extends BaseProps {
  multiple?: false;
  value: string | number | null;
  onChange: (value: string | number) => void;
}

interface MultiSelectProps extends BaseProps {
  multiple: true;
  value: (string | number)[];
  onChange: (value: (string | number)[]) => void;
}

type SelectProps = SingleSelectProps | MultiSelectProps;

export const Select = ({
  label,
  value,
  options,
  onChange,
  placeholder = "Select...",
  disabled = false,
  multiple = false,
  error = "",
}: SelectProps) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [buttonBounds, setButtonBounds] = React.useState<DOMRect | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useLayoutEffect(() => {
    if (!isOpen || !buttonRef.current) return;

    const update = () => {
      setButtonBounds(buttonRef.current!.getBoundingClientRect());
    };

    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [isOpen]);

  const selectedOptions = multiple
    ? options.filter((o) => (value as (string | number)[]).includes(o.value))
    : options.find((o) => o.value === value) || null;

  return (
    <div className="w-full flex flex-col space-y-2">
      {label && (
        <label className="block text-sm font-medium text-midnight">
          {label}
        </label>
      )}

      <Listbox
        value={value}
        onChange={(val) => {
          if (multiple) {
            (onChange as (v: (string | number)[]) => void)(
              val as (string | number)[]
            );
          } else {
            (onChange as (v: string | number) => void)(val as string | number);
          }
        }}
        multiple={multiple}
        disabled={disabled}
      >
        {({ open }) => {
          return (
            <div
              className={`relative mb-2 ${
                disabled ? "opacity-40" : "opacity-100"
              }`}
            >
              <OpenStateSync open={open} setIsOpen={setIsOpen} />
              <ListboxButton
                ref={buttonRef}
                className={cx(
                  "relative w-full cursor-default rounded-2xl border bg-white px-3 py-3.5 text-left text-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-normal",
                  error
                    ? "border-red-500 ring-2 ring-red-100"
                    : "border-gray-200"
                )}
              >
                <span className="block truncate">
                  {multiple
                    ? (selectedOptions as SelectOption[]).length > 0
                      ? (selectedOptions as SelectOption[])
                          .map((o) => o.label)
                          .join(" - ")
                      : placeholder
                    : (selectedOptions as SelectOption | null)?.label ||
                      placeholder}
                </span>

                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </span>
              </ListboxButton>

              <Transition
                as="div" // ✅ FIX
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                {buttonBounds &&
                  createPortal(
                    <div
                      className="fixed z-50 max-h-60 overflow-auto rounded-2xl bg-white py-1 shadow-lg ring-1 ring-gray-200 sm:text-sm"
                      style={{
                        top: buttonBounds.bottom + 4,
                        left: buttonBounds.left,
                        width: buttonBounds.width,
                      }}
                    >
                      {options.map((option) => (
                        <ListboxOption
                          key={option.value}
                          value={option.value}
                          className={({ active, selected }) =>
                            cx(
                              "relative cursor-default select-none py-2 pl-7 pr-4",
                              active && "bg-indigo-100 text-indigo-900",
                              selected && "font-medium",
                              !selected && "text-gray-900"
                            )
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span className="block truncate">
                                {option.label}
                              </span>

                              {selected && (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-1 text-indigo-600">
                                  <CheckIcon className="h-5 w-5" />
                                </span>
                              )}
                            </>
                          )}
                        </ListboxOption>
                      ))}
                    </div>,
                    document.body
                  )}
              </Transition>
            </div>
          );
        }}
      </Listbox>

      {error && (
        <Description className="text-sm text-red-600">{error}</Description>
      )}
    </div>
  );
};
