"use client";

import React, { Fragment } from "react";
import { createPortal } from "react-dom";
import { Listbox, ListboxOption, Transition, Description, ListboxButton } from "@headlessui/react";
import { CheckIcon, ChevronDown } from "lucide-react";
import { cx } from "@lib";

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
  error?:string
}

// Single select
interface SingleSelectProps extends BaseProps {
  multiple?: false;
  value: string | number | null;
  onChange: (value: string | number) => void;
}

// Multi select
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
  error=""
}: SelectProps) => {
  const [buttonBounds, setButtonBounds] = React.useState<DOMRect | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const selectedOptions = multiple
    ? options.filter((o) => (value as (string | number)[]).includes(o.value))
    : options.find((o) => o.value === value) || null;

  const updateButtonBounds = () => {
    if (buttonRef.current) {
      setButtonBounds(buttonRef.current.getBoundingClientRect());
    }
  };

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
        <div className={`relative mb-2 ${disabled ? "opacity-40" : "opacity-100"}`}>
          <ListboxButton 
            ref={buttonRef}
            className={cx(
              "relative w-full cursor-default rounded-2xl border bg-white px-3 py-3.5 text-left focus:outline-none focus:ring-2 focus:ring-violet-normal text-sm transition-all duration-200",
              error
                ? "border-red-500 ring-2 ring-red-100"
                : "border-gray-200"
            )}
            onClick={updateButtonBounds}
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
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div>
              {buttonBounds && createPortal(
                <div 
                  className="fixed max-h-60 w-full overflow-auto rounded-2xl bg-white py-1 shadow-lg ring-1 ring-gray-200 ring-opacity-5 focus:outline-none sm:text-sm z-50"
                  style={{
                    top: buttonBounds.bottom + window.scrollY + 4,
                    left: buttonBounds.left + window.scrollX,
                    width: buttonBounds.width,
                  }}
                >
                  {options.map((option) => (
                    <ListboxOption
                      key={option.value}
                      value={option.value}
                      className={({ active, selected }) => cx(
                        'relative cursor-default select-none py-2 pl-7 pr-4',
                        active && 'bg-indigo-100 text-indigo-900',
                        selected && 'font-medium',
                        !selected && 'text-gray-900 font-normal'
                      )}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {option.label}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-1 text-indigo-600">
                              <CheckIcon className="h-5 w-5" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </div>,
                document.body
              )}
            </div>
          </Transition>
        </div>
      </Listbox>
      
      {/* Error Text */}
      {error && (
        <Description className="text-sm text-red-600">
          {error}
        </Description>
      )}
    </div>
  );
};
