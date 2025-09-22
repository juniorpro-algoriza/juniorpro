"use client";
import { Field, Fieldset, Radio, RadioGroup } from "@headlessui/react";
import { radioButton, radioFieldset } from "@styles";

interface SignUpRadioProps {
  value: "junior" | "contributor";
  onChange: (value: "junior" | "contributor") => void;
  invited?: boolean;
}

export const SignUpRadio = ({ value, onChange, invited }: SignUpRadioProps) => {
  const options = invited
    ? [{ title: "Register as junior", value: "junior" }] // if invited, only show junior
    : [
        { title: "Register as contributor", value: "contributor" },
        { title: "Register as junior", value: "junior" },
      ];

  return (
    <RadioGroup
      value={value}
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
