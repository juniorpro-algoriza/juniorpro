"use client";
import { Field, Fieldset, Radio, RadioGroup } from "@headlessui/react";

interface SignUpRadioProps {
  value: "junior" | "contributor";
  onChange: (value: "junior" | "contributor") => void;
  invitationId?: string;
}
export const radioFieldset =
  'flex w-fit items-center justify-center bg-gray-100 rounded-[40px] p-1.5';

export const radioButton =
  'group relative flex w-fit cursor-pointer justify-center rounded-[40px] px-4 py-2.5 font-medium transition-all duration-200 focus:outline-none data-[checked]:bg-white data-[checked]:text-violet-normal data-[checked]:shadow-sm data-[focus]:ring-2 data-[focus]:ring-indigo-500 data-[focus]:ring-offset-2 text-shadowBlue hover:text-gray-900';

export const SignUpRadio = ({
  value,
  onChange,
  invitationId,
}: SignUpRadioProps) => {
  const options = invitationId
    ? [{ title: "Register as junior", value: "junior" }] // if invited, only show junior
    : [
        { title: "Register as contributor", value: "contributor" },
        { title: "Register as junior", value: "junior" },
      ];

  return (
    <RadioGroup
      value={invitationId ? "junior" : value}
      onChange={onChange}
      className="w-full flex items-center justify-center"
    >
      <Fieldset className={radioFieldset}>
        {options.map(({ title, value }) => (
          <Field key={value}>
            <Radio value={value} className={radioButton}>
              {title}
            </Radio>
          </Field>
        ))}
      </Fieldset>
    </RadioGroup>
  );
};
