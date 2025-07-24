// TODO: Style radio groups
// ! Add style to /app/styles/index.ts
import { Field, Fieldset, Radio, RadioGroup } from "@headlessui/react";

export const SignUpRadio = () => {
  const options = [
    { title: "Register as contributor", value: "contributor" },
    { title: "Register as junior", value: "junior" },
  ];
  return (
    <>
      <RadioGroup name="signInAs" defaultValue={options[0].value}>
        <Fieldset>
          {options.map(({ title, value }) => {
            return (
              <Field key={value}>
                <Radio value={value}>{title}</Radio>
              </Field>
            );
          })}
        </Fieldset>
      </RadioGroup>
    </>
  );
};
