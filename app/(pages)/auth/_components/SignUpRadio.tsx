"use client";
import { Field, Fieldset, Radio, RadioGroup } from "@headlessui/react";
import { cx } from "@lib";

interface SignUpRadioProps {
  value: "junior" | "contributor";
  onChange: (value: "junior" | "contributor") => void;
  invitationId?: string;
}
export const radioFieldset = "flex w-full items-center justify-center gap-2";

export const radioButton =
  "group relative flex flex-1 cursor-pointer justify-center rounded-lg px-4 py-3 font-bold text-lg transition-all duration-200 focus:outline-none data-[checked]:bg-white data-[checked]:text-blue-saturated data-[checked]:shadow-thick-2 data-[focus]:ring-2 data-[focus]:ring-blue-500 data-[focus]:ring-offset-2 text-black/60 hover:text-black border-2 border-transparent data-[checked]:border-blue-saturated";

export const SignUpRadio = ({
  value,
  onChange,
  invitationId,
}: SignUpRadioProps) => {
  const options = invitationId
    ? [{ title: "Junior", value: "junior" }]
    : [
        { title: "Contributor", value: "contributor" },
        { title: "Junior", value: "junior" },
      ];

  return (
    <RadioGroup
      value={invitationId ? "junior" : value}
      onChange={onChange}
      className={cx(
        "w-full flex items-center justify-center",
        invitationId && "hidden"
      )}
    >
      <Fieldset className={radioFieldset}>
        {options.map(({ title, value }) => (
          <Field key={value} className="flex-1">
            <Radio value={value} className={radioButton}>
              {title}
            </Radio>
          </Field>
        ))}
      </Fieldset>
    </RadioGroup>
  );
};
