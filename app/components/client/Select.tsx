"use client";

// TODO: Style this component
import {
  Description,
  Field,
  Label,
  Select as HeadlessSelect,
} from "@headlessui/react";

type SelectOption = {
  value: string;
  label: string;
};
interface SelectProps {
  options: SelectOption[];
  label: string;
  description: string;
  disabled?: boolean;
}

export const Select = ({
  options,
  label,
  description,
  disabled = false,
}: SelectProps) => {
  return (
    <Field disabled={disabled}>
      <Label className="hidden">{label}</Label>
      <Description className="hidden">{description}</Description>
      <HeadlessSelect name="status" className="data-disabled:bg-gray-100">
        {options.map(({ label, value }) => {
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </HeadlessSelect>
    </Field>
  );
};
