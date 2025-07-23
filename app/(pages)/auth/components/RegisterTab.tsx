import { Field, Radio, RadioGroup } from "@headlessui/react";

export const RegisterTab = () => {
  const options = [
    { title: "Register as contributor", value: "contributor" },
    { title: "Register as junior", value: "junior" },
  ];
  return (
    <>
      <RadioGroup>
        {options.map(({ title, value }) => {
          return (
            <Field key={value}>
              <Radio value={value}>{title}</Radio>
            </Field>
          );
        })}
      </RadioGroup>
    </>
  );
};
