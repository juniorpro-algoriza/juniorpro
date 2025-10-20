"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string | number;
}

interface BaseProps {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
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
}: SelectProps) => {
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
        <div className={`relative ${disabled ? "opacity-40" : "opacity-100"}`}>
          <Listbox.Button className="relative w-full cursor-default rounded-lg border border-[#DFE1E8] bg-white px-3 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-normal sm:text-sm">
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
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-7 pr-4 ${
                      active ? "bg-indigo-100 text-indigo-900" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
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
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
