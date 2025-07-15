import {
  Field,
  Label,
  Radio as HeadlessRadio,
  RadioGroup,
} from "@headlessui/react";

// TODO: remove this and add props to radio instead!
const plans = ["Startup", "Business", "Enterprise"];

export const Radio = () => {
  return (
    <RadioGroup>
      {plans.map((plan) => (
        <Field key={plan} className="flex items-center gap-2">
          <HeadlessRadio
            value={plan}
            className="group flex size-5 items-center justify-center rounded-full border bg-white data-checked:bg-blue-400"
          >
            <span className="invisible size-2 rounded-full bg-white group-data-checked:visible" />
          </HeadlessRadio>
          <Label>{plan}</Label>
        </Field>
      ))}
    </RadioGroup>
  );
};
