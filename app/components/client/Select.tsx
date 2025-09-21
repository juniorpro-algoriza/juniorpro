import {
  Description,
  Field,
  Select as HeadlessSelect,
  Label,
} from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
// import { ChangeEvent } from "react";

type SelectOption = {
  value: string;
  label: string;
};

interface SelectProps {
  options: SelectOption[];
  label: string;
  description?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export const Select = ({
  options,
  label,
  description,
  disabled = false,
  placeholder,
  error,
  required = false,
}: SelectProps) => {
  return (
    <Field className="w-full">
      <Label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      {description && (
        <Description className="text-sm text-gray-600 mb-2">
          {description}
        </Description>
      )}

      <div className="relative">
        <HeadlessSelect
          defaultValue={placeholder}
          disabled={disabled}
          className={`
            w-full rounded-lg border px-3 py-2.5 pr-10 text-sm appearance-none
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-violet-normal
            disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
            ${
              error
                ? "border-red-300 bg-red-50 text-red-900 focus:ring-red-500"
                : "border-gray-50 bg-white text-gray-900"
            }
          `}
        >
          {placeholder && (
            <option value={placeholder} disabled hidden>
              {placeholder}
            </option>
          )}
          {options?.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </HeadlessSelect>
        <ChevronDownIcon className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3.5 mr-3" />
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </Field>
  );
};
